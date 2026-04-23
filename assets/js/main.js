/* =========================================================
   Cassi Sports - Main Interactions
========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const backToTop = document.querySelector('.back-to-top');
  const yearEls = document.querySelectorAll('.current-year');
  const counters = document.querySelectorAll('[data-counter]');
  const revealElements = document.querySelectorAll('.reveal');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryModal = document.querySelector('.gallery-modal');
  const modalTitle = document.querySelector('.modal-title');
  const modalSubtitle = document.querySelector('.modal-subtitle');
  const modalClose = document.querySelector('.gallery-modal-close');

  yearEls.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  function onScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 16);
    }
    if (backToTop) {
      backToTop.classList.toggle('show', window.scrollY > 420);
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll);

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealElements.forEach(el => revealObserver.observe(el));

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 70));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current + suffix;
      }, 24);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  if (galleryItems.length && galleryModal && modalTitle && modalSubtitle && modalClose) {
    galleryItems.forEach(item => {
      item.addEventListener('click', function () {
        modalTitle.textContent = item.dataset.title || 'Cassi Sports';
        modalSubtitle.textContent = item.dataset.subtitle || 'Replace this placeholder with your real gallery image.';
        galleryModal.classList.add('active');
        document.body.classList.add('menu-open');
      });
    });

    function closeModal() {
      galleryModal.classList.remove('active');
      document.body.classList.remove('menu-open');
    }

    modalClose.addEventListener('click', closeModal);
    galleryModal.addEventListener('click', function (e) {
      if (e.target === galleryModal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const originalText = button ? button.textContent : '';
      if (button) {
        button.textContent = 'Submitted';
        button.disabled = true;
      }
      setTimeout(() => {
        alert('Thank you! Your request has been captured in this demo form. Connect this form to your email or backend to make it live.');
        if (button) {
          button.textContent = originalText;
          button.disabled = false;
        }
        form.reset();
      }, 300);
    });
  });
});
