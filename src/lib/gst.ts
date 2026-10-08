import { round2 } from "./money";
import type { BillItem, Party } from "./types";

export const GST_RATES = [0, 5, 12, 18, 28] as const;

export const IN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
] as const;

export type TaxSplit = {
  taxable: number;
  cgst: number;
  sgst: number;
  igst: number;
  gst: number;
  total: number;
};

export function itemTaxable(item: BillItem) {
  const gross = (Number(item.qty) || 0) * (Number(item.rate) || 0);
  return round2(Math.max(0, gross - (Number(item.discount) || 0)));
}

export function isIntraState(seller: Party, buyer: Party) {
  return Boolean(seller.state && buyer.state && seller.state === buyer.state);
}

export function computeBill(items: BillItem[], seller: Party, buyer: Party, gstRegistered: boolean): TaxSplit & { rows: (BillItem & TaxSplit)[] } {
  const intra = isIntraState(seller, buyer);
  const rows = items.map((item) => {
    const taxable = itemTaxable(item);
    if (!gstRegistered) {
      return {
        ...item,
        taxable,
        cgst: 0,
        sgst: 0,
        igst: 0,
        gst: 0,
        total: taxable,
      };
    }
    const rate = Number(item.gstRate) || 0;
    const gst = round2((taxable * rate) / 100);
    const cgst = intra ? round2(gst / 2) : 0;
    const sgst = intra ? round2(gst - cgst) : 0;
    const igst = intra ? 0 : gst;
    return {
      ...item,
      taxable,
      cgst,
      sgst,
      igst,
      gst,
      total: round2(taxable + gst),
    };
  });

  const sum = rows.reduce(
    (acc, row) => ({
      taxable: round2(acc.taxable + row.taxable),
      cgst: round2(acc.cgst + row.cgst),
      sgst: round2(acc.sgst + row.sgst),
      igst: round2(acc.igst + row.igst),
      gst: round2(acc.gst + row.gst),
      total: round2(acc.total + row.total),
    }),
    { taxable: 0, cgst: 0, sgst: 0, igst: 0, gst: 0, total: 0 },
  );

  return { ...sum, rows };
}
