'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  CodeBracketIcon,
  DocumentIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '@/contexts/ThemeContext';

const navItems = [
  { label: 'Accueil', href: '/', icon: HomeIcon, showOnCV: true },
  { label: 'Technologies', href: '#tech-section', icon: CodeBracketIcon, showOnCV: false },
  { label: 'Projets', href: '#projects-section', icon: DocumentTextIcon, showOnCV: false },
  { label: 'Contact', href: '#contact-section', icon: EnvelopeIcon, showOnCV: false },
  { label: 'CV', href: '/cv', icon: DocumentIcon, showOnCV: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();
  const isCV = pathname === '/cv';

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId.slice(1));
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      scrollToSection(href);
    } else if (href === '/' && pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredNavItems = navItems.filter(item => !isCV || item.showOnCV);

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-50 pt-10">
      <nav
        className={`w-[750px] transition-all duration-300 border-2 border-white-light dark:border-white-dark 
                   ${isScrolled
                     ? 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg shadow-lg'
                     : 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg shadow-lg md:bg-transparent md:dark:bg-transparent md:backdrop-blur-none md:shadow-none'
                   }
                   ${isOpen ? 'rounded-xl md:rounded-full' : 'rounded-full'}`}
      >
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src={theme === 'dark' ? '/logo_white.png' : '/logo_black.png'}
                alt="Logo"
                width={40}
                height={40}
                className="transition-opacity duration-300"
                priority
              />
            </Link>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className="text-text-light dark:text-text-dark hover:text-primary 
                             dark:hover:text-primary-dark transition-colors p-2 rounded-full
                             hover:bg-primary/10 dark:hover:bg-primary-dark/10"
                    title={item.label}
                  >
                    <Icon className="h-6 w-6" />
                  </button>
                );
              })}
            </div>

            {/* Menu mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="ml-4 p-2 text-text-light dark:text-text-dark hover:text-primary 
                         dark:hover:text-primary-dark transition-colors"
                aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Menu mobile déroulant */}
          <motion.div
            initial={false}
            animate={{ height: isOpen ? 'auto' : 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 space-y-4">
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className="flex items-center gap-2 text-text-light dark:text-text-dark 
                             hover:text-primary dark:hover:text-primary-dark transition-colors w-full px-4"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </nav>
    </div>
  );
} 