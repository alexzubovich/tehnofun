(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---- Smooth scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        closeMobileNav();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---- Mobile navigation ---- */
  var navToggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  function closeMobileNav() {
    if (!navToggle || !mobileNav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    mobileNav.hidden = true;
    navToggle.classList.remove('is-open');
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.hidden = isOpen;
      navToggle.classList.toggle('is-open', !isOpen);
    });
  }

  /* ---- Hero parallax ---- */
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  var ticking = false;

  function updateParallax() {
    var scrollY = window.scrollY;
    parallaxEls.forEach(function (el) {
      var speed = parseFloat(el.dataset.parallax) || 0.2;
      var direction = el.dataset.parallaxDir === 'up' ? -1 : 1;
      el.style.transform = 'translateY(' + scrollY * speed * direction + 'px)';
    });
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  updateParallax();

  /* ---- Image fallback ---- */
  var ERROR_IMG =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function () {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = 'true';
      img.src = ERROR_IMG;
      img.alt = 'Изображение недоступно';
    });
  });

  /* ---- Testimonials slider ---- */
  var testimonials = [
    {
      text: 'Заказывали оборудование для корпоратива на 80 человек. Всё было на высшем уровне — привезли вовремя, установили быстро, а сами гаджеты стали изюминкой вечера! Гости до сих пор вспоминают интерактивные конкурсы. Спасибо команде Технофан!',
      name: 'Анна Ковалёва',
      position: 'Организатор мероприятий',
      photo: 'images/testimonial-1.jpg'
    },
    {
      text: 'Ребята помогли организовать день рождения дочери. Детям очень понравился счётчик прикосновений и датчик движения — устроили целые соревнования! Ведущий работал профессионально, а оборудование работало без сбоев. Рекомендую всем!',
      name: 'Дмитрий Соколов',
      position: 'Довольный отец',
      photo: 'images/testimonial-2.jpg'
    },
    {
      text: 'Наша свадьба стала незабываемой благодаря Технофану! Оборудование добавило столько веселья и эмоций, что гости танцевали и участвовали в конкурсах весь вечер. Фотозона с реквизитом — отдельная любовь, получились потрясающие снимки!',
      name: 'Екатерина Новикова',
      position: 'Невеста',
      photo: 'images/testimonial-3.jpg'
    },
    {
      text: 'Обращались для организации выпускного. Технофан предложили несколько вариантов программы, помогли с выбором гаджетов. В итоге получился современный и динамичный праздник. Ребята работают с душой, чувствуется!',
      name: 'Максим Петров',
      position: 'Учитель',
      photo: 'images/testimonial-4.jpg'
    },
    {
      text: 'Искали что-то необычное для корпоратива — Технофан превзошли все ожидания! Измеритель шума превратил обычные конкурсы в настоящее шоу. Коллеги были в восторге, а мы получили отличные отзывы от руководства. Обязательно обратимся снова!',
      name: 'Ольга Смирнова',
      position: 'HR-менеджер',
      photo: 'images/testimonial-5.jpg'
    }
  ];

  var testimonialIndex = 0;
  var testimonialText = document.getElementById('testimonial-text');
  var testimonialName = document.getElementById('testimonial-name');
  var testimonialPosition = document.getElementById('testimonial-position');
  var testimonialPhoto = document.getElementById('testimonial-photo');
  var testimonialCurrent = document.getElementById('testimonial-current');
  var testimonialTotal = document.getElementById('testimonial-total');
  var testimonialCard = document.getElementById('testimonial-card');

  function renderTestimonial(index) {
    var item = testimonials[index];
    if (!item || !testimonialText) return;
    testimonialCard.classList.add('is-changing');
    setTimeout(function () {
      testimonialText.textContent = item.text;
      testimonialName.textContent = item.name;
      testimonialPosition.textContent = item.position;
      testimonialPhoto.src = item.photo;
      testimonialPhoto.alt = item.name;
      testimonialCurrent.textContent = index + 1;
      testimonialTotal.textContent = testimonials.length;
      testimonialCard.classList.remove('is-changing');
    }, 150);
  }

  if (testimonialTotal) testimonialTotal.textContent = testimonials.length;

  document.getElementById('testimonial-prev')?.addEventListener('click', function () {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(testimonialIndex);
  });

  document.getElementById('testimonial-next')?.addEventListener('click', function () {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial(testimonialIndex);
  });

  /* ---- Gallery lightbox ---- */
  var galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  var galleryImages = galleryItems.map(function (item) {
    return {
      url: item.querySelector('img').src,
      alt: item.querySelector('img').alt
    };
  });
  var lightboxIndex = null;
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCounter = document.getElementById('lightbox-counter');

  function openLightbox(index) {
    lightboxIndex = index;
    lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    updateLightboxImage();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxIndex = null;
    document.body.classList.remove('lightbox-open');
  }

  function updateLightboxImage() {
    if (lightboxIndex === null) return;
    var img = galleryImages[lightboxIndex];
    lightboxImg.src = img.url;
    lightboxImg.alt = img.alt;
    lightboxCounter.textContent = (lightboxIndex + 1) + ' / ' + galleryImages.length;
    lightboxImg.classList.remove('lb-animate');
    void lightboxImg.offsetWidth;
    lightboxImg.classList.add('lb-animate');
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () { openLightbox(index); });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev')?.addEventListener('click', function (e) {
    e.stopPropagation();
    lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
  });
  document.getElementById('lightbox-next')?.addEventListener('click', function (e) {
    e.stopPropagation();
    lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
    updateLightboxImage();
  });

  lightbox?.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (lightboxIndex === null) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
      updateLightboxImage();
    }
    if (e.key === 'ArrowRight') {
      lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
      updateLightboxImage();
    }
  });

  /* ---- Sound ring animation ---- */
  var waveDemo = document.querySelector('.wave-demo');
  var ringsLeft = document.getElementById('waveDemoRingsLeft');
  var ringsRight = document.getElementById('waveDemoRingsRight');

  if (waveDemo && ringsLeft && ringsRight) {
    var leftSource = { x: 215, y: 250 };
    var rightSource = { x: 985, y: 250 };
    var ringCount = 18;
    var ringSpacing = 22;
    var loopDuration = 4.8;
    var maxRx = 385;
    var maxRy = 238;
    var minRy = 95;
    var waveAnimId = null;
    var waveVisible = false;
    var leftPaths = [];
    var rightPaths = [];

    function createRingPaths(group, count, className) {
      var paths = [];
      for (var i = 0; i < count; i++) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'wave-demo__ring ' + className);
        path.setAttribute('stroke-width', '2.8');
        group.appendChild(path);
        paths.push(path);
      }
      return paths;
    }

    leftPaths = createRingPaths(ringsLeft, ringCount, 'wave-demo__ring--accent');
    rightPaths = createRingPaths(ringsRight, ringCount, 'wave-demo__ring--primary');

    function ellipseRightArc(cx, cy, rx, ry) {
      return 'M ' + cx + ' ' + (cy - ry) +
        ' A ' + rx + ' ' + ry + ' 0 0 1 ' + cx + ' ' + (cy + ry);
    }

    function ellipseLeftArc(cx, cy, rx, ry) {
      return 'M ' + cx + ' ' + (cy - ry) +
        ' A ' + rx + ' ' + ry + ' 0 0 0 ' + cx + ' ' + (cy + ry);
    }

    function ringOpacity(progress) {
      if (progress < 0.08) return progress / 0.08;
      if (progress > 0.82) return Math.max(0, (1 - progress) / 0.18);
      return 1;
    }

    function animateSoundRings(time) {
      if (!waveVisible) return;

      var t = time / 1000;
      var travel = maxRx + ringCount * ringSpacing;

      for (var i = 0; i < ringCount; i++) {
        var phase = ((t / loopDuration) * travel + i * ringSpacing) % travel;
        var rx = 24 + phase;
        var ryProgress = Math.min(1, rx / (maxRx * 0.72));
        var ry = minRy + (maxRy - minRy) * ryProgress;
        var progress = rx / maxRx;
        var opacity = ringOpacity(progress) * (0.28 + 0.42 * (1 - progress * 0.5));

        if (rx > maxRx) {
          leftPaths[i].setAttribute('d', '');
          rightPaths[i].setAttribute('d', '');
          continue;
        }

        leftPaths[i].setAttribute('d', ellipseRightArc(leftSource.x, leftSource.y, rx, ry));
        leftPaths[i].setAttribute('opacity', opacity.toFixed(3));
        leftPaths[i].setAttribute('stroke-width', (2 + progress * 1.2).toFixed(2));

        rightPaths[i].setAttribute('d', ellipseLeftArc(rightSource.x, rightSource.y, rx, ry));
        rightPaths[i].setAttribute('opacity', opacity.toFixed(3));
        rightPaths[i].setAttribute('stroke-width', (2 + progress * 1.2).toFixed(2));
      }

      waveAnimId = requestAnimationFrame(animateSoundRings);
    }

    function startWaveAnimation() {
      if (waveVisible) return;
      waveVisible = true;
      waveAnimId = requestAnimationFrame(animateSoundRings);
    }

    function stopWaveAnimation() {
      waveVisible = false;
      if (waveAnimId !== null) {
        cancelAnimationFrame(waveAnimId);
        waveAnimId = null;
      }
    }

    if ('IntersectionObserver' in window) {
      var waveObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) startWaveAnimation();
          else stopWaveAnimation();
        });
      }, { threshold: 0.15 });
      waveObserver.observe(waveDemo);
    } else {
      startWaveAnimation();
    }
  }

  /* ---- Process steps zigzag reveal ---- */
  var processBoard = document.querySelector('.process-board');
  if (processBoard) {
    var processRevealed = false;

    function revealProcessSteps() {
      if (processRevealed) return;
      processRevealed = true;
      processBoard.classList.add('is-revealed');
    }

    if ('IntersectionObserver' in window) {
      var processObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) revealProcessSteps();
        });
      }, { threshold: 0.2 });
      processObserver.observe(processBoard);
    } else {
      revealProcessSteps();
    }
  }
})();
