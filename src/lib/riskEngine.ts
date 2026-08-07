import { Order, InterventionRules, RiskAnalysisResult, RiskFactor } from "@/types/order";

export function evaluateOrderRisk(order: Order, rules: InterventionRules): RiskAnalysisResult {
  let score = 5; // Base minimum risk
  const factors: RiskFactor[] = [];

  // 1. Payment Method Check
  if (order.paymentMethod === 'COD') {
    score += 30;
    factors.push({
      factor: "Cash on Delivery",
      impact: 30,
      description: "Highest historical non-delivery rate associated with unpaid COD.",
      isNegative: true,
    });
  } else {
    factors.push({
      factor: "Prepaid Order",
      impact: -15,
      description: "Prepaid status significantly reduces RTO intent.",
      isNegative: false,
    });
    score -= 15;
  }

  // 2. Address Quality Check
  if (!order.address.hasHouseNumber) {
    score += 25;
    factors.push({
      factor: "Incomplete Address",
      impact: 25,
      description: "Missing house/flat number or landmark leads to failed courier delivery.",
      isNegative: true,
    });
  }

  // 3. Cart Size Variant Anomaly Check (e.g. 3 of same shirt in different sizes)
  const sizeMap: Record<string, number> = {};
  let sizeAnomaly = false;
  order.items.forEach((item) => {
    if (sizeMap[item.name]) {
      sizeAnomaly = true;
    } else {
      sizeMap[item.name] = 1;
    }
  });

  if (sizeAnomaly || order.items.length >= 3) {
    score += 20;
    factors.push({
      factor: "Size Variant Anomaly",
      impact: 20,
      description: "Multiple size variants ordered for same item (Wardrobing risk).",
      isNegative: true,
    });
  }

  // 4. Past RTO History
  if (order.customer.pastRtoCount > 0) {
    const impact = Math.min(order.customer.pastRtoCount * 15, 30);
    score += impact;
    factors.push({
      factor: "Historical RTO Record",
      impact,
      description: `${order.customer.pastRtoCount} previous non-delivered orders on record.`,
      isNegative: true,
    });
  }

  // 5. IP & Geo Location Check
  if (!order.customer.isIpMatch) {
    score += 15;
    factors.push({
      factor: "Location Mismatch",
      impact: 15,
      description: `IP location (${order.customer.ipCity}) does not match shipping address (${order.customer.shippingCity}).`,
      isNegative: true,
    });
  }

  // Clamp score between 0 and 99
  const finalScore = Math.max(5, Math.min(99, score));

  // Determine Risk Level
  let level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
  if (finalScore >= 80) level = 'CRITICAL';
  else if (finalScore >= 60) level = 'HIGH';
  else if (finalScore >= 35) level = 'MEDIUM';

  // Recommended Action based on rules
  let recommendedAction = "Proceed with Standard Shipping";
  if (finalScore >= rules.threshold) {
    if (rules.blockHighRisk && finalScore >= 85) {
      recommendedAction = "AUTO-BLOCK: Reject COD Order";
    } else if (rules.requireOTP && order.paymentMethod === 'COD') {
      recommendedAction = `Require WhatsApp OTP & Offer ${rules.discount}% Prepaid Discount`;
    } else {
      recommendedAction = `Offer ${rules.discount}% Discount to Switch to Prepaid`;
    }
  }

  return {
    score: finalScore,
    level,
    factors,
    recommendedAction,
  };
}
