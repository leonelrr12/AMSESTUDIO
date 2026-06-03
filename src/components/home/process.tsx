import { ClipboardList, PenTool, Calculator, HardHat, CheckCircle2 } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "Consulta Inicial",
    description: "Nos reunimos para entender tus necesidades, el terreno y tu visión del proyecto.",
  },
  {
    icon: PenTool,
    title: "Diseño Arquitectónico",
    description: "Creamos planos, renderizados 3D y definimos cada detalle del diseño.",
  },
  {
    icon: Calculator,
    title: "Presupuesto",
    description: "Presentamos un desglose detallado de costos con total transparencia.",
  },
  {
    icon: HardHat,
    title: "Construcción",
    description: "Ejecutamos la obra con ingenieros calificados y supervisión constante.",
  },
  {
    icon: CheckCircle2,
    title: "Entrega",
    description: "Entregamos el proyecto terminado con todos los acabados y garantía.",
  },
]

export function Process() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            Proceso
          </span>
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            Cómo trabajamos
          </h2>
          <p className="mt-4 text-lg text-secondary">
            Un proceso claro y transparente de principio a fin.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-8 top-0 h-full w-0.5 bg-secondary-200 hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={step.title} className="relative md:flex md:items-start md:gap-8">
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/25 mx-auto md:mx-0">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="mt-4 md:mt-0 md:pt-2 text-center md:text-left">
                  <span className="inline-flex items-center justify-center rounded-full bg-primary-50 px-3 py-0.5 text-xs font-semibold text-primary mb-2">
                    Paso {i + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-primary">{step.title}</h3>
                  <p className="mt-2 text-secondary leading-relaxed max-w-xl">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
