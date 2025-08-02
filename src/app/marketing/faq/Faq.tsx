"use client";

import { useState } from "react";
import { faqItems } from "@/constants/faq";
import { useDarkMode } from "../../../hooks/index";

const Faq = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { isDark } = useDarkMode();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Alternating colors for variety like in other components
  const getItemColors = (index: number) => {
    const isBlue = index % 2 === 0;
    if (isBlue) {
      return {
        border: isDark
          ? "border-blue-500/20 hover:border-blue-500/40"
          : "border-blue-500/20 hover:border-blue-500/40",
        accent: "text-blue-500",
      };
    } else {
      return {
        border: isDark
          ? "border-amber-500/20 hover:border-amber-500/40"
          : "border-amber-500/20 hover:border-amber-500/40",
        accent: "text-amber-500",
      };
    }
  };

  return (
    <section className={`py-20 ${isDark ? "bg-slate-900" : "bg-white"}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? "text-white" : "text-foreground"}`}
            >
              Preguntas Frecuentes
            </h2>
            <p
              className={`text-xl ${isDark ? "text-gray-300" : "text-muted-foreground"}`}
            >
              Encuentra respuestas a las dudas más comunes
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const colors = getItemColors(index);
              return (
                <div
                  key={item.id}
                  className={`${isDark ? "bg-slate-800" : "bg-background"} border-2 ${colors.border} rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg`}
                >
                  <div
                    className={`cursor-pointer p-6 ${isDark ? "hover:bg-slate-700/50" : "hover:bg-muted/50"} transition-colors duration-200`}
                    onClick={() => toggleFaq(index)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={openFaq === index}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleFaq(index);
                      }
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <h3
                        className={`text-lg font-semibold pr-4 ${isDark ? "text-white" : "text-foreground"}`}
                      >
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0">
                        <svg
                          className={`w-5 h-5 ${colors.accent} transition-transform duration-200 ${
                            openFaq === index ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6,9 12,15 18,9"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <div
                        className={`pl-4 border-l-4 ${index % 2 === 0 ? "border-blue-500/30" : "border-amber-500/30"}`}
                      >
                        <p
                          className={`leading-relaxed ${isDark ? "text-gray-300" : "text-muted-foreground"}`}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
