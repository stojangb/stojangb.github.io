export function initChoritoCycle(root, iconsPath = 'assets/infographic-icons.svg', lang = 'en'){
  const translations={
    en:{
      title:'Chilean Mussel Production Cycle',
      stages:[
        {months:0,name:'Spat / Seed Collection',info:`Natural spat collected on collector ropes between Dec – Apr (prime settlement season).\nFarmers target \u2264 3,500 kg of spat per permit.`},
        {months:6,name:'Juvenile',info:`Shell length \u2248 25-35 mm.\nHighest mortality from predators & handling stress.`},
        {months:12,name:'Grow-out / Fattening',info:`"Socked" onto long-lines; stocking \u2248 500 – 700 juveniles/m.\nRapid growth in Los Lagos fjords; target 55-60 mm market size.`},
        {months:18,name:'Harvest',info:`Lines lifted; mussels de-byssed, graded, chilled.\nChile harvests ~338 k t/y (2024).`},
        {months:24,name:'Processing & Export',info:`90 % exported (EU, USA, Asia).\nFormats: IQF meat, half-shell, vacuum-packed whole.`}
      ]
    },
    es:{
      title:'Ciclo de producci\u00f3n del chorito',
      stages:[
        {months:0,name:'Recolecci\u00f3n de semilla',info:`Semilla natural recogida en cuerdas colectoras entre dic–abr (temporada de asentamiento).\nLos productores buscan \u2264 3.500 kg de semilla por permiso.`},
        {months:6,name:'Juvenil',info:`Longitud de concha \u2248 25-35 mm.\nMayor mortalidad por depredadores y manejo.`},
        {months:12,name:'Engorda',info:`\"Encalcetados\" en l\u00edneas largas; siembra \u2248 500 – 700 juveniles/m.\nR\u00e1pido crecimiento en fiordos de Los Lagos; objetivo 55-60 mm para mercado.`},
        {months:18,name:'Cosecha',info:`Se levantan las cuerdas; los choritos se desbislan, seleccionan y enfr\u00edan.\nChile cosecha ~338 kt/a (2024).`},
        {months:24,name:'Proceso y exportaci\u00f3n',info:`Se exporta el 90 % (UE, EE.UU., Asia).\nFormatos: carne IQF, media concha, entero al vac\u00edo.`}
      ]
    }
  };
  const t = translations[lang] || translations.en;
  const stages = t.stages;
  root.querySelector('.title').textContent = t.title;
  const slider=root.getElementById('timeSlider');
  slider.setAttribute('aria-label', lang==='es'?'meses':'months');
  const panel=root.getElementById('stageInfo');
  const icons=Array.from(root.querySelectorAll('.timeline__icons use'));
  function update(val){
    const m=parseInt(val,10);
    let idx=0;
    if(m>=24) idx=4; else if(m>=18) idx=3; else if(m>=12) idx=2; else if(m>=6) idx=1;
    icons.forEach((el,i)=>el.classList.toggle('is-active',i===idx));
    panel.innerHTML=`<h2>${stages[idx].name}</h2><p>${stages[idx].info.replace(/\n/g,'<br>')}</p>`;
  }
  slider.addEventListener('input',e=>update(e.target.value));
  slider.addEventListener('change',()=>panel.classList.remove('is-hidden'));
  update(slider.value);
  const exportIcon=root.getElementById('icon-export');
  if(exportIcon){
    exportIcon.addEventListener('click',()=>{
      for(let i=0;i<6;i++){
        const b=document.createElementNS('http://www.w3.org/2000/svg','use');
        b.setAttribute('href', iconsPath + '#bubble');
        b.classList.add('bubble');
        b.setAttribute('x',exportIcon.getBoundingClientRect().x);
        b.setAttribute('y',exportIcon.getBoundingClientRect().y);
        root.querySelector('.timeline__icons').appendChild(b);
        setTimeout(()=>b.remove(),3000);
      }
    });
  }
}

if(typeof document!=='undefined'){
  const host=document.querySelector('chorito-cycle');
  if(!host){
    const iconsUrl=new URL('./assets/infographic-icons.svg', import.meta.url);
    const lang=document.documentElement.lang||'en';
    initChoritoCycle(document, iconsUrl.toString(), lang);
  }
}
