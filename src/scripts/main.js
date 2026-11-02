(function(){
'use strict';
document.body.classList.add('js-loaded');

document.querySelectorAll('a[href]').forEach(function(a){if(a.getAttribute('href').charAt(0)!=='#'){a.setAttribute('target','_blank');a.setAttribute('rel','noopener')}});

var header=document.querySelector('.site-header'),hero=document.querySelector('.hero'),mobileCta=document.getElementById('mobile-cta'),stickyPrice=document.getElementById('sticky-price');
function onScroll(){
  var y=window.pageYOffset||document.documentElement.scrollTop;
  header.classList.toggle('site-header--scrolled',y>50);
  if(mobileCta){var hb=hero.offsetTop+hero.offsetHeight;mobileCta.classList.toggle('visible',y>hb-100)}
  if(stickyPrice){stickyPrice.classList.toggle('visible',y>600&&y<document.body.scrollHeight-1200)}
}
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();

var obs=new IntersectionObserver(function(e){e.forEach(function(en){if(en.isIntersecting){en.target.classList.add('visible');obs.unobserve(en.target)}})},{threshold:.05});
document.querySelectorAll('.fade-in').forEach(function(el){obs.observe(el)});

var counted=false;
var counterObs=new IntersectionObserver(function(entries){
  if(counted)return;
  entries.forEach(function(en){
    if(en.isIntersecting){
      counted=true;
      document.querySelectorAll('[data-count]').forEach(function(el){
        var target=parseInt(el.dataset.count),start=0,dur=1800,startTime=null;
        function step(ts){
          if(!startTime)startTime=ts;
          var p=Math.min((ts-startTime)/dur,1);
          var ease=1-Math.pow(1-p,3);
          el.textContent=Math.floor(ease*target);
          if(p<1)requestAnimationFrame(step);
          else el.textContent=target;
        }
        requestAnimationFrame(step);
      });
      counterObs.unobserve(en.target);
    }
  });
},{threshold:.3});
var ob=document.getElementById('offer-bar');
if(ob)counterObs.observe(ob);

var bW=document.getElementById('btn-winter'),bS=document.getElementById('btn-summer'),gW=document.getElementById('grid-winter'),gS=document.getElementById('grid-summer');
var mbW=document.getElementById('mob-btn-winter'),mbS=document.getElementById('mob-btn-summer');
var navW=document.getElementById('nav-btn-winter'),navS=document.getElementById('nav-btn-summer');
function sw(s){
  var w=s==='winter';
  bW.setAttribute('aria-pressed',w);bS.setAttribute('aria-pressed',!w);
  mbW.setAttribute('aria-pressed',w);mbS.setAttribute('aria-pressed',!w);
  navW.setAttribute('aria-pressed',w);navS.setAttribute('aria-pressed',!w);
  gW.classList.toggle('active',w);gS.classList.toggle('active',!w);
  document.documentElement.style.setProperty('--color-accent',w?'#029ddb':'#ffda26');
  document.documentElement.style.setProperty('--color-accent-text',w?'#fff':'#353535');
  document.querySelectorAll('[data-season-content]').forEach(function(el){
    el.style.display=(el.getAttribute('data-season-content')===s)?'':'none';
  });
  document.querySelectorAll('[data-season-content="'+s+'"] [data-count]').forEach(function(el){
    var target=parseInt(el.dataset.count),dur=1200,startTime=null;
    function step(ts){if(!startTime)startTime=ts;var p=Math.min((ts-startTime)/dur,1);var ease=1-Math.pow(1-p,3);el.textContent=Math.floor(ease*target);if(p<1)requestAnimationFrame(step);else el.textContent=target;}
    requestAnimationFrame(step);
  });
  renderEvents(w?winterEvents:summerEvents);
  document.querySelectorAll('.fade-in:not(.visible)').forEach(function(el){obs.observe(el)});
}
bW.addEventListener('click',function(){sw('winter')});
bS.addEventListener('click',function(){sw('summer')});
mbW.addEventListener('click',function(){sw('winter')});
mbS.addEventListener('click',function(){sw('summer')});
navW.addEventListener('click',function(){sw('winter')});
navS.addEventListener('click',function(){sw('summer')});

document.querySelectorAll('.zimmer-item__header').forEach(function(header){
  header.addEventListener('click',function(){
    var item=header.closest('.zimmer-item');
    var wasOpen=item.classList.contains('open');
    document.querySelectorAll('.zimmer-item.open').forEach(function(o){
      o.classList.remove('open');
      o.querySelector('.zimmer-item__header').setAttribute('aria-expanded','false');
      o.querySelector('.zimmer-item__detail').setAttribute('aria-hidden','true');
    });
    if(!wasOpen){
      item.classList.add('open');
      header.setAttribute('aria-expanded','true');
      item.querySelector('.zimmer-item__detail').setAttribute('aria-hidden','false');
    }
  });
  header.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();header.click();}
  });
});

