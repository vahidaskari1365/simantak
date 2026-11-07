"use client";

import { useState } from "react";
import { ArrowIcon } from "@/components/brand";
import { fa, faPriceToman, toLatinDigits } from "@/lib/format";

export function MaterialEstimator({
  slug,
  unit,
  price,
  coverage,
  whatsapp,
}: {
  slug: string;
  unit: string;
  price?: number;
  coverage: { floor: number; wall: number };
  whatsapp: string;
}) {
  const [area, setArea] = useState("");
  const [surface, setSurface] = useState<"floor" | "wall">(
    coverage.floor > 0 ? "floor" : "wall",
  );
  const [layers, setLayers] = useState("2");

  const areaValue = Number(toLatinDigits(area).replace(/[^\d.]/g, "")) || 0;
  const perUnit = coverage[surface] || coverage.wall || 10;
  const waste = layers === "3" ? 1.18 : 1.1;
  const units = areaValue > 0 ? Math.max(1, Math.ceil((areaValue / perUnit) * waste)) : 0;
  const estimate = units && price ? units * price : 0;

  const message = encodeURIComponent(
    `سلام، برای ${areaValue || "—"} متر مربع سطح ${surface === "floor" ? "کف" : "دیوار"} با ${
      unit
    } محصول (${slug}) برآورد ${units || "—"} واحد را دیدم. لطفاً تأیید و پیش‌فاکتور ارسال کنید.`,
  );

  return (
    <div className="border border-line">
      <div className="border-b border-line px-5 py-4">
        <h2 className="text-sm">محاسبه‌گر متریال</h2>
        <p className="mt-1 text-[10px] text-mist">تعداد تقریبی {unit} مورد نیاز شما</p>
      </div>
      <div className="space-y-4 px-5 py-5">
        <div>
          <label htmlFor="calc-area" className="field-label">
            متراژ سطح (متر مربع)
          </label>
          <input
            id="calc-area"
            value={area}
            onChange={(event) => setArea(toLatinDigits(event.target.value).replace(/[^\d.]/g, ""))}
            inputMode="decimal"
            placeholder="مثلاً ۴۵"
            className="field"
          />
        </div>

        <div>
          <span className="field-label">نوع سطح</span>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {[
              { id: "floor" as const, label: "کف" },
              { id: "wall" as const, label: "دیوار / نما" },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSurface(option.id)}
                className={`border px-3 py-2.5 text-[11px] transition-colors ${
                  surface === option.id
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-graphite hover:border-ink"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="field-label">تعداد لایه پیشنهادی</span>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {["2", "3"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLayers(option)}
                className={`border px-3 py-2.5 text-[11px] transition-colors ${
                  layers === option
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-graphite hover:border-ink"
                }`}
              >
                {fa(option)} لایه
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-line pt-4">
          <div className="flex items-end justify-between gap-3">
            <span className="text-[11px] text-mist">برآورد تعداد</span>
            <span className="text-lg text-ink">
              {units ? `${fa(units)} ${unit.split(" ")[0]}` : "—"}
            </span>
          </div>
          <div className="mt-2 flex items-end justify-between gap-3">
            <span className="text-[11px] text-mist">هزینه تقریبی</span>
            <span className="text-[13px] text-ink">
              {estimate ? faPriceToman(estimate) : "تماس بگیرید"}
            </span>
          </div>
          <p className="mt-3 text-[10px] leading-5 text-mist">
            برآورد بر پایه پوشش‌دهی هر {unit} و ۱۰ تا ۱۸ درصد پرت اجرایی محاسبه شده است. مقدار
            قطعی پس از بازدید فنی اعلام می‌شود.
          </p>
          <a
            href={`${whatsapp}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-4 w-full !py-3 text-[12px]"
          >
            تأیید برآورد در واتساپ
            <ArrowIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
