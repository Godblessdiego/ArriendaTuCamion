import type { Metadata } from "next";
import Navbar from "./marketing/navbar/Navbar";
import Hero from "./marketing/hero/Hero";
import Services from "./marketing/services/Services";
import About from "./marketing/about/About";
import Trucks from "./marketing/trucks/Trucks";
import Contact from "./marketing/contact/Contact";

export const metadata: Metadata = {
  title: "ArriendaTuCamión - Arriendo de Camiones 3/4 en Santiago de Chile",
  description:
    "Arrienda camiones 3/4 en Santiago de Chile de forma rápida y segura. La mejor plataforma para alquilar vehículos de carga con precios competitivos y sin complicaciones.",
  keywords:
    "arriendo camiones,arriendo camiones 3/4,camiones para mudanza, alquiler camiones 3/4, camiones Santiago, arriendo vehículos carga, ArriendaTuCamión, alquiler camiones, transporte carga Santiago",
  authors: [{ name: "ArriendaTuCamión" }],
  creator: "Diego Figueroa Bravo",
  publisher: "Patagonia Devs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://arriendatucamion.cl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ArriendaTuCamión - Arriendo de Camiones 3/4 en Santiago",
    description:
      "La forma más fácil y rápida de arrendar camiones 3/4 en Santiago de Chile. Reserva online en minutos.",
    url: "https://arriendatucamion.cl",
    siteName: "ArriendaTuCamión",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ArriendaTuCamión - Plataforma de arriendo de camiones",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArriendaTuCamión - Arriendo de Camiones 3/4 en Santiago",
    description: "Arrienda camiones 3/4 en Santiago de forma rápida y segura.",
    images: ["/twitter-image.jpg"],
    creator: "@arriendatucamion",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-verification-code",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
        <Services />
        <About />
        <Trucks />
        <Contact />
      </main>
    </div>
  );
}
