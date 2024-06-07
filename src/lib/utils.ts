import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function randomString(length: number) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const domainList = [
  "1secmail.com",
  "1secmail.org",
  "1secmail.net",
  "vjuum.com",
  "laafd.com",
  "txcct.com",
  "rteet.com",
  "dpptd.com"
]

export function generateRandomEmail() {
  return randomString(Math.floor(Math.random() * 10 + 2)) + '@' + domainList[Math.floor(Math.random() * domainList.length)]
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
