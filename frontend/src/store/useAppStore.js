import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  // User state
  user: {
    id: 1,
    name: 'System Administrator',
    email: 'admin@synapsedental.com',
    role: 'admin'
  },

  // Branch filter state
  activeBranchId: 'all',
  setActiveBranchId: (branchId) => {
    console.log(`Branch filter changed to: ${branchId}`);
    set({ activeBranchId: branchId });
  },

  // System alert state
  isAlertActive: true,
  alertMessage: 'System maintenance scheduled for tonight at 11 PM. Expected downtime: 30 minutes.',
  setAlertActive: (active) => set({ isAlertActive: active }),
  
  // Toast notifications
  toasts: [],
  addToast: (toast) => {
    const id = Date.now();
    const newToast = { id, ...toast };
    set((state) => ({ toasts: [...state.toasts, newToast] }));
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      set((state) => ({ 
        toasts: state.toasts.filter(t => t.id !== id) 
      }));
    }, 5000);
  },
  removeToast: (id) => set((state) => ({ 
    toasts: state.toasts.filter(t => t.id !== id) 
  })),

  // Modal state
  modals: {
    createInvoice: false,
    processPayment: false,
    systemAlert: false,
    newCall: false,
    scheduleFollowup: false,
    addInventoryItem: false
  },
  openModal: (modalName) => set((state) => ({
    modals: { ...state.modals, [modalName]: true }
  })),
  closeModal: (modalName) => set((state) => ({
    modals: { ...state.modals, [modalName]: false }
  })),

  // Loading states
  loading: {
    dashboard: false,
    billing: false,
    customerService: false,
    inventory: false,
    reports: false
  },
  setLoading: (key, value) => set((state) => ({
    loading: { ...state.loading, [key]: value }
  }))
}));