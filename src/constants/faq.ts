export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "¿Cuánto tiempo puedo arrendar un camión?",
    answer:
      "Puedes arrendar desde un día hasta varios meses, según tus necesidades. Ofrecemos flexibilidad total en los plazos.",
    category: "duracion",
  },
  {
    id: 2,
    question: "¿Incluye seguro el arriendo?",
    answer:
      "Sí, todos nuestros vehículos incluyen seguro completo contra todo riesgo para tu tranquilidad.",
    category: "seguro",
  },
  {
    id: 3,
    question: "¿Qué documentos necesito?",
    answer:
      "Solo necesitas tu licencia de conducir vigente, cédula de identidad y tarjeta de crédito o débito.",
    category: "documentos",
  },
  {
    id: 4,
    question: "¿Puedo cancelar mi reserva?",
    answer:
      "Sí, puedes cancelar hasta 24 horas antes sin costo adicional. Para cancelaciones posteriores aplicará una tarifa mínima.",
    category: "cancelacion",
  },
  {
    id: 5,
    question: "¿Tienen asistencia en carretera?",
    answer:
      "Sí, contamos con asistencia en carretera 24/7 en todo el territorio nacional. Nuestro equipo técnico está preparado para cualquier eventualidad.",
    category: "asistencia",
  },
  {
    id: 6,
    question: "¿Cuál es el proceso de entrega del camión?",
    answer:
      "La entrega se realiza en nuestras sucursales o directamente en tu ubicación. Realizamos una inspección conjunta del vehículo y te explicamos todas sus características.",
    category: "entrega",
  },
];

export const faqCategories = {
  duracion: "Duración del arriendo",
  seguro: "Seguros y protección",
  documentos: "Documentación requerida",
  cancelacion: "Cancelaciones y cambios",
  asistencia: "Asistencia técnica",
  entrega: "Entrega y devolución",
};
