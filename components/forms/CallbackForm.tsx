"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

interface CallbackFormProps {
  onSuccess?: () => void;
}

export default function CallbackForm({ onSuccess }: CallbackFormProps) {
  const t = useTranslations("callback_form");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, type: "callback" }),
    });
    setSuccess(true);
    onSuccess?.();
  }

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <CheckCircle size={40} style={{ color: "var(--blue)", margin: "0 auto 12px" }} />
        <p style={{ fontSize: 14, color: "var(--ink)", fontWeight: 600 }}>{t("success")}</p>
      </div>
    );
  }

  const inputStyle = {
    width: "100%",
    border: "1.5px solid var(--border)",
    padding: "11px 14px",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
  };

  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--gray)", marginBottom: 20, lineHeight: 1.6 }}>{t("subtitle")}</p>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input {...register("name")} placeholder={t("name_placeholder")} style={inputStyle} required aria-required="true" />
        {errors.name && <p style={{ fontSize: 11, color: "#dc2626" }}>Введите имя</p>}
        <input {...register("phone")} placeholder={t("phone_placeholder")} type="tel" style={inputStyle} required aria-required="true" />
        {errors.phone && <p style={{ fontSize: 11, color: "#dc2626" }}>Введите телефон</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center", opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}
