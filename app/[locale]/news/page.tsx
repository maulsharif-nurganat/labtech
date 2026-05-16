import { SITE_URL } from "@/lib/siteUrl";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Calendar } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "news" });
  return { title: t("title"), alternates: { canonical: `${SITE_URL}/${locale}/news` } };
}

const MOCK_NEWS = [
  {
    id: 1,
    date: "2 августа 2024",
    tag: "Новый продукт",
    title: "Энтерофлор Дети — диагностика микробиоты у детей",
    summary: "В ассортимент добавлен новый диагностический набор «Энтерофлор Дети» для исследования состава микробиоты кишечника у детей. Набор позволяет выявлять дисбаланс микрофлоры методом ПЦР в реальном времени.",
  },
  {
    id: 2,
    date: "1 декабря 2023",
    tag: "Новый продукт",
    title: "Набор для экспресс-анализа стрептококка А «Мульти Тест»",
    summary: "Представлен набор для экспресс-диагностики стрептококка группы А в выделениях из слизистых оболочек. Результат за 5 минут — без специального оборудования. Актуально для поликлиник и приёмных отделений.",
  },
  {
    id: 3,
    date: "6 ноября 2023",
    tag: "Новый продукт",
    title: "МикозоСкрин — экспресс-диагностика грибковых инфекций",
    summary: "В каталог включён диагностический набор МикозоСкрин для выявления основных грибковых патогенов. Набор предназначен для клинико-диагностических лабораторий инфекционных и дерматологических стационаров.",
  },
  {
    id: 4,
    date: "6 ноября 2023",
    tag: "Партнёрство",
    title: "UMC Комплекс: комплексное оснащение лабораторий",
    summary: "LabTech подписал соглашение о поставке комплектации для лабораторий Университетского медицинского центра. В пакет вошли биохимические анализаторы, гематология и расходные материалы на 12 месяцев.",
  },
  {
    id: 5,
    date: "6 апреля 2022",
    tag: "Регистрация",
    title: "БакРезист GLA зарегистрирован в Казахстане",
    summary: "Завершена государственная регистрация диагностического набора «БакРезист GLA» производства компании DNA-Technology (Россия). Набор предназначен для выявления генов резистентности к антибиотикам методом ПЦР.",
  },
];

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <Breadcrumb items={[{ label: t("news.title") }]} />

      {/* Hero */}
      <section style={{ background: "var(--blue)", color: "white", paddingTop: "64px", paddingBottom: "64px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            {t("news.tag")}
          </div>
          <h1 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1 }}>
            {t("news.title")}
          </h1>
        </div>
      </section>

      {/* News list */}
      <section style={{ paddingTop: "60px", paddingBottom: "60px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          {MOCK_NEWS.map((item) => (
            <article
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: 40,
                padding: "40px 0",
                borderBottom: "1px solid var(--border)",
                alignItems: "start",
              }}
              className="news-article"
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--gray)", fontSize: 12, fontWeight: 500, marginBottom: 10 }}>
                  <Calendar size={13} style={{ color: "var(--blue)" }} />
                  {item.date}
                </div>
                <div style={{
                  display: "inline-block",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--blue)",
                  background: "var(--blue-lt)",
                  padding: "3px 10px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}>
                  {item.tag}
                </div>
              </div>
              <div>
                <h2 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 12, lineHeight: 1.35 }}>
                  {item.title}
                </h2>
                <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.75, marginBottom: 16 }}>{item.summary}</p>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
                  {t("news.read_more")} →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
