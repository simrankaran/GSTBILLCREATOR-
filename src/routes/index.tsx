import { createFileRoute } from "@tanstack/react-router";
import { Copy, FilePlus2, LoaderCircle, Printer, Settings2, Trash2, X } from "lucide-react";
import { useState } from "react";
import { BusinessPanel } from "@/components/business-panel";
import { EditorForm } from "@/components/editor-form";
import { InvoicePaper } from "@/components/invoice-paper";
import { computeBill } from "@/lib/gst";
import { formatInr } from "@/lib/money";
import { downloadInvoicePdf } from "@/lib/pdf";
import { useBillMint, useCurrentDoc, useHydrateBillMint } from "@/lib/store";
import { cn, formatDateIN } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  useHydrateBillMint();
  const doc = useCurrentDoc();
  const docs = useBillMint((s) => s.docs);
  const currentId = useBillMint((s) => s.currentId);
  const dismissedTip = useBillMint((s) => s.dismissedTip);
  const setCurrent = useBillMint((s) => s.setCurrent);
  const createDoc = useBillMint((s) => s.createDoc);
  const duplicateCurrent = useBillMint((s) => s.duplicateCurrent);
  const deleteDoc = useBillMint((s) => s.deleteDoc);
  const dismissTip = useBillMint((s) => s.dismissTip);
  const [settings, setSettings] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  if (!doc) return null;

  const split = computeBill(doc.items, doc.seller, doc.buyer, doc.seller.gstRegistered);

  async function savePdf() {
    const el = document.getElementById("billmint-paper");
    if (!el) {
      setSaveError("Invoice preview is not ready. Scroll to the bill and try again.");
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      await downloadInvoicePdf(el, `${doc.number.replace(/[^\w.-]+/g, "-")}.pdf`);
    } catch {
      setSaveError("Could not create the PDF. Use Print from your browser menu if the download is blocked.");
      window.print();
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-dvh bg-bg text-ink">
      <header className="no-print sticky top-0 z-20 border-b border-border/80 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3">
          <div className="grid size-9 place-items-center rounded-md bg-primary font-display text-sm text-primary-fg">
            B
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg leading-none">BillMint</p>
            <p className="mt-0.5 truncate text-xs text-muted">GST invoices you can sell today</p>
          </div>
          <button
            type="button"
            onClick={() => setSettings(true)}
            className="grid size-11 place-items-center rounded-lg border border-border bg-surface"
            aria-label="Business settings"
          >
            <Settings2 className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => void savePdf()}
            disabled={saving}
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg disabled:opacity-70"
          >
            {saving ? <LoaderCircle className="size-4 animate-spin" /> : <Printer className="size-4" />}
            <span className="hidden sm:inline">{saving ? "Saving…" : "Download PDF"}</span>
            <span className="sm:hidden">{saving ? "…" : "PDF"}</span>
          </button>
        </div>
      </header>

      {!dismissedTip ? (
        <div className="no-print mx-auto max-w-[1400px] px-4 pt-4">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-4 sm:p-5">
            <button
              type="button"
              onClick={dismissTip}
              className="absolute top-2 right-2 grid size-10 place-items-center text-muted"
              aria-label="Dismiss"
            >
              <X className="size-4" />
            </button>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">Earn today</p>
            <h1 className="mt-1 max-w-xl font-display text-2xl leading-tight sm:text-3xl">
              Make a GST bill in a minute. Charge ₹99–₹299. Collect on UPI.
            </h1>
            <ol className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-3">
              <li className="rounded-xl bg-bg px-3 py-2">1. Put your shop / UPI in Settings</li>
              <li className="rounded-xl bg-bg px-3 py-2">2. Fill the client on the form</li>
              <li className="rounded-xl bg-bg px-3 py-2">3. Download PDF, WhatsApp it, take ₹100</li>
            </ol>
          </div>
        </div>
      ) : null}

      {saveError ? (
        <p className="no-print mx-auto max-w-[1400px] px-4 pt-3 text-sm text-danger">{saveError}</p>
      ) : null}

      <div className="mx-auto grid max-w-[1400px] gap-4 px-4 py-4 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1.05fr)]">
        <aside className="no-print hidden lg:block">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">Documents</p>
            <button
              type="button"
              onClick={() => createDoc("invoice")}
              className="grid size-10 place-items-center text-primary"
              aria-label="New invoice"
            >
              <FilePlus2 className="size-4" />
            </button>
          </div>
          <ul className="mt-2 space-y-1">
            {docs.map((d) => (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => setCurrent(d.id)}
                  className={cn(
                    "w-full rounded-xl px-3 py-2.5 text-left",
                    d.id === currentId ? "bg-surface shadow-sm" : "hover:bg-surface/60",
                  )}
                >
                  <p className="truncate text-sm font-medium">{d.buyer.name || "Untitled client"}</p>
                  <p className="mt-0.5 text-[11px] text-muted">
                    {d.number} · {formatDateIN(d.date)}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="no-print rounded-2xl border border-border bg-surface p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => createDoc("invoice")}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm"
            >
              <FilePlus2 className="size-4" />
              New
            </button>
            <button
              type="button"
              onClick={duplicateCurrent}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm"
            >
              <Copy className="size-4" />
              Duplicate
            </button>
            <button
              type="button"
              onClick={() => deleteDoc(doc.id)}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm text-danger"
            >
              <Trash2 className="size-4" />
              Delete
            </button>
            <p className="ml-auto hidden items-center text-sm font-medium tabular-nums sm:flex">
              {formatInr(split.total)}
            </p>
          </div>
          <EditorForm />
        </section>

        <section className="pb-8">
          <InvoicePaper doc={doc} />
        </section>
      </div>

      {settings ? <BusinessPanel onClose={() => setSettings(false)} /> : null}
    </main>
  );
}
