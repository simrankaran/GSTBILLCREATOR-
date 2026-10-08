import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect } from "react";
import { defaultBusiness, newDocument, sampleClient, sampleDocument } from "./defaults";
import type { BillItem, Business, DocKind, Document, Party } from "./types";
import { uid } from "./utils";

type State = {
  business: Business;
  clients: Party[];
  docs: Document[];
  currentId: string | null;
  dismissedTip: boolean;
};

type Actions = {
  setBusiness: (patch: Partial<Business>) => void;
  setCurrent: (id: string) => void;
  updateCurrent: (patch: Partial<Document>) => void;
  updateBuyer: (patch: Partial<Party>) => void;
  updateItem: (id: string, patch: Partial<BillItem>) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  createDoc: (kind: DocKind) => void;
  duplicateCurrent: () => void;
  deleteDoc: (id: string) => void;
  saveClient: () => void;
  loadClient: (name: string) => void;
  dismissTip: () => void;
  resetDemo: () => void;
};

function seed(): State {
  const business = defaultBusiness();
  const client = sampleClient();
  const doc = sampleDocument(business, client, []);
  return {
    business,
    clients: [client],
    docs: [doc],
    currentId: doc.id,
    dismissedTip: false,
  };
}

function withCurrent(docs: Document[], currentId: string | null, fn: (doc: Document) => Document) {
  return docs.map((d) => (d.id === currentId ? { ...fn(d), updatedAt: Date.now() } : d));
}

export const useBillMint = create<State & Actions>()(
  persist(
    (set) => ({
      ...seed(),
      setBusiness: (patch) =>
        set((s) => {
          const business = { ...s.business, ...patch };
          return {
            business,
            docs: withCurrent(s.docs, s.currentId, (d) => ({ ...d, seller: { ...business } })),
          };
        }),
      setCurrent: (id) => set({ currentId: id }),
      updateCurrent: (patch) =>
        set((s) => ({ docs: withCurrent(s.docs, s.currentId, (d) => ({ ...d, ...patch })) })),
      updateBuyer: (patch) =>
        set((s) => ({
          docs: withCurrent(s.docs, s.currentId, (d) => ({ ...d, buyer: { ...d.buyer, ...patch } })),
        })),
      updateItem: (id, patch) =>
        set((s) => ({
          docs: withCurrent(s.docs, s.currentId, (d) => ({
            ...d,
            items: d.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
          })),
        })),
      addItem: () =>
        set((s) => ({
          docs: withCurrent(s.docs, s.currentId, (d) => ({
            ...d,
            items: [
              ...d.items,
              {
                id: uid(),
                description: "",
                hsn: "",
                qty: 1,
                unit: "Nos",
                rate: 0,
                discount: 0,
                gstRate: 18,
              },
            ],
          })),
        })),
      removeItem: (id) =>
        set((s) => ({
          docs: withCurrent(s.docs, s.currentId, (d) => ({
            ...d,
            items: d.items.length <= 1 ? d.items : d.items.filter((it) => it.id !== id),
          })),
        })),
      createDoc: (kind) =>
        set((s) => {
          const doc = newDocument(kind, s.business, s.docs);
          return { docs: [doc, ...s.docs], currentId: doc.id };
        }),
      duplicateCurrent: () =>
        set((s) => {
          const cur = s.docs.find((d) => d.id === s.currentId);
          if (!cur) return s;
          const copy: Document = {
            ...cur,
            id: uid(),
            number: newDocument(cur.kind, s.business, s.docs).number,
            items: cur.items.map((it) => ({ ...it, id: uid() })),
            updatedAt: Date.now(),
          };
          return { docs: [copy, ...s.docs], currentId: copy.id };
        }),
      deleteDoc: (id) =>
        set((s) => {
          const docs = s.docs.filter((d) => d.id !== id);
          if (docs.length === 0) {
            const doc = newDocument("invoice", s.business, []);
            return { docs: [doc], currentId: doc.id };
          }
          return { docs, currentId: s.currentId === id ? docs[0].id : s.currentId };
        }),
      saveClient: () =>
        set((s) => {
          const cur = s.docs.find((d) => d.id === s.currentId);
          if (!cur?.buyer.name.trim()) return s;
          const rest = s.clients.filter((c) => c.name !== cur.buyer.name);
          return { clients: [{ ...cur.buyer }, ...rest].slice(0, 40) };
        }),
      loadClient: (name) =>
        set((s) => {
          const client = s.clients.find((c) => c.name === name);
          if (!client) return s;
          return {
            docs: withCurrent(s.docs, s.currentId, (d) => ({
              ...d,
              buyer: { ...client },
              placeOfSupply: client.state || d.placeOfSupply,
            })),
          };
        }),
      dismissTip: () => set({ dismissedTip: true }),
      resetDemo: () => set(seed()),
    }),
    {
      name: "billmint-v1",
      skipHydration: true,
      merge: (persisted, current) => {
        if (!persisted || typeof persisted !== "object") return current;
        const p = persisted as Partial<State>;
        if (!Array.isArray(p.docs) || p.docs.length === 0 || !p.docs[0]?.items) return current;
        return {
          ...current,
          ...p,
          business: { ...current.business, ...(p.business ?? {}) },
          docs: p.docs,
          clients: Array.isArray(p.clients) ? p.clients : current.clients,
        };
      },
    },
  ),
);

export function useHydrateBillMint() {
  useEffect(() => {
    void useBillMint.persist.rehydrate();
  }, []);
}

export function useCurrentDoc() {
  return useBillMint((s) => s.docs.find((d) => d.id === s.currentId) ?? s.docs[0]);
}
