// Simple fade carousel (no dependencies)
(function(){
  const root = document.querySelector('.hero-carousel');
  if(!root) return;
  const slides = [...root.querySelectorAll('.hero-slide')];
  const prev = root.querySelector('.prev');
  const next = root.querySelector('.next');
  const dotsWrap = root.querySelector('.hero-dots');

  let i = 0, timer;

  function go(n){
    slides[i].classList.remove('is-active');
    dotsWrap.children[i]?.setAttribute('aria-current','false');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('is-active');
    dotsWrap.children[i]?.setAttribute('aria-current','true');
    restart();
  }

  function restart(){
    clearInterval(timer);
    timer = setInterval(()=>go(i+1), 5000);
  }

  // dots
  slides.forEach((_, idx)=>{
    const b = document.createElement('button');
    b.setAttribute('aria-current', idx===0 ? 'true' : 'false');
    b.addEventListener('click', ()=>go(idx));
    dotsWrap.appendChild(b);
  });

  prev.addEventListener('click', ()=>go(i-1));
  next.addEventListener('click', ()=>go(i+1));
  root.addEventListener('mouseenter', ()=>clearInterval(timer));
  root.addEventListener('mouseleave', restart);

  restart();
})();

