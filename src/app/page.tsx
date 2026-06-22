"use client";

import { useEffect, useRef } from "react";

const INKWELL_CSS = `
:root{
  --paper:#faf8f3;
  --paper-shadow:#efeadf;
  --ink:#16140f;
  --ink-2:#36322b;
  --ink-3:#6c665b;
  --ink-4:#a8a195;
  --rule:#d9d3c5;
  --seal:#bf3a26;
  --seal-deep:#8a2517;
}
.inkwell-host *{box-sizing:border-box;margin:0;padding:0}
body.inkwell-body{background:var(--paper);color:var(--ink);font-family:'EB Garamond',serif;font-weight:400;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden;}
body.inkwell-body::before, body.inkwell-body::after{display:none !important;}
.inkwell-host .page{position:relative;max-width:1080px;margin:0 auto;padding:64px 56px 120px;}

.inkwell-host .topbar{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:140px;padding-right:110px;}
.inkwell-host .mark{font-family:'EB Garamond',serif;font-weight:600;font-size:14px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-2);white-space:nowrap;}
.inkwell-host .mark .dot{display:inline-block;width:4px;height:4px;border-radius:50%;background:var(--seal);margin:0 8px 3px;vertical-align:middle}
.inkwell-host nav{display:flex;gap:28px;font-size:13px;letter-spacing:.14em;text-transform:lowercase;color:var(--ink-3);font-style:italic;}
.inkwell-host nav a{color:inherit;text-decoration:none;border-bottom:1px solid transparent;padding-bottom:2px;transition:color .2s,border-color .2s}
.inkwell-host nav a:hover{color:var(--ink);border-bottom-color:var(--seal);}

.inkwell-host .stamp{position:absolute;top:56px;right:56px;width:78px;height:88px;z-index:5;pointer-events:none;}
.inkwell-host .stamp svg{width:100%;height:100%;display:block;max-width:78px;max-height:88px;}

.inkwell-host .hero{position:relative;text-align:center;padding:40px 0 80px;}
.inkwell-host .hero .eyebrow{font-style:italic;font-size:15px;color:var(--ink-3);letter-spacing:.04em;margin-bottom:36px;}
.inkwell-host .hero h1{font-family:'EB Garamond',serif;font-weight:700;font-size:clamp(72px,11vw,148px);line-height:.95;letter-spacing:-.02em;color:var(--ink);}
.inkwell-host .hero h1 .ampersand{font-style:italic;font-weight:500;color:var(--seal);}
.inkwell-host .hero .tagline{font-style:italic;font-size:22px;color:var(--ink-2);margin-top:32px;letter-spacing:.005em;}
.inkwell-host .hero .verse{font-style:italic;font-size:19px;line-height:1.85;color:var(--ink-2);margin-top:64px;max-width:520px;margin-left:auto;margin-right:auto;}
.inkwell-host .hero .verse .small{font-size:14px;color:var(--ink-3);display:block;margin-top:22px;font-style:italic;}
.inkwell-host .hero .links{margin-top:72px;display:flex;justify-content:center;gap:36px;font-size:14px;letter-spacing:.18em;text-transform:lowercase;color:var(--ink-3);font-style:italic;}
.inkwell-host .hero .links a{color:var(--ink-2);text-decoration:none;position:relative;padding-bottom:4px;}
.inkwell-host .hero .links a::after{content:'';position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--ink-3);transform-origin:left;transform:scaleX(.4);transition:transform .35s ease;}
.inkwell-host .hero .links a:hover::after{transform:scaleX(1);background:var(--seal);}

.inkwell-host .brush-vert{position:absolute;left:-8px;top:140px;width:120px;height:520px;pointer-events:none;}
.inkwell-host .brush-vert svg{width:100%;height:100%;display:block}
.inkwell-host .brush-vert path{stroke:var(--ink);stroke-width:2.4;fill:none;stroke-linecap:round;stroke-dasharray:1600;stroke-dashoffset:1600;animation:inkdraw 2.6s cubic-bezier(.22,.61,.36,1) .4s forwards;}
.inkwell-host .brush-vert .splash{fill:var(--ink);opacity:0;animation:inkfade 1s ease 2.2s forwards;}
@keyframes inkdraw{to{stroke-dashoffset:0}}
@keyframes inkfade{to{opacity:1}}

.inkwell-host .rule{position:relative;height:48px;margin:48px auto;display:flex;align-items:center;justify-content:center;}
.inkwell-host .rule::before,.inkwell-host .rule::after{content:'';flex:1;height:1px;background:var(--rule);}
.inkwell-host .rule .glyph{font-family:'Noto Serif JP',serif;font-weight:300;font-size:18px;color:var(--ink-3);margin:0 24px;letter-spacing:.5em;padding-right:0;}

.inkwell-host section.block{padding:120px 0;position:relative;}
.inkwell-host .eyebrow-label{font-size:11px;letter-spacing:.42em;text-transform:uppercase;color:var(--ink-3);font-weight:500;margin-bottom:48px;display:flex;align-items:center;gap:14px;}
.inkwell-host .eyebrow-label::before{content:'';width:24px;height:1px;background:var(--ink-3);}
.inkwell-host h2.section-title{font-family:'EB Garamond',serif;font-weight:700;font-size:64px;line-height:1.02;letter-spacing:-.015em;margin-bottom:32px;}
.inkwell-host h2.section-title em{font-weight:500;color:var(--ink-3);}

.inkwell-host .about{display:grid;grid-template-columns:1fr 1.4fr;gap:80px;align-items:start;}
.inkwell-host .about .stack p{font-size:20px;line-height:1.7;color:var(--ink-2);margin-bottom:1.2em;font-style:italic;}
.inkwell-host .about .stack p strong{font-style:normal;font-weight:600;color:var(--ink);}
.inkwell-host .about .meta{font-size:14px;letter-spacing:.04em;color:var(--ink-3);line-height:1.9;border-left:1px solid var(--rule);padding-left:24px;}
.inkwell-host .about .meta dt{font-weight:600;color:var(--ink-2);font-style:italic;margin-top:14px;}
.inkwell-host .about .meta dt:first-child{margin-top:0}
.inkwell-host .about .meta dd{font-style:italic;margin-bottom:6px;}

.inkwell-host .work-list{list-style:none;}
.inkwell-host .work-list li{border-bottom:1px solid var(--rule);}
.inkwell-host .work-list li a{display:grid;grid-template-columns:64px 1fr auto;gap:32px;align-items:baseline;padding:22px 0;color:inherit;text-decoration:none;transition:padding .25s ease,color .2s ease;}
.inkwell-host .work-list .yr{font-style:italic;color:var(--ink-3);font-size:16px;}
.inkwell-host .work-list .title{font-size:24px;font-weight:500;letter-spacing:-.005em;color:var(--ink);}
.inkwell-host .work-list .title em{font-style:italic;color:var(--ink-3);font-weight:400;font-size:18px;margin-left:14px;}
.inkwell-host .work-list .arrow{font-style:italic;color:var(--ink-3);font-size:15px;}
.inkwell-host .work-list li a:hover{padding-left:8px;}
.inkwell-host .work-list li a:hover .arrow,.inkwell-host .work-list li a:hover .title{color:var(--seal);}

.inkwell-host .writing-list{display:grid;grid-template-columns:1fr 1fr;gap:32px 64px;}
.inkwell-host .writing-list .item{padding:20px 0;border-top:1px solid var(--rule);color:inherit;text-decoration:none;display:block;transition:padding .25s ease,color .2s ease;}
.inkwell-host .writing-list .item:hover{padding-left:8px;}
.inkwell-host .writing-list .item:hover .ttl{color:var(--seal);}
.inkwell-host .writing-list .item .date{font-style:italic;font-size:13px;color:var(--ink-3);letter-spacing:.08em;}
.inkwell-host .writing-list .item .ttl{font-size:22px;font-weight:500;margin-top:10px;line-height:1.25;color:var(--ink);transition:color .2s ease;}
.inkwell-host .writing-list .item .ttl em{color:var(--ink-3);font-weight:400;}

.inkwell-host .reading{display:grid;grid-template-columns:repeat(4,1fr);gap:48px 36px;}
.inkwell-host .book{display:flex;flex-direction:column;gap:8px;}
.inkwell-host .book .cover{aspect-ratio:2/3;background:var(--paper-shadow);border:1px solid var(--rule);position:relative;overflow:hidden;box-shadow:0 1px 0 rgba(0,0,0,.04),0 8px 20px rgba(22,20,15,.06);transition:transform .35s ease,box-shadow .35s ease;}
.inkwell-host .book .cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.92) contrast(.96);}
.inkwell-host .book .cover::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent 60%,rgba(0,0,0,.06));pointer-events:none;}
.inkwell-host .book:hover .cover{transform:translateY(-3px);box-shadow:0 2px 0 rgba(0,0,0,.05),0 14px 28px rgba(22,20,15,.12);}
.inkwell-host .book .ttl{font-style:italic;font-size:15px;color:var(--ink-2);margin-top:14px;line-height:1.3;}
.inkwell-host .book .author{font-size:13px;color:var(--ink-3);letter-spacing:.04em;}

.inkwell-host .films{display:grid;grid-template-columns:repeat(4,1fr);gap:48px 36px;}
.inkwell-host .film{display:flex;flex-direction:column;gap:8px;}
.inkwell-host .film .poster{aspect-ratio:2/3;background:var(--paper-shadow);border:1px solid var(--rule);position:relative;overflow:hidden;box-shadow:0 1px 0 rgba(0,0,0,.04),0 8px 20px rgba(22,20,15,.06);transition:transform .35s ease,box-shadow .35s ease;}
.inkwell-host .film .poster img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.92) contrast(.96);}
.inkwell-host .film .poster::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent 60%,rgba(0,0,0,.06));pointer-events:none;}
.inkwell-host .film:hover .poster{transform:translateY(-3px);box-shadow:0 2px 0 rgba(0,0,0,.05),0 14px 28px rgba(22,20,15,.12);}
.inkwell-host .film .ttl{font-style:italic;font-size:15px;color:var(--ink-2);margin-top:14px;line-height:1.3;}
.inkwell-host .film .byline{font-size:13px;color:var(--ink-3);letter-spacing:.04em;}
body.inkwell-body.palette-midnight .inkwell-host .film .poster{border-color:rgba(197,165,114,.15);filter:brightness(1.02) saturate(.92);}

.inkwell-host .ig-call{display:grid;grid-template-columns:1fr 1.3fr;gap:64px;align-items:center;text-decoration:none;color:inherit;padding:36px 12px;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);transition:padding .35s ease;}
.inkwell-host .ig-call:hover{padding:36px 20px;}
.inkwell-host .ig-stage{aspect-ratio:1/1;background:var(--paper);border:1px solid var(--rule);position:relative;overflow:hidden;box-shadow:0 1px 0 rgba(0,0,0,.04),0 12px 28px rgba(22,20,15,.08);transition:transform .35s ease,box-shadow .35s ease;}
.inkwell-host .ig-call:hover .ig-stage{transform:translateY(-3px);box-shadow:0 2px 0 rgba(0,0,0,.05),0 18px 36px rgba(22,20,15,.14);}
.inkwell-host .ig-stage svg{width:100%;height:100%;display:block;}
.inkwell-host .ig-words{display:flex;flex-direction:column;gap:18px;}
.inkwell-host .ig-kicker{font-size:11px;letter-spacing:.42em;text-transform:uppercase;color:var(--ink-3);font-weight:500;display:flex;align-items:center;gap:14px;}
.inkwell-host .ig-kicker::before{content:'';width:24px;height:1px;background:var(--ink-3);}
.inkwell-host .ig-handle{font-family:'EB Garamond',serif;font-weight:600;font-size:44px;letter-spacing:-.005em;color:var(--ink);line-height:1;}
.inkwell-host .ig-call:hover .ig-handle{color:var(--seal);}
.inkwell-host .ig-body{font-size:19px;line-height:1.65;color:var(--ink-2);max-width:440px;}
.inkwell-host .ig-cta{font-style:italic;font-size:15px;letter-spacing:.04em;color:var(--ink-3);border-bottom:1px solid var(--ink-3);align-self:flex-start;padding-bottom:3px;margin-top:6px;}
.inkwell-host .ig-call:hover .ig-cta{color:var(--seal);border-color:var(--seal);}
@media (max-width:780px){
  .inkwell-host .ig-call{grid-template-columns:1fr;gap:32px;}
  .inkwell-host .ig-handle{font-size:36px;}
}

.inkwell-host .pinterest-floor{position:relative;min-height:760px;margin-top:54px;
  background:
    radial-gradient(circle at 25% 18%,rgba(255,255,255,.7),transparent 24%),
    linear-gradient(135deg,rgba(255,255,255,.28),rgba(0,0,0,.035));
  border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);
  overflow:visible;}
.inkwell-host .pin-polaroid{position:absolute;left:var(--x);top:var(--y);width:var(--w);
  display:block;background:#fffdf8;padding:10px 10px 32px;text-decoration:none;color:inherit;
  box-shadow:0 18px 34px rgba(22,20,15,.16),0 2px 0 rgba(22,20,15,.08);
  transform:rotate(var(--r));z-index:var(--z);transition:transform .25s ease,box-shadow .25s ease;}
.inkwell-host .pin-polaroid:hover{transform:rotate(var(--r)) translateY(-6px) scale(1.03);
  box-shadow:0 24px 48px rgba(22,20,15,.22),0 2px 0 rgba(22,20,15,.08);}
.inkwell-host .pin-polaroid img{width:100%;aspect-ratio:var(--ar,3/4);object-fit:cover;display:block;
  filter:saturate(.94) contrast(.98);}
.inkwell-host .pin-polaroid::after{content:'';position:absolute;left:18px;right:18px;bottom:15px;height:1px;
  background:rgba(22,20,15,.08);}
.inkwell-host .pin-note{position:absolute;left:47%;top:43%;width:260px;padding:22px 24px 26px;background:#fffdf8;
  color:var(--ink-2);font-size:20px;line-height:1.45;font-style:italic;box-shadow:0 18px 34px rgba(22,20,15,.14);
  transform:rotate(-3deg);z-index:12;}
.inkwell-host .pin-note .kicker{display:block;margin-bottom:12px;font-size:11px;letter-spacing:.32em;text-transform:uppercase;
  color:var(--ink-3);font-style:normal;}
@media (max-width:780px){
  .inkwell-host .pinterest-floor{min-height:1780px;margin-left:-10px;margin-right:-10px;margin-top:36px;}
  .inkwell-host .pin-polaroid{width:clamp(104px,36vw,140px);padding:8px 8px 26px;}
  .inkwell-host .pin-polaroid:nth-child(1){left:4%;top:24px;}
  .inkwell-host .pin-polaroid:nth-child(2){left:54%;top:56px;}
  .inkwell-host .pin-polaroid:nth-child(3){left:28%;top:194px;}
  .inkwell-host .pin-polaroid:nth-child(4){left:5%;top:344px;}
  .inkwell-host .pin-polaroid:nth-child(5){left:58%;top:334px;}
  .inkwell-host .pin-polaroid:nth-child(6){left:8%;top:520px;}
  .inkwell-host .pin-polaroid:nth-child(7){left:53%;top:548px;}
  .inkwell-host .pin-polaroid:nth-child(8){left:30%;top:700px;}
  .inkwell-host .pin-polaroid:nth-child(9){left:6%;top:838px;}
  .inkwell-host .pin-note{left:20%;top:990px;width:min(236px,68vw);font-size:17px;z-index:11;}
  .inkwell-host .pin-polaroid:nth-child(11){left:58%;top:860px;}
  .inkwell-host .pin-polaroid:nth-child(12){left:4%;top:1168px;}
  .inkwell-host .pin-polaroid:nth-child(13){left:53%;top:1126px;}
  .inkwell-host .pin-polaroid:nth-child(14){left:27%;top:1302px;}
  .inkwell-host .pin-polaroid:nth-child(15){left:5%;top:1456px;}
  .inkwell-host .pin-polaroid:nth-child(16){left:55%;top:1468px;}
  .inkwell-host .pin-polaroid:nth-child(17){left:28%;top:1592px;}
  .inkwell-host .pin-polaroid:nth-child(18),
  .inkwell-host .pin-polaroid:nth-child(19){display:none;}
}

.inkwell-host .contact{text-align:center;padding:160px 0 80px;}
.inkwell-host .contact h2{font-family:'EB Garamond',serif;font-weight:500;font-style:italic;font-size:42px;color:var(--ink-2);margin-bottom:48px;}
.inkwell-host .contact h2 strong{font-style:normal;font-weight:700;color:var(--ink);}
.inkwell-host .contact .email{font-size:28px;letter-spacing:.02em;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--ink-3);padding-bottom:4px;}
.inkwell-host .contact .email:hover{border-color:var(--seal);color:var(--seal);}
.inkwell-host .contact .social{margin-top:64px;display:flex;justify-content:center;gap:48px;font-size:14px;font-style:italic;letter-spacing:.14em;text-transform:lowercase;color:var(--ink-3);}
.inkwell-host .contact .social a{color:var(--ink-2);text-decoration:none;}
.inkwell-host .contact .social a:hover{color:var(--seal);}

.inkwell-host footer{text-align:center;padding:80px 0 0;border-top:1px solid var(--rule);margin-top:80px;font-style:italic;font-size:13px;color:var(--ink-3);letter-spacing:.04em;}
.inkwell-host footer .small{display:block;margin-top:10px;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:var(--ink-4);}

.inkwell-host .wave-bg{position:absolute;left:50%;transform:translateX(-50%);bottom:-180px;width:1400px;max-width:140vw;height:340px;pointer-events:none;opacity:.18;}
.inkwell-host .mountain-bg{position:absolute;right:-20px;width:280px;pointer-events:none;opacity:.08;}
.inkwell-host .moon{position:absolute;right:120px;top:240px;width:96px;height:96px;border-radius:50%;background:transparent;border:1px solid var(--ink-3);pointer-events:none;}
.inkwell-host .moon::after{content:'';position:absolute;inset:6px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--paper-shadow),transparent 70%);}

.inkwell-host .drift{animation:inkdrift 14s ease-in-out infinite;}
@keyframes inkdrift{0%,100%{transform:translateY(0) translateX(0)}50%{transform:translateY(-12px) translateX(6px)}}

.inkwell-host [data-reveal]{opacity:0;transform:translateY(20px);transition:opacity 1.2s ease,transform 1.2s cubic-bezier(.22,.61,.36,1);}
.inkwell-host [data-reveal].in{opacity:1;transform:none;}

.inkwell-host .vert-mark{position:absolute;left:18px;top:380px;writing-mode:vertical-rl;font-family:'Noto Serif JP',serif;font-weight:300;font-size:11px;letter-spacing:.6em;color:var(--ink-4);text-transform:uppercase;}

body.inkwell-body.palette-washi{
  --paper:#ece1c8;--paper-shadow:#dccdaf;
  --ink:#1a1410;--ink-2:#3a2e22;--ink-3:#7a6a52;--ink-4:#a89e85;
  --rule:#cdbf9f;--seal:#d76436;--seal-deep:#a8451f;
}
body.inkwell-body.palette-parchment{
  --paper:#f3ead4;--paper-shadow:#e5dab8;
  --ink:#2a1f15;--ink-2:#4a3a2a;--ink-3:#7a6852;--ink-4:#a8957a;
  --rule:#d5c5a5;--seal:#8a4034;--seal-deep:#5a2820;
}
body.inkwell-body.palette-midnight{
  --paper:#0c1422;--paper-shadow:#131e34;
  --ink:#f0e6cf;--ink-2:#d8c79a;--ink-3:#a89270;--ink-4:#6a5840;
  --rule:#2a3a55;--seal:#c5a572;--seal-deep:#8a7549;
}
body.inkwell-body.palette-midnight .inkwell-host .book .cover{filter:brightness(1.05) saturate(.9);}
body.inkwell-body.palette-midnight .inkwell-host .photo,
body.inkwell-body.palette-midnight .inkwell-host .book .cover{border-color:rgba(197,165,114,.15);}

body.inkwell-body.density-airy .inkwell-host .page{padding:96px 72px 160px;}
body.inkwell-body.density-airy .inkwell-host section.block{padding:160px 0;}
body.inkwell-body.density-tight .inkwell-host .page{padding:40px 48px 88px;}
body.inkwell-body.density-tight .inkwell-host section.block{padding:80px 0;}
body.inkwell-body.density-tight .inkwell-host .topbar{margin-bottom:88px;}
body.inkwell-body.density-tight .inkwell-host h2.section-title{font-size:52px;}

body.inkwell-body.ornament-silent .inkwell-host .brush-vert,
body.inkwell-body.ornament-silent .inkwell-host .wave-bg,
body.inkwell-body.ornament-silent .inkwell-host .vert-mark,
body.inkwell-body.ornament-silent .inkwell-host .opt-moon,
body.inkwell-body.ornament-silent .inkwell-host .opt-mountain{display:none;}

body.inkwell-body.ornament-painting .inkwell-host .wave-bg{opacity:.28;}
body.inkwell-body.ornament-painting .inkwell-host .opt-moon,
body.inkwell-body.ornament-painting .inkwell-host .opt-mountain{display:block;}

.inkwell-host .opt-moon{display:none;position:absolute;right:110px;top:160px;width:128px;height:128px;border-radius:50%;
  border:1px solid var(--ink-3);pointer-events:none;opacity:.5;}
.inkwell-host .opt-moon::after{content:'';position:absolute;inset:8px;border-radius:50%;
  background:radial-gradient(circle at 36% 32%,var(--paper-shadow),transparent 70%);}
.inkwell-host .opt-mountain{display:none;position:absolute;left:-60px;bottom:480px;width:380px;pointer-events:none;opacity:.12;}
.inkwell-host .opt-mountain svg{width:100%;height:auto;display:block;}

.inkwell-host .tweaks{position:fixed;right:24px;bottom:24px;z-index:9999;width:280px;
  background:var(--paper);border:1px solid var(--rule);
  box-shadow:0 12px 40px rgba(0,0,0,.15),0 0 0 1px rgba(0,0,0,.04);
  padding:0;font-family:'EB Garamond',serif;color:var(--ink-2);
  display:none;border-radius:2px;}
.inkwell-host .tweaks.open{display:block;}
.inkwell-host .tweaks-head{padding:16px 18px 12px;border-bottom:1px solid var(--rule);
  display:flex;justify-content:space-between;align-items:center;}
.inkwell-host .tweaks-head .title{font-style:italic;font-size:16px;color:var(--ink);letter-spacing:.04em;}
.inkwell-host .tweaks-head .close{cursor:pointer;background:none;border:0;color:var(--ink-3);
  font-family:inherit;font-size:18px;line-height:1;padding:4px 6px;}
.inkwell-host .tweaks-head .close:hover{color:var(--seal);}
.inkwell-host .tweaks-body{padding:8px 18px 18px;}
.inkwell-host .tweaks-row{padding:14px 0;border-bottom:1px solid var(--rule);}
.inkwell-host .tweaks-row:last-child{border-bottom:0;}
.inkwell-host .tweaks-label{font-size:10px;letter-spacing:.32em;text-transform:uppercase;
  color:var(--ink-3);margin-bottom:10px;font-weight:500;}
.inkwell-host .tweaks-swatches{display:flex;gap:8px;}
.inkwell-host .tweaks-swatch{flex:1;height:42px;border:1px solid var(--rule);cursor:pointer;
  position:relative;display:flex;align-items:center;justify-content:center;
  overflow:hidden;border-radius:1px;transition:transform .15s,border-color .15s;}
.inkwell-host .tweaks-swatch:hover{transform:translateY(-1px);border-color:var(--ink-3);}
.inkwell-host .tweaks-swatch.active{border-color:var(--seal);box-shadow:0 0 0 1px var(--seal);}
.inkwell-host .tweaks-swatch .ink-dot{position:absolute;left:6px;top:6px;width:8px;height:8px;border-radius:50%;}
.inkwell-host .tweaks-swatch .seal-dot{position:absolute;right:6px;bottom:6px;width:6px;height:6px;border-radius:50%;}
.inkwell-host .tweaks-segments{display:flex;gap:0;border:1px solid var(--rule);border-radius:1px;overflow:hidden;}
.inkwell-host .tweaks-segments button{flex:1;background:transparent;border:0;border-right:1px solid var(--rule);
  color:var(--ink-3);font-family:'EB Garamond',serif;font-style:italic;font-size:13px;
  padding:8px 4px;cursor:pointer;transition:background .15s,color .15s;letter-spacing:.04em;}
.inkwell-host .tweaks-segments button:last-child{border-right:0;}
.inkwell-host .tweaks-segments button:hover{color:var(--ink);background:var(--paper-shadow);}
.inkwell-host .tweaks-segments button.active{background:var(--ink);color:var(--paper);}
.inkwell-host .tweaks-kanji{display:flex;gap:6px;flex-wrap:wrap;}
.inkwell-host .tweaks-kanji button{width:42px;height:42px;border:1px solid var(--rule);background:transparent;
  font-family:'Noto Serif JP',serif;font-size:20px;color:var(--ink);cursor:pointer;
  transition:border-color .15s,color .15s,background .15s;border-radius:1px;}
.inkwell-host .tweaks-kanji button:hover{border-color:var(--ink-3);}
.inkwell-host .tweaks-kanji button.active{border-color:var(--seal);color:var(--seal);background:rgba(191,58,38,.06);}

.inkwell-host .tweaks-toggle{position:fixed;right:24px;bottom:24px;z-index:9998;
  width:44px;height:44px;border-radius:50%;background:var(--ink);color:var(--paper);
  border:0;cursor:pointer;font-family:'Noto Serif JP',serif;font-size:18px;
  box-shadow:0 6px 18px rgba(0,0,0,.18);transition:transform .2s,background .2s;
  display:none;align-items:center;justify-content:center;}
.inkwell-host .tweaks-toggle.shown{display:flex;}
.inkwell-host .tweaks-toggle:hover{background:var(--seal);transform:scale(1.06);}
.inkwell-host .tweaks-toggle.is-open{display:none;}

@media (max-width:780px){
  .inkwell-host .page{padding:32px 24px 80px}
  .inkwell-host .about,.inkwell-host .writing-list{grid-template-columns:1fr;gap:32px}
  .inkwell-host .reading,.inkwell-host .films{grid-template-columns:repeat(2,1fr)}
  .inkwell-host .brush-vert,.inkwell-host .vert-mark{display:none}
  .inkwell-host nav{display:none}
  .inkwell-host h2.section-title{font-size:44px}
}
`;

