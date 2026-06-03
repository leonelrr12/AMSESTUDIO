import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ChevronLeft, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"

async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  return (
    <div className="min-h-screen">
      {post.image && (
        <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </section>
      )}

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Todos los artículos
          </Link>

          {!post.image && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl font-bold text-primary sm:text-4xl leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-secondary-500">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.createdAt).toLocaleDateString("es-PA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            {post.updatedAt > post.createdAt && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                Actualizado: {new Date(post.updatedAt).toLocaleDateString("es-PA")}
              </span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 prose prose-lg max-w-none">
            {post.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-bold text-primary mt-10 mb-4">
                    {line.slice(3)}
                  </h2>
                )
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl font-semibold text-primary mt-8 mb-3">
                    {line.slice(4)}
                  </h3>
                )
              }
              if (line.startsWith("> ")) {
                return (
                  <blockquote
                    key={i}
                    className="border-l-4 border-accent bg-accent-50 pl-4 py-3 my-6 italic text-secondary rounded-r-lg"
                  >
                    {line.slice(2)}
                  </blockquote>
                )
              }
              if (line.startsWith("- **") && line.includes("**")) {
                const parts = line.split("**")
                return (
                  <li key={i} className="ml-4 text-secondary leading-relaxed">
                    <strong>{parts[1]}</strong>
                    {parts[2] || ""}
                  </li>
                )
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="ml-4 text-secondary leading-relaxed">
                    {line.slice(2)}
                  </li>
                )
              }
              if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") ||
                  line.startsWith("4. ") || line.startsWith("5. ") || line.startsWith("6. ") ||
                  line.startsWith("7. ") || line.startsWith("8. ") || line.startsWith("9. ") ||
                  line.startsWith("10.")) {
                return (
                  <li key={i} className="ml-4 text-secondary leading-relaxed list-decimal">
                    {line.replace(/^\d+\.\s*/, "")}
                  </li>
                )
              }
              if (line.startsWith("|") && line.endsWith("|")) {
                // Simple table rendering - just show as text
                return null
              }
              if (line.includes("|---")) {
                return null
              }
              if (line.trim() === "") {
                return <div key={i} className="h-3" />
              }
              return (
                <p key={i} className="text-secondary leading-relaxed mb-4">
                  {line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .split(/(https?:\/\/[^\s]+)/g).map((part, j) => {
                      if (part.startsWith("http")) {
                        return <a key={j} href={part} className="text-accent hover:underline">{part}</a>
                      }
                      return <span key={j} dangerouslySetInnerHTML={{ __html: part }} />
                    })}
                </p>
              )
            })}
          </div>

          <div className="mt-12 rounded-xl border bg-primary p-8 text-center">
            <h3 className="text-xl font-bold text-white">
              ¿Te interesa construir con nosotros?
            </h3>
            <p className="mt-2 text-primary-200">
              Contáctanos para una consulta sin compromiso.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button variant="accent" asChild>
                <Link href="/#contacto">Solicitar Cotización</Link>
              </Button>
              <Button variant="white" asChild>
                <a
                  href={`https://wa.me/50760000000?text=${encodeURIComponent(`Hola, vi el artículo "${post.title}" y me gustaría más información.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
