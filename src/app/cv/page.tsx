'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/animation/AnimatedSection';
import { FaBriefcase, FaGraduationCap, FaCode, FaUserTie } from 'react-icons/fa';
import { ThemeSelector } from '@/components/theme/ThemeSelector';

interface Experience {
  poste: string;
  entreprise: string;
  periode: string;
  lieu: string;
  description: string[];
  taches?: string[];
}

interface Formation {
  diplome: string;
  etablissement: string;
  periode: string;
  lieu: string;
  description?: string;
}

interface Skill {
  name: string;
  level: number;
  category: string;
}

type CardType = 'experiences' | 'formations' | 'skills' | 'softSkills';

const iconVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.1,
    rotate: [0, -10, 10, -10, 0],
    transition: {
      rotate: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2
      }
    }
  },
  tap: { scale: 0.95 }
};

export default function CV() {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const experiences: Experience[] = [
    {
      poste: "Développeur Full Stack",
      entreprise: "Freelance et Iroko",
      periode: "2024 - Maintenant",
      lieu: "La Réunion",
      description: [
        "Développement de sites web et d'applications sur mesure",
        "Création de solutions digitales innovantes",
        "Gestion de projets web de A à Z"
      ],
      taches: [
        "Développement front-end avec React, Next.js et TypeScript",
        "Développement back-end avec Node.js et NestJS",
        "Intégration de CMS headless",
        "Optimisation SEO et performance",
        "Déploiement et maintenance d'applications"
      ]
    },
    {
      poste: "Conseiller en assurance",
      entreprise: "Ociane Matmut",
      periode: "2021 - 2023",
      lieu: "La Réunion",
      description: [
        "Conseil et vente de produits d'assurance santé",
        "Gestion de portefeuille clients",
        "Suivi et fidélisation clientèle"
      ],
      taches: [
        "Analyse des besoins clients",
        "Proposition de solutions adaptées",
        "Gestion des contrats et des sinistres",
        "Développement du portefeuille client"
      ]
    },
    {
      poste: "Commerciale en assurance et gestionnaire recouvrement",
      entreprise: "SPB Family",
      periode: "2020 - 2021",
      lieu: "La Réunion",
      description: [
        "Vente de produits d'assurance",
        "Gestion du recouvrement",
        "Service client"
      ],
      taches: [
        "Prospection commerciale",
        "Négociation et conclusion de contrats",
        "Gestion des impayés",
        "Relation client"
      ]
    },
    {
      poste: "Chef de partie",
      entreprise: "Clos d'augusta",
      periode: "2019 - 2020",
      lieu: "La Réunion",
      description: [
        "Gestion d'une partie en cuisine",
        "Préparation et dressage des plats",
        "Management d'équipe"
      ]
    },
    {
      poste: "Chef de cuisine et second",
      entreprise: "Dupont restauration",
      periode: "2016 - 2018",
      lieu: "France",
      description: [
        "Direction de la cuisine",
        "Création de menus",
        "Gestion des équipes et des stocks"
      ]
    },
    {
      poste: "Wedding Planner",
      entreprise: "French Wedding Company",
      periode: "2014 - 2017",
      lieu: "France",
      description: [
        "Organisation de mariages pour clients anglophones",
        "Coordination des prestataires",
        "Gestion de projet événementiel"
      ]
    }
  ];

  const formations: Formation[] = [
    {
      diplome: "Titre professionnel Développeur Web et web mobile",
      etablissement: "IFR Sainte pierre",
      periode: "2023 - 2024",
      lieu: "La Réunion",
      description: "Formation intensive en développement web full stack"
    },
    {
      diplome: "Formation IAS niveau 3",
      etablissement: "SPB",
      periode: "2020",
      lieu: "La Réunion",
      description: "Certification en Intermédiation en Assurances"
    },
    {
      diplome: "CQP commis de cuisine",
      etablissement: "Clos d'augusta et école les criquets",
      periode: "2018 - 2019",
      lieu: "La Réunion"
    },
    {
      diplome: "Licence 2 Biologie",
      etablissement: "Université Bordeaux",
      periode: "2014 - 2016",
      lieu: "Bordeaux"
    },
    {
      diplome: "Bac Scientifique",
      etablissement: "Lycée montaigne",
      periode: "2013",
      lieu: "Bordeaux"
    }
  ];

  const skills: Skill[] = [
    { name: "React", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Frontend" },
    { name: "Next.js", level: 85, category: "Frontend" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "NestJS", level: 75, category: "Backend" },
    { name: "PostgreSQL", level: 75, category: "Backend" },
    { name: "Docker", level: 70, category: "DevOps" },
    { name: "Git", level: 85, category: "DevOps" },
    { name: "AWS", level: 65, category: "DevOps" },
    { name: "Flutter", level: 70, category: "Mobile" },
    { name: "WordPress", level: 80, category: "CMS" },
    { name: "SEO", level: 75, category: "Marketing" }
  ];

  const softSkills = [
    {
      category: "Communication",
      skills: [
        "Communication claire et efficace",
        "Écoute active",
        "Présentation professionnelle",
        "Négociation"
      ]
    },
    {
      category: "Gestion de projet",
      skills: [
        "Organisation",
        "Planification",
        "Gestion des priorités",
        "Respect des délais"
      ]
    },
    {
      category: "Travail d'équipe",
      skills: [
        "Collaboration",
        "Leadership",
        "Adaptabilité",
        "Mentorat"
      ]
    },
    {
      category: "Résolution de problèmes",
      skills: [
        "Analyse critique",
        "Créativité",
        "Prise de décision",
        "Innovation"
      ]
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl relative">
        <div className="absolute top-0 right-0">
          <ThemeSelector />
        </div>
        <AnimatedSection direction="up" className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary dark:text-primary-dark mb-4">
            Léo Ségalini
          </h1>
          <p className="text-lg text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto md:text-xl">
            Développeur Full Stack passionné par la création d&apos;applications web innovantes. 
            Mon parcours diversifié m&apos;a permis de développer une approche unique de la résolution de problèmes 
            et une excellente capacité d&apos;adaptation.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-center md:text-left">
          {/* Card Expériences */}
          <motion.div
            className={`cursor-pointer rounded-xl p-8 animated-border ${
              selectedCard === 'experiences'
                ? 'bg-primary/10 dark:bg-primary-dark/10'
                : 'bg-background-light dark:bg-background-dark hover:bg-primary/5 dark:hover:bg-primary-dark/5'
            } transition-colors flex flex-col items-center justify-center text-center`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => setSelectedCard(selectedCard === 'experiences' ? null : 'experiences')}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="flex items-center gap-4">
              <motion.div
                variants={iconVariants}
                initial="initial"
                className="text-primary dark:text-primary-dark"
              >
                <FaBriefcase className="md:w-8 md:h-8 w-5 h-5" />
              </motion.div>
              <h2 className="text-xl md:text-3xl font-bold text-primary dark:text-primary-dark">
                Expériences
              </h2>
            </div>
            <p className="text-base md:text-lg text-text-light/80 dark:text-text-dark/80">
              Parcours professionnel riche et varié
            </p>
          </motion.div>

          {/* Card Formations */}
          <motion.div
            className={`cursor-pointer rounded-xl p-8 animated-border ${
              selectedCard === 'formations'
                ? 'bg-primary/10 dark:bg-primary-dark/10'
                : 'bg-background-light dark:bg-background-dark hover:bg-primary/5 dark:hover:bg-primary-dark/5'
            } transition-colors flex flex-col items-center justify-center text-center`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => setSelectedCard(selectedCard === 'formations' ? null : 'formations')}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="flex items-center gap-4">
              <motion.div
                variants={iconVariants}
                initial="initial"
                className="text-primary dark:text-primary-dark"
              >
                <FaGraduationCap className="md:w-8 md:h-8 w-5 h-5" />
              </motion.div>
              <h2 className="text-xl md:text-3xl font-bold text-primary dark:text-primary-dark">
                Formations
              </h2>
            </div>
            <p className="text-base md:text-lg text-text-light/80 dark:text-text-dark/80">
              Parcours académique et certifications
            </p>
          </motion.div>

          {/* Card Skills */}
          <motion.div
            className={`cursor-pointer rounded-xl p-8 animated-border ${
              selectedCard === 'skills'
                ? 'bg-primary/10 dark:bg-primary-dark/10'
                : 'bg-background-light dark:bg-background-dark hover:bg-primary/5 dark:hover:bg-primary-dark/5'
            } transition-colors flex flex-col items-center justify-center text-center`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => setSelectedCard(selectedCard === 'skills' ? null : 'skills')}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="flex items-center gap-4">
              <motion.div
                variants={iconVariants}
                initial="initial"
                className="text-primary dark:text-primary-dark"
              >
                <FaCode className="md:w-8 md:h-8 w-5 h-5" />
              </motion.div>
              <h2 className="text-xl md:text-3xl font-bold text-primary dark:text-primary-dark">
                Compétences Techniques
              </h2>
            </div>
            <p className="text-base md:text-lg text-text-light/80 dark:text-text-dark/80">
              Technologies et outils maîtrisés
            </p>
          </motion.div>

          {/* Card Soft Skills */}
          <motion.div
            className={`cursor-pointer rounded-xl p-8 animated-border ${
              selectedCard === 'softSkills'
                ? 'bg-primary/10 dark:bg-primary-dark/10'
                : 'bg-background-light dark:bg-background-dark hover:bg-primary/5 dark:hover:bg-primary-dark/5'
            } transition-colors flex flex-col items-center justify-center text-center`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => setSelectedCard(selectedCard === 'softSkills' ? null : 'softSkills')}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="flex items-center gap-4">
              <motion.div
                variants={iconVariants}
                initial="initial"
                className="text-primary dark:text-primary-dark"
              >
                <FaUserTie className="md:w-8 md:h-8 w-5 h-5" />
              </motion.div>
              <h2 className="text-xl md:text-3xl font-bold text-primary dark:text-primary-dark">
                Soft Skills
              </h2>
            </div>
            <p className="text-base md:text-lg text-text-light/80 dark:text-text-dark/80">
              Compétences interpersonnelles
            </p>
          </motion.div>
        </div>

        {/* Contenu détaillé */}
        <AnimatePresence mode="wait">
          {selectedCard && (
            <motion.div
              key={selectedCard}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-background-light dark:bg-background-dark rounded-xl p-6 mb-12 text-center md:text-left"
            >
              {selectedCard === 'experiences' && (
                <div className="space-y-8 text-center md:text-left w-full">
                  {experiences.map((exp, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 text-center md:text-left">
                      <div className="flex justify-between items-start flex-wrap gap-4 mb-4 text-center md:text-left">
                        <div className="w-full">
                          <h3 className="text-xl font-semibold text-primary dark:text-primary-dark text-center md:text-left">
                            {exp.poste}
                          </h3>
                          <p className="text-lg text-center md:text-left">{exp.entreprise}</p>
                        </div>
                        <div className="text-center md:text-right w-full">
                          <p className="text-sm text-text-light/80 dark:text-text-dark/80">{exp.periode}</p>
                          <p className="text-sm text-center md:text-left">{exp.lieu}</p>
                        </div>
                      </div>
                      <ul className="list-disc list-inside space-y-2 text-center md:text-left">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-text-light/80 dark:text-text-dark/80">
                            {item}
                          </li>
                        ))}
                      </ul>
                      {exp.taches && (
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">Tâches principales :</h4>
                          <ul className="list-disc list-inside space-y-1 text-center md:text-left">
                            {exp.taches.map((tache, i) => (
                              <li key={i} className="text-text-light/80 dark:text-text-dark/80">
                                {tache}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {selectedCard === 'formations' && (
                <div className="space-y-6 text-center md:text-left">
                  {formations.map((formation, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                      <div className="flex justify-between items-start flex-wrap gap-4">
                        <div className="w-full">
                          <h3 className="text-xl font-semibold text-primary dark:text-primary-dark">
                            {formation.diplome}
                          </h3>
                          <p className="text-lg text-center md:text-left">{formation.etablissement}</p>
                        </div>
                        <div className="text-right w-full">
                          <p className="text-sm text-text-light/80 dark:text-text-dark/80 text-center md:text-left">{formation.periode}</p>
                          <p className="text-sm text-center md:text-left">{formation.lieu}</p>
                        </div>
                      </div>
                      {formation.description && (
                        <p className="mt-2 text-text-light/80 dark:text-text-dark/80">
                          {formation.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {selectedCard === 'skills' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
                  {Object.entries(
                    skills.reduce((acc, skill) => {
                      if (!acc[skill.category]) acc[skill.category] = [];
                      acc[skill.category].push(skill);
                      return acc;
                    }, {} as Record<string, Skill[]>)
                  ).map(([category, categorySkills]) => (
                    <div key={category}>
                      <h3 className="text-xl font-semibold text-primary dark:text-primary-dark mb-4">
                        {category}
                      </h3>
                      <div className="space-y-4">
                        {categorySkills.map((skill) => (
                          <div key={skill.name}>
                            <div className="flex justify-between mb-1">
                              <span>{skill.name}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-primary dark:bg-primary-dark"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedCard === 'softSkills' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
                  {softSkills.map((category, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-xl font-semibold text-primary dark:text-primary-dark">
                        {category.category}
                      </h3>
                      <ul className="space-y-2">
                        {category.skills.map((skill, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-text-light/80 dark:text-text-dark/80"
                          >
                            <span className="w-2 h-2 bg-primary dark:bg-primary-dark rounded-full" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Télécharger CV */}
        <AnimatedSection direction="up" delay={0.6} className="text-center">
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary dark:bg-primary-dark text-white rounded-lg
                     hover:bg-primary/90 dark:hover:bg-primary-dark/90 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Télécharger mon CV
          </a>
        </AnimatedSection>
      </div>
    </div>
  );
} 