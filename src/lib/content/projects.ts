export type SpaceId = "residential" | "commercial" | "hospitality" | "office";
export type UseId = "floor" | "wall" | "facade" | "wet" | "detail";

export type Project = {
  slug: string;
  title: string;
  location: string;
  year: string;
  space: SpaceId;
  use: UseId;
  products: string[];
  area: string;
  duration: string;
  image: string;
  gallery: string[];
  summary: string;
  description: string[];
  challenge: string;
  solution: string;
  result: string;
  quote?: { text: string; author: string };
  featured?: boolean;
};

export const spaces: { id: SpaceId; label: string }[] = [
  { id: "residential", label: "مسکونی" },
  { id: "commercial", label: "تجاری" },
  { id: "hospitality", label: "هتل و اقامتی" },
  { id: "office", label: "اداری" },
];

export const uses: { id: UseId; label: string }[] = [
  { id: "floor", label: "کف" },
  { id: "wall", label: "دیوار" },
  { id: "facade", label: "نما" },
  { id: "wet", label: "فضای مرطوب" },
  { id: "detail", label: "جزئیات دکوراتیو" },
];

export const projects: Project[] = [
  {
    slug: "lavasan-villa",
    title: "ویلای لواسان",
    location: "لواسان، تهران",
    year: "۱۴۰۳",
    space: "residential",
    use: "facade",
    products: ["microcement-exterior", "mineral-facade-coating"],
    area: "۴۸۰ متر مربع نما",
    duration: "۲۲ روز کاری",
    image: "/images/product-facade.jpg",
    gallery: ["/images/product-facade.jpg", "/images/hero.jpg", "/images/craft.jpg"],
    summary:
      "نمای مونولیت خاکستری با حجم قرمز آجری؛ اجرای میکروسمنت نما روی بتن اکسپوز و بازسازی جداره ورودی.",
    description: [
      "این ویلای دوبلکس با نمای بتنی ناهمگون تحویل داده شده بود و کارفرما به دنبال سطحی یکدست با هویت مشخص بود. تصمیم گرفتیم نمای اصلی را با میکروسمنت نما و یک حجم قرمز آجری به‌عنوان نقطه تمرکز اجرا کنیم.",
      "برای کنترل کیفیت، ابتدا یک نمونه ۴ متر مربعی روی دیوار اجرا و تأیید شد. سپس کل نما با لایه پایه مسلح و دو لایه میکروسمنت پوشش داده شد.",
      "نتیجه، نمای بدون درز و یکدستی است که پس از دو سال، بدون تغییر رنگ و بدون ترک باقی مانده است.",
    ],
    challenge:
      "اختلاف جذب و بافت بتن در بخش‌های مختلف نما باعث ایجاد سایه‌روشن ناهمگون می‌شد؛ همچنین دسترسی به بخش‌های بالایی محدود بود.",
    solution:
      "اجرای پرایمر یکنواخت‌کننده، لایه پایه مسلح با مش و ماکاپ تأییدشده؛ همراه با داربست ایمن و برنامه اجرای بخش‌بندی‌شده برای کنترل شرایط جوی.",
    result: "نمای یکدست با پایداری رنگ و بدون ترک، با کاهش حدود ۳۰ درصدی هزینه نسبت به نمای سنگ.",
    quote: {
      text: "دقت تیم اجرا در جزئیات لبه‌ها و یکنواختی رنگ، دقیقاً همان چیزی بود که در نمونه دیده بودیم.",
      author: "دفتر معماری طراح پروژه",
    },
    featured: true,
  },
  {
    slug: "tehran-apartment",
    title: "آپارتمان مسکونی الهیه",
    location: "الهیه، تهران",
    year: "۱۴۰۲",
    space: "residential",
    use: "floor",
    products: ["micro-topping", "microcement-classic", "sealer-system"],
    area: "۱۹۰ متر مربع کف و دیوار",
    duration: "۱۴ روز کاری",
    image: "/images/project-residential.jpg",
    gallery: ["/images/project-residential.jpg", "/images/product-floor.jpg", "/images/samples.jpg"],
    summary:
      "بازسازی کف و دیوارهای نشیمن با میکروسمنت شنی روشن، بدون تخریب سرامیک‌های موجود.",
    description: [
      "کارفرما قصد فروش ملک را داشت و به دنبال بازسازی کم‌هزینه اما باکیفیت بود. کف سرامیک سالم بود و نیازی به تخریب نداشت؛ بنابراین میکروتاپینگ را به‌عنوان لایه پایه اجرا کردیم.",
      "میکروسمنت با رنگ شنی روشن، هم روی کف و هم دیوارهای نشیمن اجرا شد تا پیوستگی بصری ایجاد شود. جزئیات آستانه درها و کف‌بر با دقت اجرا شد.",
      "پروژه در ۱۴ روز با کمترین اختلال برای ساکنان تحویل شد.",
    ],
    challenge: "بدون تخریب، اختلاف سطح بین اتاق‌ها و وجود درزهای سرامیک قدیمی.",
    solution: "اجرای میکروتاپینگ خودتراز روی سرامیک سالم و پوشش میکروسمنت با ضخامت کنترل‌شده روی کف و دیوار.",
    result: "کف و دیوار یکدست با افزایش محسوس بازتاب نور و ارزش بازاری ملک.",
    featured: true,
  },
  {
    slug: "cafe-shomali",
    title: "کافه رستوران شمال",
    location: "زعفرانیه، تهران",
    year: "۱۴۰۳",
    space: "commercial",
    use: "detail",
    products: ["microcement-classic", "venetian-plaster"],
    area: "۲۶۰ متر مربع",
    duration: "۱۸ روز کاری",
    image: "/images/project-commercial.jpg",
    gallery: ["/images/project-commercial.jpg", "/images/product-wall.jpg", "/images/project-kitchen.jpg"],
    summary:
      "پیشخوان مونولیت، دیوار شاخص قرمز و کف میکروسمنتی برای کافه‌ای با هویت گرم و صنعتی.",
    description: [
      "طراح این کافه به دنبال سطحی بود که در نور کم عصرگاهی، عمق پیدا کند. پیشخوان با میکروسمنت در رنگ گرافیت و دیوار شاخص با پلاستر ونیزی در رنگ خاک رس اجرا شد.",
      "کف با ضخامت کم و مقاوم به سایش برای تردد بالا انتخاب شد. جزئیات اتصال کف به پایه پیشخوان و اجرای قوس بالای بار از چالش‌های اصلی بود.",
      "نتیجه، فضایی است که در شبکه‌های اجتماعی به یکی از نقاط شناخته‌شده کافه‌های منطقه تبدیل شد.",
    ],
    challenge: "هماهنگی با سایر عوامل پروژه، بازه زمانی محدود و تردد بالای روزانه پس از افتتاح.",
    solution: "اجرای بخش‌بندی‌شده در ساعات غیرکاری، سیلر مخصوص کف پرتردد و جزئیات دستی روی قوس و لبه پیشخوان.",
    result: "فضای آماده برای بهره‌برداری با سطح مقاوم به سایش بالا و هویت بصری منسجم.",
    featured: true,
  },
  {
    slug: "kashan-boutique-hotel",
    title: "هتل بوتیک کاشان",
    location: "کاشان",
    year: "۱۴۰۲",
    space: "hospitality",
    use: "wet",
    products: ["microcement-wet", "sealer-system"],
    area: "۱۴ سرویس بهداشتی — ۲۱۰ متر مربع",
    duration: "۲۶ روز کاری",
    image: "/images/product-bath.jpg",
    gallery: ["/images/product-bath.jpg", "/images/product-wall.jpg", "/images/craft.jpg"],
    summary:
      "اجرای سرویس‌های بهداشتی ضدآب با سطح بدون بندکشی، در یک بنای بازسازی‌شده با محدودیت سازه‌ای.",
    description: [
      "در بازسازی این بنای قدیمی، سازه سرویس‌ها اجازه تخریب گسترده نمی‌داد. با بررسی دقیق، آب‌بندی و اجرای میکروسمنت ضدآب روی بستر موجود برنامه‌ریزی شد.",
      "۱۴ سرویس در دسته‌های چهارتایی اجرا شد تا هتل بتواند بخشی از اتاق‌ها را باز نگه دارد. رنگ سفید صدفی برای کف و دیوار انتخاب شد.",
      "تست آب روی تمام سرویس‌ها انجام و پس از تأیید، سیلر ضد لغزش اجرا شد.",
    ],
    challenge: "سن بنا، بستر ناهمگون و نیاز به حداقل زمان تعطیلی هتل.",
    solution: "اجرای فازبندی‌شده، آب‌بندی تقویت‌شده در گوشه‌ها و انتخاب سیستم لایه‌نازک با کمترین ارتفاع.",
    result: "۱۴ سرویس با آب‌بندی تأییدشده و ظاهری یکدست که نیاز نگهداری را کاهش داد.",
    featured: true,
  },
  {
    slug: "head-office",
    title: "دفتر مرکزی هلدینگ",
    location: "بزرگراه مدرس، تهران",
    year: "۱۴۰۳",
    space: "office",
    use: "wall",
    products: ["microcement-classic", "sealer-system"],
    area: "۳۲۰ متر مربع دیوار",
    duration: "۱۱ روز کاری",
    image: "/images/product-wall.jpg",
    gallery: ["/images/product-wall.jpg", "/images/craft.jpg", "/images/samples.jpg"],
    summary: "دیوارهای راهرو و اتاق جلسات با میکروسمنت خاکستری سرد و سیلر مات.",
    description: [
      "این پروژه با هدف ایجاد فضایی آرام و حرفه‌ای برای دفتر مرکزی یک هلدینگ اجرا شد. تمام دیوارهای راهرو و اتاق جلسات با میکروسمنت خاکستری سرد پوشش داده شد.",
      "اجرا در ساعات بعد از کار انجام شد تا فعالیت روزانه دفتر متوقف نشود. کنترل گردوغبار و تهویه از الزامات کار بود.",
      "نتیجه، فضایی خنثی است که تابلوها و مبلمان اداری را بهتر نشان می‌دهد.",
    ],
    challenge: "اجرای بدون توقف فعالیت اداری و کنترل گردوغبار در محیط کار.",
    solution: "اجرای شبانه، مکش صنعتی و ایزوله‌بندی موقت مسیرهای عبور.",
    result: "دیوارهای یکدست و بدون درز با ترافیک کاری صفر.",
  },
  {
    slug: "fashion-store",
    title: "فروشگاه پوشاک",
    location: "سعادت‌آباد، تهران",
    year: "۱۴۰۴",
    space: "commercial",
    use: "floor",
    products: ["micro-topping", "microcement-classic"],
    area: "۱۶۵ متر مربع کف",
    duration: "۹ روز کاری",
    image: "/images/product-floor.jpg",
    gallery: ["/images/product-floor.jpg", "/images/project-commercial.jpg", "/images/samples.jpg"],
    summary: "کف شنی مات برای فروشگاه پوشاک، با سیلر مقاوم به سایش و اجرای شبانه.",
    description: [
      "فروشگاه در مجتمعی تجاری قرار داشت و امکان تعطیلی طولانی وجود نداشت. کف با میکروتاپینگ تراز و سپس میکروسمنت شنی مات اجرا شد.",
      "سیلر با مقاومت سایش بالا برای تردد زیاد انتخاب شد. اجرا در سه مرحله شبانه انجام و هر روز صبح فروشگاه بازگشایی شد.",
      "نورپردازی فروشگاه پس از اجرا، بافت نرم سطح را بهتر نشان می‌دهد.",
    ],
    challenge: "بازه زمانی کوتاه و نیاز به بازگشایی روزانه فروشگاه.",
    solution: "اجرای فازبندی شبانه و انتخاب سیستم با زمان خشک شدن سریع.",
    result: "کف یکدست با مقاومت سایش بالا و بدون توقف فروش.",
  },
  {
    slug: "kitchen-renovation",
    title: "بازسازی آشپزخانه پاسداران",
    location: "پاسداران، تهران",
    year: "۱۴۰۳",
    space: "residential",
    use: "detail",
    products: ["microcement-wet", "sealer-system"],
    area: "۲۸ متر مربع کانتر و پشت‌سینک",
    duration: "۶ روز کاری",
    image: "/images/project-kitchen.jpg",
    gallery: ["/images/project-kitchen.jpg", "/images/product-bath.jpg", "/images/product-wall.jpg"],
    summary: "کانتر یکپارچه و پشت‌سینک گرافیتی با سینک یکپارچه و لبه گرد.",
    description: [
      "کانتر سنگ قدیمی ترک خورده بود. پس از تثبیت بستر، میکروسمنت ضدآب با ضخامت تقویت‌شده روی کانتر و پشت‌سینک اجرا شد.",
      "لبه‌ها گرد و یکپارچه شدند و سینک قدیمی با سینک زیرکار جدید هماهنگ شد. سیلر مخصوص سطوح کار برای مقاومت به آب و حرارت متعارف اجرا شد.",
      "کارفرما حالا سطحی دارد که در صورت نیاز، قابل ترمیم و بازسازی است.",
    ],
    challenge: "ترک‌های موجود در سنگ و نیاز به اتصال بدون درز لبه کانتر.",
    solution: "تثبیت بستر، تقویت با الیاف و اجرای لبه گرد به روش دستی.",
    result: "کانتر یکپارچه، مقاوم و قابل ترمیم بدون هزینه تعویض سنگ.",
  },
  {
    slug: "villa-guest-house",
    title: "خانه مهمان ویلایی",
    location: "کردان، البرز",
    year: "۱۴۰۲",
    space: "hospitality",
    use: "wall",
    products: ["venetian-plaster", "microcement-classic"],
    area: "۱۱۰ متر مربع دیوار",
    duration: "۱۰ روز کاری",
    image: "/images/hero.jpg",
    gallery: ["/images/hero.jpg", "/images/product-wall.jpg", "/images/samples.jpg"],
    summary: "دیوار شاخص پذیرایی با پلاستر ونیزی و ترکیب میکروسمنت در راهرو.",
    description: [
      "این خانه برای اقامت کوتاهمدت طراحی شده بود و به فضایی گرم و قابل عکاسی نیاز داشت. دیوار شاخص با پلاستر ونیزی در رنگ کرم آهکی اجرا شد.",
      "راهرو و اتاق‌ها با میکروسمنت کلاسیک در پالت شنی هماهنگ شدند. نورپردازی نقطه‌ای، بافت دیوار را برجسته می‌کند.",
      "پروژه با هماهنگی کامل با تیم طراحی داخلی و در بازه ۱۰ روزه تحویل شد.",
    ],
    challenge: "هماهنگی پالت رنگی با مبلمان و پارچه‌های موجود.",
    solution: "اجرای سه نمونه رنگ روی دیوار و انتخاب نهایی با کارفرما پیش از اجرا.",
    result: "فضایی گرم و یکپارچه با دیوار شاخص منحصربه‌فرد.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function spaceLabel(id: SpaceId) {
  return spaces.find((s) => s.id === id)?.label ?? "";
}

export function useLabel(id: UseId) {
  return uses.find((u) => u.id === id)?.label ?? "";
}

export function filterProjects({
  space,
  use,
  product,
}: {
  space?: string;
  use?: string;
  product?: string;
}): Project[] {
  return projects.filter(
    (project) =>
      (!space || project.space === space) &&
      (!use || project.use === use) &&
      (!product || project.products.includes(product)),
  );
}
