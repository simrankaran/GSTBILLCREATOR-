import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Printer, c as Copy, i as Settings2, o as Plus, r as Trash2, s as FilePlus2, t as X } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-rJF36rlJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ONES = [
	"",
	"One",
	"Two",
	"Three",
	"Four",
	"Five",
	"Six",
	"Seven",
	"Eight",
	"Nine",
	"Ten",
	"Eleven",
	"Twelve",
	"Thirteen",
	"Fourteen",
	"Fifteen",
	"Sixteen",
	"Seventeen",
	"Eighteen",
	"Nineteen"
];
var TENS = [
	"",
	"",
	"Twenty",
	"Thirty",
	"Forty",
	"Fifty",
	"Sixty",
	"Seventy",
	"Eighty",
	"Ninety"
];
function twoDigits(n) {
	if (n < 20) return ONES[n];
	const t = Math.floor(n / 10);
	const o = n % 10;
	return `${TENS[t]}${o ? ` ${ONES[o]}` : ""}`;
}
function threeDigits(n) {
	const h = Math.floor(n / 100);
	const rest = n % 100;
	return [h ? `${ONES[h]} Hundred` : "", rest ? twoDigits(rest) : ""].filter(Boolean).join(" ");
}
function integerToWords(n) {
	if (n === 0) return "Zero";
	const crore = Math.floor(n / 1e7);
	n %= 1e7;
	const lakh = Math.floor(n / 1e5);
	n %= 1e5;
	const thousand = Math.floor(n / 1e3);
	const rest = n % 1e3;
	const parts = [];
	if (crore) parts.push(`${integerToWords(crore)} Crore`);
	if (lakh) parts.push(`${twoDigits(lakh)} Lakh`);
	if (thousand) parts.push(`${twoDigits(thousand)} Thousand`);
	if (rest) parts.push(threeDigits(rest));
	return parts.join(" ");
}
function round2(n) {
	return Math.round((n + Number.EPSILON) * 100) / 100;
}
function formatInr(n) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(round2(n || 0));
}
function formatInrPlain(n) {
	return new Intl.NumberFormat("en-IN", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(round2(n || 0));
}
function amountInWords(n) {
	const value = round2(Math.max(0, n || 0));
	const rupees = Math.floor(value);
	const paise = Math.round((value - rupees) * 100);
	let out = `${integerToWords(rupees)} Rupees`;
	if (paise) out += ` and ${twoDigits(paise)} Paise`;
	return `${out} Only`;
}
var GST_RATES = [
	0,
	5,
	12,
	18,
	28
];
var IN_STATES = [
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
	"Lakshadweep"
];
function itemTaxable(item) {
	const gross = (Number(item.qty) || 0) * (Number(item.rate) || 0);
	return round2(Math.max(0, gross - (Number(item.discount) || 0)));
}
function isIntraState(seller, buyer) {
	return Boolean(seller.state && buyer.state && seller.state === buyer.state);
}
function computeBill(items, seller, buyer, gstRegistered) {
	const intra = isIntraState(seller, buyer);
	const rows = items.map((item) => {
		const taxable = itemTaxable(item);
		if (!gstRegistered) return {
			...item,
			taxable,
			cgst: 0,
			sgst: 0,
			igst: 0,
			gst: 0,
			total: taxable
		};
		const gst = round2(taxable * (Number(item.gstRate) || 0) / 100);
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
			total: round2(taxable + gst)
		};
	});
	return {
		...rows.reduce((acc, row) => ({
			taxable: round2(acc.taxable + row.taxable),
			cgst: round2(acc.cgst + row.cgst),
			sgst: round2(acc.sgst + row.sgst),
			igst: round2(acc.igst + row.igst),
			gst: round2(acc.gst + row.gst),
			total: round2(acc.total + row.total)
		}), {
			taxable: 0,
			cgst: 0,
			sgst: 0,
			igst: 0,
			gst: 0,
			total: 0
		}),
		rows
	};
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return crypto.randomUUID();
}
function todayISO() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatDateIN(iso) {
	if (!iso) return "—";
	const [y, m, d] = iso.split("-").map(Number);
	if (!y || !m || !d) return iso;
	return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
var emptyParty = () => ({
	name: "",
	address: "",
	city: "",
	state: "",
	pincode: "",
	gstin: "",
	pan: "",
	phone: "",
	email: ""
});
var defaultBusiness = () => ({
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
	terms: "Payment due within 7 days. Late payments may attract 1.5% monthly interest. Goods once sold are not returnable unless defective."
});
var sampleClient = () => ({
	name: "Mehta Traders Pvt Ltd",
	address: "44, Market Yard, Shivajinagar",
	city: "Pune",
	state: "Maharashtra",
	pincode: "411005",
	gstin: "27AAPFM3829C1Z5",
	pan: "AAPFM3829C",
	phone: "+91 98220 11022",
	email: "accounts@mehtatraders.in"
});
var sampleItems = () => [
	{
		id: "item-brand",
		description: "Brand identity — logo, colour system, stationery",
		hsn: "9983",
		qty: 1,
		unit: "Job",
		rate: 18e3,
		discount: 0,
		gstRate: 18
	},
	{
		id: "item-content",
		description: "Instagram content pack — 12 posts + captions",
		hsn: "9983",
		qty: 1,
		unit: "Pack",
		rate: 6500,
		discount: 500,
		gstRate: 18
	},
	{
		id: "item-invoice-hours",
		description: "Print-ready GST invoice template customisation",
		hsn: "9983",
		qty: 2,
		unit: "Hrs",
		rate: 1200,
		discount: 0,
		gstRate: 18
	}
];
function blankItem() {
	return {
		id: uid(),
		description: "",
		hsn: "",
		qty: 1,
		unit: "Nos",
		rate: 0,
		discount: 0,
		gstRate: 18
	};
}
function nextNumber(kind, existing) {
	const prefix = kind === "invoice" ? "INV" : kind === "quotation" ? "QTN" : "RCT";
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const max = existing.filter((d) => d.kind === kind && d.number.startsWith(`${prefix}-${year}-`)).reduce((acc, d) => {
		const n = Number(d.number.split("-").pop());
		return Number.isFinite(n) ? Math.max(acc, n) : acc;
	}, 0);
	return `${prefix}-${year}-${String(max + 1).padStart(4, "0")}`;
}
function sampleDocument(business, buyer, existing) {
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
		updatedAt: 1
	};
}
function newDocument(kind, business, existing) {
	const due = /* @__PURE__ */ new Date();
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
		notes: kind === "receipt" ? "Received with thanks." : kind === "quotation" ? "This quotation is valid for 15 days." : "Thank you for your business. Please pay via UPI or bank transfer.",
		seller: { ...business },
		buyer: emptyParty(),
		items: [blankItem()],
		updatedAt: Date.now()
	};
}
function seed() {
	const business = defaultBusiness();
	const client = sampleClient();
	const doc = sampleDocument(business, client, []);
	return {
		business,
		clients: [client],
		docs: [doc],
		currentId: doc.id,
		dismissedTip: false
	};
}
function withCurrent(docs, currentId, fn) {
	return docs.map((d) => d.id === currentId ? {
		...fn(d),
		updatedAt: Date.now()
	} : d);
}
var useBillMint = create()(persist((set) => ({
	...seed(),
	setBusiness: (patch) => set((s) => {
		const business = {
			...s.business,
			...patch
		};
		return {
			business,
			docs: withCurrent(s.docs, s.currentId, (d) => ({
				...d,
				seller: { ...business }
			}))
		};
	}),
	setCurrent: (id) => set({ currentId: id }),
	updateCurrent: (patch) => set((s) => ({ docs: withCurrent(s.docs, s.currentId, (d) => ({
		...d,
		...patch
	})) })),
	updateBuyer: (patch) => set((s) => ({ docs: withCurrent(s.docs, s.currentId, (d) => ({
		...d,
		buyer: {
			...d.buyer,
			...patch
		}
	})) })),
	updateItem: (id, patch) => set((s) => ({ docs: withCurrent(s.docs, s.currentId, (d) => ({
		...d,
		items: d.items.map((it) => it.id === id ? {
			...it,
			...patch
		} : it)
	})) })),
	addItem: () => set((s) => ({ docs: withCurrent(s.docs, s.currentId, (d) => ({
		...d,
		items: [...d.items, {
			id: uid(),
			description: "",
			hsn: "",
			qty: 1,
			unit: "Nos",
			rate: 0,
			discount: 0,
			gstRate: 18
		}]
	})) })),
	removeItem: (id) => set((s) => ({ docs: withCurrent(s.docs, s.currentId, (d) => ({
		...d,
		items: d.items.length <= 1 ? d.items : d.items.filter((it) => it.id !== id)
	})) })),
	createDoc: (kind) => set((s) => {
		const doc = newDocument(kind, s.business, s.docs);
		return {
			docs: [doc, ...s.docs],
			currentId: doc.id
		};
	}),
	duplicateCurrent: () => set((s) => {
		const cur = s.docs.find((d) => d.id === s.currentId);
		if (!cur) return s;
		const copy = {
			...cur,
			id: uid(),
			number: newDocument(cur.kind, s.business, s.docs).number,
			items: cur.items.map((it) => ({
				...it,
				id: uid()
			})),
			updatedAt: Date.now()
		};
		return {
			docs: [copy, ...s.docs],
			currentId: copy.id
		};
	}),
	deleteDoc: (id) => set((s) => {
		const docs = s.docs.filter((d) => d.id !== id);
		if (docs.length === 0) {
			const doc = newDocument("invoice", s.business, []);
			return {
				docs: [doc],
				currentId: doc.id
			};
		}
		return {
			docs,
			currentId: s.currentId === id ? docs[0].id : s.currentId
		};
	}),
	saveClient: () => set((s) => {
		const cur = s.docs.find((d) => d.id === s.currentId);
		if (!cur?.buyer.name.trim()) return s;
		const rest = s.clients.filter((c) => c.name !== cur.buyer.name);
		return { clients: [{ ...cur.buyer }, ...rest].slice(0, 40) };
	}),
	loadClient: (name) => set((s) => {
		const client = s.clients.find((c) => c.name === name);
		if (!client) return s;
		return { docs: withCurrent(s.docs, s.currentId, (d) => ({
			...d,
			buyer: { ...client },
			placeOfSupply: client.state || d.placeOfSupply
		})) };
	}),
	dismissTip: () => set({ dismissedTip: true }),
	resetDemo: () => set(seed())
}), { name: "billmint-v1" }));
function useCurrentDoc() {
	return useBillMint((s) => s.docs.find((d) => d.id === s.currentId) ?? s.docs[0]);
}
function BusinessPanel({ onClose }) {
	const business = useBillMint((s) => s.business);
	const setBusiness = useBillMint((s) => s.setBusiness);
	const resetDemo = useBillMint((s) => s.resetDemo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-40 flex justify-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-ink/40",
			"aria-label": "Close",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "relative z-10 flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-border bg-surface p-5 shadow-[var(--shadow-paper)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Your business"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "h-10 px-2 text-sm text-muted",
						children: "Close"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Saved on this device. Printed on every invoice."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "col-span-2 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "Legal name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: business.name,
								onChange: (e) => setBusiness({ name: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "col-span-2 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "Trade name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: business.tradeName,
								onChange: (e) => setBusiness({ tradeName: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "col-span-2 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 2,
								className: "field resize-none",
								value: business.address,
								onChange: (e) => setBusiness({ address: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "City"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: business.city,
								onChange: (e) => setBusiness({ city: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "State"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "field",
								value: business.state,
								onChange: (e) => setBusiness({ state: e.target.value }),
								children: IN_STATES.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: st,
									children: st
								}, st))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "PIN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: business.pincode,
								onChange: (e) => setBusiness({ pincode: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "Phone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: business.phone,
								onChange: (e) => setBusiness({ phone: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "col-span-2 flex h-12 items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "size-4 accent-primary",
								checked: business.gstRegistered,
								onChange: (e) => setBusiness({ gstRegistered: e.target.checked })
							}), "GST registered — show tax on invoices"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "GSTIN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: business.gstin,
								onChange: (e) => setBusiness({ gstin: e.target.value.toUpperCase() })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "PAN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: business.pan,
								onChange: (e) => setBusiness({ pan: e.target.value.toUpperCase() })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "col-span-2 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: business.email,
								onChange: (e) => setBusiness({ email: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "col-span-2 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "UPI ID (you get paid here)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: business.upi,
								onChange: (e) => setBusiness({ upi: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "Bank"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: business.bankName,
								onChange: (e) => setBusiness({ bankName: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "A/c no"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: business.accountNo,
								onChange: (e) => setBusiness({ accountNo: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "IFSC"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: business.ifsc,
								onChange: (e) => setBusiness({ ifsc: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "Signatory"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: business.signatureName,
								onChange: (e) => setBusiness({ signatureName: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "col-span-2 block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-[11px] text-muted",
								children: "Terms"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								className: "field resize-none",
								value: business.terms,
								onChange: (e) => setBusiness({ terms: e.target.value })
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						resetDemo();
						onClose();
					},
					className: "mt-6 h-11 text-sm text-muted underline-offset-4 hover:underline",
					children: "Restore demo invoice"
				})
			]
		})]
	});
}
var KINDS = [
	{
		id: "invoice",
		label: "Invoice"
	},
	{
		id: "quotation",
		label: "Quotation"
	},
	{
		id: "receipt",
		label: "Receipt"
	}
];
function EditorForm() {
	const doc = useCurrentDoc();
	const clients = useBillMint((s) => s.clients);
	const updateCurrent = useBillMint((s) => s.updateCurrent);
	const updateBuyer = useBillMint((s) => s.updateBuyer);
	const updateItem = useBillMint((s) => s.updateItem);
	const addItem = useBillMint((s) => s.addItem);
	const removeItem = useBillMint((s) => s.removeItem);
	const saveClient = useBillMint((s) => s.saveClient);
	const loadClient = useBillMint((s) => s.loadClient);
	if (!doc) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold tracking-[0.16em] text-muted uppercase",
					children: "Document"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid grid-cols-3 gap-1 rounded-lg bg-bg p-1",
					children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => updateCurrent({ kind: k.id }),
						className: cn("h-10 rounded-md text-sm font-medium transition", doc.kind === k.id ? "bg-surface text-ink shadow-sm" : "text-muted"),
						children: k.label
					}, k.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Number",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: doc.number,
								onChange: (e) => updateCurrent({ number: e.target.value }),
								className: "field"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: doc.date,
								onChange: (e) => updateCurrent({ date: e.target.value }),
								className: "field"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Due date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: doc.dueDate,
								onChange: (e) => updateCurrent({ dueDate: e.target.value }),
								className: "field"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Place of supply",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: doc.placeOfSupply,
								onChange: (e) => updateCurrent({ placeOfSupply: e.target.value }),
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select state"
								}), IN_STATES.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: st,
									children: st
								}, st))]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 flex h-11 items-center gap-2 text-sm text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: doc.reverseCharge,
						onChange: (e) => updateCurrent({ reverseCharge: e.target.checked }),
						className: "size-4 accent-primary"
					}), "Reverse charge"]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold tracking-[0.16em] text-muted uppercase",
						children: "Client"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: saveClient,
						className: "text-xs font-medium text-primary",
						children: "Save client"
					})]
				}),
				clients.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "field mt-2",
					value: "",
					onChange: (e) => {
						if (e.target.value) loadClient(e.target.value);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Load saved client…"
					}), clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.name,
						children: c.name
					}, c.name))]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							className: "col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: doc.buyer.name,
								onChange: (e) => updateBuyer({ name: e.target.value }),
								className: "field"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Address",
							className: "col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 2,
								value: doc.buyer.address,
								onChange: (e) => updateBuyer({ address: e.target.value }),
								className: "field resize-none"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "City",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: doc.buyer.city,
								onChange: (e) => updateBuyer({ city: e.target.value }),
								className: "field"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "State",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: doc.buyer.state,
								onChange: (e) => {
									updateBuyer({ state: e.target.value });
									if (!doc.placeOfSupply) updateCurrent({ placeOfSupply: e.target.value });
								},
								className: "field",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select"
								}), IN_STATES.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: st,
									children: st
								}, st))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "PIN",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: doc.buyer.pincode,
								onChange: (e) => updateBuyer({ pincode: e.target.value }),
								className: "field"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "GSTIN",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: doc.buyer.gstin,
								onChange: (e) => updateBuyer({ gstin: e.target.value.toUpperCase() }),
								className: "field"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: doc.buyer.phone,
								onChange: (e) => updateBuyer({ phone: e.target.value }),
								className: "field"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: doc.buyer.email,
								onChange: (e) => updateBuyer({ email: e.target.value }),
								className: "field"
							})
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold tracking-[0.16em] text-muted uppercase",
					children: "Line items"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: addItem,
					className: "inline-flex h-10 items-center gap-1 rounded-md px-2 text-sm font-medium text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 space-y-3",
				children: doc.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: ["Item ", i + 1]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => removeItem(item.id),
								className: "grid size-10 place-items-center text-muted",
								"aria-label": "Remove item",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "What did you do / sell?",
							value: item.description,
							onChange: (e) => updateItem(item.id, { description: e.target.value }),
							className: "field mt-1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									label: "HSN/SAC",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: item.hsn,
										onChange: (e) => updateItem(item.id, { hsn: e.target.value }),
										className: "field"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									label: "Qty",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 0,
										value: item.qty,
										onChange: (e) => updateItem(item.id, { qty: Number(e.target.value) }),
										className: "field"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									label: "Unit",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: item.unit,
										onChange: (e) => updateItem(item.id, { unit: e.target.value }),
										className: "field"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									label: "Rate ₹",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 0,
										value: item.rate,
										onChange: (e) => updateItem(item.id, { rate: Number(e.target.value) }),
										className: "field"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									label: "Discount ₹",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										min: 0,
										value: item.discount,
										onChange: (e) => updateItem(item.id, { discount: Number(e.target.value) }),
										className: "field"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
									label: "GST %",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: item.gstRate,
										onChange: (e) => updateItem(item.id, { gstRate: Number(e.target.value) }),
										className: "field",
										children: GST_RATES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: r,
											children: [r, "%"]
										}, r))
									})
								})
							]
						})
					]
				}, item.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold tracking-[0.16em] text-muted uppercase",
				children: "Notes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows: 3,
				value: doc.notes,
				onChange: (e) => updateCurrent({ notes: e.target.value }),
				className: "field mt-2 resize-none"
			})] })
		]
	});
}
function Field({ label, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("block", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-[11px] text-muted",
			children: label
		}), children]
	});
}
function Mini({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-[10px] text-muted",
			children: label
		}), children]
	});
}
var KIND_LABEL = {
	invoice: "Tax Invoice",
	quotation: "Quotation",
	receipt: "Receipt"
};
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (!parts.length) return "BM";
	return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}
