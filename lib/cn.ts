/**
 * Nối className có điều kiện (gọn, không cần thư viện ngoài).
 * Giá trị falsy bị bỏ qua; trùng lặp khoảng trắng được dọn.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values
    .filter((value): value is string | number => Boolean(value))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
