(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation');
    }));
  }
  document.querySelectorAll('[data-year]').forEach(x => { x.textContent = new Date().getFullYear(); });
  const sequences = [
    {title:'THE DOUBLE TEAM',description:'Two defenders commit to the ball handler. Somewhere else, a teammate now has more room to act.',path:'M445 285 L330 242',players:[[445,285],[192,284],[155,126],[440,126],[313,194],[415,247],[488,294],[197,158],[433,164],[310,142]]},
    {title:'THE ROTATION',description:'The defense scrambles to cover the opening. That rotation changes spacing and creates a new decision for everyone.',path:'M445 285 L192 284',players:[[445,285],[192,284],[155,126],[440,126],[313,194],[415,247],[488,294],[204,246],[433,164],[310,142]]},
    {title:'THE RIPPLE',description:'A help defender moves toward the next threat. One advantage becomes a second opportunity elsewhere on the floor.',path:'M192 284 L155 126',players:[[435,278],[192,284],[155,126],[440,126],[313,194],[415,247],[450,278],[193,235],[433,164],[238,190]]},
    {title:'THE QUESTION',description:'The shot is recorded. Who deserves credit for making it possible — and how much? That is the modeling problem.',path:'M155 126 L300 70',players:[[435,278],[192,284],[155,126],[440,126],[313,194],[415,247],[450,278],[193,235],[433,164],[238,190]]}
  ];
  const buttons = [...document.querySelectorAll('[data-step]')];
  if (buttons.length) {
    const nodes = ['o1','o2','o3','o4','o5','d1','d2','d3','d4','d5'].map(n => document.querySelector(`[data-player="${n}"]`));
    const title = document.getElementById('step-title');
    const description = document.getElementById('step-description');
    const path = document.getElementById('play-path');
    function setStep(i){
      const step = sequences[i];
      buttons.forEach((b,j)=>{b.classList.toggle('active',j===i);b.setAttribute('aria-pressed',String(j===i));});
      title.textContent=step.title;description.textContent=step.description;path.setAttribute('d',step.path);
      nodes.forEach((node,j)=>{ if(node)node.setAttribute('transform',`translate(${step.players[j][0]} ${step.players[j][1]})`);});
    }
    buttons.forEach(b=>b.addEventListener('click',()=>setStep(Number(b.dataset.step))));
  }
  const progress=document.querySelector('.reading-progress');
  if(progress){
    const update=()=>{const total=document.documentElement.scrollHeight-innerHeight;progress.style.width=total>0?`${Math.min(100,Math.max(0,100*scrollY/total))}%`:'0%';};
    addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
  }
})();
