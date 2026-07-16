
"use strict";
const menuButton=document.querySelector("#menuButton"),navigation=document.querySelector("#navigation"),header=document.querySelector(".site-header"),currentYear=document.querySelector("#currentYear");
function closeMenu(){if(!menuButton||!navigation)return;menuButton.classList.remove("active");navigation.classList.remove("open");document.body.classList.remove("menu-open");menuButton.setAttribute("aria-expanded","false")}
if(menuButton&&navigation){menuButton.addEventListener("click",()=>{const open=navigation.classList.toggle("open");menuButton.classList.toggle("active",open);document.body.classList.toggle("menu-open",open);menuButton.setAttribute("aria-expanded",String(open))});navigation.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu))}
addEventListener("scroll",()=>header?.classList.toggle("scrolled",scrollY>20));addEventListener("resize",()=>{if(innerWidth>950)closeMenu()});if(currentYear)currentYear.textContent=new Date().getFullYear();
const items=document.querySelectorAll(".section-heading,.card,.release-layout,.about-layout,.contact-panel,.hero-content,.hero-art");items.forEach(x=>x.classList.add("reveal"));
if("IntersectionObserver"in window){const o=new IntersectionObserver((e,ob)=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add("is-visible");ob.unobserve(x.target)}}),{threshold:.12,rootMargin:"0px 0px -50px 0px"});items.forEach(x=>o.observe(x))}else items.forEach(x=>x.classList.add("is-visible"));
const glow=document.querySelector(".cursor-glow");if(glow&&matchMedia("(pointer:fine)").matches){addEventListener("mousemove",e=>{glow.style.opacity=".95";glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});addEventListener("mouseleave",()=>glow.style.opacity="0")}
