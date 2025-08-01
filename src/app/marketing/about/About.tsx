{
  /* Quién Somos Section */
}
<section id="nosotros" className="py-20 bg-background">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ¿Quiénes somos?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Somos la empresa líder en arriendo de camiones en Chile, con más de 10 años
            de experiencia brindando soluciones de transporte confiables y flexibles.
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Nuestra flota moderna y nuestro equipo de profesionales garantizan que
            tengas la mejor experiencia de arriendo, ya sea que necesites un chofer o
            prefieras manejar tú mismo.
          </p>
          <div className="flex flex-wrap gap-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
              +500 clientes satisfechos
            </Badge>
            <Badge className="bg-truck-blue/10 text-truck-blue border-truck-blue/20 px-4 py-2">
              Flota moderna
            </Badge>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 bg-gradient-to-br from-primary to-truck-blue rounded-full flex items-center justify-center shadow-2xl">
              <div className="w-48 h-48 bg-background rounded-full flex items-center justify-center">
                <Truck className="w-24 h-24 text-primary" />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-truck-orange rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">10+</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>;
