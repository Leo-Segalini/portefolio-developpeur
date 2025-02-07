'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '@/config/emailjs';

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const form = e.currentTarget;
      
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        form,
        emailjsConfig.publicKey
      );

      setIsSent(true);
      form.reset();
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      console.error('Erreur lors de l\'envoi:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 bg-green-50 dark:bg-green-900/10 rounded-lg"
      >
        <h3 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
          Message envoyé !
        </h3>
        <p className="text-green-700 dark:text-green-300">
          Merci de m&apos;avoir contacté. Je vous répondrai dans les plus brefs délais.
        </p>
        <button
          onClick={() => setIsSent(false)}
          className="mt-6 px-6 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg
                   hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="user_name" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
          Nom complet
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-text-light dark:text-text-dark
                   focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent
                   transition-colors"
        />
      </div>

      <div>
        <label htmlFor="user_email" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
          Email
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-text-light dark:text-text-dark
                   focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent
                   transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
          Message
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

      {error && (
        <div className="text-red-500 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-primary dark:bg-primary-dark text-white rounded-lg
                 hover:bg-primary/90 dark:hover:bg-primary-dark/90 transition-colors
                 focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-primary-dark
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  );
} 