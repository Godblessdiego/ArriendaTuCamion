"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDarkMode } from "../../../hooks/index";
import {
  FormField,
  ContactFormState,
  FileWithPreview,
  ContactFormFiles,
  DocumentType,
} from "../../../types/forms";

// Componente principal
const Contact = () => {
  const { isDark } = useDarkMode();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado del formulario con validación
  const [form, setForm] = useState<ContactFormState>({
    nombre: { value: "", error: "", touched: false, required: true },
    email: { value: "", error: "", touched: false, required: true },
    telefono: { value: "", error: "", touched: false, required: false },
    tipoServicio: { value: "", error: "", touched: false, required: true },
    duracion: { value: "", error: "", touched: false, required: true },
    mensaje: { value: "", error: "", touched: false, required: false },
  });

  // Estado para archivos
  const [files, setFiles] = useState<ContactFormFiles>({
    licenciaConducir: null,
    carnetFrontal: null,
    carnetTrasero: null,
  });

  // Función para pre-llenar el formulario
  const prefillForm = useCallback((data: any) => {
    if (data.serviceType) {
      setForm((prev) => ({
        ...prev,
        tipoServicio: {
          ...prev.tipoServicio,
          value: data.serviceType,
          touched: true,
        },
      }));
    }
    if (data.duration) {
      setForm((prev) => ({
        ...prev,
        duracion: {
          ...prev.duracion,
          value: data.duration,
          touched: true,
        },
      }));
    }
    if (data.message) {
      setForm((prev) => ({
        ...prev,
        mensaje: {
          ...prev.mensaje,
          value: data.message,
          touched: true,
        },
      }));
    }
  }, []);

  // Escuchar eventos de navegación y datos en localStorage
  useEffect(() => {
    // Verificar datos en localStorage al montar
    const savedData = localStorage.getItem("contactFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        prefillForm(parsedData);
        localStorage.removeItem("contactFormData"); // Limpiar después de usar
      } catch (error) {
        console.warn("Error parsing contact form data:", error);
      }
    }

    // Escuchar eventos personalizados
    const handleUpdateForm = (event: CustomEvent) => {
      prefillForm(event.detail);
    };

    window.addEventListener("updateContactForm", handleUpdateForm as EventListener);

    return () => {
      window.removeEventListener(
        "updateContactForm",
        handleUpdateForm as EventListener,
      );
    };
  }, [prefillForm]);

  // Función de validación
  const validateField = (name: keyof ContactFormState, value: string): string => {
    switch (name) {
      case "nombre":
        return value.trim().length < 3
          ? "El nombre debe tener al menos 3 caracteres"
          : "";
      case "email":
        return !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
          ? "Ingresa un email válido"
          : "";
      case "telefono":
        return !/^\+?\d{8,15}$/.test(value.replace(/\s+/g, ""))
          ? "Ingresa un número de teléfono válido"
          : "";
      case "tipoServicio":
        return value === "" ? "Selecciona un tipo de servicio" : "";
      case "duracion":
        return value === "" ? "Selecciona una duración" : "";
      default:
        return "";
    }
  };

  // Manejador de cambio de inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormState, value);

    setForm((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof ContactFormState],
        value,
        error,
        touched: true,
      },
    }));
  };

  // Manejador de blur para inputs
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormState, value);

    setForm((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof ContactFormState],
        error,
        touched: true,
      },
    }));
  };

  // Verificar si el formulario es válido
  const isFormValid = (): boolean => {
    // Verificar campos de texto
    for (const [key, field] of Object.entries(form)) {
      if (field.required && (field.value.trim() === "" || field.error !== "")) {
        return false;
      }
    }

    // Solo verificar archivos si el usuario va a conducir
    const requiereDocumentos = form.tipoServicio.value === "sin-chofer";
    if (requiereDocumentos) {
      if (!files.licenciaConducir || !files.carnetFrontal || !files.carnetTrasero) {
        return false;
      }
    }

    return true;
  };

  // Funciones para drag and drop
  const onDrop = useCallback(
    (acceptedFiles: FileList | null, fileType: DocumentType) => {
      if (!acceptedFiles || acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      // Validar tipo de archivo
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        setFiles((prev) => ({
          ...prev,
          [fileType]: {
            file,
            preview: URL.createObjectURL(file),
            error: "Tipo de archivo no válido. Solo se permiten JPG, PNG y PDF.",
          },
        }));
        return;
      }

      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFiles((prev) => ({
          ...prev,
          [fileType]: {
            file,
            preview: URL.createObjectURL(file),
            error: "El archivo es demasiado grande. Máximo 5MB.",
          },
        }));
        return;
      }

      setFiles((prev) => ({
        ...prev,
        [fileType]: {
          file,
          preview: URL.createObjectURL(file),
          error: "",
        },
      }));
    },
    [],
  );

  // Función para eliminar un archivo
  const removeFile = (fileType: DocumentType) => {
    setFiles((prev) => ({
      ...prev,
      [fileType]: null,
    }));
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    let formIsValid = true;
    const updatedForm = { ...form };

    for (const key of Object.keys(form) as Array<keyof ContactFormState>) {
      const error = validateField(key, form[key].value);
      if (error) formIsValid = false;
      updatedForm[key] = {
        ...updatedForm[key],
        error,
        touched: true,
      };
    }

    setForm(updatedForm);

    // Solo verificar archivos si el usuario va a conducir
    const requiereDocumentos = form.tipoServicio.value === "sin-chofer";
    if (requiereDocumentos) {
      if (!files.licenciaConducir || files.licenciaConducir.error) formIsValid = false;
      if (!files.carnetFrontal || files.carnetFrontal.error) formIsValid = false;
      if (!files.carnetTrasero || files.carnetTrasero.error) formIsValid = false;
    }

    if (!formIsValid) return;

    // Simular envío del formulario
    setIsSubmitting(true);

    try {
      // Aquí iría la lógica real de envío de datos al servidor
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);

      // Limpiar formulario después de éxito
      setTimeout(() => {
        setForm({
          nombre: { value: "", error: "", touched: false, required: true },
          email: { value: "", error: "", touched: false, required: true },
          telefono: { value: "", error: "", touched: false, required: true },
          tipoServicio: { value: "", error: "", touched: false, required: true },
          duracion: { value: "", error: "", touched: false, required: true },
          mensaje: { value: "", error: "", touched: false, required: false },
        });
        setFiles({
          licenciaConducir: null,
          carnetFrontal: null,
          carnetTrasero: null,
        });
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error al enviar formulario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderizar componente de carga de archivos
  const renderFileUpload = (
    fileType: DocumentType,
    label: string,
    description: string,
  ) => {
    const file = files[fileType];

    return (
      <div className="mt-3">
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          {label} <span className="text-red-500">*</span>
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
            file && !file.error
              ? isDark
                ? "border-blue-500/50 bg-blue-500/10"
                : "border-blue-500/30 bg-blue-50"
              : file && file.error
                ? isDark
                  ? "border-red-500/50 bg-red-500/10"
                  : "border-red-400 bg-red-50"
                : isDark
                  ? "border-gray-600 hover:border-blue-500/50 bg-slate-800/50 hover:bg-blue-500/5"
                  : "border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDrop(e.dataTransfer.files, fileType);
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => onDrop(e.target.files, fileType)}
          />

          {file ? (
            <div className="relative">
              {file.file.type.includes("image") ? (
                <img
                  src={file.preview}
                  alt={label}
                  className="max-h-48 mx-auto rounded"
                />
              ) : (
                <div
                  className={`flex items-center justify-center py-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="ml-2">{file.file.name}</span>
                </div>
              )}

              {file.error && <p className="text-red-500 text-sm mt-2">{file.error}</p>}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(fileType);
                }}
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-12 w-12 mx-auto ${isDark ? "text-gray-500" : "text-gray-400"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p
                className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Arrastra y suelta tu archivo aquí, o haz clic para seleccionarlo
              </p>
              <p
                className={`mt-1 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                {description}
              </p>
              <p
                className={`mt-1 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Formatos: JPG, PNG, PDF (máx. 5MB)
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      id="contactanos"
      className={`py-20 ${isDark ? "bg-slate-900" : "bg-white"}`}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-foreground"}`}
            >
              Contáctanos
            </h2>
            <p
              className={`text-xl ${isDark ? "text-gray-300" : "text-muted-foreground"}`}
            >
              ¿Tienes preguntas? Estamos aquí para ayudarte
            </p>
          </div>

          <div
            className={`rounded-xl shadow-lg border-2 ${
              isDark ? "bg-slate-800 border-blue-500/20" : "bg-white border-blue-500/20"
            }`}
          >
            <div className="p-8">
              {submitSuccess ? (
                <div className="text-center py-12">
                  <div
                    className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
                      isDark ? "bg-blue-500/20" : "bg-blue-100"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3
                    className={`text-2xl font-bold mt-4 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    ¡Mensaje enviado con éxito!
                  </h3>
                  <p className={`mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    Nos pondremos en contacto contigo a la brevedad.
                  </p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Nombre <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre completo"
                        value={form.nombre.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 rounded-md border ${
                          form.nombre.touched && form.nombre.error
                            ? "border-red-500 focus:ring-red-500"
                            : isDark
                              ? "border-gray-600 bg-slate-700 text-white focus:border-blue-500 focus:ring-blue-500"
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        } transition-colors`}
                      />
                      {form.nombre.touched && form.nombre.error && (
                        <p className="mt-1 text-sm text-red-500">{form.nombre.error}</p>
                      )}
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="tu@email.com"
                        value={form.email.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 rounded-md border ${
                          form.email.touched && form.email.error
                            ? "border-red-500 focus:ring-red-500"
                            : isDark
                              ? "border-gray-600 bg-slate-700 text-white focus:border-blue-500 focus:ring-blue-500"
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        } transition-colors`}
                      />
                      {form.email.touched && form.email.error && (
                        <p className="mt-1 text-sm text-red-500">{form.email.error}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      placeholder="+56 9 1234 5678"
                      value={form.telefono.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 rounded-md border ${
                        form.telefono.touched && form.telefono.error
                          ? "border-red-500 focus:ring-red-500"
                          : isDark
                            ? "border-gray-600 bg-slate-700 text-white focus:border-blue-500 focus:ring-blue-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      } transition-colors`}
                    />
                    {form.telefono.touched && form.telefono.error && (
                      <p className="mt-1 text-sm text-red-500">{form.telefono.error}</p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Tipo de Servicio <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="tipoServicio"
                        value={form.tipoServicio.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 rounded-md border ${
                          form.tipoServicio.touched && form.tipoServicio.error
                            ? "border-red-500 focus:ring-red-500"
                            : isDark
                              ? "border-gray-600 bg-slate-700 text-white focus:border-blue-500 focus:ring-blue-500"
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        } transition-colors`}
                      >
                        <option value="" disabled>
                          Selecciona el servicio
                        </option>
                        <option value="con-chofer">Arriendo con chofer</option>
                        <option value="sin-chofer">Arriendo para mí</option>
                        <option value="consulta">Consulta general</option>
                      </select>
                      {form.tipoServicio.touched && form.tipoServicio.error && (
                        <p className="mt-1 text-sm text-red-500">
                          {form.tipoServicio.error}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Duración del Arriendo <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="duracion"
                        value={form.duracion.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 rounded-md border ${
                          form.duracion.touched && form.duracion.error
                            ? "border-red-500 focus:ring-red-500"
                            : isDark
                              ? "border-gray-600 bg-slate-700 text-white focus:border-blue-500 focus:ring-blue-500"
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        } transition-colors`}
                      >
                        <option value="" disabled>
                          Horas o días
                        </option>
                        <option value="horas">Por horas (4-12 horas)</option>
                        <option value="1-dia">1 día</option>
                        <option value="2-7-dias">2-7 días</option>
                        <option value="semanal">Semanal</option>
                        <option value="mensual">Mensual</option>
                        <option value="otro">Otro</option>
                      </select>
                      {form.duracion.touched && form.duracion.error && (
                        <p className="mt-1 text-sm text-red-500">
                          {form.duracion.error}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Mensaje
                    </label>
                    <textarea
                      name="mensaje"
                      placeholder="Cuéntanos qué necesitas..."
                      rows={4}
                      value={form.mensaje.value}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-md border resize-none ${
                        isDark
                          ? "border-gray-600 bg-slate-700 text-white focus:border-blue-500 focus:ring-blue-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      } transition-colors`}
                    />
                  </div>

                  {/* Documentación requerida */}
                  <div
                    className={`p-4 rounded-lg ${isDark ? "bg-blue-900/20" : "bg-blue-50"}`}
                    style={{
                      display:
                        form.tipoServicio.value === "sin-chofer" ? "block" : "none",
                    }}
                  >
                    <h3
                      className={`font-bold text-lg ${isDark ? "text-blue-400" : "text-blue-700"}`}
                    >
                      Documentación requerida
                    </h3>
                    <p
                      className={`text-sm mt-1 mb-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                    >
                      Para arrendar camiones de más de 5 toneladas, necesitamos
                      verificar tus documentos.
                    </p>

                    {renderFileUpload(
                      "licenciaConducir",
                      "Licencia de Conducir Clase A2 o Superior",
                      "En Chile, para conducir camiones de carga de 3/4 (más de 5 toneladas), se requiere licencia profesional Clase A2 o superior.",
                    )}

                    {renderFileUpload(
                      "carnetFrontal",
                      "Cédula de Identidad (Frontal)",
                      "Parte frontal de tu Cédula de Identidad chilena vigente.",
                    )}

                    {renderFileUpload(
                      "carnetTrasero",
                      "Cédula de Identidad (Trasera)",
                      "Parte trasera de tu Cédula de Identidad chilena vigente.",
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid()}
                    className={`w-full py-3 px-4 rounded-md font-medium transition-colors text-white ${
                      isFormValid()
                        ? isDark
                          ? "bg-blue-600 hover:bg-blue-500"
                          : "bg-blue-500 hover:bg-blue-600"
                        : isDark
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      "Enviar mensaje"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
