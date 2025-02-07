import { NextResponse } from 'next/server';
import * as emailjs from '@emailjs/nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Vérification des variables d'environnement
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    console.log('Configuration EmailJS:');
    console.log('Service ID présent:', !!serviceId);
    console.log('Template ID présent:', !!templateId);
    console.log('Public Key présente:', !!publicKey);
    console.log('Private Key présente:', !!privateKey);

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      throw new Error('Configuration EmailJS manquante');
    }

    console.log('Données du formulaire reçues:', {
      user_name: body.user_name,
      user_email: body.user_email,
      message: '***' // On masque le message pour la sécurité
    });

    const result = await emailjs.send(
      serviceId,
      templateId,
      {
        user_name: body.user_name,
        user_email: body.user_email,
        message: body.message
      },
      {
        publicKey,
        privateKey,
      }
    );

    console.log('Résultat de l\'envoi:', result);
    return NextResponse.json({ success: true, result });
    
  } catch (error) {
    console.error('Erreur détaillée lors de l\'envoi de l\'email:', error);
    
    let errorMessage = 'Erreur lors de l\'envoi du message';
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Stack trace:', error.stack);
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
} 