/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Waves, 
  Wind, 
  Sun, 
  ChevronDown, 
  ArrowRight, 
  Instagram, 
  Mail, 
  Phone,
  Menu,
  X,
  Compass,
  Home,
  Star,
  ShieldCheck
} from "lucide-react";
import { useState, useEffect } from "react";

const bungalows = [
  {
    id: 1,
    name: "Bangalô I",
    description: "Conforto e sofisticação com ar condicionado. Varanda privativa com rede e vista para o jardim tropical.",
    link: "https://www.airbnb.com.br/rooms/1357455516862881103",
    gradient: "luxury-gradient-sand"
  },
  {
    id: 2,
    name: "Bangalô II",
    description: "Arquitetura que favorece a brisa do mar. Integração perfeita com a natureza e tranquilidade absoluta.",
    link: "https://www.airbnb.com.br/rooms/1357448439624029935",
    gradient: "luxury-gradient-ocean"
  },
  {
    id: 3,
    name: "Bangalô III",
    description: "Ideal para famílias ou pequenos grupos. Amplo espaço interno com design rústico e elegante.",
    link: "https://www.airbnb.com.br/rooms/1357441528256086507",
    gradient: "luxury-gradient-forest"
  },
  {
    id: 4,
    name: "Bangalô IV",
    description: "O refúgio perfeito para casais. Privacidade total em meio ao jardim exuberante da Quinta.",
    link: "https://www.airbnb.com.br/rooms/1357428614552989180",
    gradient: "luxury-gradient-sunset"
  }
];

