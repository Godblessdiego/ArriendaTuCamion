// Form field type with validation
export type FormField = {
  value: string;
  error: string;
  touched: boolean;
  required: boolean;
};

// Contact form state
export type ContactFormState = {
  nombre: FormField;
  email: FormField;
  telefono: FormField;
  tipoServicio: FormField;
  duracion: FormField;
  mensaje: FormField;
};

// File upload with preview
export type FileWithPreview = {
  file: File;
  preview: string;
  error: string;
};

// File uploads state for contact form
export type ContactFormFiles = {
  licenciaConducir: FileWithPreview | null;
  carnetFrontal: FileWithPreview | null;
  carnetTrasero: FileWithPreview | null;
};

// Document types
export type DocumentType = "licenciaConducir" | "carnetFrontal" | "carnetTrasero";

// Review types
export interface Review {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  createdAt: string;
}

// Add review form data
export interface AddReviewFormData {
  name: string;
  role: string;
  comment: string;
  rating: number;
  email: string;
}

// Form errors for review form
export interface ReviewFormErrors {
  name?: string;
  role?: string;
  comment?: string;
  rating?: string;
  email?: string;
}
