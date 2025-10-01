import { useNavigate } from "react-router-dom";
import useAlert from "../../../../Hooks/useAlert";
import { useEffect, useState } from "react";
import APIRequest from "../../../../utils/APIRequest";
import ConfigAPIURL from "../../../../Config/ConfigAPIUrl.js";
import { useDispatch, useSelector } from "react-redux";
import fieldsValidation from "../../../../utils/FieldsValidation";
import { handleMobileNo, login, userSubscribed } from "../../../../Redux/auth";
import { showError } from "../../../../Hooks/useMessage";
import useLoginService from "../../../../Hooks/useAuth";
import { USER_DETAILS } from "../Constants/constant.js";
import Validation from "../../../../utils/validation.js";
import { handleCloseLogin } from "../../../../Redux/loginSlice.js";
import LocalStorage from "../../../../config/LocalStorage.js";
import { useAuthStore } from "../../../../store/useAuthStore.js";

const requiredFields = {
  mobileNo: "",
};

const useServices = () => {
  const { publishNotification } = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [otpTrue, setOtpTrue] = useState(false);
  const [otp, setOTP] = useState("");
  const [register, setRegister] = useState(false);
  const userType = useSelector((state) => state.auth.userType);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchUserProfile } = useLoginService();
  const mobile = useSelector((state) => state.auth.mobileNo);
  console.log(mobile);
  const [userForm, setUserForm] = useState(() => {
    const initial = structuredClone(USER_DETAILS);
    initial.userDetails.mobileNo = mobile;
    return initial;
  });
  console.log(userForm);

  //   useEffect(() => {
  //     isLogin();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const isLogin = async () => {
    const response = await APIRequest.request(
      "GET",
      ConfigAPIURL.userIsLoggedin,
      ""
    );
    
    if (response?.data?.responseCode === 109) {
      const userDetails = response.data.user;
      const { login } = useAuthStore.getState();
      const token = localStorage.getItem("token");
      login(userDetails, token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const onAccountLogin = async (user) => {
    if (!mobileNo) {
      setErrors({ mobileNo: "Username field is required" });
      return;
    }
    if (!password) {
      setErrors({ password: "Password field is required" });
      return;
    }
    
    const response = await APIRequest.request(
      "POST",
      ConfigAPIURL.accountLogin,
      JSON.stringify({
        username: mobileNo,
        password: password
      })
    );

    if (response?.data?.responseCode === 108) {
      publishNotification("Wrong Credentials / User not found", "error");
    } else if (response?.data?.accessToken) {
      localStorage.setItem("token", response.data.accessToken);
      const { login } = useAuthStore.getState();
      login(response.data.user, response.data.accessToken);
      publishNotification("Login successful", "success");
      navigate("/dashboard");
    } else {
      publishNotification("Login failed", "error");
    }
  };

  const verifyOTP = async () => {
    if (otp.length < 6) {
      publishNotification("Please Enter 6 digits OTP", "error");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.verifyOTP,
        JSON.stringify({
          otpVal: otp,
        })
      );

      if (response !== undefined && response !== null) {
        if (response.data.responseCode === 109) {
          if (response?.data?.isFirstLogin === true) {
            if (response?.data?.userType === "user") {
              setRegister(true);
            } else {
              navigate("/pro/register");
            }
          } else {
            dispatch(handleCloseLogin());
            isLogin();
          }
        } else if (response.data.responseCode === 118) {
          publishNotification("Invalid OTP", "error");
        } else if (response.data.responseCode === 127) {
          publishNotification(response?.data?.message, "error");
        } else if (response.data.responseCode === 112) {
          publishNotification(
            "You don't have any permission. Please contact admin",
            "error"
          );
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const userSignUp = async () => {
    const valid = handlePersonalDetailsErrors();
    console.log(valid);
    if (!valid) return;
    try {
      const response = await APIRequest.request(
        "POST",
        ConfigAPIURL.userSignUp,
        JSON.stringify(userForm)
      );
      if (response?.data?.responseCode === 109) {
        await isLogin();
        navigate("/user");
        dispatch(handleCloseLogin());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userUpdate = async (flattenedData) => {
    const valid = handlePersonalDetailsErrors();
    console.log(valid);
    if (!valid) return;
    try {
      const response = await APIRequest.request(
        "PUT",
        ConfigAPIURL.userProfileUpdate,
        JSON.stringify(flattenedData)
      );
      if (response?.data?.responseCode === 109) {
        // await isLogin();
        // navigate("/user");
        publishNotification("User Updated Successfully", "success");
        dispatch(handleCloseLogin());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePersonalDetailsErrors = () => {
    const required = {
      fname: "",
      mobileNo: "",
    };

    const personalDetails = {
      fname: userForm?.userDetails?.fname,
      mobileNo: userForm?.userDetails?.mobileNo,
    };
    const errors = fieldsValidation(personalDetails, required);
    console.log(errors, "errors");
    if (errors !== true) {
      setErrors(errors);
      return false;
    }

    if (userForm?.userDetails?.email) {
      const emailVerified = Validation.emailValidation(
        userForm?.userDetails?.email
      );
      if (!emailVerified) {
        setErrors((p) => ({ ...p, email: "Email is not valid" }));
        return false;
      }
    }

    return true;
  };

  return {
    errors,
    setErrors,
    onAccountLogin,
    setMobileNo,
    mobileNo,
    setPassword,
    password,
    otpTrue,
    verifyOTP,
    otp,
    setOTP,
    isLoading,
    setOtpTrue,
    register,
    userSignUp,
    userForm,
    setUserForm,
    userUpdate,
  };
};

export default useServices;
