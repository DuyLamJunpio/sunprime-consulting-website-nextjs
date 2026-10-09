"use client";

import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { useI18n } from "@/components/i18n-provider";
import { getServiceCategories } from "@/data/services";
import {
  MESSAGE_MAX_LENGTH,
  emptyConsultationForm,
  submitConsultation,
  validateConsultation,
  type ConsultationErrors,
  type ConsultationField,
  type ConsultationFormData,
} from "@/lib/consultation";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: readonly ConsultationField[] = ["fullName", "phone", "email", "consent"];
const DISPLAY_PHONE = "0914 699 877";

const copy = {
  vi: {
    title: "Để lại thông tin, chúng tôi sẽ liên hệ tư vấn",
    subtitle: "Điền nhanh vài thông tin bên dưới, đội ngũ SunPrime sẽ liên hệ với bạn.",
    fullName: "Họ và tên",
    fullNamePlaceholder: "Nguyễn Văn A",
    phone: "Số điện thoại",
    phonePlaceholder: "09xx xxx xxx",
    email: "Email (không bắt buộc)",
    emailPlaceholder: "ban@congty.vn",
    service: "Dịch vụ quan tâm (không bắt buộc)",
    servicePlaceholder: "Chọn dịch vụ",
    message: "Nội dung cần tư vấn (không bắt buộc)",
    messagePlaceholder: "Mô tả ngắn nhu cầu của bạn...",
    consentPrefix: "Tôi đồng ý để SunPrime Consulting liên hệ tư vấn và đã đọc ",
    privacyLink: "Chính sách bảo mật",
    submit: "Gửi yêu cầu tư vấn",
    submitting: "Đang gửi...",
    errorLead: "Chưa gửi được yêu cầu. Vui lòng thử lại hoặc gọi ",
    successTitle: "Cảm ơn bạn đã để lại thông tin",
    successBody: "SunPrime đã nhận được yêu cầu và sẽ liên hệ với bạn sớm.",
    sendAnother: "Gửi yêu cầu khác",
  },
  en: {
    title: "Leave your details and we will get in touch",
    subtitle: "Fill in a few details below and the SunPrime team will contact you.",
    fullName: "Full name",
    fullNamePlaceholder: "John Smith",
    phone: "Phone number",
    phonePlaceholder: "09xx xxx xxx",
    email: "Email (optional)",
    emailPlaceholder: "you@company.com",
    service: "Service of interest (optional)",
    servicePlaceholder: "Select a service",
    message: "What do you need advice on? (optional)",
    messagePlaceholder: "Briefly describe your needs...",
    consentPrefix: "I agree to be contacted by SunPrime Consulting and have read the ",
    privacyLink: "Privacy Policy",
    submit: "Request a consultation",
    submitting: "Sending...",
    errorLead: "We could not send your request. Please try again or call ",
    successTitle: "Thank you for your details",
    successBody: "SunPrime has received your request and will get back to you soon.",
    sendAnother: "Send another request",
  },
} as const;

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-surface-base px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:outline-none focus:ring-2 ${
    hasError
      ? "border-state-danger focus:ring-state-danger/30"
      : "border-border-strong focus:border-brand focus:ring-brand-ring"
  }`;

type FieldProps = {
  id: string;
  label: string;
  isRequired?: boolean;
  error?: string;
  children: ReactNode;
};

function Field({ id, label, isRequired = false, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text-primary">
        {label}
        {isRequired && (
          <span className="text-state-danger" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-rose-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ConsultationForm() {
  const { lang } = useI18n();
  const t = copy[lang];
  const baseId = useId();
  const [data, setData] = useState<ConsultationFormData>(emptyConsultationForm);
  const [errors, setErrors] = useState<ConsultationErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const categories = getServiceCategories(lang);
  const isSubmitting = status === "submitting";
  const fieldId = (name: string) => `${baseId}-${name}`;

  const updateField = <K extends keyof ConsultationFormData>(key: K, value: ConsultationFormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key as ConsultationField];
      return next;
    });
  };

  const a11y = (name: ConsultationField) => ({
    id: fieldId(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${fieldId(name)}-error` : undefined,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateConsultation(data, lang);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((name) => nextErrors[name]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await submitConsultation(data);
      setData(emptyConsultationForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="w-full rounded-2xl bg-surface-base p-6 shadow-soft-xl sm:p-8" role="status">
        <h3 className="mb-2 text-xl font-semibold text-text-primary">{t.successTitle}</h3>
        <p className="mb-6 text-sm leading-relaxed text-text-secondary">{t.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="rounded-lg border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full rounded-2xl bg-surface-base p-6 shadow-soft-xl sm:p-8"
    >
      <h3 className="mb-1.5 text-xl font-semibold text-text-primary">{t.title}</h3>
      <p className="mb-6 text-sm leading-relaxed text-text-secondary">{t.subtitle}</p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id={fieldId("fullName")} label={t.fullName} isRequired error={errors.fullName}>
            <input
              {...a11y("fullName")}
              type="text"
              name="fullName"
              autoComplete="name"
              placeholder={t.fullNamePlaceholder}
              value={data.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              className={inputClass(Boolean(errors.fullName))}
            />
          </Field>
          <Field id={fieldId("phone")} label={t.phone} isRequired error={errors.phone}>
            <input
              {...a11y("phone")}
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              placeholder={t.phonePlaceholder}
              value={data.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className={inputClass(Boolean(errors.phone))}
            />
          </Field>
        </div>

        <Field id={fieldId("email")} label={t.email} error={errors.email}>
          <input
            {...a11y("email")}
            type="email"
            name="email"
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            value={data.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        <Field id={fieldId("serviceId")} label={t.service}>
          <select
            id={fieldId("serviceId")}
            name="serviceId"
            value={data.serviceId}
            onChange={(event) => updateField("serviceId", event.target.value)}
            className={inputClass(false)}
          >
            <option value="">{t.servicePlaceholder}</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </Field>

        <Field id={fieldId("message")} label={t.message}>
          <textarea
            id={fieldId("message")}
            name="message"
            rows={3}
            maxLength={MESSAGE_MAX_LENGTH}
            placeholder={t.messagePlaceholder}
            value={data.message}
            onChange={(event) => updateField("message", event.target.value)}
            className={`${inputClass(false)} resize-none`}
          />
        </Field>

        <div>
          <div className="flex items-start gap-3">
            <input
              {...a11y("consent")}
              type="checkbox"
              name="consent"
              checked={data.consent}
              onChange={(event) => updateField("consent", event.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-border-strong accent-brand"
            />
            <label htmlFor={fieldId("consent")} className="text-xs leading-relaxed text-text-secondary">
              {t.consentPrefix}
              <Link
                href="/chinh-sach-bao-mat"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand underline-offset-2 hover:underline"
              >
                {t.privacyLink}
              </Link>
              .
            </label>
          </div>
          {errors.consent && (
            <p id={`${fieldId("consent")}-error`} role="alert" className="mt-1.5 text-xs font-medium text-rose-700">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 rounded-lg bg-rose-50 px-3.5 py-2.5 text-sm text-rose-800">
          {t.errorLead}
          <a href={`tel:${siteConfig.phone}`} className="font-semibold underline">
            {DISPLAY_PHONE}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-button-primary px-6 py-3.5 text-base font-semibold text-button-text transition-all duration-200 hover:bg-button-primary-hover hover:shadow-brand-glow disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? t.submitting : t.submit}
      </button>
    </form>
  );
}
