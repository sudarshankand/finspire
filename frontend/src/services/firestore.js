import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore"

import { db } from "../firebase"


// ── Watchlist ─────────────────────────────────────────────────────────────────

export async function addToWatchlist(uid, company) {
  const ref = doc(db, "users", uid, "watchlist", company.symbol)
  await setDoc(ref, {
    symbol: company.symbol,
    name:   company.name,
    addedAt: serverTimestamp(),
  })
}

export async function removeFromWatchlist(uid, symbol) {
  const ref = doc(db, "users", uid, "watchlist", symbol)
  await deleteDoc(ref)
}

export async function getWatchlist(uid) {
  const col = collection(db, "users", uid, "watchlist")
  const snap = await getDocs(col)
  return snap.docs.map((d) => d.data())
}


// ── Analysis history ──────────────────────────────────────────────────────────

export async function saveAnalysis(uid, result, mode) {
  await addDoc(collection(db, "analyses"), {
    uid,
    symbol:         result.symbol,
    name:           result.name,
    score:          result.score,
    label:          result.label,
    headline_count: result.headline_count,
    mode,
    ts: serverTimestamp(),
  })
}

export async function getHistory(symbol, limitCount = 20) {
  const q = query(
    collection(db, "analyses"),
    where("symbol", "==", symbol),
    orderBy("ts", "desc"),
    limit(limitCount)
  )
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => d.data())
    .filter((d) => d.ts)
    .map((d) => ({
      score: d.score,
      label: d.label,
      date:  d.ts.toDate().toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      ts:    d.ts.toDate().getTime(),
    }))
    .sort((a, b) => a.ts - b.ts)
}
