import React, { useState, useEffect } from 'react';
import { Avatar, Tag, message } from 'antd';
import { motion } from 'framer-motion';
import ReusableDataTable from '../../components/common/ReusableDataTable';
import UserForm from './components/UserForm';
import { userService } from '../../services/userService';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
    fetchManagers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      message.error('Failed to fetch users');
    }
    setLoading(false);
  };

  const fetchDepartments = async () => {
    try {
      const data = await userService.getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Failed to fetch departments');
    }
  };

  const fetchManagers = async () => {
    try {
      const data = await userService.getManagers();
      setManagers(data);
    } catch (error) {
      console.error('Failed to fetch managers');
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await userService.getRoles();
      setRoles(data);
    } catch (error) {
      console.error('Failed to fetch roles');
    }
  };

  const userColumns = [
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
      sorter: (a, b) => a.employeeId.localeCompare(b.employeeId),
    },
    {
      title: 'Employee Name',
      dataIndex: 'employeeName',
      key: 'employeeName',
      sorter: (a, b) => a.employeeName.localeCompare(b.employeeName),
      render: (text, record) => (
        <motion.div 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Avatar 
              size={32} 
              style={{ 
                backgroundColor: record.avatarColor,
                border: '2px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              <motion.span
                animate={{ 
                  textShadow: [
                    '0 0 5px rgba(255,255,255,0.5)',
                    '0 0 10px rgba(255,255,255,0.8)',
                    '0 0 5px rgba(255,255,255,0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {record.initials}
              </motion.span>
            </Avatar>
          </motion.div>
          <motion.span
            animate={{ 
              color: ['#1F2937', '#3B82F6', '#1F2937']
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {text}
          </motion.span>
        </motion.div>
      ),
    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Manager Name',
      dataIndex: 'managerName',
      key: 'managerName',
      sorter: (a, b) => a.managerName.localeCompare(b.managerName),
      render: (text, record) => (
        <motion.div 
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Avatar 
              size={32} 
              style={{ 
                backgroundColor: record.managerColor,
                border: '2px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              <motion.span
                animate={{ 
                  textShadow: [
                    '0 0 5px rgba(255,255,255,0.5)',
                    '0 0 10px rgba(255,255,255,0.8)',
                    '0 0 5px rgba(255,255,255,0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {record.managerInitials}
              </motion.span>
            </Avatar>
          </motion.div>
          <motion.span
            animate={{ 
              color: ['#1F2937', '#8B5CF6', '#1F2937']
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            {text}
          </motion.span>
        </motion.div>
      ),
    },
    {
      title: 'DOJ',
      dataIndex: 'doj',
      key: 'doj',
      sorter: (a, b) => new Date(a.doj) - new Date(b.doj),
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      sorter: (a, b) => a.designation.localeCompare(b.designation),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      sorter: (a, b) => a.experience - b.experience,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => {
        const colors = {
          Active: 'green',
          'On Notice': 'orange',
          Inactive: 'gray',
          Archived: 'red'
        };
        return (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Tag 
              color={colors[status]}
              style={{
                borderRadius: '12px',
                padding: '4px 12px',
                fontWeight: '600',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              <motion.span
                animate={status === 'Active' ? {
                  textShadow: [
                    '0 0 5px rgba(34, 197, 94, 0.5)',
                    '0 0 10px rgba(34, 197, 94, 0.8)',
                    '0 0 5px rgba(34, 197, 94, 0.5)'
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {status}
              </motion.span>
            </Tag>
          </motion.div>
        );
      },
    },
  ];

  const handleCreate = async (values) => {
    try {
      console.log('Form values:', values);
      
      // Format date if it exists
      const formattedValues = {
        ...values,
        doj: values.doj ? values.doj.format('YYYY-MM-DD') : null
      };
      

      
      console.log('Formatted values:', formattedValues);
      const result = await userService.createUser(formattedValues);
      console.log('Create result:', result);
      
      message.success('User created successfully');
      await fetchUsers();
    } catch (error) {
      console.error('Create error:', error);
      message.error(error.message || 'Failed to create user');
    }
  };

  const handleEdit = async (id, values) => {
    try {
      console.log('Editing user with ID:', id, 'Values:', values);
      
      // Format date if it exists
      const formattedValues = {
        ...values,
        doj: values.doj ? values.doj.format('YYYY-MM-DD') : values.doj
      };
      
      await userService.updateUser(id, formattedValues);
      message.success('User updated successfully');
      fetchUsers();
    } catch (error) {
      console.error('Edit error:', error);
      message.error('Failed to update user');
    }
  };

  const handleDelete = async (selectedKeys) => {
    console.log('UsersPage handleDelete called with:', selectedKeys);
    try {
      const result = await userService.deleteUsers(selectedKeys);
      console.log('Delete result:', result);
      message.success('Users deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Delete error in UsersPage:', error);
      message.error('Failed to delete users');
    }
  };

  const handleToggleStatus = async (record) => {
    try {
      console.log('Toggling status for user:', record);
      const result = await userService.toggleUserStatus(record.id);
      console.log('Toggle result:', result);
      
      message.success(result.message);
      
      // Show additional info about login access
      const accessMessage = result.status === 'Active' 
        ? 'User can now login to their account' 
        : 'User login access has been revoked';
      
      setTimeout(() => {
        message.info(accessMessage);
      }, 1000);
      
      await fetchUsers();
    } catch (error) {
      console.error('Toggle status error:', error);
      message.error(error.message || 'Failed to update user status');
    }
  };

  const handleResetPasswordAttempts = async (userId) => {
    try {
      await userService.resetPasswordAttempts(userId);
      message.success('Password attempts reset successfully');
      fetchUsers();
    } catch (error) {
      message.error('Failed to reset password attempts');
    }
  };

  // Make reset function globally available for UserForm
  React.useEffect(() => {
    window.resetPasswordAttempts = handleResetPasswordAttempts;
    return () => {
      delete window.resetPasswordAttempts;
    };
  }, []);

  return (
    <motion.div 
      className="royal-main-card relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Floating Background Elements */}
      <motion.div 
        className="absolute top-10 right-20 w-20 h-20 bg-blue-400/5 rounded-full blur-2xl"
        animate={{ 
          y: [0, -15, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-16 h-16 bg-purple-400/6 rounded-full blur-xl"
        animate={{ 
          y: [0, 12, 0],
          x: [0, -8, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/4 w-12 h-12 bg-pink-400/4 rounded-full blur-lg"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      
      {/* Shimmer Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
        animate={{ 
          x: ["-100%", "100%"],
          opacity: [0, 0.3, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <ReusableDataTable
          pageTitle="Users"
          columns={userColumns}
          dataSource={users}
          loading={loading}
          createFormFields={(form) => <UserForm departments={departments} managers={managers} roles={roles} form={form} mode="create" />}
          editFormFields={(record, form) => <UserForm departments={departments} managers={managers} roles={roles} initialValues={record} form={form} mode="edit" />}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      </motion.div>
    </motion.div>
  );
};

export default UsersPage;