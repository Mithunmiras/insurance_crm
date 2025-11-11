import React from 'react';
import { Form, Input, Select, DatePicker, Avatar, Row, Col } from 'antd';
import { UserOutlined, CameraOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

const { Option } = Select;

const UserForm = ({ departments = [], managers = [], roles = [], initialValues = {}, form, mode = 'create' }) => {
  // Handle initial values and date conversion
  React.useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0 && form) {
      const processed = { ...initialValues };
      
      // Convert doj string to dayjs object if it exists
      if (processed.doj && typeof processed.doj === 'string') {
        processed.doj = dayjs(processed.doj);
      }
      
      form.setFieldsValue(processed);
    }
  }, [initialValues, form]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        style={{ textAlign: 'center', marginBottom: '32px' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <motion.div 
          style={{ position: 'relative', display: 'inline-block' }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.div 
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6)',
              zIndex: 0
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          
          <Avatar 
            size={80} 
            src={initialValues?.avatar} 
            icon={<UserOutlined />}
            style={{
              position: 'relative',
              zIndex: 1,
              border: '3px solid white',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
            }}
          />
          
          <motion.div 
            style={{ 
              position: 'absolute', 
              bottom: 0, 
              right: 0, 
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
              borderRadius: '50%', 
              width: 28, 
              height: 28, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer',
              border: '2px solid white',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
              zIndex: 2
            }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 6px 16px rgba(59, 130, 246, 0.6)'
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <CameraOutlined style={{ color: 'white', fontSize: 14 }} />
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="employeeId" label="Employee ID" rules={[{ required: true }]}>
              <Input 
                placeholder="Employee ID" 
                style={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="employeeName" label="Employee Name" rules={[{ required: true }]}>
              <Input 
                placeholder="Full Name" 
                style={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              name="email" 
              label="Email ID" 
              rules={[
                { required: true, message: 'Email is required' },
                { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email format' }
              ]}
            >
              <Input 
                placeholder="Email" 
                style={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              name="phone" 
              label="Mobile Number" 
              rules={[
                { required: true, message: 'Mobile number is required' },
                { pattern: /^[+]?[0-9]{10,15}$/, message: 'Invalid mobile number format' }
              ]}
            >
              <Input 
                placeholder="Mobile Number" 
                style={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </motion.div>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item 
            name="gender" 
            label="Gender" 
            rules={[{ required: true, message: 'Gender is required' }]}
          >
            <Select placeholder="Select Gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="designation" label="Designation">
            <Input placeholder="Designation" />
          </Form.Item>
        </Col>
      </Row>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Role is required' }]}>
          <Select 
            placeholder="Select Role"
            style={{
              borderRadius: '8px'
            }}
          >
            {roles.map(role => (
              <Option key={role.id} value={role.name}>{role.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </motion.div>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="reportingManager" label="Reporting Manager" rules={[{ required: true, message: 'Reporting Manager is required' }]}>
            <Select placeholder="Select Manager">
              {managers.map(manager => (
                <Option key={manager.id} value={manager.name}>{manager.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="experience" label="Total Experience">
            <Input placeholder="Years" />
          </Form.Item>
        </Col>
      </Row>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Form.Item name="doj" label="Date of Joining" rules={[{ required: true, message: 'Date of Joining is required' }]}>
          <DatePicker 
            style={{ 
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }} 
            placeholder="Select Date" 
          />
        </Form.Item>
      </motion.div>

      {mode === 'create' && (
        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Password is required' }]}>
          <Input.Password placeholder="Enter Password" />
        </Form.Item>
      )}

      {initialValues?.id && (
        <div 
          style={{ color: '#1890ff', cursor: 'pointer', fontSize: '12px' }}
          onClick={() => {
            // This will be handled by parent component
            if (window.resetPasswordAttempts) {
              window.resetPasswordAttempts(initialValues.id);
            }
          }}
        >
          Reset password attempts ({initialValues?.loginAttempts || 0} failed attempts)
        </div>
      )}
    </motion.div>
  );
};

export default UserForm;