{
  /* FAQ */
}
<section className="py-20 bg-card">
  <div className="container mx-auto px-6">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Preguntas Frecuentes
        </h2>
        <p className="text-xl text-muted-foreground">
          Encuentra respuestas a las dudas más comunes
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <Card key={index} className="bg-background border-2 border-border">
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-foreground">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </div>
            </CardHeader>
            {openFaq === index && (
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  </div>
</section>;
