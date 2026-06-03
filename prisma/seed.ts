import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })

const prisma = new PrismaClient({ adapter })

const projects = [
  {
    title: "Casa Moderna 250 m²",
    slug: "casa-moderna-250",
    description:
      "Vivienda unifamiliar de diseño contemporáneo con amplios ventanales, terraza panorámica y acabados de lujo. Ubicada en una zona residencial exclusiva de la ciudad.",
    type: "VIVIENDA" as const,
    area: 250,
    executionTime: "8 meses",
    status: "COMPLETADO" as const,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    clientName: "Familia Rodríguez",
    location: "Punta Pacífica, Panamá",
    year: 2025,
    projectOrder: 1,
  },
  {
    title: "Casa Campestre 180 m²",
    slug: "casa-campestre-180",
    description:
      "Hermosa casa de campo con estilo rústico-moderno, rodeada de naturaleza. Cuenta con piscina, jardines amplios y áreas de descanso al aire libre.",
    type: "VIVIENDA" as const,
    area: 180,
    executionTime: "6 meses",
    status: "COMPLETADO" as const,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    ],
    clientName: "Sr. Ricardo Méndez",
    location: "El Valle de Antón, Panamá",
    year: 2024,
    projectOrder: 2,
  },
  {
    title: "Edificio Residencial Altamar",
    slug: "edificio-altamar",
    description:
      "Edificio de 12 pisos con 36 apartamentos de lujo, rooftop pool, gimnasio y estacionamiento subterráneo. Vista panorámica al mar.",
    type: "VIVIENDA" as const,
    area: 4500,
    executionTime: "18 meses",
    status: "COMPLETADO" as const,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    ],
    clientName: "Inversiones Marítimas S.A.",
    location: "Costa del Este, Panamá",
    year: 2023,
    projectOrder: 3,
  },
  {
    title: "Residencial Las Palmas",
    slug: "residencial-las-palmas",
    description:
      "Urbanización residencial con 120 viviendas, áreas verdes, parque infantil, cancha deportiva y sistema de seguridad perimetral. Calles pavimentadas y aceras peatonales.",
    type: "URBANIZACION" as const,
    area: 35000,
    executionTime: "24 meses",
    status: "COMPLETADO" as const,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
    ],
    clientName: "Grupo Inmobiliario Panamá",
    location: "Chorrera, Panamá Oeste",
    year: 2024,
    projectOrder: 4,
  },
  {
    title: "Ciudad Verde",
    slug: "ciudad-verde",
    description:
      "Macro proyecto urbano sostenible con 500 viviendas, centro comercial, escuela, parques ecológicos y ciclovías. Primera urbanización certificada LEED en Panamá.",
    type: "URBANIZACION" as const,
    area: 120000,
    executionTime: "36 meses",
    status: "EN_PROCESO" as const,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    ],
    clientName: "Desarrollos Sostenibles S.A.",
    location: "Penonomé, Coclé",
    year: 2025,
    projectOrder: 5,
  },
  {
    title: "Urbanización Los Altos",
    slug: "urbanizacion-los-altos",
    description:
      "Conjunto residencial de 80 casas con diseño moderno, áreas comunes, piscina clubhouse y sistema de drenaje pluvial avanzado.",
    type: "URBANIZACION" as const,
    area: 28000,
    executionTime: "20 meses",
    status: "COMPLETADO" as const,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7e5f5f?w=800&q=80",
    ],
    clientName: "Constructora Los Altos",
    location: "Arraiján, Panamá Oeste",
    year: 2023,
    projectOrder: 6,
  },
  {
    title: "Vía Panamericana — Tramo 3",
    slug: "via-panamericana-tramo-3",
    description:
      "Construcción de 12 km de carretera de doble vía con puentes, drenajes, señalización y pasos peatonales. Obra ejecutada bajo estándares internacionales.",
    type: "INFRAESTRUCTURA" as const,
    area: 60000,
    executionTime: "14 meses",
    status: "COMPLETADO" as const,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb6a179b0?w=800&q=80",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
    ],
    clientName: "Ministerio de Obras Públicas",
    location: "Santiago, Veraguas",
    year: 2024,
    projectOrder: 7,
  },
  {
    title: "Sistema Pluvial Centro Urbano",
    slug: "sistema-pluvial-centro-urbano",
    description:
      "Diseño e instalación de sistema de drenaje pluvial para el centro de la ciudad, incluyendo canales subterráneos, estaciones de bombeo y pozos de absorción.",
    type: "INFRAESTRUCTURA" as const,
    area: 15000,
    executionTime: "10 meses",
    status: "EN_PROCESO" as const,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1624365169191-174aafc6b281?w=800&q=80",
      "https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=800&q=80",
    ],
    clientName: "Municipio de Panamá",
    location: "Ciudad de Panamá",
    year: 2025,
    projectOrder: 8,
  },
]

async function main() {
  console.log("Seeding database...")

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    })
    console.log(`  ✓ ${project.title}`)
  }

  console.log("Seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
