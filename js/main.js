// ========== TAHUN OTOMATIS ==========
document.getElementById('year').textContent = new Date().getFullYear();

// ========== HEADER SCROLL ==========
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ========== HAMBURGER ==========
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
  }));
}

// ========== REVEAL ANIMATION ==========
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.section, .card, .galeri-item').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ========== RENDER BERITA ==========
const beritaList = document.getElementById('berita-list');
if (beritaList && typeof SITE_DATA !== 'undefined') {
  beritaList.innerHTML = SITE_DATA.berita.map(b => `
    <article class="card">
      <img src="${b.gambar}" alt="${b.judul}" onerror="this.src='https://via.placeholder.com/600x400/2d5016/ffffff?text=${encodeURIComponent(b.kategori)}'">
      <div class="card-body">
        <div class="card-meta">${b.kategori} • ${new Date(b.tanggal).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}</div>
        <h3>${b.judul}</h3>
        <p>${b.ringkasan}</p>
        <a href="#" class="link-arrow">Baca Selengkapnya →</a>
      </div>
    </article>
  `).join('');
}

// ========== RENDER AGENDA ==========
const agendaList = document.getElementById('agenda-list');
if (agendaList && typeof SITE_DATA !== 'undefined') {
  agendaList.innerHTML = SITE_DATA.agenda.map(a => `
    <article class="card">
      <div class="card-body">
        <div class="card-meta">${new Date(a.tanggal).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}</div>
        <h3>${a.nama}</h3>
        <p><strong>📍 ${a.lokasi}</strong></p>
        <p>${a.deskripsi}</p>
      </div>
    </article>
  `).join('');
}

// ========== RENDER GALERI ==========
const galeriHome = document.getElementById('galeri-home');
if (galeriHome && typeof SITE_DATA !== 'undefined') {
  galeriHome.innerHTML = SITE_DATA.galeri.map(g => `
    <div class="galeri-item">
      <img src="${g.gambar}" alt="${g.caption}" onerror="this.src='https://via.placeholder.com/600x600/2d5016/ffffff?text=Foto'">
    </div>
  `).join('');
}

// ========== SEARCH GLOBAL ==========
function globalSearch(query) {
  if (!query || !SITE_DATA) return [];
  const q = query.toLowerCase();
  const results = [];
  SITE_DATA.berita.forEach(b => {
    if (b.judul.toLowerCase().includes(q) || b.ringkasan.toLowerCase().includes(q)) {
      results.push({ tipe: 'Berita', judul: b.judul, url: '#' });
    }
  });
  SITE_DATA.agenda.forEach(a => {
    if (a.nama.toLowerCase().includes(q) || a.deskripsi.toLowerCase().includes(q)) {
      results.push({ tipe: 'Agenda', judul: a.nama, url: '#' });
    }
  });
  return results;
}