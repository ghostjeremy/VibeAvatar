export function init(): void {

  const navigation = document.querySelector('.navigation') as HTMLElement;
  const sections = document.querySelectorAll('.navigation-section') as NodeListOf<HTMLElement>;
  const dots = document.querySelectorAll('.navigation-dot') as NodeListOf<HTMLElement>;

  const resetDots = (): void => dots.forEach((dot) => dot.classList.remove('active'));

  function detectPos(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      //  HTMLElement
      const target = entry.target as HTMLElement;
      const i = parseInt(target.dataset.pos as string);  
      dots[i].classList.toggle('active', entry.isIntersecting);
    });
  }
  

  function detect(el: Element): void {
    const options: IntersectionObserverInit = { threshold: 0.5 };
    const io = new IntersectionObserver(detectPos, options);
    io.observe(el);
  }

  function slideTo(el: HTMLElement): void {
    navigation.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: el.offsetTop
    }); 
  }

  function activateScroll(e: MouseEvent): void {
    if (e.target && (e.target as Element).matches('.navigation-dot')) {
      const target = e.target as HTMLElement;
      const i = parseInt(target.dataset.index as string);
      slideTo(sections[i]);
      resetDots();
      dots[i].classList.add('active');
    }
  }

  function initNavigation(): void {
    sections.forEach(detect); 
    slideTo(sections[0]);
  }

  document.addEventListener('click', activateScroll, false);
  // window.addEventListener('load', initNavigation, false);
  initNavigation();

}
