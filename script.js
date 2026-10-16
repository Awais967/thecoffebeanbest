/* =========================================================
   The Coffee Bean — script.js (v3)
   Edit CONFIG, PICS (pictures) and MENU below; everything else updates.
   ========================================================= */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ================= CONFIG ================= */
  const CONFIG = {
    // Hero ki background VIDEO (optional). Khali '' chhodein to sirf tasveer dikhegi. Misal: 'videos/hero.mp4'
    heroVideo: '',
    whatsapp: '923278826771',          // 0327 8826771 in international form: country code 92, no leading 0, no "+"
    currencySymbol: 'Rs', locale: 'en-PK',
    deliveryFee: 150, freeDeliveryAbove: 2500,
    deliveryTime: '30 to 45 minutes',  // shown when someone taps step 3 on the home page
    openHour: 8, closeHour: 23,        // 24-hour clock
    // "Watch how we brew" video: a barista making coffee behind the bar. First working link is used.
    // Spare clips (swap the order if you prefer one): 88006 = espresso machine close-up, 3583 = barista pouring coffee.
    videoFeature: [
      'https://assets.mixkit.co/videos/3577/3577-720.mp4',
      'https://assets.mixkit.co/videos/3577/3577-360.mp4',
      'https://assets.mixkit.co/videos/88006/88006-360.mp4',
      'https://assets.mixkit.co/videos/3583/3583-360.mp4',
      'videos/brew.mp4'
    ],
    ambientSound: true                 // soft café ambience on the sound button (stock clips have no audio)
  };
  const money = (v) => `${CONFIG.currencySymbol} ${Number(v).toLocaleString(CONFIG.locale)}`;

  /* =====================================================================
     PICTURES  —  YAHAN SE APNI TASVEEREIN BADLEIN
     ---------------------------------------------------------------------
     Har line ek tasveer hai. Line ka text badal dein:
       'images/meri-photo.jpg'   ← apni photo (images folder mein rakhein)
       'photo-1447933601403-...' ← purani online tasveer (rehne bhi de sakte hain)
     Agar koi tasveer na khule to usi list ki agli tasveer lag jati hai.
     ===================================================================== */
  const PICS = {
    // 1) Hero ki ek bari background tasveer. Pehli line use hoti hai, baaqi sirf tab jab pehli na khule.
    hero: [
      'images/hero.jpg',   // ← YAHAN APNI PHOTO
      'photo-1447933601403-0c6688de566e',
      'photo-1554118811-1e0d58224f24'
    ],
    // 2) "Our philosophy" ke collage ki 3 tasveerein
    about: [
      'photo-1447933601403-0c6688de566e',   // bari arch tasveer
      'photo-1514432324607-a09d9b4aefdd',   // chhoti arch tasveer
      'photo-1559496417-e7f25cb247f3'       // gol tasveer
    ],
    // 3) Hero ke neeche chalne wali tasveeron ki patti, 12 tasveerein
    strip: [
      'photo-1442512595331-e89e73853f31', 'photo-1555507036-ab1f4038808a', 'photo-1511920170033-f8396924c348',
      'photo-1497935586351-b67a49e012bf', 'photo-1559056199-641a0ac8b55e', 'photo-1514432324607-a09d9b4aefdd',
      'photo-1445116572660-236099ec97a0', 'photo-1541167760496-1628856ab772', 'photo-1447933601403-0c6688de566e',
      'photo-1504630083234-14187a9df0f5', 'photo-1514228742587-6b1558fcca3d', 'photo-1461023058943-07fcbe16d735'
    ],
    // 4) Gallery: [tasveer, neeche likha caption], 12 tasveerein
    gallery: [
      ['photo-1554118811-1e0d58224f24', 'Where the morning light lands'],
      ['photo-1511920170033-f8396924c348', 'Latte art, poured by hand'],
      ['photo-1447933601403-0c6688de566e', 'Beans, roasted this morning'],
      ['photo-1514432324607-a09d9b4aefdd', 'The first pour of the day'],
      ['photo-1501339847302-ac426a4a7cbb', 'A quiet corner to linger in'],
      ['photo-1555507036-ab1f4038808a', 'Butter, layers, patience'],
      ['photo-1559056199-641a0ac8b55e', 'Our little roastery bar'],
      ['photo-1541167760496-1628856ab772', 'Flat white, just so'],
      ['photo-1498804103079-a6351b050096', 'Slow mornings'],
      ['photo-1521017432531-fbd92d768814', 'Good company, better coffee'],
      ['photo-1453614512568-c4024d13c247', 'Steam and conversation'],
      ['photo-1461023058943-07fcbe16d735', 'Cold brew, brewed slowly']
    ],
    // 5) Menu ki items ki tasveerein (items inhi mein se ghoom kar lagti hain)
    menu: [
      'photo-1447933601403-0c6688de566e', 'photo-1495474472287-4d71bcdd2085', 'photo-1442512595331-e89e73853f31',
      'photo-1514432324607-a09d9b4aefdd', 'photo-1554118811-1e0d58224f24', 'photo-1511920170033-f8396924c348',
      'photo-1559496417-e7f25cb247f3', 'photo-1501339847302-ac426a4a7cbb', 'photo-1461023058943-07fcbe16d735',
      'photo-1555507036-ab1f4038808a', 'photo-1509042239860-f550ce710b93', 'photo-1541167760496-1628856ab772',
      'photo-1497935586351-b67a49e012bf', 'photo-1509440159596-0249088772ff', 'photo-1559056199-641a0ac8b55e',
      'photo-1521017432531-fbd92d768814', 'photo-1445116572660-236099ec97a0', 'photo-1453614512568-c4024d13c247',
      'photo-1504630083234-14187a9df0f5', 'photo-1511537190424-bbbab87ac5eb', 'photo-1514228742587-6b1558fcca3d',
      'photo-1498804103079-a6351b050096', 'photo-1495195134817-aeb325a55b65', 'photo-1587734195503-904fca47e0e9'
    ]
  };
  // 6) Kisi ek menu item ki apni photo: naam bilkul menu jaisa likhein. Misal:
  //    'Flat White': 'images/flat-white.jpg',
  const MENU_PHOTOS = {
  };

  // ----- (neeche ka code chhedne ki zaroorat nahi) -----
  const srcOf = (entry, w, h) => /^https?:|\//.test(entry)
    ? entry
    : `https://images.unsplash.com/${entry}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;
  const urlAt = (list, i, w, h) => srcOf(list[((i % list.length) + list.length) % list.length], w, h);
  // Load a picture; if it fails, try the next one in the same list (max 4 tries), then hide it.
  const loadImg = (img, list, i, w = 800, h = 600) => {
    let tries = 0;
    img.loading = 'lazy'; img.decoding = 'async'; img.width = w; img.height = h;
    img.onerror = () => {
      tries++;
      if (tries > 4 || list.length < 2) { img.onerror = null; img.style.visibility = 'hidden'; return; }
      img.src = urlAt(list, i + tries, w, h);
    };
    img.src = urlAt(list, i, w, h);
    return img;
  };
  const mkImg = (list, i, w, h, alt) => { const im = document.createElement('img'); im.alt = alt; im.dataset.img = i; return loadImg(im, list, i, w, h); };
  $$('img[data-img]').forEach(im => loadImg(im, PICS.about, +im.dataset.img, +im.dataset.w || 800, +im.dataset.h || 600));

  /* ================= MENU (60 items, prices in Rs) ================= */
  const CATS = [
    ['hot', 'Hot coffee'], ['cold', 'Cold brews'], ['tea', 'Tea & more'], ['shakes', 'Shakes & mocktails'],
    ['pastry', 'Pastries'], ['bites', 'Light bites'], ['dessert', 'Desserts'], ['signature', 'Signature'], ['deals', 'Deals']
  ];
  const ICON = { hot: 'mug-hot', cold: 'glass-water', tea: 'leaf', shakes: 'blender', pastry: 'bread-slice', bites: 'utensils', dessert: 'cake-candles', signature: 'star', deals: 'tags' };
  const raw = [
    // [category, name, price, description, tag?]
    ['hot', 'Espresso', 450, 'A short, syrupy shot with caramel sweetness.'],
    ['hot', 'Double Espresso', 600, 'Two shots, deep and bold, for a strong start.'],
    ['hot', 'Americano', 550, 'Double espresso lengthened with hot water.'],
    ['hot', 'Cortado', 650, 'Espresso cut with a splash of warm milk.'],
    ['hot', 'Flat White', 750, 'Double ristretto with silky microfoam.', 'Bestseller'],
    ['hot', 'Cappuccino', 750, 'Equal parts espresso, steamed milk and foam.'],
    ['hot', 'Caffè Latte', 790, 'Smooth espresso, steamed milk and latte art.'],
    ['hot', 'Mocha', 850, 'Espresso, dark chocolate and steamed milk.'],
    ['cold', '18-Hour Cold Brew', 850, 'Steeped slowly for a smooth, chocolatey finish.', 'Bestseller'],
    ['cold', 'Nitro Cold Brew', 950, 'Nitrogen-infused, creamy and cascading.'],
    ['cold', 'Iced Latte', 800, 'Espresso over ice with cold milk of your choice.'],
    ['cold', 'Iced Caramel Macchiato', 900, 'Vanilla milk, espresso and caramel drizzle.'],
    ['cold', 'Cold Foam Latte', 920, 'Iced latte topped with sweet vanilla cold foam.'],
    ['cold', 'Affogato', 900, 'Vanilla gelato drowned in hot espresso.'],
    ['cold', 'Mocha Frappé', 950, 'Blended iced coffee with cream and chocolate.'],
    ['cold', 'Coconut Cold Brew', 950, 'Cold brew with coconut cream and a pinch of salt.'],
    ['tea', 'Masala Chai', 450, 'Black tea simmered with cardamom, ginger and cloves.', 'Local favourite'],
    ['tea', 'Karak Chai', 400, 'Strong, creamy, slow-boiled tea.'],
    ['tea', 'Kashmiri Pink Chai', 550, 'Creamy pink tea with almonds and pistachios.'],
    ['tea', 'Matcha Latte', 850, 'Ceremonial matcha whisked with steamed milk.'],
    ['tea', 'Hot Chocolate', 700, 'Belgian chocolate melted into steamed milk.'],
    ['tea', 'Fresh Mint Lemonade', 500, 'Fresh lemon, mint and cane sugar.'],
    ['tea', 'Green Tea', 400, 'Light, fragrant loose-leaf tea served in a pot.'],
    ['shakes', 'Oreo Shake', 850, 'Thick vanilla shake blended with Oreo cookies.'],
    ['shakes', 'Peanut Butter Shake', 900, 'Creamy peanut butter, banana and ice cream.'],
    ['shakes', 'Mango Shake', 750, 'Fresh mango blended with chilled milk.'],
    ['shakes', 'Strawberry Smoothie', 800, 'Strawberries, yoghurt and a drizzle of honey.'],
    ['shakes', 'Virgin Mojito', 600, 'Mint, lime and sparkling water over crushed ice.'],
    ['shakes', 'Blue Lagoon', 650, 'Citrus and blue curaçao syrup, fizzy and cold.'],
    ['pastry', 'Butter Croissant', 450, 'Baked daily with 27 layers of French butter.', 'Fresh daily'],
    ['pastry', 'Almond Croissant', 650, 'Frangipane-filled, finished with toasted almonds.'],
    ['pastry', 'Pain au Chocolat', 600, 'Flaky pastry wrapped around dark chocolate.'],
    ['pastry', 'Cinnamon Roll', 650, 'Warm roll with brown sugar and cream-cheese glaze.'],
    ['pastry', 'Blueberry Muffin', 500, 'Moist muffin packed with wild blueberries.'],
    ['pastry', 'Pistachio Danish', 700, 'Buttery danish with pistachio cream.'],
    ['pastry', 'Chocolate Chip Cookie', 350, 'Big, chewy and still a little warm.'],
    ['bites', 'Avocado Toast', 1100, 'Sourdough, smashed avocado, chilli and lemon.'],
    ['bites', 'Chicken Club Sandwich', 1250, 'Grilled chicken, egg, lettuce and house mayo.'],
    ['bites', 'Sourdough Toast', 950, 'House sourdough with whipped ricotta and honey.'],
    ['bites', 'Fluffy Pancakes', 1050, 'Stack of three with maple syrup and berries.'],
    ['bites', 'Cheese Omelette', 950, 'Three-egg omelette with herbs, with toast.'],
    ['bites', 'Beef Panini', 1350, 'Pressed panini with mozzarella and caramelised onion.'],
    ['bites', 'Chicken Quesadilla', 1150, 'Crisp tortilla, melted cheese and spiced chicken.'],
    ['dessert', 'Tiramisu', 950, 'Espresso-soaked sponge with mascarpone cream.', 'Chef pick'],
    ['dessert', 'New York Cheesecake', 950, 'Classic baked cheesecake with berry compote.'],
    ['dessert', 'Chocolate Lava Cake', 1000, 'Warm molten centre with vanilla cream.'],
    ['dessert', 'Brownie Sundae', 900, 'Fudge brownie, ice cream and hot chocolate sauce.'],
    ['dessert', 'Crème Brûlée', 900, 'Vanilla custard under caramelised sugar.'],
    ['dessert', 'Lotus Biscoff Waffle', 1050, 'Crisp waffle with Biscoff spread and crumble.'],
    ['dessert', 'Gulab Jamun Cheesecake', 1000, 'Creamy cheesecake with a gulab jamun twist.'],
    ['signature', 'Velvet Reserve', 1000, 'Single-origin pour-over, jasmine and peach.', 'Signature'],
    ['signature', 'Caramel Bean Latte', 900, 'Espresso, house caramel, sea salt and cinnamon.', 'Signature'],
    ['signature', 'Honey Lavender Latte', 950, 'Lavender syrup with wildflower honey.'],
    ['signature', 'Spanish Latte', 850, 'Espresso and milk sweetened with condensed milk.'],
    ['signature', 'House Blend Beans (250g)', 2800, 'Everyday blend: cocoa, hazelnut and orange zest.'],
    ['signature', 'Single Origin Beans (250g)', 3400, 'Rotating seasonal lot, roasted to order.'],
    ['deals', 'Coffee & Croissant', 1050, 'Any hot coffee with a butter croissant.', 'Save Rs 150'],
    ['deals', 'Breakfast Combo', 1450, 'Cheese omelette with toast and a flat white.'],
    ['deals', 'Date Night for Two', 2600, 'Two signature lattes and a shared tiramisu.'],
    ['deals', 'Beans Gift Box', 4200, 'House blend beans, a mug and a handwritten note.', 'Gift']
  ];
  const BY_ID = {};
  const MENU = raw.map(([cat, n, p, d, tag], k) => {
    let id = n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `item-${k}`;
    while (BY_ID[id]) id += '-x';
    const item = { id, cat, icon: ICON[cat], n, p, d, tag, img: (k * 5 + 1) % PICS.menu.length, photo: MENU_PHOTOS[n] };
    BY_ID[id] = item;
    return item;
  });

  /* ---------------- Message modal ---------------- */
  const Modal = (() => {
    const m = $('#modal'), txt = $('#modalText'), close = $('#modalClose'); let last = null;
    const hide = () => { m.hidden = true; if (last && last.focus) last.focus(); };
    close.addEventListener('click', hide);
    m.addEventListener('click', e => { if (e.target === m) hide(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !m.hidden) hide(); });
    return { show(msg, title = 'Thank you') { last = document.activeElement; $('#modalTitle').textContent = title; txt.textContent = msg; m.hidden = false; close.focus(); } };
  })();

  /* ---------------- WhatsApp links ---------------- */
  $('#waFloat').href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Hello The Coffee Bean, I have a question.')}`;
  $('#contactWa').href = `https://wa.me/${CONFIG.whatsapp}`;

  /* ---------------- Header + mobile nav ---------------- */
  (() => {
    const h = $('#header'), btn = $('#navToggle'), nav = $('#nav');
    const u = () => h.classList.toggle('is-scrolled', scrollY > 40);
    addEventListener('scroll', u, { passive: true }); u();
    const set = (o) => { btn.setAttribute('aria-expanded', String(o)); btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); nav.classList.toggle('is-open', o); };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  })();

  /* ---------------- Hero: the three ordering steps ---------------- */
  (() => {
    $$('.hero-steps .step').forEach(btn => btn.addEventListener('click', () => {
      const k = btn.dataset.step;
      if (k === 'menu') $('#menu').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      else if (k === 'cart') $('#cartBtn').click();                       // opens your order, where "Send order on WhatsApp" is
      else Modal.show(`Delivery takes about ${CONFIG.deliveryTime}. Delivery charge is ${money(CONFIG.deliveryFee)}, and it is free on orders above ${money(CONFIG.freeDeliveryAbove)}. You can also choose pickup.`, 'Fresh to your door');
    }));
  })();

  /* ---------------- Hero background picture ---------------- */
  (() => {
    const bg = $('#heroBg'), probe = new Image(); let tries = 0;
    // For your own file (e.g. images/hero.jpg) also try the usual spelling mistakes:
    // hero.jpeg, hero.png, hero.webp, hero.JPG and Windows' hidden double extension hero.jpg.jpg
    const expand = (p) => {
      const m = !/^https?:/.test(p) && p.includes('/') && p.match(/^(.*)\.[^./]+$/);
      if (!m) return [p];
      return [p, ...['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG'].map(e => `${m[1]}.${e}`).filter(x => x !== p), `${p}.jpg`];
    };
    const list = PICS.hero.flatMap(expand);
    const attempt = () => { probe.src = srcOf(list[tries], 2000, 1200); };
    probe.onload = () => {
      bg.style.backgroundImage = `url("${probe.src}")`; bg.classList.add('is-ready');
      // A tall (portrait) picture is shown sharp on the right; a wide one is just the background.
      const poster = $('#heroPoster');
      if (poster && probe.naturalHeight > probe.naturalWidth * 1.1) {
        $('img', poster).src = probe.src; poster.hidden = false; $('#home').classList.add('hero--poster');
      }
    };
    probe.onerror = () => {
      if (list[tries].indexOf('/') > -1 && !/^https?:/.test(list[tries]) && tries === 0) console.warn('[The Coffee Bean] Hero picture not found:', list[0], '- check the file name, extension and that it is inside the images folder.');
      if (++tries < list.length) attempt();                                // try the next possibility
    };
    attempt();

    // Optional background video: plays over the picture; if it cannot load, the picture stays.
    const hv = $('#heroVideo');
    if (CONFIG.heroVideo && hv) {
      hv.hidden = false; hv.src = CONFIG.heroVideo;
      hv.addEventListener('canplay', () => { hv.classList.add('is-ready'); if (!reduceMotion) hv.play().catch(() => {}); }, { once: true });
      hv.addEventListener('error', () => { hv.hidden = true; });
      if ('IntersectionObserver' in window && !reduceMotion) {
        new IntersectionObserver(([e]) => { if (!hv.hidden && hv.readyState >= 2) { if (e.isIntersecting) hv.play().catch(() => {}); else hv.pause(); } }, { threshold: 0.1 }).observe($('#home'));
      }
    }
  })();

  /* ---------------- Photo strip ---------------- */
  (() => {
    const track = $('#marquee'), n = PICS.strip.length;
    for (let i = 0; i < n * 2; i++) track.appendChild(mkImg(PICS.strip, i % n, 360, 480, ''));
  })();

  /* ---------------- Gallery + lightbox ---------------- */
  (() => {
    const grid = $('#mosaic'), lb = $('#lightbox'), big = $('img', lb);
    const files = PICS.gallery.map(g => g[0]);
    let lastFocus = null;
    PICS.gallery.forEach(([, cap], n) => {
      const fig = document.createElement('figure');
      const im = mkImg(files, n, 900, 700, cap); im.tabIndex = 0;
      const open = () => { lastFocus = im; big.src = im.currentSrc || im.src; big.alt = cap; lb.hidden = false; $('.lb-close', lb).focus(); };
      im.addEventListener('click', open);
      im.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
      const fc = document.createElement('figcaption'); fc.textContent = cap;
      fig.append(im, fc); grid.appendChild(fig);
    });
    const close = () => { lb.hidden = true; if (lastFocus) lastFocus.focus(); };
    lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lb-close')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) close(); });
  })();

  /* ---------------- Scroll reveal ---------------- */
  (() => {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('is-visible'));
    const io = new IntersectionObserver(en => en.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) { target.classList.add('is-visible'); io.unobserve(target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(e => io.observe(e));
  })();

  /* ---------------- Cart (saved in the browser) ---------------- */
  const Cart = (() => {
    const KEY = 'tcb_cart_v3', subs = []; let items = {};
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && typeof s === 'object') items = s; } catch (_) { /* storage off */ }
    Object.keys(items).forEach(id => { if (!BY_ID[id] || !Number.isInteger(items[id]) || items[id] < 1) delete items[id]; else items[id] = Math.min(items[id], 20); });
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (_) {} subs.forEach(f => f()); };
    return {
      qty: id => items[id] || 0,
      add(id) { if (!BY_ID[id]) return; items[id] = Math.min((items[id] || 0) + 1, 20); save(); },
      dec(id) { if (!items[id]) return; items[id]--; if (items[id] <= 0) delete items[id]; save(); },
      clear() { items = {}; save(); },
      lines() { return Object.keys(items).map(id => ({ item: BY_ID[id], qty: items[id] })); },
      count() { return Object.values(items).reduce((a, b) => a + b, 0); },
      subtotal() { return this.lines().reduce((s, l) => s + l.item.p * l.qty, 0); },
      onChange(f) { subs.push(f); }
    };
  })();

  /* ---------------- Menu: tabs, search, add-to-order ---------------- */
  (() => {
    const grid = $('#menuGrid'), tabsWrap = $('#menuTabs'), search = $('#menuSearch');
    let active = 'hot', query = '';

    CATS.forEach(([key, label]) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'tab'; b.dataset.filter = key; b.setAttribute('role', 'tab'); b.textContent = label;
      tabsWrap.appendChild(b);
    });
    const tabs = $$('.tab', tabsWrap);
    const paintTabs = () => tabs.forEach(t => { const on = !query && t.dataset.filter === active; t.classList.toggle('is-active', on); t.setAttribute('aria-selected', String(on)); });

    const control = (id) => {
      const q = Cart.qty(id);
      return q
        ? `<div class="stepper"><button type="button" data-act="dec" aria-label="Remove one">−</button><span class="q" aria-live="polite">${q}</span><button type="button" data-act="inc" aria-label="Add one more">+</button></div>`
        : `<button type="button" class="add-btn" data-act="add"><i class="fa-solid fa-plus" aria-hidden="true"></i> Add to order</button>`;
    };
    const visible = () => query
      ? MENU.filter(m => `${m.n} ${m.d}`.toLowerCase().includes(query))
      : MENU.filter(m => m.cat === active);

    const render = () => {
      paintTabs();
      grid.innerHTML = '';
      const list = visible();
      if (!list.length) { grid.innerHTML = `<p class="empty">Nothing matches “${esc(query)}”. Try another word.</p>`; return; }
      list.forEach((m, n) => {
        const a = document.createElement('article'); a.className = 'card'; a.style.animationDelay = `${Math.min(n, 8) * 55}ms`;
        a.innerHTML = `<div class="card-img"><i class="fa-solid fa-${m.icon}" aria-hidden="true"></i>${m.tag ? `<span class="tag">${esc(m.tag)}</span>` : ''}</div>
          <div class="card-body"><div class="card-top"><h3>${esc(m.n)}</h3><span class="price">${money(m.p)}</span></div><p>${esc(m.d)}</p>
          <div class="card-act" data-id="${m.id}">${control(m.id)}</div></div>`;
        $('.card-img', a).appendChild(m.photo ? mkImg([m.photo], 0, 600, 450, m.n) : mkImg(PICS.menu, m.img, 600, 450, m.n));
        grid.appendChild(a);
      });
    };
    const sync = () => $$('.card-act', grid).forEach(el => { el.innerHTML = control(el.dataset.id); });

    tabsWrap.addEventListener('click', e => {
      const t = e.target.closest('.tab'); if (!t) return;
      active = t.dataset.filter; query = ''; search.value = ''; render();
    });
    search.addEventListener('input', () => { query = search.value.trim().toLowerCase(); render(); });

    grid.addEventListener('click', e => {
      const btn = e.target.closest('[data-act]'); if (!btn) return;
      const wrap = btn.closest('.card-act'); if (!wrap) return;
      const id = wrap.dataset.id, act = btn.dataset.act;
      if (act === 'add' || act === 'inc') Cart.add(id); else Cart.dec(id);
      // Cart.onChange has re-drawn the controls; put focus back on a sensible button
      const again = $(`.card-act[data-id="${id}"]`, grid);
      const target = again && (again.querySelector(`[data-act="${act === 'dec' ? 'dec' : 'inc'}"]`) || again.querySelector('[data-act]'));
      if (target) target.focus();
    });
    Cart.onChange(sync);
    render();
  })();

  /* ---------------- Order drawer + WhatsApp checkout ---------------- */
  (() => {
    const drawer = $('#drawer'), backdrop = $('#drawerBackdrop'), openBtn = $('#cartBtn'), closeBtn = $('#drawerClose');
    const list = $('#cartList'), empty = $('#cartEmpty'), form = $('#orderForm'), badge = $('#cartCount');
    const subEl = $('#subTotal'), delEl = $('#delFee'), totEl = $('#grandTotal'), freeNote = $('#freeNote'), addrField = $('#addressField');
    const name = $('#ofName'), phone = $('#ofPhone'), addr = $('#ofAddress'), notes = $('#ofNotes');
    let lastFocus = null, lastCount = Cart.count();

    const otype = () => ($('input[name="otype"]:checked', form) || {}).value || 'delivery';
    const delivery = (sub) => (otype() === 'delivery' && sub > 0 && sub < CONFIG.freeDeliveryAbove) ? CONFIG.deliveryFee : 0;

    const isOpen = () => drawer.classList.contains('is-open');
    const open = () => {
      lastFocus = document.activeElement; drawer.classList.add('is-open'); backdrop.hidden = false;
      document.body.classList.add('no-scroll'); closeBtn.focus();
    };
    const close = () => {
      drawer.classList.remove('is-open'); backdrop.hidden = true; document.body.classList.remove('no-scroll');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    const draw = () => {
      const lines = Cart.lines(), count = Cart.count(), sub = Cart.subtotal(), fee = delivery(sub);
      badge.hidden = count === 0; badge.textContent = count;
      if (count !== lastCount) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); lastCount = count; }
      openBtn.setAttribute('aria-label', count ? `Open your order, ${count} items` : 'Open your order');
      empty.hidden = lines.length > 0; form.hidden = lines.length === 0;
      list.innerHTML = lines.map(({ item, qty }) => `
        <li class="cl" data-id="${item.id}">
          <div class="cl-main"><strong>${esc(item.n)}</strong><span>${money(item.p)} each</span></div>
          <div class="stepper small"><button type="button" data-act="dec" aria-label="Remove one ${esc(item.n)}">−</button><span class="q">${qty}</span><button type="button" data-act="inc" aria-label="Add one more ${esc(item.n)}">+</button></div>
          <span class="cl-total">${money(item.p * qty)}</span>
        </li>`).join('');
      subEl.textContent = money(sub);
      delEl.textContent = otype() === 'pickup' ? 'Free (pickup)' : (fee ? money(fee) : 'Free');
      totEl.textContent = money(sub + fee);
      const left = CONFIG.freeDeliveryAbove - sub;
      freeNote.textContent = (otype() === 'delivery' && sub > 0 && left > 0) ? `Add ${money(left)} more for free delivery.` : '';
      addrField.hidden = otype() === 'pickup';
    };
    Cart.onChange(draw);

    list.addEventListener('click', e => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      const li = b.closest('.cl'); if (!li) return;
      const id = li.dataset.id, act = b.dataset.act;
      if (act === 'inc') Cart.add(id); else Cart.dec(id);
      const again = $(`.cl[data-id="${id}"] [data-act="${act}"]`, list) || closeBtn;
      again.focus();
    });
    $$('input[name="otype"]', form).forEach(r => r.addEventListener('change', draw));

    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    $('#browseMenu').addEventListener('click', () => { close(); $('#menu').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen() && $('#modal').hidden && $('#lightbox').hidden) close(); });

    // Keep Tab inside the open drawer
    drawer.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const f = $$('button, input, textarea, a[href]', drawer).filter(x => !x.disabled && x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    // Validation
    const setErr = (el, msg) => {
      el.classList.toggle('is-invalid', !!msg); el.setAttribute('aria-invalid', String(!!msg));
      const out = el.closest('.field').querySelector('.error'); if (out) out.textContent = msg;
      return !msg;
    };
    const vName = () => setErr(name, name.value.trim().length >= 2 ? '' : 'Enter your name.');
    const vPhone = () => { const d = phone.value.replace(/[\s\-()+]/g, ''); return setErr(phone, /^\d{10,13}$/.test(d) ? '' : 'Enter a valid phone number.'); };
    const vAddr = () => setErr(addr, (otype() === 'pickup' || addr.value.trim().length >= 8) ? '' : 'Enter your full delivery address.');
    name.addEventListener('blur', vName); phone.addEventListener('blur', vPhone); addr.addEventListener('blur', vAddr);

    form.addEventListener('submit', e => {
      e.preventDefault();
      const ok = [vName(), vPhone(), vAddr()];
      if (ok.includes(false)) { [name, phone, addr][ok.indexOf(false)].focus(); return; }
      const lines = Cart.lines(); if (!lines.length) return;
      const sub = Cart.subtotal(), fee = delivery(sub), type = otype();
      const msg = [
        `*New order - The Coffee Bean*`, '',
        `*Name:* ${name.value.trim()}`, `*Phone:* ${phone.value.trim()}`,
        `*Type:* ${type === 'delivery' ? 'Delivery' : 'Pickup'}`,
        ...(type === 'delivery' ? [`*Address:* ${addr.value.trim()}`] : []), '',
        ...lines.map(l => `${l.qty} x ${l.item.n} - ${money(l.item.p * l.qty)}`), '',
        `Subtotal: ${money(sub)}`, `Delivery: ${type === 'pickup' ? 'Pickup' : (fee ? money(fee) : 'Free')}`, `*Total: ${money(sub + fee)}*`,
        ...(notes.value.trim() ? ['', `Notes: ${notes.value.trim()}`] : []), '', 'Payment: cash'
      ].join('\n');
      const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
      const w = window.open(url, '_blank');
      if (w) { try { w.opener = null; } catch (_) {} } else { location.assign(url); return; }
      Cart.clear(); form.reset(); close();
      Modal.show('WhatsApp khul gaya hai. Wahan "Send" dabayein taake aap ka order confirm ho jaye.');
    });
    draw();
  })();

  /* ---------------- Sound: ambience + exclusive unmute ---------------- */
  const Ambient = (() => {
    let ctx = null, master = null;
    const build = () => {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
      ctx = new AC(); master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
      const buf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate), d = buf.getChannelData(0); let last = 0;
      for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
      const noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 600;
      const ng = ctx.createGain(); ng.gain.value = 0.5; noise.connect(lp); lp.connect(ng); ng.connect(master); noise.start();
      [196, 247, 294, 392].forEach((f, k) => {
        const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
        const g = ctx.createGain(); g.gain.value = 0.05;
        const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07 + k * 0.03;
        const lg = ctx.createGain(); lg.gain.value = 0.03; lfo.connect(lg); lg.connect(g.gain);
        o.connect(g); g.connect(master); o.start(); lfo.start();
      });
      return true;
    };
    return {
      set(on) {
        if (!CONFIG.ambientSound) return;
        if (on && !ctx && !build()) return;
        if (!ctx) return;
        if (on) ctx.resume();
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.linearRampToValueAtTime(on ? 0.35 : 0, ctx.currentTime + 0.8);
      }
    };
  })();

  const Sound = (() => {
    const items = [];
    const icon = (btn, muted) => { btn.innerHTML = `<i class="fa-solid fa-volume-${muted ? 'xmark' : 'high'}"></i>`; btn.setAttribute('aria-label', muted ? 'Turn sound on' : 'Turn sound off'); };
    const muteAll = () => items.forEach(it => { it.v.muted = true; icon(it.btn, true); });
    return {
      add(v, btn) {
        items.push({ v, btn });
        btn.addEventListener('click', () => {
          const turnOn = v.muted; muteAll();
          if (turnOn) { v.muted = false; icon(btn, false); if (v.paused) v.play().catch(() => {}); }
          Ambient.set(turnOn);
        });
      },
      mute(v) { const it = items.find(x => x.v === v); if (it && !v.muted) { it.v.muted = true; icon(it.btn, true); Ambient.set(false); } }
    };
  })();

  // Try each video source in order; call onFail if none work.
  const attachVideo = (video, sources, onFail) => {
    let k = 0;
    const next = () => { if (k < sources.length) { video.src = sources[k++]; video.load(); } else { video.removeEventListener('error', next); if (onFail) onFail(); } };
    video.addEventListener('error', next);
    next();
  };
  // Play only while a video is on screen
  const playWhenVisible = (video, allow = () => true) => {
    if (!('IntersectionObserver' in window) || reduceMotion) return;
    new IntersectionObserver(([e]) => { if (e.isIntersecting && allow()) video.play().catch(() => {}); else video.pause(); }, { threshold: 0.25 }).observe(video);
  };

  /* Feature video (middle) */
  (() => {
    const v = $('#featureVideo'), pb = $('#fvPlay'); let userPaused = false;
    attachVideo(v, CONFIG.videoFeature, () => { $('#brew').hidden = true; });
    v.defaultPlaybackRate = 0.85;                       // slightly slow, for a cinematic feel
    v.addEventListener('loadedmetadata', () => { v.playbackRate = 0.85; });
    Sound.add(v, $('#fvSound'));
    playWhenVisible(v, () => !userPaused);
    pb.addEventListener('click', () => {
      if (v.paused) { userPaused = false; v.play().catch(() => {}); pb.innerHTML = '<i class="fa-solid fa-pause"></i>'; pb.setAttribute('aria-label', 'Pause video'); }
      else { userPaused = true; v.pause(); pb.innerHTML = '<i class="fa-solid fa-play"></i>'; pb.setAttribute('aria-label', 'Play video'); }
    });
  })();

  /* ---------------- Reviews ---------------- */
  (() => {
    const KEY = 'tcb_reviews';
    const DEFAULTS = [
      { name: 'Amina R.', stars: 5, text: 'The best flat white I have had in the city. You can taste the care in every sip.' },
      { name: 'Daniel K.', stars: 5, text: 'Came for the coffee, stayed for the almond croissant. A calm, beautiful place to work.' },
      { name: 'Sofia M.', stars: 5, text: 'The Velvet Reserve is outstanding. The baristas explained every tasting note.' },
      { name: 'Omar H.', stars: 4, text: 'Their 18-hour cold brew keeps me going all summer. Busy at weekends but worth the wait.' },
      { name: 'Hira S.', stars: 5, text: 'Ordered online, arrived hot in 30 minutes. The masala chai and tiramisu were perfect.' },
      { name: 'Bilal A.', stars: 5, text: 'Great ambience for meetings. WhatsApp ordering is so easy and the team replies fast.' }
    ];
    const root = $('#carousel'), track = $('#carouselTrack'), dotsWrap = $('#carouselDots'), summary = $('#ratingSummary');
    let reviews = [...DEFAULTS], index = 0, perView = 1, timer = null;
    try { const saved = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(saved)) reviews = [...saved.filter(r => r && r.name && r.text && r.stars >= 1 && r.stars <= 5), ...reviews]; } catch (_) {}
    const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
    const draw = () => {
      track.innerHTML = reviews.map(r => `<figure class="review"><div class="review-card"><div class="stars" aria-label="${r.stars} out of 5 stars">${stars(r.stars)}</div><blockquote>${esc(r.text)}</blockquote><figcaption>${esc(r.name)}</figcaption></div></figure>`).join('');
      const avg = reviews.reduce((s, r) => s + r.stars, 0) / reviews.length;
      summary.textContent = `${avg.toFixed(1)} / 5 average from ${reviews.length} reviews`;
    };
    const getPer = () => innerWidth >= 1000 ? 3 : innerWidth >= 640 ? 2 : 1;
    const maxI = () => Math.max(0, reviews.length - perView);
    const makeDots = () => {
      dotsWrap.innerHTML = '';
      for (let n = 0; n <= maxI(); n++) { const d = document.createElement('button'); d.type = 'button'; d.className = 'dot'; d.setAttribute('aria-label', `Go to review ${n + 1}`); d.addEventListener('click', () => { go(n); restart(); }); dotsWrap.appendChild(d); }
    };
    const go = (n) => { index = n > maxI() ? 0 : n < 0 ? maxI() : n; track.style.transform = `translateX(-${index * (100 / perView)}%)`; $$('.dot', dotsWrap).forEach((d, k) => d.classList.toggle('is-active', k === index)); };
    const layout = () => { perView = getPer(); track.style.setProperty('--slide-w', `${100 / perView}%`); makeDots(); go(Math.min(index, maxI())); };
    const stop = () => clearInterval(timer);
    const start = () => { stop(); if (!reduceMotion) timer = setInterval(() => go(index + 1), 6000); };
    const restart = start;
    $('.prev', root).addEventListener('click', () => { go(index - 1); restart(); });
    $('.next', root).addEventListener('click', () => { go(index + 1); restart(); });
    root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', start);
    let sx = 0;
    track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; stop(); }, { passive: true });
    track.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1)); start(); });
    let rt = null; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layout, 150); });

    const form = $('#reviewForm'), nameI = $('#rvName'), textI = $('#rvText'), btns = $$('#starInput button'), starErr = $('#starError');
    let rating = 0;
    const paint = n => btns.forEach((b, k) => { b.classList.toggle('on', k < n); b.setAttribute('aria-checked', String(k + 1 === rating)); });
    btns.forEach(b => {
      b.addEventListener('click', () => { rating = +b.dataset.v; paint(rating); starErr.textContent = ''; });
      b.addEventListener('mouseenter', () => paint(+b.dataset.v)); b.addEventListener('mouseleave', () => paint(rating));
    });
    const setErr = (el, msg) => { el.classList.toggle('is-invalid', !!msg); el.closest('.field').querySelector('.error').textContent = msg; };
    form.addEventListener('submit', e => {
      e.preventDefault();
      const okN = nameI.value.trim().length >= 2, okT = textI.value.trim().length >= 10;
      setErr(nameI, okN ? '' : 'Enter your name.'); setErr(textI, okT ? '' : 'Write at least 10 characters.'); starErr.textContent = rating ? '' : 'Choose a star rating.';
      if (!okN || !okT || !rating) return;
      const r = { name: nameI.value.trim(), stars: rating, text: textI.value.trim() };
      reviews.unshift(r);
      try { const s = JSON.parse(localStorage.getItem(KEY)); const arr = Array.isArray(s) ? s : []; arr.unshift(r); localStorage.setItem(KEY, JSON.stringify(arr.slice(0, 20))); } catch (_) {}
      draw(); layout(); go(0); form.reset(); rating = 0; paint(0);
      Modal.show('Shukriya! Your review has been posted.');
    });
    draw(); layout(); start();
  })();

  $('#year').textContent = new Date().getFullYear();
})();