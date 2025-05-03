import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import PocketBase from "pocketbase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const apiUrl = process.env.NEXT_PUBLIC_PB_API_URL || 'http://localhost:8090';

export const pb = new PocketBase(apiUrl);


