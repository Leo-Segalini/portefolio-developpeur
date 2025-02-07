'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { AnimatedSection } from '@/components/animation/AnimatedSection';
import { TechCarousel } from '@/components/ui/TechCarousel';
import { AnimatedBackground } from '@/components/animation/AnimatedBackground';
import { ThemeSelector } from '@/components/theme/ThemeSelector';

const technologies = {
  'Frontend': [
    { name: 'React', icon: '/react.svg' },
    { name: 'TypeScript', icon: '/typescript.svg' },
    { name: 'Next.js', icon: '/nextjs.svg' },
    { name: 'JavaScript', icon: '/js.svg' },
    { name: 'Tailwind CSS', icon: '/tailwind.svg' },
    { name: 'Bootstrap', icon: '/bootstrap.svg' },
  ],
  'Backend': [
    { name: 'Node.js', icon: '/nodejs.svg' },
    { name: 'NestJS', icon: '/nestjs.svg' },
    { name: 'PHP', icon: '/php.svg' },
    { name: 'Java', icon: '/java.svg' },
  ],
  'Base de données': [
    { name: 'PostgreSQL', icon: '/postgresql.svg' },
    { name: 'MySQL', icon: '/mysql.svg' },
    { name: 'SQL', icon: '/sql.svg' },
    { name: 'Supabase', icon: '/supabase.svg' },
    { name: 'Firebase', icon: '/firebase.svg' },
    { name: 'Xano', icon: '/xano.svg' },
  ],
  'CMS & No-Code': [
    { name: 'WordPress', icon: '/wordpress.svg' },
    { name: 'Webflow', icon: '/webflow.svg' },
    { name: 'Elementor', icon: '/elementor.svg' },
    { name: 'WeWeb', icon: '/weweb.svg' },
    { name: 'FlutterFlow', icon: '/flutterflow.svg' },
  ],
  'Mobile & DevOps': [
    { name: 'Flutter', icon: '/flutter.svg' },
    { name: 'Docker', icon: '/docker.svg' },
  ],
};

const projects = [
  {
    title: "Agora Sport",
    description: "Plateforme de réservation d'activités sportives en Côte d'Ivoire.",
    image: "/projects/agora-sport.png",
    url: "https://agora-sport.com/",
    technologies: ["WordPress", "Elementor", "Progress Map"],
    client: "Iroko"
  },
  {
    title: "Darc",
    description: "Site e-commerce pour une marque de vêtements en Côte d'Ivoire.",
    image: "/projects/darc-ci.png",
    url: "https://darc-ci.com/",
    technologies: ["WordPress", "WooCommerce", "Elementor"],
    client: "Iroko"
  },
  {
    title: "Felin",
    description: "Site de réservation de formation, pour la Fedération de Lutte contre les Infections Nosocomiales.",
    image: "/projects/felin.png",
    url: "https://felin.re/",
    technologies: ["WordPress", "Elementor"],
    client: "Iroko"
  },
  {
    title: "Halal Réunion",
    description: "Application mobile de scan de produits halal et restaurant halal à la Réunion.",
    image: "/projects/halal-reunion.png",
    url: "https://play.google.com/store/apps/details?id=com.halalreunion.hr_scan_iroko",
    technologies: ["Flutter"],
    client: "Iroko"
  },
  {
    title: "ARIPA",
    description: "Application mobile de calcul pour les pêcheurs.",
    image: "/projects/aripa.png",
    url: "https://play.google.com/store/apps/details?id=com.iroko.aripacalculatrice",
    technologies: ["Flutter"],
    client: "Iroko"
  },
  {
    title: "Eurocham",
    description: "Site institutionnel pour la Chambre Européenne de Commerce.",
    image: "/projects/eurochamci.png",
    url: "https://eurochamci.com/",
    technologies: ["WordPress", "Elementor"],
    client: "Iroko"
  },
  {
    title: "Ayoka Restaurant",
    description: "Site vitrine pour un restaurant gastronomique en Côte d'Ivoire.",
    image: "/projects/ayoka.png",
    url: "https://ayokarestaurant.ci/",
    technologies: ["WordPress", "Elementor"],
    client: "Iroko"
  },
  {
    title: "SpaNoom",
    description: "Site vitrine pour un spa de luxe en Côte d'Ivoire.",
    image: "/projects/spabynoom.png",
    url: "https://spabynoom.ci/",
    technologies: ["WordPress", "Elementor"],
    client: "Iroko"
  },
  {
    title: "Projet SDE",
    description: "Site vitrine pour un cabinet de conseil en Côte d'Ivoire.",
    image: "/projects/sde.png",
    url: "https://projet-sde.com/",
    technologies: ["WordPress", "Elementor"],
    client: "Iroko"
  },
  {
    title: "Align MS",
    description: "Site vitrine pour une entreprise de conseil au Liban.",
    image: "/projects/alignms.png",
    url: "https://alignms.com/",
    technologies: ["WordPress", "Elementor"],
    client: "Iroko"
  },
  {
    title: "Gloria Maris",
    description: "Site vitrine pour une association de plongée sous-marine à la Réunion.",
    image: "/projects/gloriamaris.png",
    url: "https://gloriamaris.net/",
    technologies: ["WordPress", "Elementor"],
    client: "Projet personnel"
  }
];

