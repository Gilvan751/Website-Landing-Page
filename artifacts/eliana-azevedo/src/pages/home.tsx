import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "wouter";
import { 
  Heart, Star, Clock, ShieldCheck, MapPin, Phone, Mail, 
  Scissors, Droplets, CheckCircle2, ChevronDown, ArrowRight,
  CalendarDays, Menu, X, Facebook, Instagram, MessageCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  ownerName: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  petName: z.string().min(2, { message: "Nome do pet deve ter pelo menos 2 caracteres" }),
  service: z.string().min(1, { message: "Selecione um serviço" }),
  date: z.string().min(1, { message: "Selecione uma data" }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
  email: z.string().email({ message: "Email inválido" }).optional().or(z.literal("")),
  notes: z.string().optional(),
});

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      ownerName: "",
      petName: "",
      service: "",
      date: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    toast({
      title: "Agendamento Solicitado!",
      description: `Obrigado ${values.ownerName}. Entraremos em contato para confirmar o horário do(a) ${values.petName}.`,
    });
    form.reset();
  }

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* SVG ClipPath para efeito Squircle */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5" />
          </clipPath>
        </defs>
      </svg>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Heart className="w-8 h-8 text-primary" />
            <span className="text-xl font-serif font-bold text-primary">Espaço Eliana Azevedo</span>
          </button>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("sobre")} className="text-sm font-medium hover:text-primary transition-colors">Sobre</button>
            <button onClick={() => scrollToSection("servicos")} className="text-sm font-medium hover:text-primary transition-colors">Serviços</button>
            <button onClick={() => scrollToSection("depoimentos")} className="text-sm font-medium hover:text-primary transition-colors">Depoimentos</button>
            <button onClick={() => scrollToSection("faq")} className="text-sm font-medium hover:text-primary transition-colors">Dúvidas</button>
            <Button onClick={() => scrollToSection("agendamento")} className="bg-accent hover:bg-accent/90 text-white rounded-full">
              Agendar Agora
            </Button>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border p-4 flex flex-col gap-4"
          >
            <button onClick={() => scrollToSection("sobre")} className="text-left py-2 text-lg font-medium">Sobre</button>
            <button onClick={() => scrollToSection("servicos")} className="text-left py-2 text-lg font-medium">Serviços</button>
            <button onClick={() => scrollToSection("depoimentos")} className="text-left py-2 text-lg font-medium">Depoimentos</button>
            <button onClick={() => scrollToSection("faq")} className="text-left py-2 text-lg font-medium">Dúvidas</button>
            <Button onClick={() => scrollToSection("agendamento")} className="bg-accent text-white w-full rounded-full">
              Agendar Agora
            </Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <img 
            src="/images/hero.png" 
            alt="Cachorro feliz sendo cuidado" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="container relative z-20 mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.span variants={fadeInUp} className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              O melhor cuidado para o seu melhor amigo
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
              Amor, carinho e <br/>
              <span className="text-primary">muito cuidado.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl">
              Banho e tosa profissional com mais de 10 anos de experiência. Um ambiente seguro e acolhedor onde seu pet é tratado como parte da nossa família.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-full"
              >
                <Button size="lg" onClick={() => scrollToSection("agendamento")} className="btn-pulse-primary bg-primary hover:bg-primary/90 text-white rounded-full text-lg h-14 px-8 w-full">
                  <CalendarDays className="w-5 h-5 mr-2" /> Agendar Horário
                </Button>
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="rounded-full"
              >
                <Button size="lg" variant="outline" onClick={() => scrollToSection("servicos")} className="btn-pulse-green rounded-full text-lg h-14 px-8 border-primary/30 hover:bg-primary/5 w-full">
                  Conheça os Serviços <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="Cliente" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  <span className="text-foreground font-bold">4.9</span>/5 (5000+ pets felizes)
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Mais de uma década de dedicação.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-6">
                O Espaço Eliana Azevedo nasceu de um amor incondicional pelos animais. Entendemos que seu pet não é apenas um animal de estimação, mas um membro muito especial da sua família.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8">
                Nossa missão é proporcionar não apenas estética, mas saúde, bem-estar e muito conforto em cada atendimento. Utilizamos apenas produtos premium e técnicas que respeitam os limites de cada animal.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col gap-2">
                  <Clock className="w-8 h-8 text-primary" />
                  <span className="text-3xl font-bold text-foreground">10+</span>
                  <span className="text-sm font-medium text-muted-foreground">Anos de Experiência</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Heart className="w-8 h-8 text-primary" />
                  <span className="text-3xl font-bold text-foreground">5000+</span>
                  <span className="text-sm font-medium text-muted-foreground">Clientes Satisfeitos</span>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("agendamento")}
                    className="btn-pulse-primary bg-primary hover:bg-primary/90 text-white rounded-full h-12 px-8"
                  >
                    <CalendarDays className="w-5 h-5 mr-2" /> Agendar Consulta
                  </Button>
                </motion.div>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("servicos")}
                  className="rounded-full h-12 px-8 border-primary/30 hover:bg-primary/5 hover:border-primary/60 transition-all"
                >
                  Ver Serviços <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-8 border-background relative z-10">
                <img 
                  src="/images/team-eliana.png" 
                  alt="Eliana Azevedo cuidando de um pet" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">Por que nos escolher?</h2>
            <p className="text-lg text-muted-foreground">
              Cada detalhe do nosso espaço foi pensado para o conforto e segurança do seu melhor amigo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Profissionais Qualificados", desc: "Nossa equipe passa por treinamentos constantes nas melhores técnicas do mercado." },
              { icon: Droplets, title: "Produtos Premium", desc: "Utilizamos apenas linhas profissionais de alta qualidade, antialérgicas e específicas para cada pelagem." },
              { icon: Heart, title: "Atendimento Personalizado", desc: "Cada pet é único. Avaliamos as necessidades individuais antes de iniciar qualquer procedimento." },
              { icon: Star, title: "Bem-estar Animal", desc: "Respeitamos o tempo do animal, sem pressa. O ambiente é calmo e livre de estresse." },
              { icon: Scissors, title: "Estrutura Completa", desc: "Equipamentos modernos, banheiras ergonômicas e secadores silenciosos." },
              { icon: CalendarDays, title: "Agendamento Fácil", desc: "Sistema prático de agendamento online ou via WhatsApp para sua comodidade." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.97 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-card p-8 rounded-2xl border border-card-border shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-300 cursor-pointer group"
              >
                <motion.div
                  whileHover={{ rotate: [0, -12, 12, 0], scale: 1.2 }}
                  transition={{ duration: 0.45 }}
                  className="w-14 h-14 bg-primary/10 group-hover:bg-primary/20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300"
                >
                  <feature.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA após "Por que nos escolher" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-6 text-lg">Pronto para dar o melhor cuidado ao seu pet?</p>
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("agendamento")}
                className="btn-pulse-primary bg-primary hover:bg-primary/90 text-white rounded-full text-lg h-14 px-10"
              >
                <CalendarDays className="w-5 h-5 mr-2" /> Agendar Meu Horário Agora
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="servicos" className="py-20 md:py-32 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-medium text-sm uppercase tracking-wider mb-2 block">Nossos Serviços</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">Cuidado completo, da cabeça ao focinho.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                category: "Banho",
                title: "Banho Higiênico",
                desc: "Banho relaxante com produtos premium, secagem profissional, escovação e perfume suave. Ideal para a rotina do seu pet.",
                price: "A partir de R$ 50",
                img: "/images/srv-banho-higienico.png"
              },
              {
                category: "Banho",
                title: "Banho Terapêutico",
                desc: "Shampoo hipoalergênico e calmante, ideal para peles sensíveis. Alivia coceiras e irritações, deixando a pele saudável.",
                price: "A partir de R$ 70",
                img: "/images/srv-banho-terapeutico.png"
              },
              {
                category: "Banho",
                title: "Banho Completo",
                desc: "Inclui hidratação profunda, corte de unhas e limpeza de ouvidos. O pacote mais completo para o bem-estar total.",
                price: "A partir de R$ 90",
                img: "/images/srv-banho-completo.png"
              },
              {
                category: "Tosa",
                title: "Tosa Higiênica",
                desc: "Limpeza das patinhas, barriga e região íntima. Essencial para o conforto e higiene do animal no dia a dia.",
                price: "A partir de R$ 40",
                img: "/images/srv-tosa-higienica.png"
              },
              {
                category: "Tosa",
                title: "Tosa na Máquina",
                desc: "Redução uniforme da pelagem com finalização em tesoura. Prático, confortável e com ótimo acabamento.",
                price: "A partir de R$ 80",
                img: "/images/srv-tosa-maquina.png"
              },
              {
                category: "Tosa",
                title: "Tosa na Tesoura",
                desc: "Acabamento premium, modelagem específica para a raça, preservando o volume e o charme natural do seu pet.",
                price: "A partir de R$ 120",
                img: "/images/srv-tosa-tesoura.png"
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flip-card h-[360px] w-full"
              >
                <div className="flip-card-inner shadow-xl rounded-2xl">
                  <div className="flip-card-front relative">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-left">
                      <div className="mb-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${service.category === 'Banho' ? 'bg-cyan-500' : 'bg-emerald-500'}`}>
                          {service.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white">{service.title}</h3>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <h3 className="text-2xl font-serif font-bold mb-4">{service.title}</h3>
                    <p className="text-sm text-white/90 mb-6 px-2">{service.desc}</p>
                    <div className="text-lg font-bold bg-white/20 px-4 py-2 rounded-full mb-6">
                      {service.price}
                    </div>
                    <Button 
                      onClick={() => scrollToSection("agendamento")}
                      className="bg-white text-purple-700 hover:bg-gray-100 rounded-full font-bold w-full"
                    >
                      Agendar
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
            <h4 className="text-xl font-bold mb-8 text-center">Serviços Adicionais</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Hidratação Profunda", desc: "Máscara reconstrutora que restaura o brilho e maciez da pelagem.", price: "R$ 35", img: "/images/srv-hidratacao.png" },
                { title: "Corte de Unhas", desc: "Limalha e corte preciso para o conforto e saúde das patinhas.", price: "R$ 20", img: "/images/srv-unhas.png" },
                { title: "Limpeza de Ouvidos", desc: "Remove cera e sujeira, prevenindo infecções e desconforto.", price: "R$ 20", img: "/images/srv-ouvidos.png" },
                { title: "Escovação de Dentes", desc: "Higiene bucal com produtos seguros, reduzindo tártaro e mau hálito.", price: "R$ 25", img: "/images/srv-dentes.png" }
              ].map((service, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="flip-card h-[280px] w-full"
                >
                  <div className="flip-card-inner shadow-lg rounded-2xl">
                    <div className="flip-card-front relative">
                      <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-left">
                        <div className="mb-2">
                          <span className="text-xs font-bold px-2 py-1 rounded-full text-white bg-purple-500 w-max">Adicional</span>
                        </div>
                        <h4 className="text-lg font-serif font-bold text-white leading-tight">{service.title}</h4>
                      </div>
                    </div>
                    <div className="flip-card-back p-4">
                      <h4 className="text-lg font-serif font-bold mb-2">{service.title}</h4>
                      <p className="text-xs text-white/90 mb-4">{service.desc}</p>
                      <div className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full mb-4">
                        {service.price}
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => scrollToSection("agendamento")}
                        className="bg-white text-purple-700 hover:bg-gray-100 rounded-full font-bold w-full text-xs"
                      >
                        Agendar
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground text-center">* Os valores podem variar de acordo com o porte, raça e condição da pelagem do animal.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">Quem confia, recomenda.</h2>
            <p className="text-lg text-muted-foreground">
              A satisfação dos nossos clientes e a alegria dos pets são o nosso maior orgulho.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Maria Silva", pet: "Tutor da Mel (Poodle)", text: "A Eliana é maravilhosa! A Mel sempre voltava estressada de outros pet shops, mas aqui ela entra abanando o rabo. O cuidado e carinho são visíveis." },
              { name: "Fábio Mendes", pet: "Tutor do Thor (Golden)", text: "Estrutura impecável e profissionais atenciosos. O banho terapêutico resolveu o problema de pele do Thor. Recomendo de olhos fechados!" },
              { name: "Letícia Costa", pet: "Tutora da Luna (Shih Tzu)", text: "A tosa na tesoura é perfeita, a Luna fica parecendo um ursinho de pelúcia. Dá pra sentir o cheirinho bom por dias. Muito confiançável." }
            ].map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.04, y: -8 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.4 }}
                className="bg-card p-8 rounded-3xl border border-card-border relative hover:shadow-2xl hover:border-primary/25 transition-all duration-300 cursor-default"
              >
                <div className="flex text-yellow-400 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-foreground text-lg italic mb-8 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.pet}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA após depoimentos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 bg-primary/5 rounded-3xl p-10 border border-primary/10"
          >
            <h3 className="text-2xl font-serif font-bold mb-3">Junte-se a mais de 5.000 tutores satisfeitos!</h3>
            <p className="text-muted-foreground mb-8">Seu pet merece o melhor. Agende hoje mesmo e descubra a diferença.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection("agendamento")}
                  className="btn-pulse-primary bg-primary hover:bg-primary/90 text-white rounded-full text-lg h-14 px-10"
                >
                  <Heart className="w-5 h-5 mr-2" /> Quero Agendar Agora
                </Button>
              </motion.div>
              <motion.a
                href="https://wa.me/5511987654321"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full text-lg font-medium bg-[#25D366] text-white hover:bg-[#20BD5C] transition-colors btn-pulse-green"
              >
                <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking & Contact */}
      <section id="agendamento" className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Agende um horário.</h2>
              <p className="text-lg text-primary-foreground/80 mb-12 max-w-md">
                Preencha o formulário e nossa equipe entrará em contato rapidamente para confirmar seu agendamento.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Nosso Espaço</h4>
                    <p className="text-primary-foreground/80 leading-relaxed">
                      Rua das Flores, 123 - Jd. Primavera<br />
                      São Paulo, SP - 01234-567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">WhatsApp</h4>
                    <p className="text-primary-foreground/80">(11) 98765-4321</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">E-mail</h4>
                    <p className="text-primary-foreground/80">contato@elianaazevedo.com.br</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card text-card-foreground p-8 md:p-10 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-8">Solicitar Agendamento</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="ownerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seu Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="João Silva" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="petName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Pet</FormLabel>
                          <FormControl>
                            <Input placeholder="Rex" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone / WhatsApp</FormLabel>
                          <FormControl>
                            <Input placeholder="(11) 90000-0000" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="joao@email.com" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Serviço Principal</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Selecione..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="banho-higienico">Banho Higiênico</SelectItem>
                              <SelectItem value="banho-completo">Banho Completo</SelectItem>
                              <SelectItem value="tosa-higienica">Tosa Higiênica</SelectItem>
                              <SelectItem value="tosa-maquina">Tosa na Máquina</SelectItem>
                              <SelectItem value="tosa-tesoura">Tosa na Tesoura</SelectItem>
                              <SelectItem value="pacote-completo">Pacote Banho + Tosa</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Preferência</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações (opcional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Raça, porte, alguma alergia, comportamento..." 
                            className="resize-none bg-background h-24" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-14 text-lg bg-accent hover:bg-accent/90 text-white rounded-xl">
                    Solicitar Agendamento
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">Dúvidas Frequentes</h2>
            <p className="text-lg text-muted-foreground">Tudo o que você precisa saber antes de trazer seu pet.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "Posso acompanhar o banho do meu pet?",
                a: "Sim! Nosso espaço possui paredes de vidro, permitindo que você acompanhe todo o processo caso deseje. Prezamos pela total transparência."
              },
              {
                q: "Meu cachorro é muito medroso/agressivo. Vocês atendem?",
                a: "Sim, atendemos. Nestes casos, pedimos que informe no agendamento. Separamos um horário mais longo e tranquilo, utilizando técnicas de adaptação e reforço positivo para não estressar o animal."
              },
              {
                q: "Quais produtos vocês utilizam?",
                a: "Trabalhamos exclusivamente com linhas profissionais e premium de marcas reconhecidas no mercado pet, aprovadas por veterinários e específicas para cada tipo de pelagem."
              },
              {
                q: "Com que antecedência devo agendar?",
                a: "Recomendamos agendar com pelo menos 3 dias de antecedência para garantir o horário desejado, especialmente aos finais de semana que costumam ser mais concorridos."
              },
              {
                q: "A tosa inclui banho?",
                a: "Sim! Todos os nossos serviços de tosa (higiênica, máquina ou tesoura) já incluem o banho completo, corte de unhas e limpeza de ouvidos."
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-2xl px-6 bg-card">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 pt-16 pb-8 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <Heart className="w-6 h-6 text-primary" />
                <span className="text-xl font-serif font-bold text-primary">Espaço Eliana Azevedo</span>
              </button>
              <p className="text-muted-foreground max-w-sm mb-6">
                Muito mais que um banho e tosa. Um centro de cuidado, estética e bem-estar para o membro mais peludo da sua família.
              </p>
              <div className="flex gap-3">
                <a href="#" title="Instagram" aria-label="Instagram">
                  <div
                    style={{ clipPath: "url(#squircleClip)" }}
                    className="w-14 h-14 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <Instagram className="w-7 h-7 text-white" />
                  </div>
                </a>
                <a href="#" title="Facebook" aria-label="Facebook">
                  <div
                    style={{ clipPath: "url(#squircleClip)" }}
                    className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <Facebook className="w-7 h-7 text-white" />
                  </div>
                </a>
                <a href="https://wa.me/5511987654321" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp">
                  <div
                    style={{ clipPath: "url(#squircleClip)" }}
                    className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection("sobre")} className="text-muted-foreground hover:text-primary transition-colors">Sobre Nós</button></li>
                <li><button onClick={() => scrollToSection("servicos")} className="text-muted-foreground hover:text-primary transition-colors">Serviços e Valores</button></li>
                <li><button onClick={() => scrollToSection("depoimentos")} className="text-muted-foreground hover:text-primary transition-colors">Depoimentos</button></li>
                <li><button onClick={() => scrollToSection("faq")} className="text-muted-foreground hover:text-primary transition-colors">Dúvidas Frequentes</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Horário de Funcionamento</h4>
              <ul className="space-y-3">
                <li className="flex justify-between text-muted-foreground">
                  <span>Seg - Sex:</span>
                  <span className="font-medium text-foreground">08:00 - 18:00</span>
                </li>
                <li className="flex justify-between text-muted-foreground">
                  <span>Sábado:</span>
                  <span className="font-medium text-foreground">08:00 - 16:00</span>
                </li>
                <li className="flex justify-between text-muted-foreground">
                  <span>Domingo:</span>
                  <span className="font-medium text-foreground">Fechado</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Espaço Eliana Azevedo. Todos os direitos reservados.</p>
            <p>Feito com muito carinho para o seu pet.</p>
          </div>
        </div>
      </footer>

      {/* Botão flutuante WhatsApp */}
      <motion.a
        href="https://wa.me/5511987654321"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl btn-pulse-whatsapp"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 200, damping: 15 }}
        title="Fale conosco no WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.a>
    </div>
  );
}
