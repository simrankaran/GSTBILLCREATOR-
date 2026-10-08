import { todayISO, uid } from "./utils";
import type { BillItem, Business, Document, Party } from "./types";

export const emptyParty = (): Party => ({
  name: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  gstin: "",
  pan: "",
  phone: "",
  email: "",
});

export const defaultBusiness = (): Business => ({
  ...emptyParty(),
  name: "Aarav Design Studio",
  tradeName: "BillMint Demo",
  address: "12, Lotus Lane, Andheri West",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400053",
  gstin: "27AABCU9603R1ZX",
  pan: "AABCU9603R",
  phone: "+91 98765 43210",
  email: "hello@aarav.studio",
  upi: "aaravstudio@okaxis",
  bankName: "HDFC Bank, Andheri",
  accountNo: "50100123456789",
  ifsc: "HDFC0001234",
  gstRegistered: true,
  signatureName: "Aarav Mehta",
  terms:
    "Payment due within 7 days. Late payments may attract 1.5% monthly interest. Goods once sold are not returnable unless defective.",
});

export const sampleClient = (): Party => ({
  name: "Mehta Traders Pvt Ltd",
  address: "44, Market Yard, Shivajinagar",
  city: "Pune",
  state: "Maharashtra",
  pincode: "411005",
  gstin: "27AAPFM3829C1Z5",
  pan: "AAPFM3829C",
  phone: "+91 98220 11022",
  email: "accounts@mehtatraders.in",
});

export const sampleItems = (): BillItem[] => [
  {
    id: "item-brand",
    description: "Brand identity — logo, colour system, stationery",
    hsn: "9983",
    qty: 1,
    unit: "Job",
    rate: 18000,
    discount: 0,
    gstRate: 18,
  },
  {
    id: "item-content",
    description: "Instagram content pack — 12 posts + captions",
    hsn: "9983",
    qty: 1,
    unit: "Pack",
    rate: 6500,
    discount: 500,
    gstRate: 18,
  },
  {
    id: "item-invoice-hours",
    description: "Print-ready GST invoice template customisation",
    hsn: "9983",
    qty: 2,
    unit: "Hrs",
    rate: 1200,
    discount: 0,
    gstRate: 18,
  },
];

export function blankItem(): BillItem {
  return {
    id: uid(),
    description: "",
    hsn: "",
    qty: 1,
    unit: "Nos",
    rate: 0,
    discount: 0,
    gstRate: 18,
  };
}

export function nextNumber(kind: Document["kind"], existing: Document[]) {
  const prefix = kind === "invoice" ? "INV" : kind === "quotation" ? "QTN" : "RCT";
  const year = new Date().getFullYear();
  const same = existing.filter((d) => d.kind === kind && d.number.startsWith(`${prefix}-${year}-`));
  const max = same.reduce((acc, d) => {
    const n = Number(d.number.split("-").pop());
    return Number.isFinite(n) ? Math.max(acc, n) : acc;
  }, 0);
  return `${prefix}-${year}-${String(max + 1).padStart(4, "0")}`;
}

export function sampleDocument(business: Business, buyer: Party, existing: Document[]): Document {
  return {
    id: "demo-invoice",
    kind: "invoice",
    number: nextNumber("invoice", existing),
    date: "2026-10-07",
    dueDate: "2026-10-14",
    placeOfSupply: buyer.state || business.state,
    reverseCharge: false,
    notes: "Thank you for your business. Please pay via UPI or bank transfer.",
    seller: { ...business },
    buyer: { ...buyer },
    items: sampleItems(),
    updatedAt: 1,
  };
}

export function newDocument(kind: Document["kind"], business: Business, existing: Document[]): Document {
  const due = new Date();
  due.setDate(due.getDate() + 7);
  const y = due.getFullYear();
  const m = String(due.getMonth() + 1).padStart(2, "0");
  const d = String(due.getDate()).padStart(2, "0");
  return {
    id: uid(),
    kind,
    number: nextNumber(kind, existing),
    date: todayISO(),
    dueDate: `${y}-${m}-${d}`,
    placeOfSupply: business.state,
    reverseCharge: false,
    notes:
      kind === "receipt"
        ? "Received with thanks."
        : kind === "quotation"
          ? "This quotation is valid for 15 days."
          : "Thank you for your business. Please pay via UPI or bank transfer.",
    seller: { ...business },
    buyer: emptyParty(),
    items: [blankItem()],
    updatedAt: Date.now(),
  };
}
