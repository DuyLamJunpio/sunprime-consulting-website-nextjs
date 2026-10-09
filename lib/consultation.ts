import type { Lang } from "@/lib/i18n/messages";

export type ConsultationFormData = {
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  message: string;
  consent: boolean;
};

export type ConsultationField = "fullName" | "phone" | "email" | "consent";
export type ConsultationErrors = Partial<Record<ConsultationField, string>>;

export const emptyConsultationForm: ConsultationFormData = {
  fullName: "",
  phone: "",
  email: "",
  serviceId: "",
  message: "",
  consent: false,
};

export const MESSAGE_MAX_LENGTH = 1000;

const MIN_NAME_LENGTH = 2;
// 0xxxxxxxxx / 84xxxxxxxxx / +84xxxxxxxxx (9-10 chữ số sau đầu số), cho phép gõ kèm dấu cách, chấm, gạch.
const PHONE_PATTERN = /^(?:\+84|84|0)\d{9,10}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const errorMessages = {
  vi: {
    fullName: "Vui lòng nhập họ và tên.",
    phone: "Vui lòng nhập số điện thoại hợp lệ (ví dụ 0914 699 877).",
    email: "Email chưa đúng định dạng.",
    consent: "Vui lòng đồng ý để chúng tôi liên hệ tư vấn.",
  },
  en: {
    fullName: "Please enter your full name.",
    phone: "Please enter a valid phone number (e.g. 0914 699 877).",
    email: "Email format looks incorrect.",
    consent: "Please agree to be contacted for the consultation.",
  },
} satisfies Record<Lang, Record<ConsultationField, string>>;

/** Kiểm tra dữ liệu form; trả về object rỗng khi hợp lệ. Email là tuỳ chọn nhưng nếu nhập thì phải đúng định dạng. */
export function validateConsultation(data: ConsultationFormData, lang: Lang): ConsultationErrors {
  const messages = errorMessages[lang];
  const errors: ConsultationErrors = {};

  if (data.fullName.trim().length < MIN_NAME_LENGTH) errors.fullName = messages.fullName;
  if (!PHONE_PATTERN.test(data.phone.replace(/[\s.-]/g, ""))) errors.phone = messages.phone;
  if (data.email.trim() && !EMAIL_PATTERN.test(data.email.trim())) errors.email = messages.email;
  if (!data.consent) errors.consent = messages.consent;

  return errors;
}

/** Lỗi báo rằng việc gửi form chưa được nối vào nơi nhận (email, Telegram hoặc API backend). */
export class ConsultationNotConfiguredError extends Error {
  constructor() {
    super("Consultation submission is not configured yet.");
    this.name = "ConsultationNotConfiguredError";
  }
}

/**
 * ĐIỂM NỐI LOGIC GỬI FORM. Hiện chưa gửi đi đâu nên luôn ném ConsultationNotConfiguredError
 * để giao diện báo lỗi trung thực thay vì giả vờ đã gửi thành công.
 * Khi làm logic: gọi route/API của bạn tại đây và resolve khi gửi thành công, throw khi thất bại.
 */
export async function submitConsultation(data: ConsultationFormData): Promise<void> {
  void data;
  throw new ConsultationNotConfiguredError();
}
