import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Input, Avatar, Badge } from 'antd';
import { motion } from 'framer-motion';
import {
  TeamOutlined,
  FolderOpenOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import DashboardLayout from '../../../../layouts/DashboardLayout';

const Clients = () => {
  const [searchText, setSearchText] = useState('');

  // Sample clients data
  const mockClients = [
    {
      key: '1',
      id: 'CLI-001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      policies: 3,
      totalCoverage: '$1,500,000',
      status: 'Active',
      joinDate: '2023-01-15'
    },
    {
      key: '2',
      id: 'CLI-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '(555) 234-5678',
      policies: 2,
      totalCoverage: '$950,000',
      status: 'Active',
      joinDate: '2023-03-20'
    },
    {
      key: '3',
      id: 'CLI-003',
      name: 'Michael Brown',
      email: 'mbrown@example.com',
      phone: '(555) 345-6789',
      policies: 1,
      totalCoverage: '$1,000,000',
      status: 'Pending',
      joinDate: '2024-01-10'
    },
    {
      key: '4',
      id: 'CLI-004',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '(555) 456-7890',
      policies: 4,
      totalCoverage: '$2,200,000',
      status: 'Active',
      joinDate: '2022-11-05'
    }
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const columns = [
    {
      title: 'Client',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 250,
      render: (name, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            size={40}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {getInitials(name)}
          </Avatar>
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-xs text-gray-500">{record.id}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      width: 280,
      render: (_, record) => (
        <div>
          <div className="flex items-center gap-2 text-sm mb-1">
            <MailOutlined className="text-blue-500" />
            <span>{record.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <PhoneOutlined className="text-green-500" />
            <span>{record.phone}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Policies',
      dataIndex: 'policies',
      key: 'policies',
      width: 100,
      align: 'center',
      render: (policies) => (
        <Badge
          count={policies}
          style={{ backgroundColor: '#52c41a' }}
          showZero
        />
      ),
    },
    {
      title: 'Total Coverage',
      dataIndex: 'totalCoverage',
      key: 'totalCoverage',
      width: 150,
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
      ),
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
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
            <TeamOutlined className="text-purple-500" />
            Clients
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your insurance clients and their information
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="hover:shadow-lg transition-shadow" style={{ borderTop: '4px solid #1890ff' }}>
              <div className="text-gray-600 text-sm mb-2">Total Clients</div>
              <div className="text-3xl font-bold text-blue-600">200</div>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="hover:shadow-lg transition-shadow" style={{ borderTop: '4px solid #52c41a' }}>
              <div className="text-gray-600 text-sm mb-2">Active Clients</div>
              <div className="text-3xl font-bold text-green-600">185</div>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="hover:shadow-lg transition-shadow" style={{ borderTop: '4px solid #faad14' }}>
              <div className="text-gray-600 text-sm mb-2">Pending</div>
              <div className="text-3xl font-bold text-orange-600">15</div>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="hover:shadow-lg transition-shadow" style={{ borderTop: '4px solid #722ed1' }}>
              <div className="text-gray-600 text-sm mb-2">New This Month</div>
              <div className="text-3xl font-bold text-purple-600">12</div>
            </Card>
          </motion.div>
        </div>

        {/* Search and Actions */}
        <Card className="mb-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <Input
              placeholder="Search by name, email, phone..."
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
              className="bg-gradient-to-r from-purple-500 to-blue-600"
            >
              Add Client
            </Button>
          </div>
        </Card>

        {/* Clients Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={mockClients}
            scroll={{ x: 1200 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} clients`,
            }}
          />
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Clients;
