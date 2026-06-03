import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const posts = [
  {
    title: "Costos de Construcción en Panamá: Guía 2025",
    slug: "costos-de-construccion-en-panama",
    excerpt:
      "Conoce los precios actualizados por metro cuadrado para construir casas, urbanizaciones y obras de infraestructura en Panamá. Factores que influyen en el costo final.",
    content: `Construir en Panamá es una inversión importante y conocer los costos actualizados es fundamental para planificar tu proyecto.

## Factores que Influyen en el Costo

### 1. Tipo de Proyecto
El costo por metro cuadrado varía significativamente según el tipo de construcción:

- **Vivienda unifamiliar básica:** $700 – $850/m²
- **Vivienda unifamiliar estándar:** $850 – $1,100/m²
- **Vivienda unifamiliar premium:** $1,200 – $1,500/m²
- **Edificio de apartamentos:** $900 – $1,300/m²
- **Urbanización (por vivienda):** $400 – $700/m²
- **Infraestructura vial:** $350 – $600/m²

### 2. Nivel de Acabados
Los acabados pueden representar hasta el 40% del costo total:

- **Básico:** Cemento pulido, ventanas estándar, sanitarios básicos
- **Estándar:** Pisos cerámicos, ventanas de aluminio, muebles de cocina
- **Premium:** Mármol importado, ventanas termopanel, domótica

### 3. Ubicación
La provincia donde construyas afecta los costos:

- **Panamá (Ciudad):** Los costos son 15-20% más altos
- **Panamá Oeste:** 5-10% menos que en la ciudad
- **Interior del país:** Hasta 20% menos, pero hay que considerar transporte de materiales

## Costos Adicionales a Considerar

- **Permisos de construcción:** 3-5% del costo total
- **Estudios de suelo:** $500 – $2,000
- **Diseño arquitectónico:** $40 – $150/m²
- **Supervisión de obra:** 5-10% del costo de construcción

## Consejos para Ahorrar

1. **Planifica bien:** Los cambios durante la construcción son costosos
2. **Compra materiales al por mayor:** Puedes ahorrar hasta un 15%
3. **Construye en temporada seca:** Los retrasos por lluvia aumentan costos
4. **Elige un constructor con experiencia:** Evita costosas correcciones

> **Nota:** Estos precios son estimados y pueden variar según el mercado. Para un presupuesto preciso, usa nuestra [calculadora de construcción](/presupuesto) o solicita una cotización personalizada.`,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    tags: ["costos", "construcción", "guía", "Panamá"],
    author: "Arq. Angel Sosa",
  },
  {
    title: "Cómo Construir una Casa Desde Cero en Panamá",
    slug: "como-construir-una-casa-desde-cero",
    excerpt:
      "Guía completa con los 10 pasos esenciales para construir tu vivienda en Panamá: desde la compra del terreno hasta la entrega de llaves.",
    content: `Construir tu propia casa es uno de los proyectos más emocionantes y gratificantes. Te guiamos paso a paso.

## Paso 1: Adquirir el Terreno
Antes de construir, necesitas un terreno. Verifica:
- **Título de propiedad** registrado en el Registro Público
- **Uso de suelo** permitido para vivienda
- **Servicios básicos:** agua, luz, internet
- **Acceso vial** en buen estado

## Paso 2: Diseño Arquitectónico
Trabaja con un arquitecto para:
- Definir la distribución de espacios
- Crear planos arquitectónicos y estructurales
- Generar renderizados 3D para visualizar el resultado
- Obtener planos de instalaciones eléctricas y sanitarias

## Paso 3: Estudio de Suelo
Un estudio geotécnico determina:
- Capacidad de carga del terreno
- Tipo de cimentación necesaria
- Nivel freático

## Paso 4: Permisos de Construcción
Necesitarás:
- **Permiso municipal** (aprobación de planos)
- **Visto bueno** de AESG (Ingeniería Sanitaria)
- **Aprobación** del cuerpo de bomberos
- **Permiso de excavación** si aplica

## Paso 5: Preparación del Terreno
- Limpieza y nivelación
- Trazado y replanteo
- Construcción de cimientos

## Paso 6: Estructura
- Columnas y vigas de concreto
- Losas de entrepiso y techo
- Mampostería (paredes)

## Paso 7: Instalaciones
- Instalaciones eléctricas (tuberías y cableado)
- Instalaciones sanitarias (agua potable y aguas residuales)
- Instalaciones de gas (si aplica)

## Paso 8: Acabados
- Pisos, paredes y techos
- Carpintería (puertas, closets, cocina)
- Baños y sanitarios
- Pintura

## Paso 9: Áreas Exteriores
- Jardinería y paisajismo
- Cerca perimetral
- Acera y entrada vehicular

## Paso 10: Entrega
- Limpieza final
- Inspección de calidad
- Entrega de manuales y garantías
- ¡A disfrutar tu nuevo hogar!

> ¿Necesitas ayuda con tu proyecto? En AmsEstudio te acompañamos en todo el proceso, desde el diseño hasta la entrega. [Contáctanos](/contacto) para una consulta sin compromiso.`,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    tags: ["construcción", "guía", "casa", "pasos"],
    author: "Ing. Ricardo Mendoza",
  },
  {
    title: "Permisos de Construcción en Panamá: Lo que Debes Saber",
    slug: "permisos-de-construccion-en-panama",
    excerpt:
      "Todo sobre los permisos necesarios para construir en Panamá: requisitos, costos, tiempos de aprobación y cómo agilizar el proceso.",
    content: `Obtener los permisos de construcción es un paso obligatorio y a veces complejo. Aquí te explicamos todo lo que necesitas saber.

## ¿Por qué son Necesarios los Permisos?

Los permisos de construcción garantizan que tu proyecto cumpla con:
- Las normas de seguridad estructural
- Los códigos de construcción vigentes
- Las regulaciones municipales
- Los requisitos sanitarios y ambientales

## Tipos de Permisos

### 1. Permiso de Construcción Municipal
Emitido por el municipio correspondiente. Requisitos:
- Planos arquitectónicos aprobados
- Planos estructurales
- Memoria de cálculo
- Estudio de suelo
- Pago de tasas municipales

**Tiempo estimado:** 30 – 90 días hábiles

### 2. Visto Bueno de AESG
La Autoridad de Ingeniería Sanitaria revisa:
- Sistema de agua potable
- Sistema de aguas residuales
- Sistema pluvial

### 3. Permiso del Cuerpo de Bomberos
Para proyectos de más de 3 pisos o áreas comerciales:
- Sistema de detección de incendios
- Rociadores automáticos
- Salidas de emergencia
- Extintores

### 4. Permiso de Excavación
Necesario si tu proyecto requiere excavaciones profundas.

## Costos Aproximados

- **Permiso municipal:** 2-5% del valor de construcción
- **Visto Bueno AESG:** $200 – $500
- **Bomberos:** $100 – $300
- **Estudio de suelo:** $500 – $2,000

## Consejos para Agilizar el Proceso

1. **Contrata profesionales con experiencia** que conozcan los requisitos
2. **Presenta planos completos y bien elaborados**
3. **Mantén copias de todo** lo presentado
4. **Da seguimiento regular** al estado de tu solicitud

> En AmsEstudio gestionamos todos los permisos por ti. Nos encargamos de todo el papeleo para que no tengas que preocuparte. [Solicita información](/contacto).`,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    tags: ["permisos", "construcción", "legal", "Panamá", "tramites"],
    author: "Arq. Angel Sosa",
  },
  {
    title: "Tendencias Arquitectónicas 2025 para Viviendas",
    slug: "tendencias-arquitectonicas-2025",
    excerpt:
      "Descubre las últimas tendencias en diseño arquitectónico para viviendas en Panamá: sostenibilidad, espacios abiertos, tecnología inteligente y más.",
    content: `La arquitectura residencial en Panamá está evolucionando. Estas son las tendencias que marcarán el 2025.

## 1. Diseño Sostenible

La construcción sostenible ya no es una opción, es una necesidad:
- **Paneles solares** como elemento estándar
- **Sistemas de captación de agua lluvia**
- **Ventilación cruzada** para reducir el uso de aire acondicionado
- **Materiales reciclados y locales**

## 2. Espacios Abiertos y Flexibles

- **Integración interior-exterior:** Grandes ventanales que borran los límites
- **Plantas abiertas:** Sala, comedor y cocina en un solo espacio
- **Espacios multifuncionales:** Habitaciones que se adaptan a diferentes usos
- **Terrazas y balcones habitables**

## 3. Hogar Inteligente

- **Domótica integrada** para control de iluminación, clima y seguridad
- **Asistentes de voz** en toda la casa
- **Sensores de eficiencia energética**
- **Sistemas de riego automatizados**

## 4. Materiales Naturales

- **Madera** en estructuras y acabados
- **Piedra natural** en fachadas y muros
- **Concreto visto** como elemento decorativo
- **Vidrio** como protagonista

## 5. Minimalismo Cálido

- Líneas limpias y simples
- Paleta de colores neutros (beige, gris, blanco)
- Texturas naturales que aportan calidez
- Muebles funcionales y de calidad

## 6. Eficiencia Energética

- **Aislamiento térmico** en techos y paredes
- **Ventanas de doble vidrio** (termopanel)
- **Iluminación LED** en toda la casa
- **Sistemas de aire acondicionado de alta eficiencia**

## Tendencias para Panamá

En el contexto panameño, destacamos:
- **Techos verdes** para combatir el calor
- **Protecciones solares** en ventanas (aleros, celosías)
- **Piscinas ecológicas** con sistemas de filtración natural
- **Jardines verticales** para espacios reducidos

> ¿Quieres incorporar estas tendencias en tu proyecto? En AmsEstudio diseñamos viviendas modernas y sostenibles. [Solicita una consulta](/contacto).`,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    tags: ["arquitectura", "tendencias", "diseño", "2025", "sostenible"],
    author: "Arq. Angel Sosa",
  },
  {
    title: "Energía Solar para Viviendas en Panamá",
    slug: "energia-solar-para-viviendas",
    excerpt:
      "Beneficios, costos y proceso de instalación de paneles solares en viviendas panameñas. Ahorra hasta un 80% en tu factura de electricidad.",
    content: `Panamá tiene uno de los mayores índices de radiación solar del mundo. Aprovechar esta energía es una decisión inteligente.

## ¿Por qué Energía Solar en Panamá?

- **Radiación solar promedio:** 5.5 kWh/m²/día (excelente)
- **Tarifas eléctricas en aumento:** 15-20% anual
- **Incentivos fiscales:** Exención de ITBMS en equipos solares
- **Tiempo de recuperación de inversión:** 3-5 años

## Tipos de Sistemas Solares

### 1. Sistemas Conectados a la Red (On-Grid)
- Conexión al sistema eléctrico nacional
- Vendes el excedente a la empresa distribuidora
- No necesitas baterías
- **Costo:** $3,000 – $8,000

### 2. Sistemas Aislados (Off-Grid)
- Independiente de la red eléctrica
- Requiere baterías de almacenamiento
- Ideal para áreas rurales o sin acceso a la red
- **Costo:** $5,000 – $15,000

### 3. Sistemas Híbridos
- Combina conexión a red con baterías
- Mayor independencia energética
- Respaldo en caso de apagones
- **Costo:** $8,000 – $20,000

## ¿Cuánto Puedes Ahorrar?

| Consumo mensual | Sistema recomendado | Ahorro estimado |
|-----------------|-------------------|-----------------|
| 200 kWh | 2 kWp | 40-60% |
| 500 kWh | 5 kWp | 60-80% |
| 1000 kWh | 10 kWp | 80-100% |

## Proceso de Instalación

1. **Evaluación del sitio** (techos, orientación, sombras)
2. **Diseño del sistema** (cálculo de paneles e inversores)
3. **Permisos** (aprobación de la empresa distribuidora)
4. **Instalación** (1-3 días)
5. **Conexión y puesta en marcha**

## Mantenimiento

- Limpieza de paneles: 2-4 veces al año
- Vida útil de paneles: 25-30 años
- Vida útil de inversores: 10-15 años
- Garantía de rendimiento: 80% a los 25 años

> En AmsEstudio incluimos sistemas solares en nuestros proyectos residenciales. Si ya tienes tu casa, también podemos instalarlos. [Consulta por tu sistema solar](/contacto).`,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    tags: ["energía solar", "paneles solares", "ahorro", "sostenible", "Panamá"],
    author: "Ing. Ricardo Mendoza",
  },
]

async function main() {
  console.log("Seeding blog posts...")

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    })
    console.log(`  ✓ ${post.title}`)
  }

  console.log("Done!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
