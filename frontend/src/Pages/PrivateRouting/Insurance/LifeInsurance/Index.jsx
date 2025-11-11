import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Badge, Statistic, Row, Col, Input } from 'antd';
import { motion } from 'framer-motion';
import {
  HeartOutlined,
  FolderOpenOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import DashboardLayout from '../../../../layouts/DashboardLayout';

const LifeInsurance = () => {
  const [searchText, setSearchText] = useState('');

  // Sample data - will be replaced with API calls
  const mockPolicies = [
    {
      key: '1',
      policyNumber: 'LI-2024-001',
      clientName: 'John Smith',
      policyType: 'Term Life',
      coverageAmount: '$500,000',
      premium: '$125/month',
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2044-01-15'
    },
    {
      key: '2',
      policyNumber: 'LI-2024-002',
      clientName: 'Sarah Johnson',
      policyType: 'Whole Life',
      coverageAmount: '$750,000',
      premium: '$285/month',
      status: 'Active',
      startDate: '2024-02-20',
      endDate: 'Lifetime'
    },
    {
      key: '3',
      policyNumber: 'LI-2024-003',
      clientName: 'Michael Brown',
      policyType: 'Universal Life',
      coverageAmount: '$1,000,000',
      premium: '$450/month',
      status: 'Pending',
      startDate: '2024-03-10',
      endDate: '2054-03-10'
    }
  ];

  const stats = [
    { title: 'Total Policies', value: 150, prefix: <HeartOutlined />, color: '#1890ff' },
    { title: 'Term Life', value: 60, color: '#52c41a' },
    { title: 'Whole Life', value: 40, color: '#722ed1' },
    { title: 'Universal Life', value: 30, color: '#fa8c16' },
    { title: 'Variable Life', value: 20, color: '#eb2f96' }
  ];

  const columns = [
    {
      title: 'Policy Number',
      dataIndex: 'policyNumber',
      key: 'policyNumber',
      fixed: 'left',
      width: 150,
    },
    {
      title: 'Client Name',
      dataIndex: 'clientName',
      key: 'clientName',
      width: 180,
    },
    {
      title: 'Policy Type',
      dataIndex: 'policyType',
      key: 'policyType',
      width: 150,
      render: (type) => {
        const colorMap = {
          'Term Life': 'green',
          'Whole Life': 'purple',
          'Universal Life': 'orange',
          'Variable Life': 'magenta'
        };
        return <Tag color={colorMap[type] || 'blue'}>{type}</Tag>;
      }
    },
    {
      title: 'Coverage Amount',
      dataIndex: 'coverageAmount',
      key: 'coverageAmount',
      width: 150,
    },
    {
      title: 'Premium',
      dataIndex: 'premium',
      key: 'premium',
      width: 130,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => (
        <Tag color={status === 'Active' ? 'success' : status === 'Pending' ? 'warning' : 'default'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 130,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 130,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<FolderOpenOutlined />} 
            size="large"
            style={{ color: '#1890ff', fontSize: '24px' }}
            title="View Documents"
          />
          <Button type="text" icon={<EyeOutlined />} size="small" title="View Details" />
          <Button type="text" icon={<EditOutlined />} size="small" title="Edit" />
          <Button type="text" danger icon={<DeleteOutlined />} size="small" title="Delete" />
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <HeartOutlined className="text-blue-500" />
            Life Insurance Policies
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and track all life insurance policies
          </p>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} md={8} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="hover:shadow-lg transition-shadow"
                  style={{
                    borderTop: `4px solid ${stat.color}`,
                  }}
                >
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    prefix={stat.prefix}
                    valueStyle={{ color: stat.color }}
                  />
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Search and Actions */}
        <Card className="mb-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <Input
              placeholder="Search by policy number, client name..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
              size="large"
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              className="bg-gradient-to-r from-blue-500 to-purple-600"
            >
              New Policy
            </Button>
          </div>
        </Card>

        {/* Policies Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={mockPolicies}
            scroll={{ x: 1200 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} policies`,
            }}
          />
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default LifeInsurance;
