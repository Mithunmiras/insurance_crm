// Mock API Layer - Single source of truth for all application data

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_DATA = {
  dashboard: {
    aiInsights: {
      confidence: 86,
      insights: ['Peak hours: 2-4 PM', 'Top treatment: Cleaning', 'Revenue up 15%'],
      recommendations: ['Schedule more cleanings', 'Optimize 2-4 PM slots', 'Follow up on pending'],
      lastUpdated: '2 mins ago'
    },
    branchSummaries: [
      {
        id: 1,
        name: 'Main Branch',
        revenue: '₹1,50,000',
        change: '+12% from yesterday',
        patients: 45,
        staff: 8,
        rating: 4.8,
        established: 2018
      },
      {
        id: 2,
        name: 'Branch 2 West',
        revenue: '₹70,000',
        change: '+8% from yesterday',
        patients: 28,
        staff: 5,
        rating: 4.6,
        established: 2020
      }
    ],
    kpis: {
      totalPatients: { value: '1,247', change: '+18% this month' },
      activeStaff: { value: '13', subtext: 'Across 2 branches' },
      pendingPayments: { value: '₹45,000', subtext: '23 overdue' },
      todayAppointments: { value: '12', subtext: '12 upcoming' }
    },
    charts: {
      revenueByBranch: [
        { branch: 'Main Branch', revenue: 150000 },
        { branch: 'West Branch', revenue: 70000 }
      ],
      paymentStatus: {
        paid: 78,
        pending: 15,
        overdue: 7
      }
    }
  },
  billing: {
    kpis: {
      totalRevenue: { value: '₹2,45,000', change: '+15% this month' },
      paidAmount: { value: '₹2,00,000', change: '+12% this month' },
      pendingAmount: { value: '₹45,000', subtext: '23 invoices' },
      avgInvoiceValue: { value: '₹3,200', change: '+8% this month' }
    },
    paymentMethods: [
      { name: 'Cash', value: 45, color: '#667eea' },
      { name: 'Card', value: 35, color: '#764ba2' },
      { name: 'UPI', value: 15, color: '#f093fb' },
      { name: 'Insurance', value: 5, color: '#f5576c' }
    ],
    revenueData: [
      { month: 'Jan', revenue: 180000 },
      { month: 'Feb', revenue: 195000 },
      { month: 'Mar', revenue: 210000 },
      { month: 'Apr', revenue: 225000 },
      { month: 'May', revenue: 245000 }
    ],
    recentInvoices: [
      { id: 'INV-001', patient: 'Rajesh Kumar', date: '2024-12-15', services: 'Root Canal', amount: '₹8,500', status: 'Paid' },
      { id: 'INV-002', patient: 'Sarah Johnson', date: '2024-12-14', services: 'Cleaning', amount: '₹2,500', status: 'Pending' },
      { id: 'INV-003', patient: 'Michael Patel', date: '2024-12-13', services: 'Orthodontic', amount: '₹15,000', status: 'Paid' }
    ]
  },
  customerService: {
    kpis: {
      totalCalls: { value: '156', change: '+8% this week' },
      openIssues: { value: '12', subtext: '3 high priority' },
      resolved: { value: '144', subtext: '92% success rate' },
      followUps: { value: '8', subtext: 'Due this week' }
    },
    callVolume: [
      { day: 'Mon', calls: 25 },
      { day: 'Tue', calls: 32 },
      { day: 'Wed', calls: 28 },
      { day: 'Thu', calls: 35 },
      { day: 'Fri', calls: 30 },
      { day: 'Sat', calls: 15 },
      { day: 'Sun', calls: 8 }
    ],
    resolutionTime: [
      { category: 'Billing', avgTime: 15 },
      { category: 'Appointment', avgTime: 8 },
      { category: 'Treatment', avgTime: 25 },
      { category: 'Insurance', avgTime: 35 }
    ],
    recentCalls: [
      { id: 'CALL-001', patient: 'Rajesh Kumar', type: 'Billing Query', priority: 'Medium', status: 'Resolved', assignedTo: 'Sarah J.', date: '2024-12-15' },
      { id: 'CALL-002', patient: 'Priya Sharma', type: 'Appointment', priority: 'High', status: 'Open', assignedTo: 'Mike P.', date: '2024-12-15' }
    ]
  },
  inventory: {
    items: [
      { id: 'ITM-001', name: 'Dental Composite', category: 'Restorative', quantity: 45, minStock: 20, supplier: 'DentCorp', expiry: '2025-06-15', status: 'IN STOCK' },
      { id: 'ITM-002', name: 'Anesthetic Cartridges', category: 'Anesthesia', quantity: 8, minStock: 15, supplier: 'MedSupply', expiry: '2024-12-30', status: 'LOW STOCK' },
      { id: 'ITM-003', name: 'Surgical Gloves', category: 'PPE', quantity: 200, minStock: 50, supplier: 'SafetyFirst', expiry: '2026-03-20', status: 'IN STOCK' }
    ]
  },
  reports: {
    monthly: {
      kpis: {
        revenue: { value: '₹2,45,000', change: '+15%' },
        newPatients: { value: '89', change: '+22%' },
        appointments: { value: '456', change: '+8%' },
        treatments: { value: '234', change: '+12%' }
      },
      revenueAnalysis: [
        { month: 'Jan', revenue: 180000 },
        { month: 'Feb', revenue: 195000 },
        { month: 'Mar', revenue: 210000 },
        { month: 'Apr', revenue: 225000 },
        { month: 'May', revenue: 245000 }
      ],
      patientGrowth: [
        { month: 'Jan', patients: 65 },
        { month: 'Feb', patients: 72 },
        { month: 'Mar', patients: 78 },
        { month: 'Apr', patients: 85 },
        { month: 'May', patients: 89 }
      ]
    },
    weekly: {
      kpis: {
        revenue: { value: '₹58,000', change: '+12%' },
        newPatients: { value: '18', change: '+25%' },
        appointments: { value: '95', change: '+5%' },
        treatments: { value: '52', change: '+15%' }
      },
      revenueAnalysis: [
        { week: 'Week 1', revenue: 52000 },
        { week: 'Week 2', revenue: 48000 },
        { week: 'Week 3', revenue: 55000 },
        { week: 'Week 4', revenue: 58000 }
      ],
      patientGrowth: [
        { week: 'Week 1', patients: 15 },
        { week: 'Week 2', patients: 12 },
        { week: 'Week 3', patients: 16 },
        { week: 'Week 4', patients: 18 }
      ]
    }
  }
};

