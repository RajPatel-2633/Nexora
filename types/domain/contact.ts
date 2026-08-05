export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  subject?: string;
}