const faqs = [
  {
    question: "Onde fica exatamente a Quinta de Caraíva?",
    answer: "Estamos localizados em uma área preservada de Caraíva, a poucos minutos de caminhada do Rio Caraíva e da praia, garantindo silêncio e exclusividade."
  },
  {
    question: "Como chegar em Caraíva?",
    answer: "O acesso é feito via Porto Seguro. De lá, segue-se de carro ou transfer até Nova Caraíva, onde a travessia do rio é feita em canoas tradicionais. Não entram carros na vila."
  },
  {
    question: "Os bangalôs possuem ar-condicionado?",
    answer: "Sim, todos os nossos bangalôs são equipados com ar-condicionado silencioso, embora o design favoreça a ventilação natural."
  },
  {
    question: "Oferecem café da manhã?",
    answer: "Nossos bangalôs possuem cozinha gourmet equipada para sua total autonomia, mas podemos organizar cestas de café da manhã com produtos artesanais sob demanda."
  },
  {
    question: "Aceitam crianças?",
    answer: "A Quinta de Caraíva foi projetada como um refúgio para adultos e casais que buscam tranquilidade. Recebemos crianças a partir de 12 anos."
  },
  {
    question: "Tem Wi-Fi para trabalho remoto?",
    answer: "Sim, dispomos de internet via fibra ótica de alta velocidade em toda a propriedade, ideal para quem precisa conciliar descanso e produtividade."
  },
  {
    question: "Qual a melhor época para visitar?",
    answer: "Caraíva é mágica o ano todo. O verão (dezembro a março) é mais vibrante, enquanto a baixa temporada oferece uma experiência de introspecção e paz absoluta."
  },
  {
    question: "Como funcionam as reservas?",
    answer: "Nossas reservas são processadas exclusivamente via Airbnb para garantir a segurança e transparência de ambas as partes."
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col selection:bg-luxury-sand selection:text-luxury-charcoal">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-luxury-cream flex justify-between items-center px-10 py-6 border-b border-luxury-charcoal/5">
        <a href="#" className="text-2xl font-serif tracking-[0.1em] uppercase font-light">
          Quinta de Caraíva
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-[12px] uppercase tracking-[0.1em] font-medium">
          <a href="#sobre" className="hover:opacity-50 transition-opacity">Refúgio</a>
          <a href="#bangalos" className="hover:opacity-50 transition-opacity">Bangalôs</a>
          <a href="#experiencia" className="hover:opacity-50 transition-opacity">Onde Ficar</a>
          <a href="#contato" className="hover:opacity-50 transition-opacity">Contato</a>
        </div>

        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-luxury-cream pt-32 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-serif">
              <a href="#sobre" onClick={() => setIsMenuOpen(false)}>Refúgio</a>
              <a href="#bangalos" onClick={() => setIsMenuOpen(false)}>Bangalôs</a>
              <a href="#experiencia" onClick={() => setIsMenuOpen(false)}>Onde Ficar</a>
              <a href="#contato" onClick={() => setIsMenuOpen(false)}>Contato</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area - Split Layout on Desktop */}
      <main className="flex-1 flex flex-col md:grid md:grid-cols-[420px_1fr] gap-px bg-luxury-charcoal/5">
        
        {/* Left Panel: Hero */}
        <section className="luxury-gradient-hero p-10 md:p-16 flex flex-col justify-between bg-luxury-cream min-h-[500px] md:min-h-0">
          <div className="space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-serif leading-[1.1] font-light"
            >
              A essência do <br />
              <span className="italic">luxo descalço.</span>
            </motion.h1>
            <p className="text-lg text-luxury-charcoal/70 leading-relaxed font-light max-w-sm">
              Um santuário privado entre o Rio Caraíva e o Oceano Atlântico. Onde o tempo não é medido por horas, mas pela maré.
            </p>
            <div className="pt-4">
              <a 
                href="#contato" 
                className="cta-button-natural"
              >
                Reservar via Airbnb
              </a>
            </div>
          </div>

          <div className="hidden md:block pt-16 text-[12px] text-luxury-accent border-t border-luxury-accent/30">
            <b className="block mb-1">Hospedagem em Caraíva, Bahia</b>
            Experimente o silêncio e a sofisticação da Quinta.
          </div>
        </section>

        {/* Right Panel: Content Grid */}
        <section className="bg-luxury-cream p-10 md:p-16 overflow-y-auto space-y-24">
          
          {/* About Section */}
          <div id="sobre">
            <h2 className="section-title-line text-xl">O Destino</h2>
            <div className="grid md:grid-cols-2 gap-12 items-start mt-8">
              <div className="space-y-6 text-sm text-luxury-charcoal/70 leading-relaxed font-light">
                <p>
                  Caraíva não é apenas um destino, é um estado de espírito. Localizada no sul da Bahia, esta vila de pescadores preserva o charme de ruas de areia, onde carros não entram e o ritmo é ditado pelas marés.
                </p>
                <p>
                  Se você busca <strong>onde ficar em Caraíva</strong>, encontrará na Quinta de Caraíva o equilíbrio perfeito entre a rusticidade autêntica da Bahia e o conforto contemporâneo.
                </p>
              </div>
              <div className="aspect-video rounded-sm luxury-gradient-ocean opacity-40" />
            </div>
          </div>

          {/* Bungalows Section */}
          <div id="bangalos">
            <h2 className="section-title-line text-xl">Nossos Bangalôs</h2>
            <div className="grid sm:grid-cols-2 gap-8 mt-8">
              {bungalows.map((b) => (
                <motion.div 
                  key={b.id}
                  whileHover={{ y: -5 }}
                  className="border border-luxury-charcoal/10 rounded-sm overflow-hidden bg-white"
                >
                  <div className={`h-32 ${b.gradient} opacity-60`} />
                  <div className="p-6">
                    <h3 className="text-[14px] uppercase tracking-[1px] mb-2 font-medium">{b.name}</h3>
                    <p className="text-[11px] text-luxury-charcoal/60 leading-relaxed font-light mb-4">
                      {b.description}
                    </p>
                    <a 
                      href={b.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase tracking-widest font-bold text-luxury-accent hover:opacity-70 transition-opacity flex items-center gap-2"
                    >
                      Ver no Airbnb <ArrowRight size={12} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experiences Section */}
          <div id="experiencia">
            <h2 className="section-title-line text-xl">Experiências & Diferenciais</h2>
            <div className="flex flex-wrap gap-3 mt-8">
              <div className="experience-pill-natural">Café da manhã artesanal</div>
              <div className="experience-pill-natural">Enxoval 600 fios</div>
              <div className="experience-pill-natural">Amenities botânicos</div>
              <div className="experience-pill-natural">Concierge exclusivo</div>
              <div className="experience-pill-natural">Design Biofílico</div>
              <div className="experience-pill-natural">Privacidade Absoluta</div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="section-title-line text-xl">FAQ & Informações</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mt-8">
              {faqs.map((faq, index) => (
                <div key={index} className="text-[11px] leading-relaxed">
                  <b className="text-luxury-accent block mb-1 uppercase tracking-wider">{faq.question}</b>
                  <p className="text-luxury-charcoal/70 font-light">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact / CTA */}
          <div id="contato" className="pt-12 border-t border-luxury-charcoal/10 text-center">
            <h2 className="text-3xl font-serif mb-6 italic">Sua jornada começa aqui.</h2>
            <p className="text-sm text-luxury-charcoal/60 mb-10 font-light max-w-md mx-auto">
              Reserve seu bangalô e descubra por que a Quinta de Caraíva é o segredo mais bem guardado da Bahia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://www.airbnb.com.br/users/show/593414902" className="cta-button-natural w-full sm:w-auto text-center">Reservar via Airbnb</a>
              <a href="https://wa.me/5500000000000" className="px-8 py-4 border border-luxury-charcoal text-[12px] uppercase tracking-[2px] rounded-[2px] hover:bg-luxury-charcoal hover:text-white transition-all w-full sm:w-auto text-center">Falar com Concierge</a>
            </div>
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="px-10 py-6 bg-luxury-charcoal text-white/50 text-[10px] flex flex-col md:flex-row justify-between items-center gap-4 uppercase tracking-widest">
        <div>&copy; 2026 Quinta de Caraíva - Todos os direitos reservados.</div>
        <div className="flex gap-8">
          <span>Caraíva, Porto Seguro - BA</span>
          <span className="hidden sm:inline">Quiet Luxury Travel</span>
        </div>
      </footer>
    </div>
  );
}
