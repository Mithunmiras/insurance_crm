import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, Upload, List, Tag, Space, message } from 'antd';
import {
  UploadOutlined,
  FileOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Option } = Select;
const { TextArea } = Input;

const DocumentModal = ({ visible, onClose, entityName, entityId }) => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [form] = Form.useForm();

  // 50+ Life Insurance Document Categories
  const documentCategories = [
    // Application & Underwriting
    { group: 'Application & Underwriting', items: [
      'Life Insurance Application Form',
      'Health Questionnaire',
      'Medical History Form',
      'Family Medical History',
      'Attending Physician Statement (APS)',
      'Medical Examination Report',
      'Blood Test Results',
      'Urine Test Results',
      'ECG/EKG Report',
      'Stress Test Results',
      'X-Ray Reports',
      'MRI/CT Scan Reports',
      'HIV Test Results',
      'Drug/Alcohol Screening',
      'Paramedical Exam Report'
    ]},
    // Policy Documents
    { group: 'Policy Documents', items: [
      'Policy Contract/Agreement',
      'Policy Schedule',
      'Policy Illustrations',
      'Premium Payment Schedule',
      'Premium Receipt',
      'Policy Endorsement',
      'Policy Amendment',
      'Policy Conversion Documents',
      'Policy Reinstatement Form'
    ]},
    // Beneficiary & Nomination
    { group: 'Beneficiary & Nomination', items: [
      'Beneficiary Designation Form',
      'Primary Beneficiary Information',
      'Contingent Beneficiary Information',
      'Irrevocable Beneficiary Form',
      'Beneficiary Change Request',
      'Nomination Form',
      'Nominee Identification'
    ]},
    // Riders & Additional Benefits
    { group: 'Riders & Benefits', items: [
      'Rider Application Form',
      'Accidental Death Benefit Rider',
      'Waiver of Premium Rider',
      'Critical Illness Rider',
      'Disability Income Rider',
      'Term Rider Documentation',
      'Child Term Rider',
      'Long-Term Care Rider'
    ]},
    // Financial & Identity
    { group: 'Financial & Identity', items: [
      'Income Proof Documents',
      'Tax Returns',
      'Bank Statements',
      'Investment Account Statements',
      'Employment Verification',
      'Government ID (License/Passport)',
      'Social Security Card',
      'Proof of Address'
    ]},
    // Claims Documents
    { group: 'Claims Documents', items: [
      'Death Certificate',
      'Claim Form (Death Benefit)',
      'Funeral/Burial Expenses',
      'Legal Heir Certificate',
      'Succession Certificate',
      'Probate Documents',
      'Affidavit of Identity',
      'Police Report',
      'Autopsy Report',
      'Medical Records (Terminal Illness)'
    ]},
    // Policy Administration
    { group: 'Policy Administration', items: [
      'Loan Application Form',
      'Loan Repayment Schedule',
      'Surrender Value Request',
      'Cash Value Withdrawal Request',
      'Dividend Option Selection',
      'Premium Holiday Request',
      'Policy Revival Application',
      'Address Change Form',
      'Correspondence Log'
    ]},
    // Compliance & Legal
    { group: 'Compliance & Legal', items: [
      'HIPAA Authorization',
      'Privacy Notice Acknowledgment',
      'Anti-Money Laundering (AML) Documents',
      'Know Your Customer (KYC) Form',
      'Politically Exposed Person (PEP) Declaration',
      'Tax Information (W-9/W-8)',
      'Power of Attorney',
      'Trust Documents'
    ]}
  ];

  // Sample documents
  const [documents, setDocuments] = useState([
    {
      id: '1',
      name: 'Life Insurance Application',
      category: 'Life Insurance Application Form',
      uploadDate: '2024-01-15',
      size: '2.4 MB',
      type: 'PDF'
    },
    {
      id: '2',
      name: 'Medical Examination Report',
      category: 'Medical Examination Report',
      uploadDate: '2024-01-20',
      size: '1.8 MB',
      type: 'PDF'
    },
    {
      id: '3',
      name: 'Policy Contract',
      category: 'Policy Contract/Agreement',
      uploadDate: '2024-02-01',
      size: '3.2 MB',
      type: 'PDF'
    }
  ]);

  const handleUpload = (values) => {
    console.log('Upload values:', values);
    message.success('Document uploaded successfully!');
    setShowUploadForm(false);
    form.resetFields();
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Delete Document',
      content: 'Are you sure you want to delete this document?',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        setDocuments(documents.filter(doc => doc.id !== id));
        message.success('Document deleted successfully');
      }
    });
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <FileOutlined className="text-blue-500" />
          <span>Documents - {entityName}</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={900}
      style={{ top: 20 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Upload Button */}
        <div className="mb-4">
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-gradient-to-r from-blue-500 to-purple-600"
          >
            {showUploadForm ? 'Hide Upload Form' : 'Upload Document'}
          </Button>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gray-50 rounded-lg"
          >
            <Form form={form} onFinish={handleUpload} layout="vertical">
              <Form.Item
                name="name"
                label="Document Name"
                rules={[{ required: true, message: 'Please enter document name' }]}
              >
                <Input placeholder="Enter document name" />
              </Form.Item>

              <Form.Item
                name="category"
                label="Document Category"
                rules={[{ required: true, message: 'Please select a category' }]}
              >
                <Select placeholder="Select category" showSearch>
                  {documentCategories.map((group) => (
                    <Select.OptGroup key={group.group} label={group.group}>
                      {group.items.map((item) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select.OptGroup>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="file"
                label="Upload File"
                rules={[{ required: true, message: 'Please upload a file' }]}
              >
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item name="notes" label="Notes (Optional)">
                <TextArea rows={3} placeholder="Add any additional notes" />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Upload Document
                  </Button>
                  <Button onClick={() => setShowUploadForm(false)}>
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </motion.div>
        )}

        {/* Documents List */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Uploaded Documents ({documents.length})</h3>
          <List
            dataSource={documents}
            renderItem={(doc) => (
              <List.Item
                className="hover:bg-gray-50 transition-colors rounded-lg px-4"
                actions={[
                  <Button type="text" icon={<EyeOutlined />} title="View" />,
                  <Button type="text" icon={<DownloadOutlined />} title="Download" />,
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(doc.id)}
                    title="Delete"
                  />
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileOutlined className="text-blue-500 text-xl" />
                    </div>
                  }
                  title={
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{doc.name}</span>
                      <Tag color="blue">{doc.type}</Tag>
                    </div>
                  }
                  description={
                    <div className="text-sm text-gray-500">
                      <div>Category: {doc.category}</div>
                      <div>Uploaded: {doc.uploadDate} • Size: {doc.size}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </motion.div>
    </Modal>
  );
};

export default DocumentModal;
