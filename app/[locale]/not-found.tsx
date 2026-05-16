import Link from "next/link";
import { FlaskConical } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        textAlign: "center",
        background: "var(--silver)",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 80,
          height: 80,
          background: "var(--blue)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 32,
        }}
      >
        <FlaskConical size={36} color="white" />
      </div>

      {/* 404 */}
      <div
        style={{
          fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif",
          fontSize: "clamp(64px, 12vw, 120px)",
          fontWeight: 700,
          color: "var(--blue)",
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        404
      </div>

      <h1
        style={{
          fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif",
          fontSize: "clamp(20px, 3vw, 32px)",
          fontWeight: 700,
          color: "var(--ink)",
          marginBottom: 12,
        }}
      >
        Страница не найдена
      </h1>

      <p
        style={{
          fontSize: 15,
          color: "var(--gray)",
          lineHeight: 1.7,
          maxWidth: 420,
          marginBottom: 40,
        }}
      >
        Возможно, товар был удалён или ссылка устарела. Воспользуйтесь каталогом,
        чтобы найти нужное оборудование.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/ru/catalog"
          className="btn-primary"
        >
          Перейти в каталог
        </Link>
        <Link
          href="/ru"
          className="btn-outline"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
