"use client";

import { useCallback } from "react";

export interface ContactNavigationOptions {
  serviceType?: "con-chofer" | "sin-chofer" | "consulta";
  duration?: string;
  message?: string;
}

export const useContactNavigation = () => {
  const scrollToContact = useCallback((options?: ContactNavigationOptions) => {
    // Scroll to contact section
    const contactSection = document.getElementById("contactanos");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    // If options are provided, set them in localStorage for the contact form to pick up
    if (options) {
      localStorage.setItem("contactFormData", JSON.stringify(options));

      // Dispatch custom event to notify contact form
      window.dispatchEvent(new CustomEvent("updateContactForm", {
        detail: options
      }));
    }
  }, []);

  const navigateToContactWithChofer = useCallback(() => {
    scrollToContact({
      serviceType: "con-chofer",
      message: "Estoy interesado en arrendar un camión con chofer incluido."
    });
  }, [scrollToContact]);

  const navigateToContactSinChofer = useCallback(() => {
    scrollToContact({
      serviceType: "sin-chofer",
      message: "Estoy interesado en arrendar un camión para manejar yo mismo."
    });
  }, [scrollToContact]);

  const navigateToContact = useCallback(() => {
    scrollToContact({
      serviceType: "consulta",
      message: "Me gustaría obtener más información sobre el arriendo de camiones."
    });
  }, [scrollToContact]);

  const navigateToContactWithTruck = useCallback((truckModel: string, serviceType: "con-chofer" | "sin-chofer") => {
    scrollToContact({
      serviceType,
      message: `Estoy interesado en arrendar el ${truckModel} ${serviceType === "con-chofer" ? "con chofer incluido" : "para manejar yo mismo"}.`
    });
  }, [scrollToContact]);

  return {
    scrollToContact,
    navigateToContact,
    navigateToContactWithChofer,
    navigateToContactSinChofer,
    navigateToContactWithTruck
  };
};
