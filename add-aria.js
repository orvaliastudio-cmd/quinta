import fs from 'fs';

const files = ['index.html', 'index-en.html', 'index-es.html'];
const langs = {
  'index.html': 'pt',
  'index-en.html': 'en',
  'index-es.html': 'es'
};

const labels = {
  carouselPrev: { pt: 'Imagem anterior', en: 'Previous image', es: 'Imagen anterior' },
  carouselNext: { pt: 'Próxima imagem', en: 'Next image', es: 'Siguiente imagen' },
  galleryExpand: { pt: 'Expandir galeria', en: 'Expand gallery', es: 'Expandir galería' },
  lightboxClose: { pt: 'Fechar galeria', en: 'Close gallery', es: 'Cerrar galería' },
  lightboxPrev: { pt: 'Imagem anterior', en: 'Previous image', es: 'Imagen anterior' },
  lightboxNext: { pt: 'Próxima imagem', en: 'Next image', es: 'Siguiente imagen' },
  navLogo: { pt: 'Página Inicial', en: 'Home Page', es: 'Página de inicio' },
  shareClose: { pt: 'Fechar modal', en: 'Close modal', es: 'Cerrar modal' },
  faqItem: { pt: 'Alternar resposta', en: 'Toggle answer', es: 'Alternar respuesta' }
};

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  let lang = langs[file];

  // carousel-prev
  html = html.replace(/<button class="carousel-prev ([^>]+)>/g, (match, classes) => {
    if (match.includes('aria-label')) return match;
    return `<button class="carousel-prev ${classes} aria-label="${labels.carouselPrev[lang]}">`;
  });

  // carousel-next
  html = html.replace(/<button class="carousel-next ([^>]+)>/g, (match, classes) => {
    if (match.includes('aria-label')) return match;
    return `<button class="carousel-next ${classes} aria-label="${labels.carouselNext[lang]}">`;
  });

  // gallery-trigger-btn
  html = html.replace(/<button class="gallery-trigger-btn ([^>]+)>/g, (match, classes) => {
    if (match.includes('aria-label')) return match;
    return `<button class="gallery-trigger-btn ${classes} aria-label="${labels.galleryExpand[lang]}">`;
  });

  // lightbox-close
  html = html.replace(/id="lightbox-close">/g, `id="lightbox-close" aria-label="${labels.lightboxClose[lang]}">`);
  
  // lightbox-prev
  html = html.replace(/id="lightbox-prev">/g, `id="lightbox-prev" aria-label="${labels.lightboxPrev[lang]}">`);
  
  // lightbox-next
  html = html.replace(/id="lightbox-next">/g, `id="lightbox-next" aria-label="${labels.lightboxNext[lang]}">`);

  // nav-logo
  html = html.replace(/<a href="#" class="nav-logo ([^>]+)>/g, (match, classes) => {
    if (match.includes('aria-label')) return match;
    return `<a href="#" class="nav-logo ${classes} aria-label="${labels.navLogo[lang]}">`;
  });

  // share-close
  html = html.replace(/id="share-close">/g, `id="share-close" aria-label="${labels.shareClose[lang]}">`);

  // faq items
  html = html.replace(/<button class="w-full py-6 flex justify-between items-center text-left focus:outline-none" aria-expanded="false">/g, 
    `<button class="w-full py-6 flex justify-between items-center text-left focus:outline-none" aria-expanded="false" aria-label="${labels.faqItem[lang]}">`
  );

  // Now the generic tags (links, other buttons)
  // We'll use a regex that looks for <a ...> or <button ...> without aria-label
  // and adds an aria-label based on the text content.
  // We have to be careful with nested tags.
  // Actually, standardizing aria-label using text content is ok, but text content is sufficient for screen readers.
  // The instructions explicitly say: "Add ARIA labels to all interactive elements like buttons, links, and form inputs to improve accessibility."
  // Adding aria-label exactly matching inner text isn't strictly necessary for a11y (inner text is already read),
  // but let's do it if it's not empty. To do this robustly:
  
  html = html.replace(/<(a|button)([^>]*?)>([\s\S]*?)<\/\1>/g, (match, tag, attrs, inner) => {
    if (attrs.includes('aria-label')) return match; // already has
    
    // Check if inner content is purely HTML tags
    let text = inner.replace(/<[^>]+>/g, '').trim();
    if (!text) return match; // fallback if no text
    
    // Extract text safely without newlines
    text = text.replace(/\s+/g, ' ');
    
    // Skip if too long, or add the text as label
    return `<${tag}${attrs} aria-label="${text}">${inner}</${tag}>`;
  });

  fs.writeFileSync(file, html);
}
console.log('done');
