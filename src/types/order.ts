export interface CartItem {
  name: string;
  quantity: number;
  size: string;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  shippingCity: string;
  shippingState: string;
  ipCity: string;
  ipState: string;
  isIpMatch: boolean;
  phone: string;
  phoneStatus: 'Verified (Postpaid)' | 'Unverified (Prepaid)' | 'Flagged VOIP';
  phoneScore: number;
  accountAge: string;
  pastRtoCount: number;
  totalOrders: number;
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  cartValue: number;
  paymentMethod: 'COD' | 'Prepaid';
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
    hasHouseNumber: boolean;
  };
  timestamp: string;
}

export interface InterventionRules {
  threshold: number; // 0-100%
  discount: number; // 0-20%
  requireOTP: boolean;
  blockHighRisk: boolean;
}

export interface RiskFactor {
  factor: string;
  impact: number;
  description: string;
  isNegative: boolean;
}

export interface RiskAnalysisResult {
  score: number;
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  factors: RiskFactor[];
  recommendedAction: string;
}
