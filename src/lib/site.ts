export const site = {
  brandFa: "بتن دکور سیمان تک",
  brandShort: "سیمان تک",
  brandEn: "SIMAN TAK",
  legalName: "شرکت بتن دکور سیمان تک",
  tagline: "میکروسمنت، پوشش دکوراتیو و بتن اکسپوز",
  description:
    "بتن دکور سیمان تک، تولیدکننده تخصصی میکروسمنت، پوشش‌های دکوراتیو و پوشش‌های سیمانی ساختمانی؛ از فرمولاسیون و تولید در کارخانه تا اجرای حرفه‌ای در کف، دیوار، نما و فضاهای مرطوب.",
  url: "https://simantak.com",
  established: "۱۳۹۲",
  phoneLabel: "۰۲۱ - ۹۱۰۱ ۲۳۴۵",
  phoneHref: "+982191012345",
  mobileLabel: "۰۹۱۲ ۳۴۵ ۶۷۸۹",
  mobileHref: "+989123456789",
  whatsappNumber: "989123456789",
  whatsappLabel: "گفت‌وگو در واتساپ",
  email: "info@simantak.com",
  salesEmail: "sales@simantak.com",
  address:
    "تهران، بزرگراه فتح، شهرک صنعتی چهاردانگه، خیابان صنعت یکم، پلاک ۱۲ — کارخانه و شوروم سیمان تک",
  addressShort: "تهران، شهرک صنعتی چهاردانگه",
  hours: [
    { day: "شنبه تا چهارشنبه", time: "۹:۰۰ تا ۱۸:۰۰" },
    { day: "پنجشنبه", time: "۹:۰۰ تا ۱۳:۰۰" },
    { day: "جمعه", time: "تعطیل" },
  ],
  socials: [
    { label: "اینستاگرام", handle: "@simantak.decor", href: "https://instagram.com" },
    { label: "تلگرام", handle: "@simantak", href: "https://telegram.org" },
    { label: "لینکدین", handle: "Siman Tak", href: "https://linkedin.com" },
    { label: "پینترست", handle: "simantak", href: "https://pinterest.com" },
  ],
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=51.0600%2C35.4500%2C51.1100%2C35.4850&layer=mapnik&marker=35.4667%2C51.0833",
  mapLink: "https://www.google.com/maps/search/?api=1&query=35.4667,51.0833",
  stats: [
    { value: "۱۲", suffix: "+", label: "سال تجربه تولید" },
    { value: "۴۸۰", suffix: "+", label: "پروژه اجراشده" },
    { value: "۳۸", suffix: "", label: "رنگ استاندارد" },
    { value: "۱۸", suffix: "", label: "استان تحت پوشش" },
  ],
} as const;

export const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  "سلام، برای دریافت مشاوره و استعلام قیمت پوشش‌های سیمان تک تماس می‌گیرم.",
)}`;

export const nav = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره ما" },
  { href: "/products", label: "محصولات" },
  { href: "/services", label: "خدمات اجرا" },
  { href: "/projects", label: "پروژه‌ها" },
  { href: "/journal", label: "مجله" },
  { href: "/shop", label: "فروشگاه" },
  { href: "/contact", label: "تماس" },
] as const;

export const trustPoints = [
  "فرمولاسیون اختصاصی و تولید داخلی",
  "اجرای تیم فنی سیمان تک",
  "ضمانت اجرای ۱۰ ساله",
  "ارسال به سراسر ایران",
] as const;
