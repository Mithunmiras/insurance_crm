import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import PrimaryBtn from "../../../../Components/Button/Index";
import { useState } from "react";
import Text from "../../../../Components/Typography/Typography";

const MobileNoModal = ({ services }) => {
  const [isChecked, setIsChecked] = useState(false);

  const canSubmit = services.mobileNo && services.password && isChecked;

  return (
    <div className="max-sm:px-2">
      <Card className="rounded-lg w-96 max-sm:w-72 shadow-[4px_4px_16px_0px_#00000014]">
        <Typography.Title level={5}>Login</Typography.Title>

        <Form.Item style={{ marginBottom: 12 }}>
          <Input
            size="large"
            placeholder="Username"
            value={services.mobileNo}
            onChange={(e) => services.setMobileNo(e.target.value)}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 12 }}>
          <Input.Password
            size="large"
            placeholder="Password"
            value={services.password}
            onChange={(e) => services.setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 12 }}>
          <div className="flex items-start gap-2">
            <Checkbox
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <Text type="body" className="text-sm">
              By logging in, you accept the{" "}
              <a
                href="/pro/terms&Conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 underline"
              >
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a
                href="/privacyPolicy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 underline"
              >
                Privacy Policy
              </a>{" "}
              of Zenvy
            </Text>
          </div>
        </Form.Item>

        <PrimaryBtn
          variant="primary"
          onClick={() => services.onAccountLogin()}
          disabled={!canSubmit}
        >
          Login
        </PrimaryBtn>
      </Card>
    </div>
  );
};

export default MobileNoModal;
