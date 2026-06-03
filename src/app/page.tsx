import { Hero } from "@/components/home/hero"
import { About } from "@/components/home/about"
import { Services } from "@/components/home/services"
import { Process } from "@/components/home/process"
import { Testimonials } from "@/components/home/testimonials"
import { Contact } from "@/components/home/contact"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
    </>
  )
}
