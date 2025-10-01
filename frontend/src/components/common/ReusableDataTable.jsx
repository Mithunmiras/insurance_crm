import React, { useState } from 'react';
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Avatar,
  Tag,
  Dropdown,
  Breadcrumb,
  Space,
  Row,
  Col,
  Typography,
  message,
  Modal
} from 'antd';
import { motion } from 'framer-motion';
import {
  PlusOutlined,
  DeleteOutlined,
  ImportOutlined,
  ExportOutlined,
  FilterOutlined,
  SearchOutlined,
  MoreOutlined,
  UserOutlined,
  UploadOutlined,
  EditOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const ReusableDataTable = ({
  pageTitle,
  columns,
  dataSource,
  loading = false,
  createFormFields,
  editFormFields,
  onCreate,
  onEdit,
  onDelete,
  onToggleStatus,
  breadcrumbItems = [{ title: 'Home' }, { title: pageTitle }]
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [drawerMode, setDrawerMode] = useState('create');
  const [currentRecord, setCurrentRecord] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewRecord, setViewRecord] = useState(null);
  const [baseData, setBaseData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: ['10', '20', '50', '100'],
    showLessItems: true
  });

  React.useEffect(() => {
    const tempData = dataSource.length === 0 ? [
      {
        id: 1,
        employeeId: 'EMP001',
        employeeName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        designation: 'Senior Developer',
        role: 'Doctor',
        managerName: 'Jane Smith',
        experience: '5',
        doj: '2020-01-15',
        status: 'Active',
        active: true
      },
      {
        id: 2,
        employeeId: 'EMP002',
        employeeName: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone: '+1234567891',
        designation: 'Staff Nurse',
        role: 'Staff',
        managerName: 'John Doe',
        experience: '3',
        doj: '2021-06-10',
        status: 'Active',
        active: true
      }
    ] : dataSource;
    
    setBaseData(tempData);
    setFilteredData(tempData);
    setPagination(prev => ({ ...prev, total: tempData.length }));
  }, [dataSource]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => {
      console.log('Row selection changed:', keys);
      setSelectedRowKeys(keys);
    },
  };

  const handleCreate = () => {
    setDrawerMode('create');
    setCurrentRecord(null);
    form.resetFields();
    setDrawerVisible(true);
  };

  const handleEdit = (record) => {
    console.log('Edit clicked for record:', record);
    setDrawerMode('edit');
    setCurrentRecord(record);
    setDrawerVisible(true);
    
    // Set form values after a small delay to ensure form is ready
    setTimeout(() => {
      if (record) {
        const formValues = {
          employeeId: record.employeeId,
          employeeName: record.employeeName,
          email: record.email,
          phone: record.phone,
          designation: record.designation,
          role: record.role,
          reportingManager: record.managerName,
          experience: record.experience,
          doj: record.doj && record.doj !== 'N/A' ? dayjs(record.doj) : null
        };
        form.setFieldsValue(formValues);
      }
    }, 100);
  };

  const handleView = (record) => {
    console.log('View clicked for record:', record);
    setViewRecord(record);
    setViewModalVisible(true);
  };

  const handleNameClick = (record) => {
    handleView(record);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (drawerMode === 'create') {
        onCreate?.(values);
      } else if (drawerMode === 'edit') {
        onEdit?.(currentRecord?.id, values);
      }
      setDrawerVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleDelete = async () => {
    console.log('Delete button clicked, selectedRowKeys:', selectedRowKeys);
    if (selectedRowKeys.length === 0) {
      message.warning('Please select items to delete');
      return;
    }
    
    try {
      console.log('Calling onDelete with IDs:', selectedRowKeys);
      if (onDelete) {
        await onDelete(selectedRowKeys);
        setSelectedRowKeys([]);
        message.success('Items deleted successfully');
      } else {
        console.error('onDelete function not provided');
        message.error('Delete function not available');
      }
    } catch (error) {
      console.error('Delete error:', error);
      message.error('Failed to delete items');
    }
  };

  const handleEditSelected = () => {
    if (selectedRowKeys.length !== 1) {
      message.warning('Please select exactly one item to edit');
      return;
    }
    const selectedRecord = filteredData.find(item => item.id === selectedRowKeys[0]);
    if (selectedRecord) {
      handleEdit(selectedRecord);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    
    if (!value || value.trim() === '') {
      setFilteredData([...baseData]);
      setPagination(prev => ({ ...prev, current: 1, total: baseData.length }));
      return;
    }
    
    const searchTerm = value.toLowerCase().trim();
    const filtered = baseData.filter(item => {
      return (
        (item.employeeName && item.employeeName.toLowerCase().includes(searchTerm)) ||
        (item.email && item.email.toLowerCase().includes(searchTerm)) ||
        (item.employeeId && item.employeeId.toLowerCase().includes(searchTerm)) ||
        (item.designation && item.designation.toLowerCase().includes(searchTerm)) ||
        (item.role && item.role.toLowerCase().includes(searchTerm)) ||
        (item.managerName && item.managerName.toLowerCase().includes(searchTerm)) ||
        (item.phone && item.phone.toLowerCase().includes(searchTerm)) ||
        (item.status && item.status.toLowerCase().includes(searchTerm))
      );
    });
    
    setFilteredData([...filtered]);
    setPagination(prev => ({ ...prev, current: 1, total: filtered.length }));
  };

  const handleFilter = async () => {
    try {
      const values = await filterForm.validateFields();
      let filtered = dataSource;
      
      // Status filter
      if (values.status) {
        filtered = filtered.filter(item => item.status === values.status);
      }
      
      // Role filter (replacing department)
      if (values.role) {
        filtered = filtered.filter(item => item.role === values.role);
      }
      
      // Designation filter
      if (values.designation) {
        filtered = filtered.filter(item => item.designation && item.designation.toLowerCase().includes(values.designation.toLowerCase()));
      }
      
      // Created By filter (manager filter)
      if (values.createdBy) {
        filtered = filtered.filter(item => item.managerName && item.managerName.toLowerCase().includes(values.createdBy.toLowerCase()));
      }
      
      // Date range filter (DOJ)
      if (values.startDate || values.endDate) {
        filtered = filtered.filter(item => {
          if (item.doj && item.doj !== 'N/A') {
            const itemDate = item.doj;
            let matchesStart = true;
            let matchesEnd = true;
            
            if (values.startDate) {
              const startDate = values.startDate.format('YYYY-MM-DD');
              matchesStart = itemDate >= startDate;
            }
            
            if (values.endDate) {
              const endDate = values.endDate.format('YYYY-MM-DD');
              matchesEnd = itemDate <= endDate;
            }
            
            return matchesStart && matchesEnd;
          }
          return false;
        });
      }
      
      // Experience range filter
      if (values.experienceFrom !== undefined || values.experienceTo !== undefined) {
        filtered = filtered.filter(item => {
          const exp = parseInt(item.experience) || 0;
          const minExp = values.experienceFrom || 0;
          const maxExp = values.experienceTo || 999;
          return exp >= minExp && exp <= maxExp;
        });
      }
      
      setFilteredData(filtered);
      setPagination(prev => ({ ...prev, current: 1, total: filtered.length }));
      setFilterVisible(false);
      message.success(`Filter applied - ${filtered.length} results found`);
    } catch (error) {
      console.error('Filter validation failed:', error);
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      [columns.map(col => col.title).join(','),
       ...filteredData.map(row => columns.map(col => row[col.dataIndex] || '').join(','))]
      .join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${pageTitle.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success('Data exported successfully');
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        message.info('Import functionality would process: ' + file.name);
      }
    };
    input.click();
  };

  const resetFilters = () => {
    filterForm.resetFields();
    setFilteredData(baseData);
    setSearchText('');
    setPagination(prev => ({ ...prev, current: 1, total: baseData.length }));
    message.success('Filters reset successfully');
  };

  const handleFilterChange = () => {
    const values = filterForm.getFieldsValue();
    let filtered = dataSource;
    
    // Apply all filters
    if (values.status) {
      filtered = filtered.filter(item => item.status === values.status);
    }
    if (values.role) {
      filtered = filtered.filter(item => item.role === values.role);
    }
    if (values.designation) {
      filtered = filtered.filter(item => item.designation && item.designation.toLowerCase().includes(values.designation.toLowerCase()));
    }
    if (values.createdBy) {
      filtered = filtered.filter(item => item.managerName && item.managerName.toLowerCase().includes(values.createdBy.toLowerCase()));
    }
    if (values.startDate || values.endDate) {
      filtered = filtered.filter(item => {
        if (item.doj && item.doj !== 'N/A') {
          const itemDate = item.doj;
          let matchesStart = true;
          let matchesEnd = true;
          
          if (values.startDate) {
            const startDate = values.startDate.format('YYYY-MM-DD');
            matchesStart = itemDate >= startDate;
          }
          
          if (values.endDate) {
            const endDate = values.endDate.format('YYYY-MM-DD');
            matchesEnd = itemDate <= endDate;
          }
          
          return matchesStart && matchesEnd;
        }
        return false;
      });
    }
    if (values.experienceFrom !== undefined && values.experienceFrom !== '') {
      filtered = filtered.filter(item => {
        const exp = parseInt(item.experience) || 0;
        return exp >= parseInt(values.experienceFrom);
      });
    }
    if (values.experienceTo !== undefined && values.experienceTo !== '') {
      filtered = filtered.filter(item => {
        const exp = parseInt(item.experience) || 0;
        return exp <= parseInt(values.experienceTo);
      });
    }
    
    setFilteredData(filtered);
    setPagination(prev => ({ ...prev, current: 1, total: filtered.length }));
  };

  const handleTableChange = (paginationConfig) => {
    setPagination({
      ...pagination,
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    });
  };

  const actionColumn = {
    title: 'Actions',
    key: 'actions',
    width: 80,
    render: (_, record) => (
      <Dropdown
        menu={{
          items: [
            { key: 'edit', label: 'Edit', onClick: () => handleEdit(record) },
            { key: 'view', label: 'View', onClick: () => handleView(record) },
            { 
              key: 'status', 
              label: record.status === 'Active' ? 'Set as Inactive' : 'Set as Active',
              onClick: () => {
                console.log('Status toggle clicked for record:', record);
                onToggleStatus?.(record);
              }
            }
          ]
        }}
        trigger={['click']}
      >
        <Button type="text" icon={<MoreOutlined />} />
      </Dropdown>
    ),
  };

  const enhancedColumns = columns.map(col => {
    if (col.dataIndex === 'employeeName') {
      return {
        ...col,
        render: (text, record) => (
          <Button 
            type="link" 
            onClick={() => handleNameClick(record)}
            style={{ padding: 0, height: 'auto', color: '#1890ff' }}
          >
            {text}
          </Button>
        )
      };
    }
    return col;
  });

  const tableColumns = [...enhancedColumns, actionColumn];

  const drawerTitle = drawerMode === 'create' ? `Create ${pageTitle.slice(0, -1)}` : 
                    drawerMode === 'edit' ? `Edit ${pageTitle.slice(0, -1)}` : 
                    `View ${pageTitle.slice(0, -1)}`;

  return (
    <div style={{ padding: '24px' }}>
      <style>
        {`
          .inactive-user-row {
            opacity: 0.6;
            background-color: #f5f5f5 !important;
          }
          .inactive-user-row:hover {
            background-color: #e6f7ff !important;
          }
          .ant-table-thead > tr > th {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%) !important;
            border-bottom: 2px solid #e2e8f0 !important;
            font-weight: 600 !important;
            color: #1e293b !important;
          }
          .ant-table-tbody > tr:hover > td {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%) !important;
          }
          .ant-btn-primary {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
            border: none !important;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4) !important;
          }
          .ant-btn-primary:hover {
            background: linear-gradient(135deg, #2563eb, #1e40af) !important;
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.6) !important;
            transform: translateY(-2px) !important;
          }
        `}
      </style>
        <Breadcrumb items={breadcrumbItems} style={{ marginBottom: '16px' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <Title level={2} style={{ margin: 0 }}>
            {pageTitle}
          </Title>
          <Space wrap>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
              Create
            </Button>
            <Button 
              icon={<EditOutlined />} 
              disabled={selectedRowKeys.length !== 1}
              onClick={handleEditSelected}
            >
              Edit
            </Button>
            <Button 
              icon={<DeleteOutlined />} 
              disabled={selectedRowKeys.length === 0}
              onClick={() => {
                console.log('Delete button clicked!');
                handleDelete();
              }}
            >
              Delete ({selectedRowKeys.length})
            </Button>
            <Button icon={<ImportOutlined />} onClick={handleImport}>Import</Button>
            <Button icon={<ExportOutlined />} onClick={handleExport}>Export</Button>
          </Space>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
          <Button 
            icon={<FilterOutlined />} 
            onClick={() => setFilterVisible(true)}
          >
            Filter
          </Button>
          <Input.Search
            placeholder="Search here"
            style={{ width: '100%', maxWidth: 300 }}
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={handleSearch}
          />
        </div>

        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={tableColumns}
          dataSource={filteredData}
          loading={loading}
          rowClassName={(record) => record.active === false ? 'inactive-user-row' : ''}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 'max-content' }}
        />

      <Drawer
        title={
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'linear-gradient(135deg, #1e293b, #3b82f6, #8b5cf6)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '20px',
              fontWeight: '600'
            }}
          >
            {drawerTitle}
          </motion.div>
        }
        width={window.innerWidth < 768 ? '100%' : 650}
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        styles={{
          header: {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
            borderBottom: '2px solid #e2e8f0',
            padding: '20px 24px'
          },
          body: {
            background: 'linear-gradient(135deg, #fafafa 0%, #f0f2f5 50%, #e6f7ff 100%)',
            padding: '24px'
          },
          footer: {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
            borderTop: '2px solid #e2e8f0',
            padding: '16px 24px'
          }
        }}
        footer={
          <motion.div 
            style={{ textAlign: 'right' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Space>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => setDrawerVisible(false)}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    color: '#6b7280'
                  }}
                >
                  Cancel
                </Button>
              </motion.div>
              {drawerMode !== 'view' && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    type="primary" 
                    onClick={handleSubmit}
                    style={{
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
                    }}
                  >
                    Save
                  </Button>
                </motion.div>
              )}
            </Space>
          </motion.div>
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Form 
            form={form} 
            layout="vertical" 
            disabled={drawerMode === 'view'}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <div style={{ opacity: drawerMode === 'view' ? 0.7 : 1 }}>
              {drawerMode === 'create' ? 
                (typeof createFormFields === 'function' ? createFormFields(form) : createFormFields) : 
                (typeof editFormFields === 'function' ? editFormFields(currentRecord, form) : editFormFields)
              }
            </div>
          </Form>
        </motion.div>
      </Drawer>

      <Drawer
        title={
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'linear-gradient(135deg, #1e293b, #3b82f6, #8b5cf6)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '18px',
              fontWeight: '600'
            }}
          >
            Filter Options
          </motion.div>
        }
        width={window.innerWidth < 768 ? '100%' : 420}
        open={filterVisible}
        onClose={() => setFilterVisible(false)}
        styles={{
          header: {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
            borderBottom: '2px solid #e2e8f0',
            padding: '20px 24px'
          },
          body: {
            background: 'linear-gradient(135deg, #fafafa 0%, #f0f2f5 50%, #e6f7ff 100%)',
            padding: '24px'
          },
          footer: {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
            borderTop: '2px solid #e2e8f0',
            padding: '16px 24px'
          }
        }}
        footer={
          <motion.div 
            style={{ textAlign: 'right' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Space>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={resetFilters}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    color: '#6b7280'
                  }}
                >
                  Reset
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  type="primary" 
                  onClick={handleFilter}
                  style={{
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  Apply
                </Button>
              </motion.div>
            </Space>
          </motion.div>
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Form 
            form={filterForm} 
            layout="vertical" 
            onValuesChange={handleFilterChange}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
          <Form.Item name="status" label="Status">
            <Select placeholder="Select Status" allowClear>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="role" label="Role">
            <Select placeholder="Select Role" allowClear>
              <Select.Option value="Super Admin">Super Admin</Select.Option>
              <Select.Option value="Doctor">Doctor</Select.Option>
              <Select.Option value="Staff">Staff</Select.Option>
              <Select.Option value="Branch Head">Branch Head</Select.Option>
              <Select.Option value="Customer">Customer</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="designation" label="Designation">
            <Input placeholder="Enter Designation" allowClear />
          </Form.Item>
          
          <Form.Item name="createdBy" label="Manager Name">
            <Input placeholder="Enter Manager Name" allowClear />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="startDate" label="DOJ Start Date">
                <DatePicker style={{ width: '100%' }} placeholder="Start Date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="endDate" label="DOJ End Date">
                <DatePicker style={{ width: '100%' }} placeholder="End Date" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="experienceFrom" label="Experience From (Years)">
                <Input type="number" placeholder="Min Years" min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="experienceTo" label="Experience To (Years)">
                <Input type="number" placeholder="Max Years" min={0} />
              </Form.Item>
            </Col>
          </Row>
          </Form>
        </motion.div>
      </Drawer>

      <Modal
        title={`Employee Details - ${viewRecord?.employeeName || ''}`}
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>
        ]}
        width={600}
      >
        {viewRecord && (
          <div style={{ padding: '20px 0' }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Employee ID:</strong>
                  <div style={{ marginTop: '4px', color: '#666' }}>{viewRecord.employeeId}</div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Email:</strong>
                  <div style={{ marginTop: '4px', color: '#666' }}>{viewRecord.email}</div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Phone:</strong>
                  <div style={{ marginTop: '4px', color: '#666' }}>{viewRecord.phone}</div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Designation:</strong>
                  <div style={{ marginTop: '4px', color: '#666' }}>{viewRecord.designation}</div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Role:</strong>
                  <div style={{ marginTop: '4px', color: '#666' }}>{viewRecord.role}</div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Manager:</strong>
                  <div style={{ marginTop: '4px', color: '#666' }}>{viewRecord.managerName}</div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Experience:</strong>
                  <div style={{ marginTop: '4px', color: '#666' }}>{viewRecord.experience} years</div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Date of Joining:</strong>
                  <div style={{ marginTop: '4px', color: '#666' }}>{viewRecord.doj}</div>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Status:</strong>
                  <div style={{ marginTop: '4px' }}>
                    <Tag color={viewRecord.status === 'Active' ? 'green' : 'red'}>
                      {viewRecord.status}
                    </Tag>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReusableDataTable;
