import React, { useState } from 'react';
import { Typography, Button, Table, Tag, Space, Input, Select, Modal, Form, InputNumber, DatePicker } from 'antd';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  HeartOutlined,
  SafetyOutlined,
  DollarOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const LifeInsurance = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for life insurance policies
  const [policies, setPolicies] = useState([
    {
      key: 'LI1001',
      policyId: 'LI1001',
      clientName: 'Asha Rao',
      planType: 'Term Life',
      sumAssured: 5000000,
      premium: 15000,
      startDate: '2023-01-15',
      endDate: '2043-01-15',
      status: 'Active',
      nominee: 'Rajesh Rao'
    },
    {
      key: 'LI1002',
      policyId: 'LI1002',
      clientName: 'Vikram Singh',
      planType: 'Whole Life',
      sumAssured: 10000000,
      premium: 35000,
      startDate: '2022-06-20',
      endDate: '2072-06-20',
      status: 'Active',
      nominee: 'Priya Singh'
    },
    {
      key: 'LI1003',
      policyId: 'LI1003',
      clientName: 'Meera Patel',
      planType: 'Endowment',
      sumAssured: 3000000,
      premium: 20000,
      startDate: '2021-03-10',
      endDate: '2041-03-10',
      status: 'Active',
      nominee: 'Amit Patel'
    },
    {
      key: 'LI1004',
      policyId: 'LI1004',
      clientName: 'Rahul Kumar',
      planType: 'Term Life',
      sumAssured: 7500000,
      premium: 18000,
      startDate: '2020-11-05',
      endDate: '2040-11-05',
      status: 'Pending',
      nominee: 'Anjali Kumar'
    },
    {
      key: 'LI1005',
      policyId: 'LI1005',
      clientName: 'Sunita Sharma',
      planType: 'Money Back',
      sumAssured: 4000000,
      premium: 25000,
      startDate: '2019-08-22',
      endDate: '2039-08-22',
      status: 'Active',
      nominee: 'Deepak Sharma'
    },
    {
      key: 'LI1006',
      policyId: 'LI1006',
      clientName: 'Arjun Reddy',
      planType: 'ULIP',
      sumAssured: 8000000,
      premium: 30000,
      startDate: '2023-05-15',
      endDate: '2043-05-15',
      status: 'Active',
      nominee: 'Lakshmi Reddy'
    }
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    console.log('New Policy:', values);
    // Add new policy logic here
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this policy?',
      content: `Policy ID: ${record.policyId} - ${record.clientName}`,
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        setPolicies(policies.filter(p => p.key !== record.key));
      }
    });
  };

  const columns = [
    {
      title: 'Policy ID',
      dataIndex: 'policyId',
      key: 'policyId',
      fixed: 'left',
      width: 120,
      render: (text) => <Text strong className="text-blue-600">{text}</Text>
    },
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
      width: 150,
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => 
        record.clientName.toLowerCase().includes(value.toLowerCase()) ||
        record.policyId.toLowerCase().includes(value.toLowerCase())
    },
    {
      title: 'Plan Type',
      dataIndex: 'planType',
      key: 'planType',
      width: 130,
      render: (type) => (
        <Tag color="blue" icon={<HeartOutlined />}>
          {type}
        </Tag>
      )
    },
    {
      title: 'Sum Assured',
      dataIndex: 'sumAssured',
      key: 'sumAssured',
      width: 150,
      render: (amount) => (
        <Text strong style={{ color: '#10b981' }}>
          ₹{amount.toLocaleString('en-IN')}
        </Text>
      ),
      sorter: (a, b) => a.sumAssured - b.sumAssured
    },
    {
      title: 'Monthly Premium',
      dataIndex: 'premium',
      key: 'premium',
      width: 150,
      render: (amount) => (
        <Text style={{ color: '#6366f1' }}>
          ₹{amount.toLocaleString('en-IN')}
        </Text>
      )
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120
    },
    {
      title: 'Nominee',
      dataIndex: 'nominee',
      key: 'nominee',
      width: 130
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Expired', value: 'Expired' }
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : status === 'Pending' ? 'orange' : 'red'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => console.log('View', record)}
          >
            View
          </Button>
          <Button 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => console.log('Edit', record)}
          />
          <Button 
            danger 
            size="small" 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      )
    }
  ];

  // Filter data based on status
  const filteredData = statusFilter === 'all' 
    ? policies 
    : policies.filter(p => p.status === statusFilter);

  // Calculate stats
  const stats = {
    totalPolicies: policies.length,
    activePolicies: policies.filter(p => p.status === 'Active').length,
    totalCoverage: policies.reduce((sum, p) => sum + p.sumAssured, 0),
    monthlyPremiums: policies.reduce((sum, p) => sum + p.premium, 0)
  };

  return (
    <DashboardLayout>
      <div className="royal-main-card">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Page Header */}
          <motion.div
            className="flex justify-between items-start mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <Title className="royal-page-title mb-2">
                <HeartOutlined className="mr-3" />
                Life Insurance Policies
              </Title>
              <Text style={{ color: '#718096', fontSize: '16px' }}>
                Manage and view all life insurance policies, customer plans, and benefits
              </Text>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={showModal}
                className="royal-btn-primary"
              >
                Add New Policy
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { 
                title: 'Total Policies', 
                value: stats.totalPolicies, 
                icon: <SafetyOutlined />, 
                color: 'blue',
                gradient: 'from-blue-500 to-blue-600'
              },
              { 
                title: 'Active Policies', 
                value: stats.activePolicies, 
                icon: <HeartOutlined />, 
                color: 'green',
                gradient: 'from-green-500 to-green-600'
              },
              { 
                title: 'Total Coverage', 
                value: `₹${(stats.totalCoverage / 10000000).toFixed(1)} Cr`, 
                icon: <DollarOutlined />, 
                color: 'purple',
                gradient: 'from-purple-500 to-purple-600'
              },
              { 
                title: 'Monthly Premiums', 
                value: `₹${stats.monthlyPremiums.toLocaleString('en-IN')}`, 
                icon: <DollarOutlined />, 
                color: 'pink',
                gradient: 'from-pink-500 to-pink-600'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="text-gray-500 text-sm block mb-2">{stat.title}</Text>
                    <Text className="text-2xl font-bold">{stat.value}</Text>
                  </div>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center text-white text-2xl`}>
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            className="bg-white rounded-xl p-6 mb-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-wrap gap-4">
              <Input
                placeholder="Search by Policy ID or Client Name"
                prefix={<SearchOutlined />}
                size="large"
                style={{ width: 300 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
              <Select
                size="large"
                style={{ width: 200 }}
                placeholder="Filter by Status"
                value={statusFilter}
                onChange={setStatusFilter}
              >
                <Option value="all">All Status</Option>
                <Option value="Active">Active</Option>
                <Option value="Pending">Pending</Option>
                <Option value="Expired">Expired</Option>
              </Select>
            </div>
          </motion.div>

          {/* Policies Table */}
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Table
              columns={columns}
              dataSource={filteredData}
              scroll={{ x: 1200 }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} policies`
              }}
            />
          </motion.div>
        </motion.div>

        {/* Add Policy Modal */}
        <Modal
          title={<Text strong style={{ fontSize: '20px' }}>Add New Life Insurance Policy</Text>}
          open={isModalVisible}
          onCancel={handleCancel}
          width={700}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="mt-6"
          >
            <Form.Item
              name="clientName"
              label="Client Name"
              rules={[{ required: true, message: 'Please enter client name' }]}
            >
              <Input size="large" placeholder="Enter client name" />
            </Form.Item>

            <Form.Item
              name="planType"
              label="Plan Type"
              rules={[{ required: true, message: 'Please select plan type' }]}
            >
              <Select size="large" placeholder="Select plan type">
                <Option value="Term Life">Term Life</Option>
                <Option value="Whole Life">Whole Life</Option>
                <Option value="Endowment">Endowment</Option>
                <Option value="Money Back">Money Back</Option>
                <Option value="ULIP">ULIP</Option>
              </Select>
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="sumAssured"
                label="Sum Assured (₹)"
                rules={[{ required: true, message: 'Please enter sum assured' }]}
              >
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  min={100000}
                  step={100000}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Form.Item
                name="premium"
                label="Monthly Premium (₹)"
                rules={[{ required: true, message: 'Please enter premium' }]}
              >
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  min={1000}
                  step={1000}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="startDate"
              label="Policy Start Date"
              rules={[{ required: true, message: 'Please select start date' }]}
            >
              <DatePicker size="large" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="nominee"
              label="Nominee Name"
              rules={[{ required: true, message: 'Please enter nominee name' }]}
            >
              <Input size="large" placeholder="Enter nominee name" />
            </Form.Item>

            <Form.Item className="mb-0 mt-6">
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Button size="large" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" size="large" htmlType="submit" className="royal-btn-primary">
                  Create Policy
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default LifeInsurance;
