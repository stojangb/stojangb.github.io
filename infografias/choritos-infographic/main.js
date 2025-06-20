export function initChoritoCycle(root, iconsPath = 'assets/infographic-icons.svg'){
  const stages=[
    {months:0,name:'Spat / Seed Collection',info:`Natural spat collected on collector ropes between Dec – Apr (prime settlement season).\nFarmers target \u2264 3,500 kg of spat per permit.`},
    {months:6,name:'Juvenile',info:`Shell length \u2248 25-35 mm.\nHighest mortality from predators & handling stress.`},
    {months:12,name:'Grow-out / Fattening',info:`"Socked" onto long-lines; stocking \u2248 500 – 700 juveniles/m.\nRapid growth in Los Lagos fjords; target 55-60 mm market size.`},
    {months:18,name:'Harvest',info:`Lines lifted; mussels de-byssed, graded, chilled.\nChile harvests ~338 k t/y (2024).`},
    {months:24,name:'Processing & Export',info:`90 % exported (EU, USA, Asia).\nFormats: IQF meat, half-shell, vacuum-packed whole.`}
  ];
  const slider=root.getElementById('timeSlider');
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
    initChoritoCycle(document, iconsUrl.toString());
  }
}
