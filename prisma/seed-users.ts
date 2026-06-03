import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { hash } from "bcryptjs"

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding users...")

  const adminPassword = await hash("admin123", 12)
  const clientPassword = await hash("cliente123", 12)

  const admin = await prisma.user.upsert({
    where: { email: "admin@amsestudio.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@amsestudio.com",
      password: adminPassword,
      role: "ADMIN",
    },
  })
  console.log(`  ✓ Admin: ${admin.email}`)

  const client = await prisma.user.upsert({
    where: { email: "cliente@amsestudio.com" },
    update: {},
    create: {
      name: "María Rodríguez",
      email: "cliente@amsestudio.com",
      password: clientPassword,
      role: "CLIENT",
      phone: "+507 6000-0001",
    },
  })
  console.log(`  ✓ Cliente: ${client.email}`)

  const projects = await prisma.project.findMany()
  if (projects.length > 0 && client) {
    const existing = await prisma.clientProject.findFirst({
      where: { clientId: client.id },
    })
    if (!existing) {
      await prisma.clientProject.create({
        data: {
          clientId: client.id,
          projectId: projects[0].id,
          progress: 65,
          photos: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
          ],
          documents: [],
          timeline: `Semana 1-4: Excavación y cimientos (Completado)
Semana 5-12: Estructura principal (Completado)
Semana 13-20: Instalaciones eléctricas y sanitarias (Completado)
Semana 21-28: Acabados interiores (En progreso)
Semana 29-32: Acabados exteriores y jardinería (Pendiente)
Semana 33-36: Entrega final (Pendiente)`,
          startDate: new Date("2025-06-01"),
          endDate: new Date("2026-02-28"),
        },
      })
      console.log(`  ✓ Proyecto asignado a ${client.name}`)
    }
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