document.querySelectorAll('.room-gallery').forEach(function(gallery){
  var hero = gallery.querySelector('.room-gallery__hero img');
  var counter = gallery.querySelector('.room-gallery__counter');
  var thumbs = gallery.querySelectorAll('.room-gallery__thumb');
  thumbs.forEach(function(thumb, idx){
    thumb.addEventListener('click', function(){
      var img = thumb.querySelector('img');
      hero.style.opacity = '0';
      setTimeout(function(){
        hero.src = img.src;
        hero.alt = img.alt;
        hero.style.opacity = '1';
      }, 150);
      counter.textContent = (idx + 1) + ' / ' + thumbs.length;
      thumbs.forEach(function(t){ t.classList.remove('active'); });
      thumb.classList.add('active');
    });
  });
});

var winterEvents=[
  {month:1,day:'23–25',title:'Snow Polo World Cup',desc:'Das prestigeträchtigste Polo-Turnier auf Schnee – auf dem zugefrorenen St. Moritzersee.',dist:'3 km'},
  {month:2,day:'1–15',title:'White Turf Pferderennen',desc:'Vollblutpferde auf dem gefrorenen See. Galopp, Trab und weltexklusives Skikjöring.',dist:'3 km'},
  {month:3,day:'1',title:'Chalandamarz',desc:'Kinder vertreiben den Winter mit Schellengeläut – ein uralter rätoromanischer Brauch.',dist:'Im Engadin'},
  {month:3,day:'8',title:'Engadiner Skimarathon',desc:'42 km Langlauf von Maloja nach S-chanf. Grösste Breitensportveranstaltung der Schweiz.',dist:'20 km'},
  {month:1,day:'19–22',title:'Engadin Festival Piano Days',desc:'Winterkonzerte mit internationalen Pianisten in intimer Atmosphäre in St. Moritz.',dist:'3 km'},
  {month:2,day:'Feb',title:'Concours of Elegance',desc:'Hochkarätige Oldtimer und Klassiker auf dem zugefrorenen St. Moritzersee – Eintritt frei.',dist:'3 km'},
  {month:12,day:'Dez',title:'Engadiner Weihnachtsmärkte',desc:'Adventszauber zwischen Steinhäusern. Handwerk, Spezialitäten und der Duft von Arvenkissen.',dist:'3–18 km'},
  {month:11,day:'28',title:'Saisonstart Wintersaison',desc:'Das Randolins öffnet seine Türen – die ersten Schwünge auf frisch präparierten Pisten.',dist:'Am Hotel'}
];
var summerEvents=[
  {month:7,day:'10–25',title:'Festival da Jazz',desc:'Jazz von Weltformat in intimen Locations – im legendären Dracula Club und unter freiem Himmel.',dist:'3 km'},
  {month:8,day:'Aug',title:'St. Moritz Gourmet Festival',desc:'Sterneköche, regionale Produzenten und kulinarische Höhenflüge unter freiem Himmel.',dist:'3 km'},
  {month:9,day:'13',title:'Bernina Ultraks',desc:'Trailrunning vor der Kulisse des Bernina-Massivs. Verschiedene Distanzen für jeden Anspruch.',dist:'10 km'},
  {month:8,day:'19–23',title:'SPAR Swiss Epic',desc:'5-tägiges Mountainbike-Etappenrennen durch das Engadin und nach Davos.',dist:'15 km'},
  {month:8,day:'29',title:'Nationalpark Bike Marathon',desc:'Die 25. Ausgabe des legendären Bike-Marathons durch den Schweizerischen Nationalpark.',dist:'35 km'},
  {month:7,day:'Jul',title:'St. Moritz Running Festival',desc:'Kurz, lang oder klassisch – für jeden Läufer die perfekte Strecke im Engadiner Hochtal.',dist:'3 km'},
  {month:9,day:'Sep',title:'British Classic Car Meeting',desc:'Chromblitzende Eleganz vor schneebedeckten Gipfeln. Bentleys, Aston Martins und Jaguare.',dist:'3 km'},
  {month:6,day:'19',title:'Saisonstart Sommersaison',desc:'Das Randolins öffnet für den Sommer – Wanderschuhe schnüren und die Bergwelt geniessen.',dist:'Am Hotel'}
];

var mN=['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
var cM=(new Date).getMonth()+1;
var grid=document.getElementById('events-grid');

function renderEvents(evts){
  grid.innerHTML='';
  var upcoming=evts.filter(function(e){return e.month>=cM});
  upcoming.sort(function(a,b){return a.month-b.month});
  upcoming.forEach(function(ev){
    var c=document.createElement('div');
    c.className='event-card fade-in';
    var dateHTML='<span class="event-date__month">'+mN[ev.month-1]+'</span>';
    c.innerHTML='<div class="event-date event-date--monthonly">'+dateHTML+'</div><div class="event-body"><h4>'+ev.title+'</h4><p>'+ev.desc+'</p><p class="event-meta">'+ev.dist+' vom Hotel</p></div>';
    grid.appendChild(c);obs.observe(c);
  });
}
renderEvents(winterEvents);
sw('winter');

})();
