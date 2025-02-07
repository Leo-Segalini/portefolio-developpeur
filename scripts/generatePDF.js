const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    // Lancer le navigateur
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Chemin vers le fichier HTML
    const htmlPath = path.join(__dirname, '../public/cv.html');
    
    // Charger le fichier HTML
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle0'
    });

    // Générer le PDF
    await page.pdf({
      path: path.join(__dirname, '../public/cv.pdf'),
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    await browser.close();
    console.log('PDF généré avec succès !');
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
  }
})(); 