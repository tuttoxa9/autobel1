import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchUsdBynRate() {
  try {
    const res = await fetch('https://api.nbrb.by/exrates/rates/431'); // USD
    if (!res.ok) return null;
    const data = await res.json();
    return data.Cur_OfficialRate ?? null;
  } catch {
    return null;
  }
}

export function convertUsdToByn(usd, rate) {
  if(!rate) return '';
  return Math.round(usd * rate).toLocaleString('ru-BY');
}
