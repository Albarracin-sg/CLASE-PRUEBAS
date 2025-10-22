import puppeteer from 'puppeteer';
import path from 'path';

// Asegurarnos de que la ruta base es la del proyecto
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const projectRoot = path.resolve(__dirname, '..');

const generatePdf = async () => {
  console.log('Lanzando el navegador...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const reportPath = path.resolve(projectRoot, 'coverage', 'html', 'index.html');
  console.log(`Abriendo el reporte en: file://${reportPath}`);

  await page.goto(`file://${reportPath}`, { waitUntil: 'networkidle0' });

  const pdfPath = path.resolve(projectRoot, 'coverage', 'coverage-report.pdf');
  console.log(`Generando PDF en: ${pdfPath}`);

  await page.pdf({
    path: pdfPath,
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
  console.log('¡PDF generado con éxito!');
};

generatePdf().catch(err => {
  console.error("Error al generar el PDF:", err);
  process.exit(1);
});