// API Functions
export const getDashboardData = async (branchId) => {
  await sleep(500);
  console.log(`Fetching dashboard data for branch: ${branchId}`);
  
  if (branchId === 'all') {
    return MOCK_DATA.dashboard;
  }
  
  // Return branch-specific data
  if (branchId === 'main_branch') {
    return {
      ...MOCK_DATA.dashboard,
      aiInsights: {
        confidence: 92,
        insights: ['Main branch peak: 3-5 PM', 'Top service: Root Canal', 'Efficiency up 20%'],
        recommendations: ['Add evening slots', 'Promote preventive care', 'Staff training needed'],
        lastUpdated: '1 min ago'
      },
      branchSummaries: [MOCK_DATA.dashboard.branchSummaries[0]], // Only main branch
      kpis: {
        totalPatients: { value: '856', change: '+22% this month' },
        activeStaff: { value: '8', subtext: 'Main branch only' },
        pendingPayments: { value: '₹28,000', subtext: '15 overdue' },
        todayAppointments: { value: '8', subtext: '8 upcoming' }
      },
      charts: {
        revenueByBranch: [
          { branch: 'Main Branch', revenue: 150000 }
        ],
        paymentStatus: {
          paid: 85,
          pending: 12,
          overdue: 3
        }
      }
    };
  }
  
  if (branchId === 'west_branch') {
    return {
      ...MOCK_DATA.dashboard,
      aiInsights: {
        confidence: 78,
        insights: ['West branch peak: 1-3 PM', 'Top service: Cleaning', 'New patients +15%'],
        recommendations: ['Expand lunch hours', 'Marketing campaign', 'Equipment upgrade'],
        lastUpdated: '3 mins ago'
      },
      branchSummaries: [MOCK_DATA.dashboard.branchSummaries[1]], // Only west branch
      kpis: {
        totalPatients: { value: '391', change: '+12% this month' },
        activeStaff: { value: '5', subtext: 'West branch only' },
        pendingPayments: { value: '₹17,000', subtext: '8 overdue' },
        todayAppointments: { value: '4', subtext: '4 upcoming' }
      },
      charts: {
        revenueByBranch: [
          { branch: 'West Branch', revenue: 70000 }
        ],
        paymentStatus: {
          paid: 72,
          pending: 18,
          overdue: 10
        }
      }
    };
  }
  
  return MOCK_DATA.dashboard;
};

export const getBillingData = async (branchId) => {
  await sleep(400);
  console.log(`Fetching billing data for branch: ${branchId}`);
  return MOCK_DATA.billing;
};

export const getCustomerServiceData = async () => {
  await sleep(400);
  console.log('Fetching customer service data');
  return MOCK_DATA.customerService;
};

export const getInventoryData = async () => {
  await sleep(300);
  console.log('Fetching inventory data');
  return MOCK_DATA.inventory;
};

export const getReportsData = async (timeframe) => {
  await sleep(600);
  console.log(`Fetching reports for timeframe: ${timeframe}`);
  return MOCK_DATA.reports[timeframe];
};

export const generateInventoryReport = async () => {
  await sleep(2000);
  console.log('Generating inventory report');
  return { success: true, message: 'Inventory report generated successfully!' };
};