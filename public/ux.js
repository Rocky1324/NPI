(function(){
  function onIntersect(entries, obs){
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('inview');
        obs.unobserve(entry.target);
      }
    });
  }
  document.addEventListener('DOMContentLoaded', function(){
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(onIntersect, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }) : null;
    document.querySelectorAll('.reveal-on-scroll').forEach(el=>{
      if(io) io.observe(el); else el.classList.add('inview');
    });
  });
})();