// Ajout des constantes pour les couleurs des technologies
const TECH_COLORS = {
  'WordPress': { bg: '#21759b', text: '#ffffff' },
  'Elementor': { bg: '#92003B', text: '#ffffff' },
  'WooCommerce': { bg: '#96588a', text: '#ffffff' },
  'Flutter': { bg: '#02569B', text: '#ffffff' },
  'Progress Map': { bg: '#4CAF50', text: '#ffffff' },
} as const;

const getTechColor = (tech: string) => {
  return TECH_COLORS[tech as keyof typeof TECH_COLORS] || { bg: '#6B7280', text: '#ffffff' };
};

const getTechUrl = (tech: string) => {
  const urls: Record<string, string> = {
    'WordPress': 'https://wordpress.org/',
    'Elementor': 'https://elementor.com/',
    'WooCommerce': 'https://woocommerce.com/',
    'Flutter': 'https://flutter.dev/',
    'Progress Map': 'https://wordpress.org/plugins/progress-map/',
  };
  return urls[tech] || '#';
};

export default function Home() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollToTech = () => {
    const techSection = document.getElementById('tech-section');
    if (techSection) {
      window.scrollTo({
        top: techSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoaded && (
        <motion.div
          className="relative min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedBackground>
            <ThemeSelector />

            {/* Indicateur de scroll unique */}
            <motion.button
              onClick={scrollToTech}
              className="fixed bottom-32 left-1/2 -translate-x-1/2 z-40 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: showScrollIndicator ? 1 : 0,
                y: showScrollIndicator ? [0, 10, 0] : 0
              }}
              transition={{
                opacity: { duration: 0.3 },
                y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }
              }}
              aria-label="Défiler vers le bas"
            >
              <ChevronDownIcon 
                className="w-8 h-8 text-text-light dark:text-text-dark hover:text-primary 
                          dark:hover:text-primary-dark transition-colors" 
              />
            </motion.button>

            {/* Section Héro */}
            <section className="relative min-h-screen flex items-center justify-center">
              <div className="container mx-auto px-4 max-w-7xl">
                <div className="absolute top-8 right-8">
                  <ThemeSelector />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center justify-between text-center md:text-start">
                  <AnimatedSection
                    direction="left"
                    delay={0.2}
                    className="space-y-6"
                  >
                    <h1 className="text-4xl md:text-6xl font-bold text-text-light dark:text-text-dark">
                      Développeur Full Stack
                      <span className="text-primary dark:text-primary-dark">.</span>
                    </h1>
                    <p className="text-xl text-text-light/80 dark:text-text-dark/80 max-w-lg">
                      Passionné par la création d&apos;applications web modernes et performantes,
                      avec une expertise en React, TypeScript et Node.js.
                    </p>
                    <div className="flex space-x-4">
                      <motion.button
                        onClick={() => {
                          const projectsSection = document.getElementById('projects-section');
                          if (projectsSection) {
                            projectsSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="px-6 py-3 bg-primary dark:bg-primary-dark text-white rounded-lg
                                 hover:bg-primary/90 dark:hover:bg-primary-dark/90 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Voir mes projets
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          const contactSection = document.getElementById('contact-section');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="px-6 py-3 border-2 border-primary dark:border-primary-dark rounded-lg
                                 text-primary dark:text-primary-dark hover:bg-primary/10 dark:hover:bg-primary-dark/10
                                 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Me contacter
                      </motion.button>
                    </div>
                  </AnimatedSection>

                  {/* Photo de profil */}
                  <AnimatedSection
                    direction="right"
                    delay={0.4}
                    className="hidden md:block"
                  >
                    <div className="aspect-square max-w-md mx-auto relative overflow-hidden rounded-full 
                                  border-4 border-primary/20 dark:border-primary-dark/20">
        <Image
                        src="/profile_picture.png"
                        alt="Photo de profil"
                        width={1000}
                        height={1000}
                        className="object-cover"
          priority
        />
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </section>

            {/* Section Technologies */}
            <section
              id="tech-section"
              className="py-20 px-4"
            >
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary dark:text-primary-dark">
                  Technologies maîtrisées
                </h2>
                <TechCarousel categories={technologies} />
              </div>
            </section>

            {/* Section Projets */}
            <section
              id="projects-section"
              className="py-20 px-4 bg-gray-50 dark:bg-gray-900"
            >
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary dark:text-primary-dark">
                  Mes Projets
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      className="project-card group"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative h-64">
                        <a 
                          href={project.url} 
            target="_blank"
            rel="noopener noreferrer"
                          className="block w-full h-full"
                          aria-label={`Voir le projet ${project.title}`}
          >
            <Image
                            src={project.image}
                            alt={`Capture d'écran du projet ${project.title} - ${project.description}`}
                            fill
                            className="project-image"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 3}
                          />
                        </a>
                      </div>
                      
                      <div className="project-content">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-semibold text-primary dark:text-primary-dark">
                            <a 
                              href={project.url}
            target="_blank"
            rel="noopener noreferrer"
                              className="hover:text-primary-dark dark:hover:text-primary transition-colors"
          >
                              {project.title}
          </a>
                          </h3>
                          {project.client === "Iroko" && (
        <a
                              href="https://iroko.io"
          target="_blank"
          rel="noopener noreferrer"
                              className="text-sm text-primary hover:text-primary-dark dark:text-primary-dark 
                                       dark:hover:text-primary transition-colors"
                            >
                              Projet fait sous contrat avec Iroko
                            </a>
                          )}
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300">
                          {project.description}
                        </p>
                        
                        <div className="project-technologies">
                          {project.technologies.map(tech => (
                            <a
                              key={tech}
                              href={getTechUrl(tech)}
          target="_blank"
          rel="noopener noreferrer"
                              className="tech-badge"
                              style={{
                                '--tech-bg': getTechColor(tech).bg,
                                '--tech-text': getTechColor(tech).text
                              } as React.CSSProperties}
                            >
                              {tech}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section Contact */}
            <section
              id="contact-section"
              className="py-20 px-4"
            >
              <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary dark:text-primary-dark">
                  Me Contacter
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-start ">
                  {/* Informations de contact */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">
                      Mes Coordonnées
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-primary dark:text-primary-dark mb-2">Téléphone</h4>
                        <div className="space-y-2">
                          <a 
                            href="tel:+33670963371"
                            className="block text-text-light dark:text-text-dark hover:text-primary 
                                     dark:hover:text-primary-dark transition-colors"
                          >
                            🇫🇷 +33 6 70 96 33 71
        </a>
        <a
                            href="tel:+262693932265"
                            className="block text-text-light dark:text-text-dark hover:text-primary 
                                     dark:hover:text-primary-dark transition-colors"
                          >
                            🇷🇪 +262 693 93 22 65
                          </a>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-primary dark:text-primary-dark mb-2">Email</h4>
                        <a 
                          href="mailto:leo.segalini@outlook.com"
                          className="block text-text-light dark:text-text-dark hover:text-primary 
                                   dark:hover:text-primary-dark transition-colors"
                        >
                          leo.segalini@outlook.com
                        </a>
                      </div>

                      <div>
                        <h4 className="font-medium text-primary dark:text-primary-dark mb-2">Localisation</h4>
                        <p className="text-text-light dark:text-text-dark">
                          Développeur web freelance basé à La Réunion, disponible pour des projets dans le monde entier
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Formulaire de contact */}
                  <form
                    action={`https://formsubmit.co/${encodeURIComponent('leo.segalini@outlook.com')}`}
                    method="POST"
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstname" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                          Prénom
                        </label>
                        <input
                          type="text"
                          id="firstname"
                          name="firstname"
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                                   bg-white dark:bg-gray-800 text-text-light dark:text-text-dark
                                   focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent
                                   transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastname" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                          Nom
                        </label>
                        <input
                          type="text"
                          id="lastname"
                          name="lastname"
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                                   bg-white dark:bg-gray-800 text-text-light dark:text-text-dark
                                   focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent
                                   transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                                 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark
                                 focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent
                                 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                                 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark
                                 focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent
                                 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                        Description du projet
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                                 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark
                                 focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent
                                 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary dark:bg-primary-dark text-white rounded-lg
                               hover:bg-primary/90 dark:hover:bg-primary-dark/90 transition-colors
                               focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-primary-dark"
                    >
                      Envoyer le message
                    </button>

                    {/* Champs cachés pour FormSubmit.co */}
                    <input type="hidden" name="_subject" value="Nouveau message du portfolio" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="true" />
                    <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : ''} />
                  </form>
                </div>
    </div>
            </section>
          </AnimatedBackground>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
