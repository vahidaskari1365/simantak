import Link from "next/link";
import { ArrowIcon } from "@/components/brand";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -right-24 top-10 h-[24rem] w-[24rem] rounded-full bg-amber blur-[130px]" />
        <div className="absolute -left-20 bottom-0 h-[20rem] w-[20rem] rounded-full bg-red blur-[130px]" />
      </div>
      <div className="wrap relative py-32">
        <span className="eyebrow text-paper/50">خطای ۴۰۴</span>
        <h1 className="mt-6 max-w-2xl text-[clamp(2.2rem,5vw,4rem)] leading-[1.2]">
          این سطح، در نقشه ما پیدا نشد.
        </h1>
        <p className="mt-5 max-w-lg text-sm leading-8 text-paper/60">
          ممکن است آدرس تغییر کرده باشد یا صفحه هنوز منتشر نشده باشد. از مسیرهای زیر ادامه دهید.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            صفحه اصلی
            <ArrowIcon />
          </Link>
          <Link href="/products" className="btn btn-light">
            محصولات
          </Link>
          <Link href="/projects" className="btn btn-light">
            پروژه‌ها
          </Link>
          <Link href="/contact" className="btn btn-light">
            تماس با ما
          </Link>
        </div>
      </div>
    </section>
  );
}
