// Vue 3 directive für IntersectionObserver
import type { Directive, DirectiveBinding } from 'vue';

type Opts = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;          // nur 1x triggern
  className?: string;      // Klasse bei Sichtbarkeit
};

const DEFAULTS: Opts = {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.15,
  once: true,
  className: 'in-view',
};

export const inview: Directive<HTMLElement, Partial<Opts>> = {
  mounted(el, binding: DirectiveBinding<Partial<Opts>>) {
    const opts = { ...DEFAULTS, ...(binding.value || {}) };

    // falls schon SSR gerendert o. Reduced Motion: direkt sichtbar
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add(opts.className!);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add(opts.className!);
          if (opts.once) {
            io.unobserve(el);
            io.disconnect();
          }
        } else if (!opts.once) {
          el.classList.remove(opts.className!);
        }
      });
    }, {
      root: opts.root || null,
      rootMargin: opts.rootMargin,
      threshold: opts.threshold as number | number[],
    });

    // im Element merken, damit unmounted disconnecten kann
    (el as any).__io__ = io;
    io.observe(el);
  },
  unmounted(el) {
    const io: IntersectionObserver | undefined = (el as any).__io__;
    io?.unobserve(el);
    io?.disconnect();
    delete (el as any).__io__;
  }
};




// <h1 class="reveal up" v-inview>Was wir anbieten.</h1>
// <p class="reveal fade" v-inview style="--rev-delay:150ms">
//   Wir sind ein technologieorientiertes Beratungsunternehmen …
// </p>
// <button class="btn reveal up" v-inview style="--rev-delay:300ms">
//   Services
// </button>