function PartyBlock({ title, party }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-semibold tracking-[0.18em] text-muted uppercase",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-base font-medium text-ink",
				children: party.name || "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs leading-5 text-muted whitespace-pre-line",
				children: [party.address, [
					party.city,
					party.state,
					party.pincode
				].filter(Boolean).join(", ")].filter(Boolean).join("\n") || "Address not set"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 space-y-0.5 text-[11px] text-ink",
				children: [
					party.gstin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "GSTIN"
						}),
						" ",
						party.gstin
					] }) : null,
					party.pan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "PAN"
						}),
						" ",
						party.pan
					] }) : null,
					party.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Ph"
						}),
						" ",
						party.phone
					] }) : null,
					party.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Email"
						}),
						" ",
						party.email
					] }) : null
				]
			})
		]
	});
}
function InvoicePaper({ doc }) {
	const gstOn = doc.seller.gstRegistered;
	const split = computeBill(doc.items, doc.seller, doc.buyer, gstOn);
	const intra = isIntraState(doc.seller, doc.buyer);
	const showIgst = gstOn && !intra;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "print-sheet relative mx-auto w-full max-w-[210mm] overflow-hidden rounded-md bg-paper px-6 py-7 text-ink shadow-[var(--shadow-paper)] sm:px-9 sm:py-9",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-5 top-0 h-1.5 bg-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-12 shrink-0 place-items-center rounded-sm bg-primary font-display text-lg font-medium text-primary-fg",
						children: initials(doc.seller.name || doc.seller.tradeName)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl leading-tight text-ink sm:text-2xl",
								children: doc.seller.name || "Your business"
							}),
							doc.seller.tradeName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted",
								children: doc.seller.tradeName
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs leading-5 text-muted",
								children: [doc.seller.address, [
									doc.seller.city,
									doc.seller.state,
									doc.seller.pincode
								].filter(Boolean).join(", ")].filter(Boolean).join(" · ")
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg tracking-tight text-primary sm:text-xl",
							children: KIND_LABEL[doc.kind]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-medium tabular-nums text-ink",
							children: doc.number
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[11px] text-muted",
							children: ["Date ", formatDateIN(doc.date)]
						}),
						doc.kind !== "receipt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-muted",
							children: ["Due ", formatDateIN(doc.dueDate)]
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 border-y border-line py-5 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartyBlock, {
					title: doc.kind === "receipt" ? "Received from" : "Bill to",
					party: doc.buyer
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Place of supply"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-ink",
							children: doc.placeOfSupply || "—"
						})] }),
						gstOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Seller GSTIN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-ink",
								children: doc.seller.gstin || "—"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Tax type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-ink",
								children: intra ? "CGST + SGST" : "IGST"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Reverse charge"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-ink",
								children: doc.reverseCharge ? "Yes" : "No"
							})] })
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted",
							children: "Seller is unregistered / composition — GST not charged."
						}),
						doc.seller.pan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "PAN"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-ink",
							children: doc.seller.pan
						})] }) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[520px] border-collapse text-left text-[11px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-ink/80 text-[10px] font-semibold tracking-wide text-muted uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2 font-semibold",
								children: "#"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2 font-semibold",
								children: "Particulars"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2 font-semibold",
								children: "HSN"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2 text-right font-semibold",
								children: "Qty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2 text-right font-semibold",
								children: "Rate"
							}),
							gstOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2 text-right font-semibold",
								children: "GST"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 text-right font-semibold",
								children: "Amount"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: split.rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line align-top",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 pr-2 tabular-nums text-muted",
								children: i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2.5 pr-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-ink",
									children: row.description || "—"
								}), row.discount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-muted",
									children: ["Less discount ", formatInr(row.discount)]
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 pr-2 tabular-nums text-muted",
								children: row.hsn || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2.5 pr-2 text-right tabular-nums",
								children: [
									row.qty,
									" ",
									row.unit
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 pr-2 text-right tabular-nums",
								children: formatInrPlain(row.rate)
							}),
							gstOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2.5 pr-2 text-right tabular-nums",
								children: [row.gstRate, "%"]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 text-right tabular-nums font-medium",
								children: formatInrPlain(row.total)
							})
						]
					}, row.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-6 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-semibold tracking-[0.16em] text-muted uppercase",
						children: "Amount in words"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-6 text-ink",
						children: amountInWords(split.total)
					}),
					doc.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs leading-5 text-muted",
						children: doc.notes
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 rounded-md border border-line bg-bg/60 p-3 text-[11px] leading-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-ink",
								children: "Pay here"
							}),
							doc.seller.upi ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1",
								children: ["UPI ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: doc.seller.upi
								})]
							}) : null,
							doc.seller.bankName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: doc.seller.bankName }) : null,
							doc.seller.accountNo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["A/c ", doc.seller.accountNo] }) : null,
							doc.seller.ifsc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["IFSC ", doc.seller.ifsc] }) : null
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Taxable value",
							value: formatInr(split.taxable)
						}),
						gstOn && intra ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "CGST",
							value: formatInr(split.cgst)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "SGST",
							value: formatInr(split.sgst)
						})] }) : null,
						showIgst ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "IGST",
							value: formatInr(split.igst)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-baseline justify-between border-t border-ink pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-base",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl tabular-nums",
								children: formatInr(split.total)
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-8 flex items-end justify-between gap-4 border-t border-line pt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-[55%] text-[10px] leading-4 text-muted",
					children: doc.seller.terms
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] tracking-wide text-muted uppercase",
						children: ["For ", doc.seller.name || "seller"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 font-display text-sm",
						children: doc.seller.signatureName || "Authorised signatory"
					})]
				})]
			})
		]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums text-ink",
			children: value
		})]
	});
}
function Home() {
	const doc = useCurrentDoc();
	const docs = useBillMint((s) => s.docs);
	const currentId = useBillMint((s) => s.currentId);
	const dismissedTip = useBillMint((s) => s.dismissedTip);
	const setCurrent = useBillMint((s) => s.setCurrent);
	const createDoc = useBillMint((s) => s.createDoc);
	const duplicateCurrent = useBillMint((s) => s.duplicateCurrent);
	const deleteDoc = useBillMint((s) => s.deleteDoc);
	const dismissTip = useBillMint((s) => s.dismissTip);
	const [pane, setPane] = (0, import_react.useState)("edit");
	const [settings, setSettings] = (0, import_react.useState)(false);
	if (!doc) return null;
	const split = computeBill(doc.items, doc.seller, doc.buyer, doc.seller.gstRegistered);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "no-print sticky top-0 z-20 border-b border-border/80 bg-bg/90 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-9 place-items-center rounded-md bg-primary font-display text-sm text-primary-fg",
							children: "B"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg leading-none",
								children: "BillMint"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 truncate text-xs text-muted",
								children: "GST invoices you can sell today"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSettings(true),
							className: "grid size-11 place-items-center rounded-lg border border-border bg-surface",
							"aria-label": "Business settings",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => window.print(),
							className: "inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Print / PDF"
							})]
						})
					]
				})
			}),
			!dismissedTip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-print mx-auto max-w-[1400px] px-4 pt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-2xl border border-border bg-surface p-4 sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: dismissTip,
							className: "absolute top-2 right-2 grid size-10 place-items-center text-muted",
							"aria-label": "Dismiss",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold tracking-[0.16em] text-accent uppercase",
							children: "Earn today"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 max-w-xl font-display text-2xl leading-tight sm:text-3xl",
							children: "Make a GST bill in a minute. Charge ₹99–₹299. Collect on UPI."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "mt-3 grid gap-2 text-sm text-muted sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "rounded-xl bg-bg px-3 py-2",
									children: "1. Put your shop / UPI in Settings"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "rounded-xl bg-bg px-3 py-2",
									children: "2. Fill the client and print PDF"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "rounded-xl bg-bg px-3 py-2",
									children: "3. WhatsApp the bill, take ₹100 now"
								})
							]
						})
					]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print mx-auto grid max-w-[1400px] gap-4 px-4 py-4 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1.05fr)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "hidden lg:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold tracking-[0.16em] text-muted uppercase",
								children: "Documents"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => createDoc("invoice"),
								className: "grid size-10 place-items-center text-primary",
								"aria-label": "New invoice",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus2, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1",
							children: docs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setCurrent(d.id),
								className: cn("w-full rounded-xl px-3 py-2.5 text-left", d.id === currentId ? "bg-surface shadow-sm" : "hover:bg-surface/60"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: d.buyer.name || "Untitled client"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 text-[11px] text-muted",
									children: [
										d.number,
										" · ",
										formatDateIN(d.date)
									]
								})]
							}) }, d.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-surface p-4 sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => createDoc("invoice"),
										className: "inline-flex h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlus2, { className: "size-4" }), "New"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: duplicateCurrent,
										className: "inline-flex h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "Duplicate"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => deleteDoc(doc.id),
										className: "inline-flex h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm text-danger",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Delete"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "ml-auto hidden items-center text-sm font-medium tabular-nums sm:flex",
										children: formatInr(split.total)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 grid grid-cols-2 gap-1 rounded-lg bg-bg p-1 lg:hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setPane("edit"),
									className: cn("h-10 rounded-md text-sm font-medium", pane === "edit" && "bg-surface shadow-sm"),
									children: "Edit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setPane("preview"),
									className: cn("h-10 rounded-md text-sm font-medium", pane === "preview" && "bg-surface shadow-sm"),
									children: "Preview"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn(pane === "preview" && "hidden lg:block"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorForm, {})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: cn("pb-8", pane === "edit" && "hidden lg:block"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoicePaper, { doc })
					})
				]
			}),
			settings ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessPanel, { onClose: () => setSettings(false) }) : null
		]
	});
}
//#endregion
export { Home as component };
