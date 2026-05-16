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
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface LeadFormProps {
  productId?: string;
  productName?: string;
  onSuccess?: () => void;
}

export default function LeadForm({ productId, productName, onSuccess }: LeadFormProps) {
  const t = useTranslations("lead_form");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, product_id: productId, product_name: productName }),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      onSuccess?.();
    } catch {
      setServerError(t("error"));
    }
  }

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <CheckCircle size={48} style={{ color: "var(--blue)", margin: "0 auto 16px" }} />
        <h3 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
          {t("success_title")}
        </h3>
        <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.7 }}>{t("success_text")}</p>
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
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: "var(--ink)",
    marginBottom: 6,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  };

  const errorStyle = { fontSize: 11, color: "#dc2626", marginTop: 4 };

  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--gray)", marginBottom: 24, lineHeight: 1.6 }}>{t("subtitle")}</p>
      {productName && (
        <div style={{ background: "var(--blue-lt)", borderLeft: "3px solid var(--blue)", padding: "12px 16px", marginBottom: 24, fontSize: 13, color: "var(--ink)" }}>
          <strong>Товар:</strong> {productName}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={labelStyle}>{t("name_label")} *</label>
          <input {...register("name")} placeholder={t("name_placeholder")} style={inputStyle} required aria-required="true" />
          {errors.name && <p style={errorStyle}>{t("required")}</p>}
        </div>
        <div>
          <label style={labelStyle}>{t("phone_label")} *</label>
          <input {...register("phone")} placeholder={t("phone_placeholder")} type="tel" style={inputStyle} required aria-required="true" />
          {errors.phone && <p style={errorStyle}>{t("phone_invalid")}</p>}
        </div>
        <div>
          <label style={labelStyle}>{t("email_label")}</label>
          <input {...register("email")} placeholder={t("email_placeholder")} type="email" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{t("message_label")}</label>
          <textarea
            {...register("message")}
            placeholder={t("message_placeholder")}
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>
        {serverError && <p style={{ ...errorStyle, fontSize: 13 }}>{serverError}</p>}
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
