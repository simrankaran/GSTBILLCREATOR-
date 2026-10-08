import type { ReactNode } from "react";
import { GST_RATES, IN_STATES } from "@/lib/gst";
import { useBillMint, useCurrentDoc } from "@/lib/store";
import type { DocKind } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";

const KINDS: { id: DocKind; label: string }[] = [
  { id: "invoice", label: "Invoice" },
  { id: "quotation", label: "Quotation" },
  { id: "receipt", label: "Receipt" },
];

export function EditorForm() {
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

  return (
    <div className="space-y-6">
      <section>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">Document</p>
        <div className="mt-2 grid grid-cols-3 gap-1 rounded-lg bg-bg p-1">
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => updateCurrent({ kind: k.id })}
              className={cn(
                "h-10 rounded-md text-sm font-medium transition",
                doc.kind === k.id ? "bg-surface text-ink shadow-sm" : "text-muted",
              )}
            >
              {k.label}
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Field label="Number">
            <input
              value={doc.number}
              onChange={(e) => updateCurrent({ number: e.target.value })}
              className="field"
            />
          </Field>
          <Field label="Date">
            <input
              type="date"
              value={doc.date}
              onChange={(e) => updateCurrent({ date: e.target.value })}
              className="field"
            />
          </Field>
          <Field label="Due date">
            <input
              type="date"
              value={doc.dueDate}
              onChange={(e) => updateCurrent({ dueDate: e.target.value })}
              className="field"
            />
          </Field>
          <Field label="Place of supply">
            <select
              value={doc.placeOfSupply}
              onChange={(e) => updateCurrent({ placeOfSupply: e.target.value })}
              className="field"
            >
              <option value="">Select state</option>
              {IN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <label className="mt-3 flex h-11 items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={doc.reverseCharge}
            onChange={(e) => updateCurrent({ reverseCharge: e.target.checked })}
            className="size-4 accent-primary"
          />
          Reverse charge
        </label>
      </section>

      <section>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">Client</p>
          <button type="button" onClick={saveClient} className="text-xs font-medium text-primary">
            Save client
          </button>
        </div>
        {clients.length ? (
          <select
            className="field mt-2"
            value=""
            onChange={(e) => {
              if (e.target.value) loadClient(e.target.value);
            }}
          >
            <option value="">Load saved client…</option>
            {clients.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        ) : null}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Field label="Name" className="col-span-2">
            <input value={doc.buyer.name} onChange={(e) => updateBuyer({ name: e.target.value })} className="field" />
          </Field>
          <Field label="Address" className="col-span-2">
            <textarea
              rows={2}
              value={doc.buyer.address}
              onChange={(e) => updateBuyer({ address: e.target.value })}
              className="field resize-none"
            />
          </Field>
          <Field label="City">
            <input value={doc.buyer.city} onChange={(e) => updateBuyer({ city: e.target.value })} className="field" />
          </Field>
          <Field label="State">
            <select
              value={doc.buyer.state}
              onChange={(e) => {
                updateBuyer({ state: e.target.value });
                if (!doc.placeOfSupply) updateCurrent({ placeOfSupply: e.target.value });
              }}
              className="field"
            >
              <option value="">Select</option>
              {IN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </Field>
          <Field label="PIN">
            <input
              value={doc.buyer.pincode}
              onChange={(e) => updateBuyer({ pincode: e.target.value })}
              className="field"
            />
          </Field>
          <Field label="GSTIN">
            <input
              value={doc.buyer.gstin}
              onChange={(e) => updateBuyer({ gstin: e.target.value.toUpperCase() })}
              className="field"
            />
          </Field>
          <Field label="Phone">
            <input value={doc.buyer.phone} onChange={(e) => updateBuyer({ phone: e.target.value })} className="field" />
          </Field>
          <Field label="Email">
            <input value={doc.buyer.email} onChange={(e) => updateBuyer({ email: e.target.value })} className="field" />
          </Field>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">Line items</p>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex h-10 items-center gap-1 rounded-md px-2 text-sm font-medium text-primary"
          >
            <Plus className="size-4" />
            Add
          </button>
        </div>
        <div className="mt-2 space-y-3">
          {doc.items.map((item, i) => (
            <div key={item.id} className="rounded-xl border border-border bg-surface p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted">Item {i + 1}</p>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="grid size-10 place-items-center text-muted"
                  aria-label="Remove item"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <input
                placeholder="What did you do / sell?"
                value={item.description}
                onChange={(e) => updateItem(item.id, { description: e.target.value })}
                className="field mt-1"
              />
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                <Mini label="HSN/SAC">
                  <input
                    value={item.hsn}
                    onChange={(e) => updateItem(item.id, { hsn: e.target.value })}
                    className="field"
                  />
                </Mini>
                <Mini label="Qty">
                  <input
                    type="number"
                    min={0}
                    value={item.qty}
                    onChange={(e) => updateItem(item.id, { qty: Number(e.target.value) })}
                    className="field"
                  />
                </Mini>
                <Mini label="Unit">
                  <input
                    value={item.unit}
                    onChange={(e) => updateItem(item.id, { unit: e.target.value })}
                    className="field"
                  />
                </Mini>
                <Mini label="Rate ₹">
                  <input
                    type="number"
                    min={0}
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, { rate: Number(e.target.value) })}
                    className="field"
                  />
                </Mini>
                <Mini label="Discount ₹">
                  <input
                    type="number"
                    min={0}
                    value={item.discount}
                    onChange={(e) => updateItem(item.id, { discount: Number(e.target.value) })}
                    className="field"
                  />
                </Mini>
                <Mini label="GST %">
                  <select
                    value={item.gstRate}
                    onChange={(e) => updateItem(item.id, { gstRate: Number(e.target.value) })}
                    className="field"
                  >
                    {GST_RATES.map((r) => (
                      <option key={r} value={r}>
                        {r}%
                      </option>
                    ))}
                  </select>
                </Mini>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">Notes</p>
        <textarea
          rows={3}
          value={doc.notes}
          onChange={(e) => updateCurrent({ notes: e.target.value })}
          className="field mt-2 resize-none"
        />
      </section>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1 block text-[11px] text-muted">{label}</span>
      {children}
    </label>
  );
}

function Mini({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] text-muted">{label}</span>
      {children}
    </label>
  );
}
