// KSIJ Poster - MUHARRAM MOURNING THEME (Black/Grey/White)
const POSTER_TEMPLATE = `
<div class="poster" id="poster">
  <style>
/* ===== BACKGROUND TEXTURE ===== */
.poster{position:relative;width:1080px;background:radial-gradient(ellipse at 50% 0%,#262626 0%,#161616 45%,#0d0d0d 100%);overflow:hidden}
.poster::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='1'%3E%3Cpath d='M60,20 L80,40 L80,80 L40,80 L40,40 Z M50,30 L70,50 L70,70 L50,70 Z'/%3E%3Ccircle cx='60' cy='60' r='25' opacity='0.3'/%3E%3Cpolygon points='60,35 70,55 90,55 75,67 80,87 60,75 40,87 45,67 30,55 50,55'/%3E%3C/g%3E%3C/svg%3E");background-size:120px 120px;opacity:0.6;pointer-events:none;z-index:0}

/* ===== FRAME ===== */
.golden-frame{position:absolute;inset:0;pointer-events:none;z-index:10000}
.golden-frame::before{content:'';position:absolute;inset:0;border:8px solid transparent;border-image:linear-gradient(135deg,#000000,#5a5a5a 20%,#c8c8c8 50%,#5a5a5a 80%,#000000) 1;box-shadow:inset 0 0 22px rgba(0,0,0,0.55),0 0 30px rgba(0,0,0,0.3)}
.golden-frame::after{content:'';position:absolute;inset:14px;border:2px solid #8b1a1a;border-radius:4px;box-shadow:0 0 14px rgba(139,26,26,0.45),inset 0 0 10px rgba(139,26,26,0.18)}
.islamic-corner{position:absolute;width:80px;height:80px;pointer-events:none}
.islamic-corner svg{width:100%;height:100%;fill:#b0b0b0;filter:drop-shadow(0 0 6px rgba(255,255,255,0.25)) drop-shadow(0 2px 4px rgba(0,0,0,0.6))}
.corner-tl{top:4px;left:4px}
.corner-tr{top:4px;right:4px;transform:rotate(90deg)}
.corner-bl{bottom:4px;left:4px;transform:rotate(-90deg)}
.corner-br{bottom:4px;right:4px;transform:rotate(180deg)}
.top-border{height:10px;background:linear-gradient(90deg,#000000,#8b1a1a 18%,#cfcfcf 38%,#ffffff 50%,#cfcfcf 62%,#8b1a1a 82%,#000000)}

/* ===== HEADER ===== */
.header{position:relative;background:linear-gradient(160deg,#1e1e1e 0%,#0d0d0d 55%,#000000 100%);overflow:hidden;z-index:1}
.header::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='70' viewBox='0 0 70 70'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.09)' stroke-width='1'%3E%3Cpolygon points='35,4 42,22 60,22 46,34 51,52 35,41 19,52 24,34 10,22 28,22'/%3E%3Cpolygon points='35,14 40,26 53,26 43,34 47,47 35,39 23,47 27,34 17,26 30,26' stroke-width='0.5' opacity='0.5'/%3E%3Ccircle cx='35' cy='35' r='4' stroke-width='0.8'/%3E%3C/g%3E%3C/svg%3E");background-size:70px 70px;pointer-events:none}
.header::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 35%,rgba(255,255,255,0.10) 0%,transparent 60%),radial-gradient(ellipse at 50% 100%,rgba(139,26,26,0.22) 0%,transparent 55%);pointer-events:none}
.header-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:20px 40px 0;gap:14px}
.brand-row{display:flex;align-items:center;gap:18px}
.ksij-logo{width:104px;height:104px;flex-shrink:0;position:relative;border:3px solid #c0c0c0;border-radius:50%;padding:0;overflow:hidden;background:#fff;box-shadow:0 0 22px rgba(255,255,255,0.25),0 0 12px rgba(139,26,26,0.3),inset 0 2px 8px rgba(255,255,255,0.4)}
.ksij-logo::before{content:'';position:absolute;inset:-8px;background:radial-gradient(circle,rgba(255,255,255,0.25) 0%,transparent 70%);border-radius:50%;animation:pulse 3s ease-in-out infinite}
.ksij-logo img{width:100%;height:100%;object-fit:cover;position:relative;z-index:1;border-radius:50%;background:#fff}
@keyframes pulse{0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
.title-block{text-align:center}
.org-name{font-family:'Playfair Display',serif;font-size:42px;font-weight:700;color:#fff;letter-spacing:1px;line-height:1.2;text-shadow:0 2px 12px rgba(0,0,0,0.6),0 0 18px rgba(255,255,255,0.12);margin-bottom:8px}
.location{font-size:14px;font-weight:700;color:#d8d8d8;letter-spacing:3px;text-transform:uppercase;text-shadow:0 2px 8px rgba(0,0,0,0.6);display:inline-block;padding-bottom:6px;border-bottom:2px solid #8b1a1a}

/* ===== WEEKLY PROGRAMME - SINGLE LINE ===== */
.weekly-wrap{text-align:center;padding-bottom:16px;position:relative}
.weekly-programme-title{font-family:'Playfair Display',serif;font-size:75px;font-weight:900;line-height:1;text-shadow:0 4px 20px rgba(0,0,0,0.55);display:block}
.word-weekly{color:#fff;font-style:italic;text-shadow:0 4px 20px rgba(0,0,0,0.55);margin-right:20px}
.word-programme{color:#fff;font-style:italic;text-shadow:0 4px 20px rgba(0,0,0,0.55)}

/* Lines and Stars */
.golden-lines{position:absolute;width:100%;top:20px;transform:translateY(-50%);display:flex;justify-content:space-between;align-items:center;padding:0 40px;pointer-events:none}
.golden-line{flex:1;height:2px;background:linear-gradient(90deg,transparent,#8b1a1a 40%,#c0c0c0 50%,#8b1a1a 60%,transparent);position:relative}
.golden-star{width:20px;height:20px;fill:#d0d0d0;filter:drop-shadow(0 0 8px rgba(255,255,255,0.4))}
.flourish{position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);width:150px;height:20px;fill:#9a9a9a;opacity:0.8}
.header-arch{position:relative;z-index:2;line-height:0}
.header-arch svg{display:block;width:100%}

/* ===== DATE STRIP - LARGER FONT ===== */
.date-strip-wrap{margin-top:-2px;padding:0 28px;position:relative;z-index:1}
.date-strip{background:linear-gradient(135deg,#000000,#2a2a2a 50%,#000000);border-radius:0 0 10px 10px;padding:20px 40px;text-align:center;box-shadow:0 8px 28px rgba(0,0,0,0.5),inset 0 2px 8px rgba(255,255,255,0.08),inset 0 0 30px rgba(139,26,26,0.12);border-left:6px solid #8b1a1a;border-right:6px solid #8b1a1a;border-bottom:5px solid #8b1a1a;position:relative;overflow:hidden}
.date-strip::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpolygon points='30,5 36,22 53,22 40,32 45,49 30,39 15,49 20,32 7,22 24,22' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1'/%3E%3C/svg%3E");background-size:60px 60px;opacity:0.6}
.date-strip::after{content:'';position:absolute;left:15%;right:15%;bottom:8px;height:1px;background:linear-gradient(90deg,transparent,rgba(200,200,200,0.5),transparent)}
.date-strip p{font-size:24px;font-weight:800;color:#fff;letter-spacing:2.5px;text-transform:uppercase;margin:4px 0;position:relative;z-index:1;text-shadow:0 0 12px rgba(255,255,255,0.15)}
.crescent-icon{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;fill:#d0d0d0;filter:drop-shadow(0 0 6px rgba(255,255,255,0.3))}
.crescent-left{left:20px}
.crescent-right{right:20px;transform:translateY(-50%) scaleX(-1)}

/* ===== BODY ===== */
.body-wrap{padding:18px 28px 18px;position:relative;z-index:1;background-image:linear-gradient(rgba(10,10,10,0.4),rgba(10,10,10,0.5)),url("body-bg.png");background-size:cover;background-position:center 25%;background-repeat:no-repeat}
.content-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.col-panel{background:#0e0e0e;border-radius:10px;overflow:hidden;box-shadow:0 6px 28px rgba(0,0,0,0.5);border:1.5px solid rgba(180,180,180,0.4);position:relative}
.col-panel::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#8b1a1a,#c8c8c8 50%,#8b1a1a);z-index:2}
.day-section{position:relative}
.day-section+.day-section{border-top:2px solid rgba(139,26,26,0.5)}
.day-band{background:linear-gradient(105deg,#050505 55%,#262626);padding:10px 12px;display:flex;align-items:center;justify-content:space-between;gap:6px;position:relative;overflow:hidden;border-left:4px solid #8b1a1a}
.day-band::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Cpolygon points='25,3 30,18 45,18 33,27 38,42 25,33 12,42 17,27 5,18 20,18' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3C/svg%3E");background-size:50px 50px;pointer-events:none}
.day-band::after{content:'';position:absolute;top:0;bottom:0;right:0;width:60%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.06));pointer-events:none}
.day-band .dname{font-family:'Playfair Display',serif;font-size:19px !important;font-weight:700;color:#ffffff !important;position:relative;z-index:1;white-space:nowrap}
.day-band .dhijri{font-size:17px !important;font-weight:700;color:#ffd9d9 !important;letter-spacing:0.8px;text-transform:uppercase;white-space:nowrap;position:relative;z-index:1}
.day-body{padding:10px 14px 12px}

/* ===== PRAYER TIMES ===== */
.prayers{width:100%;border-collapse:collapse;margin-bottom:6px;border:1px solid rgba(180,180,180,0.25);border-radius:6px;overflow:hidden}
.prayers tr{border-bottom:1px solid rgba(180,180,180,0.18);transition:background 0.2s}
.prayers tr:nth-child(even){background:rgba(255,255,255,0.03)}
.prayers tr:last-child{border-bottom:none}
.prayers td{padding:10px 12px;font-size:18px !important;position:relative}
.prayers td.pl{font-weight:700;color:#ffffff !important;text-transform:uppercase;letter-spacing:0.4px;background:rgba(255,255,255,0.06);padding-left:12px;font-size:18px !important}
.prayers td.pl span{font-size:18px !important;color:#ffffff !important}
.prayers td.pl .prayer-icon{display:inline-block;font-size:16px !important;cursor:pointer;margin-right:4px;user-select:all}
.prayers td.pt{font-weight:800;color:#ff8d8d !important;text-align:right;background:rgba(255,255,255,0.06);letter-spacing:0.8px;white-space:nowrap;font-size:18px !important}

/* ===== NOTICE BOXES ===== */
.notice{background:rgba(255,255,255,0.07);border-left:5px solid #8b1a1a;padding:8px 12px;margin-bottom:8px;border-radius:0 6px 6px 0;box-shadow:0 2px 8px rgba(0,0,0,0.25);position:relative}
.notice p{font-size:17px !important;font-weight:700;color:#ffffff !important;letter-spacing:0.3px;line-height:1.5}
.notice-shahadat{background:rgba(255,255,255,0.05);border-left-color:#cccccc}
.notice-shahadat p{color:#ffffff}
.notice-wiladat{background:rgba(139,26,26,0.16);border-left-color:#c0392b}
.notice-wiladat p{color:#ffe0e0}

/* Theme selector buttons */
.theme-selector{position:absolute;top:4px;right:4px;display:flex;gap:4px;opacity:0;transition:opacity 0.2s;z-index:100}
.prog-header-box:hover .theme-selector,.notice:hover .theme-selector{opacity:1}
.theme-btn{width:24px;height:24px;border:2px solid white;border-radius:4px;cursor:pointer;transition:transform 0.2s;font-size:0}
.theme-btn:hover{transform:scale(1.15);box-shadow:0 2px 8px rgba(0,0,0,0.3)}
.theme-btn-green{background:linear-gradient(135deg,#5a5a5a,#7a7a7a)}
.theme-btn-black{background:linear-gradient(135deg,#000000,#333333)}
.theme-btn-red{background:linear-gradient(135deg,#444444,#666666)}
.theme-btn.active{border-width:3px;box-shadow:0 0 8px rgba(255,255,255,0.8)}
.notice{position:relative}
.notice .delete-notice{position:absolute;top:4px;right:4px;width:20px;height:20px;background:#555;color:#fff;border:none;border-radius:50%;cursor:pointer;font-size:14px;font-weight:bold;line-height:18px;text-align:center;opacity:0;transition:opacity 0.2s;z-index:10}
.notice:hover .delete-notice{opacity:1}
.notice .delete-notice:hover{background:#000;transform:scale(1.1)}

/* ===== PROGRAMME ===== */
.prog-header-box{background:rgba(255,255,255,0.07);border-left:5px solid #8b1a1a;padding:10px 12px;margin-bottom:8px;border-radius:0 6px 6px 0;box-shadow:0 2px 8px rgba(0,0,0,0.25)}
.prog-header-box-shahadat{background:rgba(255,255,255,0.05);border-left-color:#cccccc}
.prog-header-box-shahadat .prog-event-title{color:#ffffff}
.prog-header-box-wiladat{background:rgba(139,26,26,0.16);border-left-color:#c0392b}
.prog-header-box-wiladat .prog-event-title{color:#ffd9d9}
.prog-event-title{font-size:18px !important;font-weight:800;color:#ffffff !important;letter-spacing:0.3px;text-transform:uppercase;line-height:1.4;margin-bottom:0}
.prog-badge{background:#8b1a1a;color:#fff;font-size:11px;font-weight:800;letter-spacing:1.2px;padding:4px 12px;border-radius:4px;text-transform:uppercase;display:inline-block;margin-top:8px}
.prog-badge-regular{background:#8b1a1a}
.prog-badge-shahadat{background:#444444}
.prog-badge-wiladat{background:#c0392b}
.schedule{margin-bottom:8px}
.schedule-table{width:100%;border-collapse:collapse}
.schedule-table tr td{padding:7px 0 7px 20px;font-size:18px !important;font-weight:600;color:#ffffff !important;letter-spacing:0.3px;line-height:1.5;position:relative}
.schedule-table tr td:first-child::before{content:'⭐';position:absolute;left:0;top:50%;transform:translateY(-50%);font-size:13px;color:#d0a0a0}
.schedule-table tr td:first-child{text-align:left}
.schedule-table tr td:last-child{text-align:right;font-weight:800;color:#ff8d8d !important;white-space:nowrap;padding-right:0}

/* Programme theme variants for schedule times */
.programme-section.prog-shahadat .schedule-table tr td:last-child{color:#dddddd}
.programme-section.prog-wiladat .schedule-table tr td:last-child{color:#ffb0b0}
.programme-section{display:none;margin-top:6px}
.programme-section.active{display:block}

/* ===== BUTTONS ===== */
.add-programme-btn,.add-notice-btn,.add-item-btn,.add-prayer-btn{background:#ececec;border:2px dashed #9a9a9a;color:#333;padding:5px 8px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;text-align:center;margin:4px 0;transition:all 0.2s;display:block}
.add-programme-btn:hover,.add-notice-btn:hover,.add-item-btn:hover,.add-prayer-btn:hover{background:#dcdcdc;border-color:#2a2a2a}

/* ===== HADITH ===== */
.hadith-strip-wrap{padding:0 28px 12px;position:relative;z-index:1}
.hadith-strip{background:linear-gradient(135deg,#1e1e1e 0%,#000000 100%);border-radius:12px;padding:16px 24px;box-shadow:0 6px 24px rgba(0,0,0,0.4),inset 0 0 25px rgba(139,26,26,0.12);border:3px solid #8b1a1a;position:relative;overflow:hidden}
.hadith-strip::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpolygon points='30,5 36,22 53,22 40,32 45,49 30,39 15,49 20,32 7,22 24,22' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1'/%3E%3C/svg%3E");background-size:60px 60px;pointer-events:none}
.hadith-title{font-family:'Playfair Display',serif;font-size:24px !important;font-weight:700;font-style:italic;color:#dcdcdc !important;text-align:center;margin-bottom:12px;letter-spacing:1px;position:relative;z-index:1;text-shadow:0 0 10px rgba(255,255,255,0.15)}
.hadith-text{font-size:19px !important;font-weight:500;color:#ffffff !important;text-align:center;line-height:1.55;letter-spacing:0.3px;position:relative;z-index:1}
.hadith-title *,.hadith-text *{font-size:inherit !important;color:inherit !important;font-family:inherit !important;background:transparent !important}

/* ===== FOOTER ===== */
.footer-strip{background:#0d0d0d;padding:12px 28px;border-top:3px solid #8b1a1a;position:relative;z-index:1}
.footer-content{display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,#000000,#2a2a2a);padding:14px 20px;border-radius:8px;border:1px solid rgba(139,26,26,0.4)}
.footer-left{display:flex;flex-direction:column;gap:2px}
.ftitle{font-size:11px;font-weight:700;color:rgba(255,255,255,0.7);letter-spacing:1.5px;text-transform:uppercase}
.fname{font-size:18px;font-weight:800;color:#fff;letter-spacing:1px;text-transform:uppercase}
.footer-right{display:flex;align-items:center;gap:12px}
.social-icon{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff;transition:transform 0.2s}
.social-icon svg{width:22px;height:22px}
.qr-code{width:38px;height:38px;background:#fff;display:flex;align-items:center;justify-content:center;border-radius:4px;overflow:hidden}
.qr-code img{width:100%;height:100%;object-fit:contain}
.bottom-border{height:10px;background:linear-gradient(90deg,#000000,#8b1a1a 18%,#cfcfcf 38%,#ffffff 50%,#cfcfcf 62%,#8b1a1a 82%,#000000)}

/* ===== SALAAM MEDALLION (header top-right) ===== */
.medallion-svg{position:absolute;top:10px;right:24px;width:178px;height:auto;z-index:3;filter:drop-shadow(0 5px 16px rgba(0,0,0,0.6))}

/* ===== LOCK FONT SIZES (prevent drift when typing/pasting) ===== */
.prayers td *,.notice p *,.schedule-table td *,.day-band .dname *,.day-band .dhijri *,.prog-event-title *{font-size:inherit !important;color:inherit !important;font-family:inherit !important;background:transparent !important}
  </style>
  
  <div class="golden-frame">
    <div class="islamic-corner corner-tl">
      <svg viewBox="0 0 100 100"><path d="M10,10 L10,50 Q10,10 50,10 L90,10 Q50,10 50,50 Q50,10 10,10 Z M25,25 L25,45 Q25,25 45,25 L75,25 Q45,25 45,45 Q45,25 25,25 Z"/></svg>
    </div>
    <div class="islamic-corner corner-tr">
      <svg viewBox="0 0 100 100"><path d="M10,10 L10,50 Q10,10 50,10 L90,10 Q50,10 50,50 Q50,10 10,10 Z M25,25 L25,45 Q25,25 45,25 L75,25 Q45,25 45,45 Q45,25 25,25 Z"/></svg>
    </div>
    <div class="islamic-corner corner-bl">
      <svg viewBox="0 0 100 100"><path d="M10,10 L10,50 Q10,10 50,10 L90,10 Q50,10 50,50 Q50,10 10,10 Z M25,25 L25,45 Q25,25 45,25 L75,25 Q45,25 45,45 Q45,25 25,25 Z"/></svg>
    </div>
    <div class="islamic-corner corner-br">
      <svg viewBox="0 0 100 100"><path d="M10,10 L10,50 Q10,10 50,10 L90,10 Q50,10 50,50 Q50,10 10,10 Z M25,25 L25,45 Q25,25 45,25 L75,25 Q45,25 45,45 Q45,25 25,25 Z"/></svg>
    </div>
  </div>
  
  <div class="top-border"></div>
  
  <div class="header">
    <!-- SALAAM MEDALLION (top-right) -->
    <svg class="medallion-svg" viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="medFrame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#c25a5a"/><stop offset="50%" stop-color="#a23a3a"/><stop offset="100%" stop-color="#7a2020"/>
        </linearGradient>
      </defs>
      <path d="M40 120 Q40 50 160 42 Q280 50 280 120 L280 350 Q280 366 264 366 L56 366 Q40 366 40 350 Z" fill="rgba(20,8,8,0.45)" stroke="url(#medFrame)" stroke-width="11" stroke-linejoin="round"/>
      <path d="M58 124 Q58 70 160 62 Q262 70 262 124 L262 340 Q262 350 252 350 L68 350 Q58 350 58 340 Z" fill="none" stroke="url(#medFrame)" stroke-width="4" stroke-linejoin="round"/>
      <g fill="url(#medFrame)">
        <ellipse cx="160" cy="40" rx="12" ry="5"/>
        <path d="M146 38 q14 -10 28 0 q1 -12 -3 -20 q-11 -5 -22 0 q-4 8 -3 20 Z"/>
        <rect x="145" y="6" width="4.5" height="18" rx="2.2"/>
        <rect x="151.5" y="2" width="4.5" height="22" rx="2.2"/>
        <rect x="158" y="0" width="4.5" height="24" rx="2.2"/>
        <rect x="164.5" y="2" width="4.5" height="22" rx="2.2"/>
        <rect x="171" y="6" width="4.5" height="18" rx="2.2"/>
      </g>
      <g fill="url(#medFrame)">
        <path d="M40 120 q-22 -6 -30 -22 q16 2 30 12 Z"/>
        <path d="M280 120 q22 -6 30 -22 q-16 2 -30 12 Z"/>
        <path d="M40 250 q-22 4 -28 20 q16 -2 28 -10 Z"/>
        <path d="M280 250 q22 4 28 20 q-16 -2 -28 -10 Z"/>
      </g>
      <g fill="#c25555">
        <circle cx="120" cy="52" r="2.5"/><circle cx="200" cy="52" r="2.5"/>
        <circle cx="100" cy="60" r="2"/><circle cx="220" cy="60" r="2"/>
      </g>
      <rect x="70" y="132" width="180" height="206" rx="6" fill="none" stroke="#b04545" stroke-width="2" stroke-dasharray="2 6" stroke-linecap="round"/>
      <g fill="#e08585" font-family="'Amiri','Noto Naskh Arabic',serif" font-weight="700" text-anchor="middle" direction="rtl">
        <text x="160" y="176" font-size="23">السَّلامُ عَلَى الحُسَيْن</text>
        <text x="160" y="220" font-size="21">وَعَلى عَلِيِّ بْنِ الحُسَيْن</text>
        <text x="160" y="264" font-size="23">وَعَلى أوْلادِ الحُسَيْن</text>
        <text x="160" y="308" font-size="22">وَعَلى أصْحابِ الحُسَيْن</text>
      </g>
      <g stroke="#b04545" stroke-width="1.4" opacity="0.6">
        <line x1="84" y1="190" x2="236" y2="190"/>
        <line x1="84" y1="234" x2="236" y2="234"/>
        <line x1="84" y1="278" x2="236" y2="278"/>
      </g>
    </svg>

    <div class="header-content">
      <div class="brand-row">
        <div class="ksij-logo">
          <img src="ksij-logo-bw.png" alt="KSIJ Kampala">
        </div>
        <div class="title-block">
          <h1 class="org-name" contenteditable="true">Khoja Shia Ithnasheri Jamat</h1>
          <div class="location" contenteditable="true">KAMPALA · UGANDA</div>
        </div>
      </div>
      <div class="weekly-wrap">
        <div class="golden-lines">
          <div class="golden-line"></div>
          <svg class="golden-star" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/></svg>
          <div class="golden-line"></div>
        </div>
        <div class="weekly-programme-title">
          <span class="word-weekly" contenteditable="true">Weekly</span>
          <span class="word-programme" contenteditable="true">Programme</span>
        </div>
        <svg class="flourish" viewBox="0 0 150 20"><path d="M0,10 Q25,5 50,10 T100,10 Q125,5 150,10 M50,10 Q60,15 75,10 T100,10"/></svg>
        <div class="golden-lines" style="bottom:0;top:auto">
          <div class="golden-line"></div>
          <svg class="golden-star" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/></svg>
          <div class="golden-line"></div>
        </div>
      </div>
    </div>
    <div class="header-arch">
      <svg viewBox="0 0 1080 60" preserveAspectRatio="none">
        <path d="M0,30 Q270,0 540,30 T1080,30 L1080,60 L0,60 Z" fill="#141414"/>
      </svg>
    </div>
  </div>
  
  <div class="date-strip-wrap">
    <div class="date-strip">
      <svg class="crescent-icon crescent-left" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.85 0 3.55.63 4.9 1.69A6.995 6.995 0 0 0 14 12c0 3.31 2.29 6.09 5.36 6.85A7.962 7.962 0 0 1 12 20z"/></svg>
      <p contenteditable="true">4TH MAY. 2026 – 10TH MAY. 2026</p>
      <p contenteditable="true">16TH DHUL QADAH – 22ND DHUL QADAH 1447</p>
      <svg class="crescent-icon crescent-right" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.85 0 3.55.63 4.9 1.69A6.995 6.995 0 0 0 14 12c0 3.31 2.29 6.09 5.36 6.85A7.962 7.962 0 0 1 12 20z"/></svg>
    </div>
  </div>
  
  <div class="body-wrap">
    <div class="content-grid">
      
      <div class="col-panel">
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Monday 4th May. 2026</div>
            <div class="dhijri" contenteditable="true">16TH DHUL QADAH 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">FAJR ADHAN</span></td><td class="pt" contenteditable="true">05:40 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">ZOHRAIN ADHAN</span></td><td class="pt" contenteditable="true">12:47 P.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">MAGHREBAIN PRAYERS</span></td><td class="pt" contenteditable="true">07:04 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('mon')">+ Add Prayer Row</button>
            <button class="add-notice-btn" onclick="addNoticeBox('mon')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('mon')">+ Add Programme</button>
            <div class="programme-section" id="prog-mon">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('mon')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Details here</p></div>
            </div>
          </div>
        </div>
        
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Tuesday 5th May. 2026</div>
            <div class="dhijri" contenteditable="true">17TH DHUL QADAH 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">FAJR ADHAN</span></td><td class="pt" contenteditable="true">05:40 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">ZOHRAIN ADHAN</span></td><td class="pt" contenteditable="true">12:47 P.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">MAGHREBAIN PRAYERS</span></td><td class="pt" contenteditable="true">07:04 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('tue')">+ Add Prayer Row</button>
            <div class="notice"><p contenteditable="true">FOLLOWED BY DUAE TAWASSUL</p></div>
            <button class="add-notice-btn" onclick="addNoticeBox('tue')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('tue')">+ Add Programme</button>
            <div class="programme-section" id="prog-tue">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('tue')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Details here</p></div>
            </div>
          </div>
        </div>
        
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Wednesday 6th May. 2026</div>
            <div class="dhijri" contenteditable="true">18TH DHUL QADAH 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">FAJR ADHAN</span></td><td class="pt" contenteditable="true">05:40 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">ZOHRAIN  ADHAN</span></td><td class="pt" contenteditable="true">12:47 P.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">MAGHREBAIN PRAYERS</span></td><td class="pt" contenteditable="true">07:04 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('wed')">+ Add Prayer Row</button>
            <button class="add-notice-btn" onclick="addNoticeBox('wed')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('wed')">+ Add Programme</button>
            <div class="programme-section" id="prog-wed">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('wed')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Details here</p></div>
            </div>
          </div>
        </div>
        
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Thursday 7th May. 2026</div>
            <div class="dhijri" contenteditable="true">19TH DHUL QADAH 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">FAJR ADHAN</span></td><td class="pt" contenteditable="true">05:39 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">ZOHRAIN ADHAN</span></td><td class="pt" contenteditable="true">12:47 P.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">MAGHREBAIN PRAYERS</span></td><td class="pt" contenteditable="true">07:04 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('thu')">+ Add Prayer Row</button>
            <button class="add-notice-btn" onclick="addNoticeBox('thu')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('thu')">+ Add Programme</button>
            <div class="programme-section active" id="prog-thu">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">Programme</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Surae-Yaseen, Duae-Kumyal, Majlis followed by Ziyarate-Waritha</td><td contenteditable="true"></td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('thu')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Tabarruk will be served<br>Both Ladies and Gents are requested to attend.</p></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-panel">
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Friday 8th May. 2026</div>
            <div class="dhijri" contenteditable="true">20TH DHUL QADAH 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">FAJR ADHAN</span></td><td class="pt" contenteditable="true">05:39 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">JUMA ADHAN</span></td><td class="pt" contenteditable="true">12:47 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('fri')">+ Add Prayer Row</button>
            <div class="notice"><p contenteditable="true">FOLLOWED BY KHUTBAH & JUMA PRAYERS</p></div>
            <table class="prayers">
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">MAGHREBAIN PRAYERS</span></td><td class="pt" contenteditable="true">07:04 P.M.</td></tr>
            </table>
            <button class="add-notice-btn" onclick="addNoticeBox('fri')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('fri')">+ Add Programme</button>
            <div class="programme-section" id="prog-fri">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('fri')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Details here</p></div>
            </div>
          </div>
        </div>
        
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Saturday 9th May. 2026</div>
            <div class="dhijri" contenteditable="true">21ST DHUL QADAH 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">FAJR ADHAN</span></td><td class="pt" contenteditable="true">05:39 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">ZOHRAIN ADHAN</span></td><td class="pt" contenteditable="true">12:47 P.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">MAGHREBAIN PRAYERS</span></td><td class="pt" contenteditable="true">07:04 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('sat')">+ Add Prayer Row</button>
            <button class="add-notice-btn" onclick="addNoticeBox('sat')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('sat')">+ Add Programme</button>
            <div class="programme-section" id="prog-sat">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('sat')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Details here</p></div>
            </div>
          </div>
        </div>
        
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Sunday 10th  May. 2026</div>
            <div class="dhijri" contenteditable="true">22ND DHUL QADAH 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">FAJR ADHAN</span></td><td class="pt" contenteditable="true">05:39 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">ZOHRAIN ADHAN<br>AT KABRASTAN</span></td><td class="pt" contenteditable="true">12:47 P.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">MAGHREBAIN PRAYERS</span></td><td class="pt" contenteditable="true">07:04 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('sun')">+ Add Prayer Row</button>
            <button class="add-notice-btn" onclick="addNoticeBox('sun')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('sun')">+ Add Programme</button>
            <div class="programme-section" id="prog-sun">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('sun')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Details here</p></div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  
  <div class="hadith-strip-wrap">
    <div class="hadith-strip">
      <div class="hadith-title" contenteditable="true">Hazrat Muhammad AL-Mustafa (S) Said</div>
      <div class="hadith-text" contenteditable="true">"Whoever relieves a believer of a distress, Allah will relieve him of a distress on the Day of Resurrection; and whoever makes things easy for one in hardship, Allah will make things easy for him in this world and the Hereafter."<br>Al-Kafi, Volume 2, Book of Faith and Disbelief</div>
    </div>
  </div>
  
  <div class="footer-strip">
    <div class="footer-content">
      <div class="footer-left">
        <div class="ftitle" contenteditable="true">FOLLOW US</div>
        <div class="fname" contenteditable="true">KSIJ KAMPALA</div>
      </div>
      <div class="footer-right">
        <div class="social-icon">
          <svg viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </div>
        <div class="social-icon">
          <svg viewBox="0 0 24 24" fill="url(#instagram-gradient)"><defs><linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#FDC366"/><stop offset="50%" style="stop-color:#E1306C"/><stop offset="100%" style="stop-color:#C13584"/></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </div>
        <div class="social-icon">
          <svg viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </div>
        <div class="qr-code">
          <img src="qr-code.png" alt="QR Code">
        </div>
      </div>
    </div>
  </div>
  
  <div class="bottom-border"></div>
</div>
`;
