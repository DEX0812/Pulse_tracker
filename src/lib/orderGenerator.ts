import { Order, CartItem } from "@/types/order";

const NAMES = [
  "Aarav Mehta", "Ananya Rao", "Rohan Verma", "Kavya Iyer", 
  "Deepak Gupta", "Sneha Banerjee", "Karan Joshi", "Meera Nair",
  "Tushar Chawla", "Pooja Deshmukh"
];

const CITIES = [
  { city: "Delhi", state: "DL" },
  { city: "Mumbai", state: "MH" },
  { city: "Bangalore", state: "KA" },
  { city: "Kolkata", state: "WB" },
  { city: "Chennai", state: "TN" },
  { city: "Hyderabad", state: "TS" },
  { city: "Pune", state: "MH" },
  { city: "Jaipur", state: "RJ" },
  { city: "Lucknow", state: "UP" },
  { city: "Surat", state: "GJ" }
];

const ITEMS: CartItem[] = [
  { name: "Urban Cargo Trousers", quantity: 1, size: "32", price: 2200 },
  { name: "Oversized Graphic Hoodie", quantity: 1, size: "L", price: 3400 },
  { name: "Linen Casual Shirt", quantity: 1, size: "M", price: 1800 },
  { name: "High-Top Sneakers", quantity: 1, size: "UK 9", price: 4900 },
  { name: "Minimalist Leather Watch", quantity: 1, size: "OneSize", price: 2900 }
];

let orderCounter = 9000;

export function generateRandomOrder(): Order {
  orderCounter++;
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const shipLoc = CITIES[Math.floor(Math.random() * CITIES.length)];
  const isIpMatch = Math.random() > 0.4;
  const ipLoc = isIpMatch ? shipLoc : CITIES[Math.floor(Math.random() * CITIES.length)];
  const isCOD = Math.random() > 0.35;
  const hasHouseNumber = Math.random() > 0.3;
  const pastRtoCount = Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0;
  
  // Pick 1 to 3 items
  const itemCount = Math.floor(Math.random() * 3) + 1;
  const selectedItems: CartItem[] = [];
  let cartValue = 0;
  for (let i = 0; i < itemCount; i++) {
    const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    selectedItems.push(item);
    cartValue += item.price;
  }

  const phoneScores = [3, 4, 5, 8, 9, 10];
  const phoneScore = phoneScores[Math.floor(Math.random() * phoneScores.length)];
  const phoneStatus = phoneScore >= 7 
    ? 'Verified (Postpaid)' 
    : phoneScore >= 5 
    ? 'Unverified (Prepaid)' 
    : 'Flagged VOIP';

  return {
    id: `ORD-${orderCounter}`,
    customer: {
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      shippingCity: shipLoc.city,
      shippingState: shipLoc.state,
      ipCity: ipLoc.city,
      ipState: ipLoc.state,
      isIpMatch,
      phone: `+91 ${Math.floor(90000 + Math.random() * 10000)} ${Math.floor(10000 + Math.random() * 90000)}`,
      phoneStatus,
      phoneScore,
      accountAge: Math.random() > 0.5 ? `${Math.floor(Math.random() * 30) + 1} Days` : `${Math.floor(Math.random() * 12) + 1} Mins`,
      pastRtoCount,
      totalOrders: pastRtoCount + Math.floor(Math.random() * 10),
    },
    items: selectedItems,
    cartValue,
    paymentMethod: isCOD ? 'COD' : 'Prepaid',
    address: {
      line1: hasHouseNumber 
        ? `Flat ${Math.floor(Math.random() * 500) + 1}, Block ${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`
        : `Near Railway Station, Main Road`,
      city: shipLoc.city,
      state: shipLoc.state,
      pincode: `${Math.floor(110000 + Math.random() * 800000)}`,
      hasHouseNumber,
    },
    timestamp: 'Just now',
  };
}