const INKWELL_HTML = `
<div class="page">

  <div class="opt-moon" aria-hidden="true"></div>
  <div class="opt-mountain" aria-hidden="true">
    <svg viewBox="0 0 380 220" preserveAspectRatio="xMidYMax slice">
      <path d="M 0 220 L 60 140 L 110 170 L 160 100 L 200 140 L 250 90 L 300 130 L 340 110 L 380 130 L 380 220 Z" fill="var(--ink)"/>
      <path d="M 180 110 Q 198 96 200 90 Q 210 100 220 108 Q 200 102 180 110 Z" fill="var(--paper-shadow)" opacity=".5"/>
    </svg>
  </div>

  <div class="stamp" aria-hidden="true">
    <svg width="78" height="88" viewBox="0 0 78 88">
      <rect x="3" y="3" width="72" height="72" fill="none" stroke="var(--seal)" stroke-width="2"/>
      <rect x="8" y="8" width="62" height="62" fill="none" stroke="var(--seal)" stroke-width=".8"/>
      <text id="hanko-glyph" x="39" y="36" text-anchor="middle" fill="var(--seal)" font-family="Noto Serif JP" font-size="22" font-weight="400">影</text>
      <text x="39" y="60" text-anchor="middle" fill="var(--seal)" font-family="EB Garamond" font-size="11" font-style="italic" letter-spacing="2">vp</text>
      <text x="39" y="84" text-anchor="middle" fill="var(--ink-3)" font-family="EB Garamond" font-size="8" font-style="italic" letter-spacing="3">MMXXVI</text>
    </svg>
  </div>

  <div class="brush-vert" aria-hidden="true">
    <svg viewBox="0 0 120 520" preserveAspectRatio="none">
      <path d="M 62 6 C 58 60, 70 110, 64 170 C 58 230, 78 280, 66 340 C 56 390, 72 440, 60 510" />
      <ellipse class="splash" cx="60" cy="514" rx="6" ry="3"/>
      <ellipse class="splash" cx="70" cy="3" rx="3" ry="2"/>
    </svg>
  </div>

  <div class="vert-mark">vedanta · portfolio · summer mmxxvi</div>

  <header class="topbar">
    <div class="mark">v<span class="dot"></span>p</div>
    <nav>
      <a href="#about">about</a>
      <a href="#work">work</a>
      <a href="#writing">writing</a>
      <a href="#reading">reading</a>
      <a href="#watching">watching</a>
      <a href="#frames">taste</a>
      <a href="#contact">contact</a>
    </nav>
  </header>

  <section class="hero">
    <div data-reveal class="eyebrow">portfolio, writing, and taste notes</div>
    <h1 data-reveal>vedanta<span class="ampersand">.</span></h1>
    <p class="tagline" data-reveal><em>engineer building systems, tools, and small experiments.</em></p>
    <div data-reveal class="verse">
      <em>
      i like sharp interfaces,<br/>
      fast systems,<br/>
      good typography,<br/>
      and things with a little taste.
      </em>
      <span class="small">a working note</span>
    </div>
    <div class="links" data-reveal>
      <a href="#about">about</a>
      <a href="#work">selected work</a>
      <a href="#frames">taste</a>
    </div>
  </section>

  <div class="rule"><span class="glyph">・</span></div>

  <section class="block" id="about">
    <div class="eyebrow-label">i · about</div>
    <h2 class="section-title" data-reveal>Engineer, <em>builder, collector.</em></h2>
    <div class="about">
      <div class="stack" data-reveal>
        <p>I build software across infra, product, and odd side projects. The work I like most is simple on the surface and serious underneath: a clean interface, a reliable system, a useful automation.</p>
        <p>My taste leans toward strong type, old hardware, movie frames, posters, and objects that feel deliberately made. Pinterest is where a lot of that gets collected before it turns into a page, a product detail, or a small design choice.</p>
        <p><em>currently:</em> based in delhi, working on distributed systems, agentic tooling, and whatever side project is stuck in my head that week.</p>
      </div>
      <dl class="meta" data-reveal>
        <dt>now</dt>
        <dd>engineering @ parallel</dd>
        <dt>before</dt>
        <dd>infra, then product</dd>
        <dt>tools</dt>
        <dd>go · ts · postgres · design references</dd>
        <dt>elsewhere</dt>
        <dd>delhi · pinterest boards · used bookshops</dd>
        <dt>taste</dt>
        <dd>posters · interiors · interfaces · frames</dd>
      </dl>
    </div>
  </section>

  <div class="rule"><span class="glyph">・ ・</span></div>

  <section class="block" id="work">
    <div class="eyebrow-label">ii · selected work</div>
    <h2 class="section-title" data-reveal>Things <em>made,</em> mostly with care.</h2>
    <ul class="work-list" data-reveal>
      <li><a href="https://reddit.paralleldistribution.com" target="_blank" rel="noopener"><span class="yr">2026</span><span class="title">orca <em>· reddit automation, dashboard, api, background workers, agents</em></span><span class="arrow">live →</span></a></li>
      <li><a href="https://el-gigatronius.vercel.app" target="_blank" rel="noopener"><span class="yr">2026</span><span class="title">el gigatronius <em>· tiktok slideshow generator, multi-agent restyling</em></span><span class="arrow">live →</span></a></li>
      <li><a href="https://github.com/unworld11/virtuchat" target="_blank" rel="noopener"><span class="yr">2025</span><span class="title">virtuchat <em>· an uncensored, personalised chatbot</em></span><span class="arrow">github →</span></a></li>
      <li><a href="https://github.com/unworld11/tiktokTrendAnalyser" target="_blank" rel="noopener"><span class="yr">2025</span><span class="title">tiktok trend analyser <em>· semantic clustering for short-form video</em></span><span class="arrow">github →</span></a></li>
      <li><a href="https://github.com/unworld11/make-videos-like-3b1b" target="_blank" rel="noopener"><span class="yr">2025</span><span class="title">make-videos-like-3b1b <em>· ai-written manim, in the spirit of 3blue1brown</em></span><span class="arrow">github →</span></a></li>
      <li><a href="https://github.com/unworld11/tinygrad" target="_blank" rel="noopener"><span class="yr">2025</span><span class="title">tinygrad <em>· a small autograd engine, after karpathy</em></span><span class="arrow">github →</span></a></li>
      <li><a href="https://github.com/unworld11/dRAGarys" target="_blank" rel="noopener"><span class="yr">2024</span><span class="title">dRAGarys <em>· self-reflective retrieval-augmented generation</em></span><span class="arrow">github →</span></a></li>
      <li><a href="https://github.com/unworld11/sisyphus" target="_blank" rel="noopener"><span class="yr">2024</span><span class="title">sisyphus <em>· csv &amp; sheets analysis with llama and serp</em></span><span class="arrow">github →</span></a></li>
    </ul>
  </section>

  <div class="rule"><span class="glyph">・ ・ ・</span></div>

  <section class="block" id="writing">
    <div class="eyebrow-label">iii · writing</div>
    <h2 class="section-title" data-reveal>Essays, notes, <em>and Substack.</em></h2>
    <div class="writing-list" data-reveal>
      <a class="item" href="/blogs/gnn-supply-chain-quant.html"><div class="date">oct · 2025</div><div class="ttl">graph neural networks meet quantitative trading <em>supply-chain structure as predictive signal</em></div></a>
      <a class="item" href="/blogs/agents-are-corrupt.html"><div class="date">sep · 2025</div><div class="ttl">agents are corrupt <em>emergent misalignment in multi-agent simulations</em></div></a>
      <a class="item" href="https://substack.com/@vedantasp" target="_blank" rel="noopener"><div class="date">ongoing</div><div class="ttl">substack <em>short notes, links, and things i'm thinking through</em></div></a>
    </div>
  </section>

  <div class="rule"><span class="glyph">・ ・ ・ ・</span></div>

  <section class="block" id="reading">
    <div class="eyebrow-label">iv · what i'm reading</div>
    <h2 class="section-title" data-reveal>A shelf, <em>currently in rotation.</em></h2>
    <div class="reading" data-reveal>
      <div class="book"><div class="cover"><img src="https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg" alt="The Midnight Library" loading="lazy"/></div><div class="ttl">The Midnight Library</div><div class="author">Matt Haig</div></div>
      <div class="book"><div class="cover"><img src="https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg" alt="Steve Jobs" loading="lazy"/></div><div class="ttl">Steve Jobs</div><div class="author">Walter Isaacson</div></div>
      <div class="book"><div class="cover"><img src="https://covers.openlibrary.org/b/isbn/9781501135910-L.jpg" alt="Shoe Dog" loading="lazy"/></div><div class="ttl">Shoe Dog</div><div class="author">Phil Knight</div></div>
      <div class="book"><div class="cover"><img src="https://covers.openlibrary.org/b/isbn/9780142414934-L.jpg" alt="Paper Towns" loading="lazy"/></div><div class="ttl">Paper Towns</div><div class="author">John Green</div></div>
      <div class="book"><div class="cover"><img src="https://covers.openlibrary.org/b/isbn/9780140447972-L.jpg" alt="White Nights" loading="lazy"/></div><div class="ttl">White Nights</div><div class="author">Fyodor Dostoyevsky</div></div>
      <div class="book"><div class="cover"><img src="https://covers.openlibrary.org/b/isbn/9781101904220-L.jpg" alt="Dark Matter" loading="lazy"/></div><div class="ttl">Dark Matter</div><div class="author">Blake Crouch</div></div>
      <div class="book"><div class="cover"><img src="https://covers.openlibrary.org/b/isbn/1544514212-L.jpg" alt="The Almanack of Naval Ravikant" loading="lazy"/></div><div class="ttl">The Almanack of Naval Ravikant</div><div class="author">Eric Jorgenson</div></div>
      <div class="book"><div class="cover"><img src="https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg" alt="1984" loading="lazy"/></div><div class="ttl">1984</div><div class="author">George Orwell</div></div>
      <div class="book"><div class="cover"><img src="https://covers.openlibrary.org/b/isbn/9780140449136-L.jpg" alt="Crime and Punishment" loading="lazy"/></div><div class="ttl">Crime and Punishment</div><div class="author">Fyodor Dostoyevsky</div></div>
      <div class="book"><div class="cover"><img src="https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg" alt="Sapiens" loading="lazy"/></div><div class="ttl">Sapiens</div><div class="author">Yuval Noah Harari</div></div>
      <div class="book"><div class="cover"><img src="https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg" alt="The Great Gatsby" loading="lazy"/></div><div class="ttl">The Great Gatsby</div><div class="author">F. Scott Fitzgerald</div></div>
      <div class="book"><div class="cover"><img src="https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg" alt="Zero to One" loading="lazy"/></div><div class="ttl">Zero to One</div><div class="author">Peter Thiel</div></div>
    </div>
  </section>

  <div class="rule"><span class="glyph">・ ・ ・ ・ ・</span></div>

  <section class="block" id="watching">
    <div class="eyebrow-label">v · what i'm watching</div>
    <h2 class="section-title" data-reveal>Films <em>i keep thinking about.</em></h2>
    <div class="films" data-reveal>
      <div class="film"><div class="poster"><img src="https://image.tmdb.org/t/p/w500/yihdXomYb5kTeSivtFndMy5iDmf.jpg" alt="Project Hail Mary" loading="lazy"/></div><div class="ttl">Project Hail Mary</div><div class="byline">Lord &amp; Miller · 2026</div></div>
      <div class="film"><div class="poster"><img src="https://image.tmdb.org/t/p/w500/zhG3vKWyDRaZYoaww1UVAi29T9h.jpg" alt="12 Angry Men" loading="lazy"/></div><div class="ttl">12 Angry Men</div><div class="byline">Sidney Lumet · 1957</div></div>
      <div class="film"><div class="poster"><img src="https://image.tmdb.org/t/p/w500/7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg" alt="Inglourious Basterds" loading="lazy"/></div><div class="ttl">Inglourious Basterds</div><div class="byline">Quentin Tarantino · 2009</div></div>
      <div class="film"><div class="poster"><img src="https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg" alt="Schindler's List" loading="lazy"/></div><div class="ttl">Schindler's List</div><div class="byline">Steven Spielberg · 1993</div></div>
      <div class="film"><div class="poster"><img src="https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" alt="Oppenheimer" loading="lazy"/></div><div class="ttl">Oppenheimer</div><div class="byline">Christopher Nolan · 2023</div></div>
      <div class="film"><div class="poster"><img src="https://image.tmdb.org/t/p/w500/rOa94QOq3wbqKBHjSqL0WtPPJm1.jpg" alt="The Prestige" loading="lazy"/></div><div class="ttl">The Prestige</div><div class="byline">Christopher Nolan · 2006</div></div>
      <div class="film"><div class="poster"><img src="https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg" alt="Interstellar" loading="lazy"/></div><div class="ttl">Interstellar</div><div class="byline">Christopher Nolan · 2014</div></div>
      <div class="film"><div class="poster"><img src="https://image.tmdb.org/t/p/w500/scVEaJEwP8zUix8vgmMoJJ9Nq0w.jpg" alt="The Big Short" loading="lazy"/></div><div class="ttl">The Big Short</div><div class="byline">Adam McKay · 2015</div></div>
      <div class="film"><div class="poster"><img src="https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg" alt="The Shawshank Redemption" loading="lazy"/></div><div class="ttl">The Shawshank Redemption</div><div class="byline">Frank Darabont · 1994</div></div>
      <div class="film"><div class="poster"><img src="https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg" alt="Pulp Fiction" loading="lazy"/></div><div class="ttl">Pulp Fiction</div><div class="byline">Quentin Tarantino · 1994</div></div>
      <div class="film"><div class="poster"><img src="https://image.tmdb.org/t/p/w500/igICOruFgiqdY1HXwTNRuXJute.jpg" alt="Parasite" loading="lazy"/></div><div class="ttl">Parasite</div><div class="byline">Bong Joon-ho · 2019</div></div>
      <div class="film"><div class="poster"><img src="https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg" alt="Whiplash" loading="lazy"/></div><div class="ttl">Whiplash</div><div class="byline">Damien Chazelle · 2014</div></div>
    </div>
  </section>

  <div class="rule"><span class="glyph">・ ・ ・ ・ ・ ・</span></div>

  <section class="block" id="frames">
    <div class="eyebrow-label">vi · pinterest · designs · photographs</div>
    <h2 class="section-title" data-reveal>Pinterest feed, <em>fallen on the floor.</em></h2>
    <div class="pinterest-floor" data-reveal>
      <div class="pin-polaroid" style="--x:1%;--y:4%;--w:168px;--mw:138px;--r:-9deg;--z:3;--ar:4/3"><img src="/assets/pinterest-polaroids/pin-01.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:18%;--y:1%;--w:144px;--mw:128px;--r:6deg;--z:4;--ar:2/3"><img src="/assets/pinterest-polaroids/pin-02.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:34%;--y:5%;--w:150px;--mw:126px;--r:-4deg;--z:2;--ar:1/1"><img src="/assets/pinterest-polaroids/pin-03.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:55%;--y:2%;--w:166px;--mw:132px;--r:10deg;--z:5;--ar:1/1"><img src="/assets/pinterest-polaroids/pin-04.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:75%;--y:6%;--w:142px;--mw:122px;--r:-7deg;--z:3;--ar:3/4"><img src="/assets/pinterest-polaroids/pin-05.jpg" alt="Pinterest feed reference" loading="lazy"/></div>

      <div class="pin-polaroid" style="--x:8%;--y:28%;--w:154px;--mw:134px;--r:8deg;--z:7;--ar:3/4"><img src="/assets/pinterest-polaroids/pin-06.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:25%;--y:22%;--w:172px;--mw:136px;--r:-12deg;--z:6;--ar:1/1"><img src="/assets/pinterest-polaroids/pin-07.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:69%;--y:25%;--w:166px;--mw:130px;--r:5deg;--z:6;--ar:4/5"><img src="/assets/pinterest-polaroids/pin-08.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:83%;--y:29%;--w:134px;--mw:118px;--r:-14deg;--z:4;--ar:1/1"><img src="/assets/pinterest-polaroids/pin-09.jpg" alt="Pinterest feed reference" loading="lazy"/></div>

      <div class="pin-note">
        <span class="kicker">pinterest feed</span>
        the home feed is messier and more honest than a moodboard: type, rooms, watches, posters, outfits, notes, film frames.
      </div>

      <div class="pin-polaroid" style="--x:0%;--y:52%;--w:138px;--mw:118px;--r:13deg;--z:4;--ar:3/4"><img src="/assets/pinterest-polaroids/pin-10.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:16%;--y:50%;--w:160px;--mw:126px;--r:-5deg;--z:8;--ar:1/1"><img src="/assets/pinterest-polaroids/pin-11.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:33%;--y:56%;--w:136px;--mw:116px;--r:11deg;--z:3;--ar:1/1"><img src="/assets/pinterest-polaroids/pin-12.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:61%;--y:51%;--w:160px;--mw:128px;--r:-8deg;--z:9;--ar:3/4"><img src="/assets/pinterest-polaroids/pin-13.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:80%;--y:55%;--w:154px;--mw:124px;--r:9deg;--z:5;--ar:1/1"><img src="/assets/pinterest-polaroids/pin-14.jpg" alt="Pinterest feed reference" loading="lazy"/></div>

      <div class="pin-polaroid" style="--x:5%;--y:78%;--w:154px;--mw:124px;--r:-7deg;--z:6;--ar:1/1"><img src="/assets/pinterest-polaroids/pin-15.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:23%;--y:78%;--w:148px;--mw:122px;--r:4deg;--z:4;--ar:4/3"><img src="/assets/pinterest-polaroids/pin-16.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:42%;--y:76%;--w:152px;--mw:124px;--r:-11deg;--z:6;--ar:1/1"><img src="/assets/pinterest-polaroids/pin-17.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:61%;--y:77%;--w:164px;--mw:132px;--r:12deg;--z:3;--ar:3/4"><img src="/assets/pinterest-polaroids/pin-18.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
      <div class="pin-polaroid" style="--x:79%;--y:80%;--w:156px;--mw:126px;--r:-4deg;--z:7;--ar:1/1"><img src="/assets/pinterest-polaroids/pin-19.jpg" alt="Pinterest feed reference" loading="lazy"/></div>
    </div>
  </section>

  <div class="rule"><span class="glyph">・</span></div>

  <section class="contact" id="contact" data-reveal>
    <h2>If you're building something <strong>useful or tasteful,</strong><br/>I'd love to hear from you.</h2>
    <a class="email" href="mailto:vedant.vasu1111@gmail.com">vedant.vasu1111@gmail.com</a>
    <div class="social">
      <a href="https://github.com/unworld11">github</a>
      <a href="https://x.com/vedantasp">x</a>
      <a href="https://www.linkedin.com/in/vedantasp">linkedin</a>
      <a href="/blogs">blog</a>
      <a href="https://substack.com/@vedantasp">substack</a>
      <a href="https://in.pinterest.com/vedantasp/">pinterest</a>
    </div>
  </section>

  <footer>
    <em>set in eb garamond. built in delhi.</em>
    <span class="small">vedanta · mmxxvi</span>
  </footer>

</div>

<svg class="wave-bg drift" viewBox="0 0 1400 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <g fill="none" stroke="#16140f" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 0 240 C 120 200 220 260 320 220 C 420 180 520 240 620 200 C 720 160 820 230 940 195 C 1060 165 1180 220 1300 190 L 1400 195"/>
    <path d="M 0 270 C 140 240 260 290 380 260 C 500 230 620 290 740 260 C 860 230 980 280 1100 255 C 1220 230 1340 270 1400 260"/>
    <path d="M 0 300 C 200 280 380 320 580 300 C 780 280 980 320 1180 300 L 1400 295"/>
    <path d="M 320 220 C 308 198 316 178 340 174 C 360 172 372 188 366 206"/>
    <path d="M 940 195 C 928 175 936 156 958 152 C 976 150 988 164 982 180"/>
  </g>
</svg>

<button class="tweaks-toggle shown" id="tweaksToggle" aria-label="Open tweaks">影</button>

<aside class="tweaks" id="tweaksPanel" role="dialog" aria-label="Tweaks">
  <div class="tweaks-head">
    <span class="title">tweaks</span>
    <button class="close" id="tweaksClose" aria-label="Close">×</button>
  </div>
  <div class="tweaks-body">

    <div class="tweaks-row">
      <div class="tweaks-label">palette</div>
      <div class="tweaks-swatches" data-control="palette">
        <button class="tweaks-swatch" data-value="inkwell"   title="inkwell · bone &amp; ink" style="background:#faf8f3"><span class="ink-dot" style="background:#16140f"></span><span class="seal-dot" style="background:#bf3a26"></span></button>
        <button class="tweaks-swatch" data-value="washi"     title="washi · cream &amp; persimmon" style="background:#ece1c8"><span class="ink-dot" style="background:#1a1410"></span><span class="seal-dot" style="background:#d76436"></span></button>
        <button class="tweaks-swatch" data-value="parchment" title="parchment · aged paper, deep red" style="background:#f3ead4"><span class="ink-dot" style="background:#2a1f15"></span><span class="seal-dot" style="background:#8a4034"></span></button>
        <button class="tweaks-swatch" data-value="midnight"  title="midnight · ink night, gold seal" style="background:#0c1422"><span class="ink-dot" style="background:#f0e6cf"></span><span class="seal-dot" style="background:#c5a572"></span></button>
      </div>
    </div>

    <div class="tweaks-row">
      <div class="tweaks-label">hanko</div>
      <div class="tweaks-kanji" data-control="hanko">
        <button data-value="影" title="kage · shadow">影</button>
        <button data-value="静" title="shizu · quiet">静</button>
        <button data-value="浮" title="uki · floating">浮</button>
        <button data-value="縁" title="en · connection">縁</button>
        <button data-value="夜" title="yoru · night">夜</button>
        <button data-value="月" title="tsuki · moon">月</button>
      </div>
    </div>

    <div class="tweaks-row">
      <div class="tweaks-label">density</div>
      <div class="tweaks-segments" data-control="density">
        <button data-value="airy">airy</button>
        <button data-value="normal">normal</button>
        <button data-value="tight">tight</button>
      </div>
    </div>

    <div class="tweaks-row">
      <div class="tweaks-label">ornament</div>
      <div class="tweaks-segments" data-control="ornament">
        <button data-value="silent">silent</button>
        <button data-value="stroke">stroke</button>
        <button data-value="painting">painting</button>
      </div>
    </div>

  </div>
</aside>
`;

