import { computeBill, isIntraState } from "@/lib/gst";
import { amountInWords, formatInr, formatInrPlain } from "@/lib/money";
import type { Document } from "@/lib/types";
import { formatDateIN } from "@/lib/utils";

const KIND_LABEL: Record<Document["kind"], string> = {
  invoice: "Tax Invoice",
  quotation: "Quotation",
  receipt: "Receipt",
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "BM";
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function PartyBlock({ title, party }: { title: string; party: Document["buyer"] }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold tracking-[0.18em] text-muted uppercase">{title}</p>
      <p className="mt-1 font-display text-base font-medium text-ink">{party.name || "—"}</p>
      <p className="mt-1 text-xs leading-5 text-muted whitespace-pre-line">
        {[party.address, [party.city, party.state, party.pincode].filter(Boolean).join(", ")]
          .filter(Boolean)
          .join("\n") || "Address not set"}
      </p>
      <div className="mt-2 space-y-0.5 text-[11px] text-ink">
        {party.gstin ? (
          <p>
            <span className="text-muted">GSTIN</span> {party.gstin}
          </p>
        ) : null}
        {party.pan ? (
          <p>
            <span className="text-muted">PAN</span> {party.pan}
          </p>
        ) : null}
        {party.phone ? (
          <p>
            <span className="text-muted">Ph</span> {party.phone}
          </p>
        ) : null}
        {party.email ? (
          <p>
            <span className="text-muted">Email</span> {party.email}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function InvoicePaper({ doc }: { doc: Document }) {
  const gstOn = doc.seller.gstRegistered;
  const split = computeBill(doc.items, doc.seller, doc.buyer, gstOn);
  const intra = isIntraState(doc.seller, doc.buyer);
  const showIgst = gstOn && !intra;

  return (
    <article id="billmint-paper" className="print-sheet relative mx-auto w-full max-w-[210mm] overflow-hidden rounded-md bg-paper px-6 py-7 text-ink shadow-[var(--shadow-paper)] sm:px-9 sm:py-9">
      <div className="pointer-events-none absolute inset-x-5 top-0 h-1.5 bg-primary" />

      <header className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid size-12 shrink-0 place-items-center rounded-sm bg-primary font-display text-lg font-medium text-primary-fg">
            {initials(doc.seller.name || doc.seller.tradeName)}
          </div>
          <div className="min-w-0">
            <p className="font-display text-xl leading-tight text-ink sm:text-2xl">
              {doc.seller.name || "Your business"}
            </p>
            {doc.seller.tradeName ? (
              <p className="mt-0.5 text-xs text-muted">{doc.seller.tradeName}</p>
            ) : null}
            <p className="mt-2 text-xs leading-5 text-muted">
              {[doc.seller.address, [doc.seller.city, doc.seller.state, doc.seller.pincode].filter(Boolean).join(", ")]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-lg tracking-tight text-primary sm:text-xl">{KIND_LABEL[doc.kind]}</p>
          <p className="mt-1 font-medium tabular-nums text-ink">{doc.number}</p>
          <p className="mt-1 text-[11px] text-muted">Date {formatDateIN(doc.date)}</p>
          {doc.kind !== "receipt" ? (
            <p className="text-[11px] text-muted">Due {formatDateIN(doc.dueDate)}</p>
          ) : null}
        </div>
      </header>

      <div className="mt-6 grid gap-6 border-y border-line py-5 sm:grid-cols-2">
        <PartyBlock title={doc.kind === "receipt" ? "Received from" : "Bill to"} party={doc.buyer} />
        <div className="space-y-2 text-xs">
          <p>
            <span className="text-muted">Place of supply</span>
            <span className="ml-2 text-ink">{doc.placeOfSupply || "—"}</span>
          </p>
          {gstOn ? (
            <>
              <p>
                <span className="text-muted">Seller GSTIN</span>
                <span className="ml-2 text-ink">{doc.seller.gstin || "—"}</span>
              </p>
              <p>
                <span className="text-muted">Tax type</span>
                <span className="ml-2 text-ink">{intra ? "CGST + SGST" : "IGST"}</span>
              </p>
              <p>
                <span className="text-muted">Reverse charge</span>
                <span className="ml-2 text-ink">{doc.reverseCharge ? "Yes" : "No"}</span>
              </p>
            </>
          ) : (
            <p className="text-muted">Seller is unregistered / composition — GST not charged.</p>
          )}
          {doc.seller.pan ? (
            <p>
              <span className="text-muted">PAN</span>
              <span className="ml-2 text-ink">{doc.seller.pan}</span>
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-[11px]">
          <thead>
            <tr className="border-b border-ink/80 text-[10px] font-semibold tracking-wide text-muted uppercase">
              <th className="py-2 pr-2 font-semibold">#</th>
              <th className="py-2 pr-2 font-semibold">Particulars</th>
              <th className="py-2 pr-2 font-semibold">HSN</th>
              <th className="py-2 pr-2 text-right font-semibold">Qty</th>
              <th className="py-2 pr-2 text-right font-semibold">Rate</th>
              {gstOn ? <th className="py-2 pr-2 text-right font-semibold">GST</th> : null}
              <th className="py-2 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {split.rows.map((row, i) => (
              <tr key={row.id} className="border-b border-line align-top">
                <td className="py-2.5 pr-2 tabular-nums text-muted">{i + 1}</td>
                <td className="py-2.5 pr-2">
                  <p className="text-ink">{row.description || "—"}</p>
                  {row.discount ? (
                    <p className="text-[10px] text-muted">Less discount {formatInr(row.discount)}</p>
                  ) : null}
                </td>
                <td className="py-2.5 pr-2 tabular-nums text-muted">{row.hsn || "—"}</td>
                <td className="py-2.5 pr-2 text-right tabular-nums">
                  {row.qty} {row.unit}
                </td>
                <td className="py-2.5 pr-2 text-right tabular-nums">{formatInrPlain(row.rate)}</td>
                {gstOn ? <td className="py-2.5 pr-2 text-right tabular-nums">{row.gstRate}%</td> : null}
                <td className="py-2.5 text-right tabular-nums font-medium">{formatInrPlain(row.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.16em] text-muted uppercase">Amount in words</p>
          <p className="mt-1 text-sm leading-6 text-ink">{amountInWords(split.total)}</p>
          {doc.notes ? <p className="mt-4 text-xs leading-5 text-muted">{doc.notes}</p> : null}
          <div className="mt-5 rounded-md border border-line bg-bg/60 p-3 text-[11px] leading-5">
            <p className="font-semibold text-ink">Pay here</p>
            {doc.seller.upi ? (
              <p className="mt-1">
                UPI <span className="font-medium">{doc.seller.upi}</span>
              </p>
            ) : null}
            {doc.seller.bankName ? <p>{doc.seller.bankName}</p> : null}
            {doc.seller.accountNo ? <p>A/c {doc.seller.accountNo}</p> : null}
            {doc.seller.ifsc ? <p>IFSC {doc.seller.ifsc}</p> : null}
          </div>
        </div>
        <div className="space-y-1.5 text-sm">
          <Row label="Taxable value" value={formatInr(split.taxable)} />
          {gstOn && intra ? (
            <>
              <Row label="CGST" value={formatInr(split.cgst)} />
              <Row label="SGST" value={formatInr(split.sgst)} />
            </>
          ) : null}
          {showIgst ? <Row label="IGST" value={formatInr(split.igst)} /> : null}
          <div className="mt-2 flex items-baseline justify-between border-t border-ink pt-2">
            <span className="font-display text-base">Total</span>
            <span className="font-display text-xl tabular-nums">{formatInr(split.total)}</span>
          </div>
        </div>
      </div>

      <footer className="mt-8 flex items-end justify-between gap-4 border-t border-line pt-5">
        <p className="max-w-[55%] text-[10px] leading-4 text-muted">{doc.seller.terms}</p>
        <div className="text-right">
          <p className="text-[10px] tracking-wide text-muted uppercase">For {doc.seller.name || "seller"}</p>
          <p className="mt-8 font-display text-sm">{doc.seller.signatureName || "Authorised signatory"}</p>
        </div>
      </footer>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-muted">{label}</span>
      <span className="tabular-nums text-ink">{value}</span>
    </div>
  );
}
