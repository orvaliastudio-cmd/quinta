import fs from 'fs';
import * as cheerio from 'cheerio';

const files = ['index.html', 'index-en.html', 'index-es.html'];

const labels = {
  carouselPrev: { 'index.html': 'Imagem anterior', 'index-en.html': 'Previous image', 'index-es.html': 'Imagen anterior' },
  carouselNext: { 'index.html': 'Próxima imagem', 'index-en.html': 'Next image', 'index-es.html': 'Siguiente imagen' },
  galleryExpand: { 'index.html': 'Expandir galeria', 'index-en.html': 'Expand gallery', 'index-es.html': 'Expandir galería' },
  lightboxClose: { 'index.html': 'Fechar galeria', 'index-en.html': 'Close gallery', 'index-es.html': 'Cerrar galería' },
  lightboxPrev: { 'index.html': 'Imagem anterior', 'index-en.html': 'Previous image', 'index-es.html': 'Imagen anterior' },
  lightboxNext: { 'index.html': 'Próxima imagem', 'index-en.html': 'Next image', 'index-es.html': 'Siguiente imagen' },
  navLogo: { 'index.html': 'Página Inicial', 'index-en.html': 'Home Page', 'index-es.html': 'Página de inicio' },
  shareClose: { 'index.html': 'Fechar modal', 'index-en.html': 'Close modal', 'index-es.html': 'Cerrar modal' },
  faqItem: { 'index.html': 'Alternar resposta', 'index-en.html': 'Toggle answer', 'index-es.html': 'Alternar respuesta' },
  menuToggle: { 'index.html': 'Abrir menu', 'index-en.html': 'Open menu', 'index-es.html': 'Abrir menú' },
  menuClose: { 'index.html': 'Fechar menu', 'index-en.html': 'Close menu', 'index-es.html': 'Cerrar menú' },
  share: { 'index.html': 'Compartilhar', 'index-en.html': 'Share', 'index-es.html': 'Compartir' }
};

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });

  // 1. Remove bogus aria-label from <article>
  $('article').removeAttr('aria-label');

  // 2. Specific fixes

  // Prev/Next carousel
  $('.carousel-prev').attr('aria-label', labels.carouselPrev[file]);
  $('.carousel-next').attr('aria-label', labels.carouselNext[file]);
  
  // Gallery trigger
  $('.gallery-trigger-btn').attr('aria-label', labels.galleryExpand[file]);

  // Lightbox
  $('#lightbox-close').attr('aria-label', labels.lightboxClose[file]);
  $('#lightbox-prev').attr('aria-label', labels.lightboxPrev[file]);
  $('#lightbox-next').attr('aria-label', labels.lightboxNext[file]);

  // Nav Logo
  $('.nav-logo').attr('aria-label', labels.navLogo[file]);

  // Share Close
  $('#share-close').attr('aria-label', labels.shareClose[file]);

  // Menu Togglers
  $('#menu-toggle').attr('aria-label', labels.menuToggle[file]);
  $('#menu-close').attr('aria-label', labels.menuClose[file]);

  // Share button
  $('.share-btn').each((i, el) => {
    // some might already have Compartilhar... enforce correct lang
    $(el).attr('aria-label', labels.share[file]);
  });

  // FAQ Items
  $('.w-full.py-6.flex.justify-between').each((i, el) => {
    const $el = $(el);
    if ($el.attr('aria-expanded')) {
      $el.attr('aria-label', labels.faqItem[file] + ': ' + $el.text().trim());
    }
  });

  // 3. Generic sweep for any <a> or <button> still lacking aria-label
  // The assignment specifies ALL interactive elements
  $('a:not([aria-label]), button:not([aria-label]), input:not([aria-label]), select:not([aria-label]), textarea:not([aria-label])').each((i, el) => {
    const $el = $(el);
    let text = $el.text().trim().replace(/\s+/g, ' ');
    if (text) {
      $el.attr('aria-label', text);
    } else {
      // Fallback if no text but has a title or standard class
      if ($el.attr('title')) {
        $el.attr('aria-label', $el.attr('title'));
      } else {
         // Generic component like a close button? Log if missed anything
         console.log('Missed element in', file, $.html(el));
      }
    }
  });

  // Since we also want to ensure all elements *have* standard aria-labels even if our regex accidentally placed buggy ones earlier,
  // Let's actually overwrite existing aria-labels if they are basically the element's text content, but keeping them if they were custom.
  // Actually, cheerio load and simple DOM modification is clean.

  fs.writeFileSync(file, $.html());
}

console.log('Cheerio parsing done');