export default function Home() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.classList.add("inkwell-body");

    const host = hostRef.current;
    if (!host) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );
    host.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    const stamp = host.querySelector<HTMLElement>(".stamp");
    const brush = host.querySelector<HTMLElement>(".brush-vert");
    const wave = host.querySelector<HTMLElement>(".wave-bg");
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    let raf = 0;
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      if (stamp)
        stamp.style.transform = `translate(${cx * -6}px, ${cy * -4}px) rotate(${cx * -1.2}deg)`;
      if (brush) brush.style.transform = `translate(${cx * 10}px, ${cy * 6}px)`;
      if (wave)
        wave.style.transform = `translateX(calc(-50% + ${cx * -20}px)) translateY(${cy * 8}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    type Key = "palette" | "hanko" | "density" | "ornament";
    const state: Record<Key, string> = {
      palette: "inkwell",
      hanko: "影",
      density: "normal",
      ornament: "stroke",
    };
    const body = document.body;
    const panel = host.querySelector<HTMLElement>("#tweaksPanel");
    const toggleBtn = host.querySelector<HTMLElement>("#tweaksToggle");
    const closeBtn = host.querySelector<HTMLElement>("#tweaksClose");
    const hankoText = host.querySelector("#hanko-glyph");

    const apply = () => {
      body.classList.remove(
        "palette-inkwell",
        "palette-washi",
        "palette-parchment",
        "palette-midnight",
      );
      body.classList.add("palette-" + state.palette);
      body.classList.remove("density-airy", "density-normal", "density-tight");
      body.classList.add("density-" + state.density);
      body.classList.remove(
        "ornament-silent",
        "ornament-stroke",
        "ornament-painting",
      );
      body.classList.add("ornament-" + state.ornament);
      if (hankoText) hankoText.textContent = state.hanko;
      if (toggleBtn) toggleBtn.textContent = state.hanko;
      host.querySelectorAll("[data-control]").forEach((group) => {
        const key = (group as HTMLElement).dataset.control as Key;
        group.querySelectorAll("button").forEach((b) => {
          b.classList.toggle(
            "active",
            (b as HTMLElement).dataset.value === state[key],
          );
        });
      });
    };
    const set = (key: Key, value: string) => {
      state[key] = value;
      apply();
    };
    const groupListeners: Array<[HTMLElement, (e: Event) => void]> = [];
    host.querySelectorAll<HTMLElement>("[data-control]").forEach((group) => {
      const key = group.dataset.control as Key;
      const fn = (e: Event) => {
        const btn = (e.target as HTMLElement).closest(
          "button[data-value]",
        ) as HTMLElement | null;
        if (!btn) return;
        set(key, btn.dataset.value as string);
      };
      group.addEventListener("click", fn);
      groupListeners.push([group, fn]);
    });
    const openPanel = () => {
      panel?.classList.add("open");
      toggleBtn?.classList.add("shown", "is-open");
    };
    const closePanel = () => {
      panel?.classList.remove("open");
      toggleBtn?.classList.remove("is-open");
    };
    const onClose = () => closePanel();
    const onToggle = () => {
      if (panel?.classList.contains("open")) closePanel();
      else openPanel();
    };
    closeBtn?.addEventListener("click", onClose);
    toggleBtn?.addEventListener("click", onToggle);
    apply();

    return () => {
      document.body.classList.remove(
        "inkwell-body",
        "palette-inkwell",
        "palette-washi",
        "palette-parchment",
        "palette-midnight",
        "density-airy",
        "density-normal",
        "density-tight",
        "ornament-silent",
        "ornament-stroke",
        "ornament-painting",
      );
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      groupListeners.forEach(([g, fn]) =>
        g.removeEventListener("click", fn),
      );
      closeBtn?.removeEventListener("click", onClose);
      toggleBtn?.removeEventListener("click", onToggle);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: INKWELL_CSS }} />
      <div
        className="inkwell-host"
        ref={hostRef}
        dangerouslySetInnerHTML={{ __html: INKWELL_HTML }}
      />
    </>
  );
}
