import { Shield, Target, Lightbulb, HeartHandshake } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Calidad",
    description: "Materiales de primera y acabados superiores en cada proyecto.",
  },
  {
    icon: HeartHandshake,
    title: "Seguridad",
    description: "Cumplimos estrictas normas de seguridad en todas nuestras obras.",
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    description: "Técnicas modernas y sostenibles para construir el futuro.",
  },
  {
    icon: Target,
    title: "Compromiso",
    description: "Entregamos a tiempo y dentro del presupuesto acordado.",
  },
]

export function About() {
  return (
    <section id="nosotros" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            Quiénes Somos
          </span>
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            Nuestra Historia
          </h2>
          <p className="mt-4 text-lg text-secondary leading-relaxed">
            Nacimos en Panamá con la visión de transformar el paisaje urbano y rural del país.
            Con más de 15 años de experiencia, hemos construido cientos de hogares, urbanizaciones
            y obras de infraestructura que mejoran la calidad de vida de las comunidades.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-primary">Misión</h3>
            <p className="mt-3 text-secondary leading-relaxed">
              Desarrollar proyectos de construcción sostenibles y de alta calidad que
              superen las expectativas de nuestros clientes, contribuyendo al crecimiento
              ordenado de las ciudades y comunidades panameñas.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-primary">Visión</h3>
            <p className="mt-3 text-secondary leading-relaxed">
              Ser líderes en desarrollo urbano y construcción residencial en Panamá,
              reconocidos por nuestra calidad constructiva, capacidad de ejecución y
              compromiso con la innovación sostenible.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-center text-xl font-semibold text-primary mb-10">Nuestros Valores</h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="group text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <value.icon className="h-7 w-7" />
                </div>
                <h4 className="mt-4 font-semibold text-primary">{value.title}</h4>
                <p className="mt-2 text-sm text-secondary leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
