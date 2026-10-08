export type DocKind = "invoice" | "quotation" | "receipt";

export type Party = {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstin: string;
  pan: string;
  phone: string;
  email: string;
};

export type Business = Party & {
  tradeName: string;
  upi: string;
  bankName: string;
  accountNo: string;
  ifsc: string;
  gstRegistered: boolean;
  signatureName: string;
  terms: string;
};

export type BillItem = {
  id: string;
  description: string;
  hsn: string;
  qty: number;
  unit: string;
  rate: number;
  discount: number;
  gstRate: number;
};

export type Document = {
  id: string;
  kind: DocKind;
  number: string;
  date: string;
  dueDate: string;
  placeOfSupply: string;
  reverseCharge: boolean;
  notes: string;
  seller: Business;
  buyer: Party;
  items: BillItem[];
  updatedAt: number;
};
