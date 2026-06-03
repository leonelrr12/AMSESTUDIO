export interface Message {
  role: "user" | "bot"
  text: string
}

const faqPatterns: [RegExp, string][] = [
  [/costos|precios|cuánto cuesta|presupuesto|valor/i, "El costo de construcción varía según el tipo de proyecto y los acabados:\n\n• **Residencial básico:** desde $700/m²\n• **Residencial estándar:** $850–$1,100/m²\n• **Residencial premium:** $1,200–$1,500/m²\n• **Urbanización:** desde $400/m²\n• **Infraestructura:** desde $350/m²\n\nPara un cálculo más preciso, usa nuestra [Calculadora](/presupuesto) o solicita una cotización personalizada."],
  [/cotización|cotizar|quiero construir|quiero una casa|presupuesto personalizado/i, "¡Excelente! Para darte una cotización personalizada, necesito algunos datos:\n\n1. ¿Qué tipo de proyecto? (casa, urbanización, remodelación, etc.)\n2. ¿Metros cuadrados aproximados?\n3. ¿Nivel de acabados? (básico, estándar, premium)\n\nPuedes usar nuestra [calculadora online](/presupuesto) o dejarme tus datos y te contactamos."],
  [/tiempo|duración|cuánto tarda|plazo|entrega|demora/i, "Los tiempos de construcción dependen del alcance:\n\n• **Casa unifamiliar (200 m²):** 6–8 meses\n• **Edificio residencial:** 12–18 meses\n• **Urbanización (100 viviendas):** 18–24 meses\n• **Remodelación:** 2–4 meses\n• **Diseño arquitectónico:** 1–2 meses\n\nEstos son tiempos estimados. Cada proyecto tiene un cronograma personalizado."],
  [/remodelación|remodelar|renovar|ampliación|rediseñar/i, "¡Claro! Hacemos remodelaciones de viviendas, oficinas y locales comerciales. El costo promedio es de $500–$1,000/m² dependiendo de los acabados. ¿Qué tipo de espacio deseas remodelar?"],
  [/diseño|arquitecto|arquitectónico|planos|render/i, "Nuestro servicio de diseño arquitectónico incluye:\n\n• Planos arquitectónicos\n• Renderizados 3D\n• Diseño de interiores\n• Planos estructurales\n\nEl costo desde $40/m². ¿Te gustaría agendar una consulta?"],
  [/solar|paneles|energía|ecológico|sostenible|verde/i, "Ofrecemos instalación de sistemas solares como parte de nuestros extras. El costo aproximado es de $5,000–$12,000 dependiendo de la capacidad. Además, trabajamos con materiales sostenibles en nuestros proyectos."],
  [/permiso|permisos|municipio|legal|regulaciones|tramites/i, "Nos encargamos de todos los permisos de construcción municipales y las regulaciones necesarias. Esto incluye:\n\n• Permiso de construcción municipal\n• Estudio de impacto ambiental\n• Aprobación de planos\n• Licencias de obra\n\nNosotros gestionamos todo el proceso para que no te preocupes."],
  [/servicios|qué hacen|qué ofrecen|hacen|ofrecen/i, "Ofrecemos estos servicios:\n\n🏠 **Construcción Residencial** — Casas, villas, edificios\n🏘️ **Urbanizaciones** — Diseño urbano, calles, drenajes\n🛣️ **Infraestructura** — Vías, puentes, obras civiles\n🔨 **Remodelaciones** — Viviendas, oficinas, locales\n📐 **Diseño Arquitectónico** — Planos, renders 3D\n\n¿Sobre cuál te gustaría más información?"],
  [/proyecto|proyectos|trabajos|portafolio|obras/i, "Puedes ver todos nuestros proyectos completados en nuestra [galería de proyectos](/proyectos). Tenemos viviendas, urbanizaciones y obras de infraestructura. ¿Buscas algún tipo de proyecto en particular?"],
  [/contacto|comunicarme|hablar|asesor|teléfono|whatsapp/i, "Puedes contactarnos por:\n\n📞 **Teléfono:** +507 6000-0000\n📧 **Email:** info@amsestudio.com\n💬 **WhatsApp:** Respuesta inmediata\n📍 **Oficina:** Vía España, Panamá\n\nTambién puedes llenar nuestro [formulario de contacto](/contacto) y te llamamos."],
  [/gracias|thanks|thank you|excelente|perfecto|genial/i, "¡De nada! 😊 Si tienes más preguntas, estoy aquí para ayudarte. ¿Quieres que te contacte un asesor para darte más información?"],
  [/hola|buenas|buenos días|buenas tardes|saludos|hey|oye/i, "¡Hola! 👋 Soy el asistente virtual de AmsEstudio. ¿En qué puedo ayudarte? Puedes preguntarme sobre nuestros servicios, costos de construcción, o solicitar una cotización."],
]

const fallbackResponses = [
  "No tengo una respuesta exacta para eso, pero puedo conectarle con un asesor. ¿Quiere que lo contactemos por WhatsApp?",
  "Buena pregunta! 🤔 Prefiero que un experto de nuestro equipo te responda con precisión. ¿Te parece si te contactamos?",
  "Eso requiere una consulta más detallada. ¿Me dejas tu nombre y teléfono para que un asesor te llame?",
  "No quiero darte información incorrecta. Permíteme transferirte con un especialista. ¿Te parece bien?",
]

export function getChatResponse(message: string): {
  text: string
  suggestedQuote?: boolean
} {
  const normalized = message.trim().toLocaleLowerCase()

  for (const [pattern, response] of faqPatterns) {
    if (pattern.test(normalized)) {
      const suggestsQuote = /cotización|cotizar|quiero construir|quiero una casa|presupuesto personalizado/i.test(normalized)
      return { text: response, suggestedQuote: suggestsQuote }
    }
  }

  const randomIndex = Math.floor(Math.random() * fallbackResponses.length)
  return { text: fallbackResponses[randomIndex] }
}
