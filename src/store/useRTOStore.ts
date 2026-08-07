import { create } from "zustand";
import { Order, InterventionRules, RiskAnalysisResult } from "@/types/order";
import { evaluateOrderRisk } from "@/lib/riskEngine";
import { generateRandomOrder } from "@/lib/orderGenerator";

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: "warning" | "info" | "success";
}

const DEFAULT_PANEL_POSITIONS = {
  stream: { x: 40, y: 60 },
  analyzer: { x: 390, y: 60 },
  customer: { x: 390, y: 420 },
  engine: { x: 790, y: 60 },
};

const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-8923",
    customer: {
      id: "CUST-9901",
      name: "Rahul Sharma",
      shippingCity: "Delhi",
      shippingState: "DL",
      ipCity: "Mumbai",
      ipState: "MH",
      isIpMatch: false,
      phone: "+91 98765 43210",
      phoneStatus: "Unverified (Prepaid)",
      phoneScore: 4,
      accountAge: "12 Minutes",
      pastRtoCount: 3,
      totalOrders: 3,
    },
    items: [
      { name: "Oversized Cotton Tee", quantity: 1, size: "M", price: 1500 },
      { name: "Oversized Cotton Tee", quantity: 1, size: "L", price: 1500 },
      { name: "Oversized Cotton Tee", quantity: 1, size: "XL", price: 1500 },
    ],
    cartValue: 4500,
    paymentMethod: "COD",
    address: {
      line1: "Near Big Banyan Tree, Main Road",
      city: "Delhi",
      state: "DL",
      pincode: "110001",
      hasHouseNumber: false,
    },
    timestamp: "2 mins ago",
  },
  {
    id: "ORD-8924",
    customer: {
      id: "CUST-4412",
      name: "Priya Patel",
      shippingCity: "Ahmedabad",
      shippingState: "GJ",
      ipCity: "Ahmedabad",
      ipState: "GJ",
      isIpMatch: true,
      phone: "+91 91234 56789",
      phoneStatus: "Verified (Postpaid)",
      phoneScore: 9,
      accountAge: "2 Years",
      pastRtoCount: 0,
      totalOrders: 14,
    },
    items: [
      { name: "Slim Fit Denim Jeans", quantity: 1, size: "28", price: 2400 },
    ],
    cartValue: 2400,
    paymentMethod: "Prepaid",
    address: {
      line1: "Flat 402, Green Acres Apt, Satellite",
      city: "Ahmedabad",
      state: "GJ",
      pincode: "380015",
      hasHouseNumber: true,
    },
    timestamp: "5 mins ago",
  },
  {
    id: "ORD-8925",
    customer: {
      id: "CUST-7711",
      name: "Vikram Singh",
      shippingCity: "Jaipur",
      shippingState: "RJ",
      ipCity: "Kolkata",
      ipState: "WB",
      isIpMatch: false,
      phone: "+91 99887 76655",
      phoneStatus: "Unverified (Prepaid)",
      phoneScore: 5,
      accountAge: "1 Month",
      pastRtoCount: 1,
      totalOrders: 2,
    },
    items: [
      { name: "Leather Bomber Jacket", quantity: 1, size: "L", price: 8900 },
    ],
    cartValue: 8900,
    paymentMethod: "COD",
    address: {
      line1: "House No 12, C-Scheme",
      city: "Jaipur",
      state: "RJ",
      pincode: "302001",
      hasHouseNumber: true,
    },
    timestamp: "12 mins ago",
  },
];

interface RTOStore {
  orders: Order[];
  selectedOrderId: string | null;
  rules: InterventionRules;
  isSimulating: boolean;
  toasts: Toast[];
  resetKey: number; // Increment to signal panels to re-snap

  // Actions
  selectOrder: (id: string | null) => void;
  updateRules: (newRules: Partial<InterventionRules>) => void;
  toggleSimulation: () => void;
  pushSimulatedOrder: () => void;
  addToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
  resetDashboard: () => void;
  getSelectedOrder: () => Order | null;
  getRiskAnalysis: () => RiskAnalysisResult | null;
}

export const useRTOStore = create<RTOStore>((set, get) => ({
  orders: INITIAL_ORDERS,
  selectedOrderId: "ORD-8923",
  rules: {
    threshold: 70,
    discount: 5,
    requireOTP: true,
    blockHighRisk: false,
  },
  isSimulating: false,
  toasts: [],
  resetKey: 0,

  selectOrder: (id) => set({ selectedOrderId: id }),

  updateRules: (newRules) =>
    set((state) => ({
      rules: { ...state.rules, ...newRules },
    })),

  toggleSimulation: () =>
    set((state) => {
      const nextSimState = !state.isSimulating;
      return {
        isSimulating: nextSimState,
        toasts: [
          ...state.toasts,
          {
            id: `toast-${Date.now()}`,
            title: nextSimState ? "Simulation Mode Active" : "Simulation Mode Paused",
            message: nextSimState 
              ? "Live mock orders streaming every 3.5s..." 
              : "Order stream paused.",
            type: nextSimState ? "info" : "warning",
          },
        ],
      };
    }),

  pushSimulatedOrder: () => {
    const newOrder = generateRandomOrder();
    const state = get();
    const analysis = evaluateOrderRisk(newOrder, state.rules);

    let newToasts = [...state.toasts];

    // Trigger Toast if order crosses threshold
    if (analysis.score >= state.rules.threshold) {
      newToasts.push({
        id: `toast-${Date.now()}`,
        title: `Intervention Triggered: ${newOrder.id}`,
        message: `${state.rules.discount}% Prepaid Discount offered to ${newOrder.customer.name} (Risk: ${analysis.score}%)`,
        type: "warning",
      });
    }

    set({
      orders: [newOrder, ...state.orders.slice(0, 14)], // Keep latest 15
      selectedOrderId: newOrder.id, // Auto select newest order
      toasts: newToasts,
    });
  },

  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: `toast-${Date.now()}` }],
    })),

  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  resetDashboard: () =>
    set((state) => ({
      resetKey: state.resetKey + 1,
      selectedOrderId: "ORD-8923",
      toasts: [
        ...state.toasts,
        {
          id: `toast-${Date.now()}`,
          title: "Dashboard Layout Reset",
          message: "All floating panels snapped back to grid.",
          type: "success",
        },
      ],
    })),

  getSelectedOrder: () => {
    const state = get();
    if (!state.selectedOrderId) return null;
    return state.orders.find((o) => o.id === state.selectedOrderId) || null;
  },

  getRiskAnalysis: () => {
    const state = get();
    const order = state.getSelectedOrder();
    if (!order) return null;
    return evaluateOrderRisk(order, state.rules);
  },
}));
