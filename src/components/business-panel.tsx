import { IN_STATES } from "@/lib/gst";
import { useBillMint } from "@/lib/store";

export function BusinessPanel({ onClose }: { onClose: () => void }) {
  const business = useBillMint((s) => s.business);
  const setBusiness = useBillMint((s) => s.setBusiness);
  const resetDemo = useBillMint((s) => s.resetDemo);

  return (
    <div className="no-print fixed inset-0 z-40 flex justify-end">
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close" onClick={onClose} />
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-border bg-surface p-5 shadow-[var(--shadow-paper)]">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl">Your business</h2>
          <button type="button" onClick={onClose} className="h-10 px-2 text-sm text-muted">
            Close
          </button>
        </div>
        <p className="mt-1 text-sm text-muted">Saved on this device. Printed on every invoice.</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <label className="col-span-2 block">
            <span className="mb-1 block text-[11px] text-muted">Legal name</span>
            <input className="field" value={business.name} onChange={(e) => setBusiness({ name: e.target.value })} />
          </label>
          <label className="col-span-2 block">
            <span className="mb-1 block text-[11px] text-muted">Trade name</span>
            <input
              className="field"
              value={business.tradeName}
              onChange={(e) => setBusiness({ tradeName: e.target.value })}
            />
          </label>
          <label className="col-span-2 block">
            <span className="mb-1 block text-[11px] text-muted">Address</span>
            <textarea
              rows={2}
              className="field resize-none"
              value={business.address}
              onChange={(e) => setBusiness({ address: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] text-muted">City</span>
            <input className="field" value={business.city} onChange={(e) => setBusiness({ city: e.target.value })} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] text-muted">State</span>
            <select className="field" value={business.state} onChange={(e) => setBusiness({ state: e.target.value })}>
              {IN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] text-muted">PIN</span>
            <input
              className="field"
              value={business.pincode}
              onChange={(e) => setBusiness({ pincode: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] text-muted">Phone</span>
            <input className="field" value={business.phone} onChange={(e) => setBusiness({ phone: e.target.value })} />
          </label>
          <label className="col-span-2 flex h-12 items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-primary"
              checked={business.gstRegistered}
              onChange={(e) => setBusiness({ gstRegistered: e.target.checked })}
            />
            GST registered — show tax on invoices
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] text-muted">GSTIN</span>
            <input
              className="field"
              value={business.gstin}
              onChange={(e) => setBusiness({ gstin: e.target.value.toUpperCase() })}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] text-muted">PAN</span>
            <input
              className="field"
              value={business.pan}
              onChange={(e) => setBusiness({ pan: e.target.value.toUpperCase() })}
            />
          </label>
          <label className="col-span-2 block">
            <span className="mb-1 block text-[11px] text-muted">Email</span>
            <input className="field" value={business.email} onChange={(e) => setBusiness({ email: e.target.value })} />
          </label>
          <label className="col-span-2 block">
            <span className="mb-1 block text-[11px] text-muted">UPI ID (you get paid here)</span>
            <input className="field" value={business.upi} onChange={(e) => setBusiness({ upi: e.target.value })} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] text-muted">Bank</span>
            <input
              className="field"
              value={business.bankName}
              onChange={(e) => setBusiness({ bankName: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] text-muted">A/c no</span>
            <input
              className="field"
              value={business.accountNo}
              onChange={(e) => setBusiness({ accountNo: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] text-muted">IFSC</span>
            <input className="field" value={business.ifsc} onChange={(e) => setBusiness({ ifsc: e.target.value })} />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] text-muted">Signatory</span>
            <input
              className="field"
              value={business.signatureName}
              onChange={(e) => setBusiness({ signatureName: e.target.value })}
            />
          </label>
          <label className="col-span-2 block">
            <span className="mb-1 block text-[11px] text-muted">Terms</span>
            <textarea
              rows={3}
              className="field resize-none"
              value={business.terms}
              onChange={(e) => setBusiness({ terms: e.target.value })}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={() => {
            resetDemo();
            onClose();
          }}
          className="mt-6 h-11 text-sm text-muted underline-offset-4 hover:underline"
        >
          Restore demo invoice
        </button>
      </aside>
    </div>
  );
}
