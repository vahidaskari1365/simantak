const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert latin digits in any string/number to Persian digits. */
export function fa(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

/** 4850000 -> "۴٬۸۵۰٬۰۰۰" */
export function faPrice(value: number): string {
  return fa(new Intl.NumberFormat("en-US").format(value)).replace(/,/g, "٬");
}

/** Normalise Persian/Arabic digits typed by users into latin digits. */
export function toLatinDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

export function faPriceToman(value: number): string {
  return `${faPrice(value)} تومان`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
