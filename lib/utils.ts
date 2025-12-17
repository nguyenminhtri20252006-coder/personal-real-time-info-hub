import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Hàm cn (classnames) giúp gộp và xử lý xung đột class Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Hàm format tiền tệ (cho widget chứng khoán sau này)
export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
