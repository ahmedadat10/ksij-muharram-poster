// KSIJ Poster Editor App - FIXED PNG DOWNLOAD WITH BORDER
let currentContextTarget = null;
let draggedElement = null;

window.addEventListener('DOMContentLoaded', () => {
  loadTemplate();
  setupContextMenu();
  setupDragAndDrop();
  setTimeout(() => {
    addDeleteButtonsToNotices();
  }, 200);
});

function loadTemplate() {
  document.getElementById('editorWrapper').innerHTML = POSTER_TEMPLATE;
  console.log('✅ Template loaded');
  setTimeout(() => {
    setupDragAndDrop();
    setupContextMenu();
    addDeleteButtonsToNotices();
  }, 100);
}

function resetAll() {
  if (confirm('Reset poster to default template? All changes will be lost.')) {
    loadTemplate();
  }
}

async function downloadPNG() {
  const poster = document.getElementById('poster');
  if (!poster) {
    alert('No poster found! Please load a template first.');
    return;
  }

  const editables = poster.querySelectorAll('[contenteditable]');
  const buttons = poster.querySelectorAll('.add-programme-btn, .add-notice-btn, .add-item-btn, .add-prayer-btn, .delete-notice');
  const daySections = poster.querySelectorAll('.day-section');

  // Hide interactive elements during capture
  editables.forEach(el => el.removeAttribute('contenteditable'));
  buttons.forEach(btn => btn.style.display = 'none');
  daySections.forEach(section => { section.style.cursor = ''; section.removeAttribute('draggable'); });

  // ---- TUNABLE: how dark the shrine looks in the gaps (0 = full gold, 1 = black)
  const SHRINE_DARKEN = 0.4;

  // Read the shrine jpeg out of the .body-wrap background.
  let shrineUri = null;
  try {
    const bw = poster.querySelector('.body-wrap');
    if (bw) {
      const bg = getComputedStyle(bw).backgroundImage || '';
      const m = bg.match(/url\(["']?(data:image\/[^"')]+)["']?\)/);
      if (m) shrineUri = m[1];
    }
  } catch (e) {}

  // Measure the .body-wrap box as ratios of the poster (scale-independent),
  // so we can paint the shrine into exactly that region after capture.
  let rect = null;
  try {
    const bw = poster.querySelector('.body-wrap');
    const p = poster.getBoundingClientRect();
    const r = bw.getBoundingClientRect();
    rect = {
      rx: (r.left - p.left) / p.width,
      ry: (r.top - p.top) / p.height,
      rw: r.width / p.width,
      rh: r.height / p.height
    };
  } catch (e) {}

  function loadImage(src) {
    return new Promise(function (resolve) {
      if (!src) { resolve(null); return; }
      const i = new Image();
      i.onload = function () { resolve(i); };
      i.onerror = function () { resolve(null); };
      i.src = src;
    });
  }

  // Solid-colour replacements for every gradient in the template. html2canvas
  // 1.4.1 throws "createPattern ... width or height of 0" on CSS gradients, so
  // each gradient element is overridden with a faithful solid colour. The
  // panels are forced opaque so they cleanly cover the shrine behind them.
  const GRADIENT_FIX_CSS = `
    #poster .header { background:#0d0d0d !important; }
    #poster .header::after { background:none !important; }
    #poster .ksij-logo::before { background:none !important; }
    #poster .golden-line { background:#8b1a1a !important; }
    #poster .date-strip { background:#0a0a0a !important; }
    #poster .date-strip::after { background:rgba(200,200,200,0.4) !important; }
    #poster .col-panel { background:#0e0e0e !important; }
    #poster .col-panel::before { background:#8b1a1a !important; }
    #poster .day-band { background:#0d0d0d !important; }
    #poster .day-band::before { background:none !important; }
    #poster .day-band::after { background:none !important; }
    #poster .hadith-strip { background:#111111 !important; }
    #poster .footer-content { background:#0a0a0a !important; }
    #poster .top-border, #poster .bottom-border { background:#8b1a1a !important; }
    #poster::before { background-image:none !important; }
    #poster .header::before, #poster .date-strip::before,
    #poster .day-band::before, #poster .hadith-strip::before { background-image:none !important; }
  `;

  // For the CONTENT pass we make the poster + body-wrap transparent, so the gaps
  // between/around the opaque panels become see-through. The shrine, painted on a
  // layer BEHIND this pass, then shows through exactly those gaps. html2canvas
  // only ever has to draw solid colours + text here, which it does perfectly.
  function contentOptions(transparentBody) {
    const TRANSPARENT_CSS = transparentBody
      ? `#poster .poster, #poster.poster { background:transparent !important; }
         #poster .body-wrap { background:transparent !important; }`
      : `#poster .poster, #poster.poster { background:#161616 !important; }
         #poster .body-wrap { background:#0d0d0d !important; }`;
    return {
      scale: 2,
      backgroundColor: transparentBody ? null : '#0d0d0d',
      width: 1080,
      windowWidth: 1080,
      logging: false,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
      imageTimeout: 0,
      removeContainer: true,
      scrollX: 0, scrollY: 0, x: 0, y: 0,
      onclone: function (clonedDoc) {
        const cp = clonedDoc.getElementById('poster');
        if (!cp) return;
        cp.style.overflow = 'visible';
        cp.style.position = 'relative';
        const frame = cp.querySelector('.golden-frame');
        if (frame) { frame.style.position = 'absolute'; frame.style.pointerEvents = 'none'; frame.style.zIndex = '10000'; }

        // Strip every background-image (SVG textures + the gradient-overlaid shrine).
        cp.querySelectorAll('style').forEach(function (st) {
          st.textContent = st.textContent.replace(/background-image\s*:[^;}]*;?/gi, '');
        });
        // Flatten gradients to solids + apply the transparency rules.
        const fix = clonedDoc.createElement('style');
        fix.textContent = GRADIENT_FIX_CSS + '\n' + TRANSPARENT_CSS;
        cp.appendChild(fix);
        // Clear any inline gradient/url backgrounds left on elements.
        cp.querySelectorAll('*').forEach(function (el) {
          if (!el.style) return;
          if (el.style.backgroundImage && el.style.backgroundImage !== 'none') el.style.backgroundImage = 'none';
          const bg = el.style.background || '';
          if (/gradient|url\(/i.test(bg)) el.style.background = '';
        });
      }
    };
  }

  function saveCanvas(canvas) {
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    link.download = 'KSIJ_Weekly_Programme_' + date + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    console.log('PNG downloaded successfully');
  }

  try {
    console.log('Starting PNG capture (composite shrine)...');

    // 1) Content pass: panels/text/header on transparent gaps.
    const contentCanvas = await html2canvas(poster, contentOptions(true));
    const W = contentCanvas.width, H = contentCanvas.height;

    // 2) Build the final canvas: dark base -> shrine in body-wrap rect -> content.
    const out = document.createElement('canvas');
    out.width = W; out.height = H;
    const ctx = out.getContext('2d');
    ctx.fillStyle = '#0d0d0d';
    ctx.fillRect(0, 0, W, H);

    const shrineImg = await loadImage(shrineUri);
    if (shrineImg && rect) {
      const x = rect.rx * W, y = rect.ry * H, w = rect.rw * W, h = rect.rh * H;
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, w, h);      // clip so the shrine only fills the body region
      ctx.clip();
      const iw = shrineImg.naturalWidth || 700, ih = shrineImg.naturalHeight || 466;
      const sc = Math.max(w / iw, h / ih);   // background-size: cover
      const dw = iw * sc, dh = ih * sc;
      const dx = x + (w - dw) / 2;            // horizontally centred
      const dy = y + (h - dh) * 0.25;         // background-position: center 25%
      ctx.drawImage(shrineImg, dx, dy, dw, dh);
      ctx.fillStyle = 'rgba(10,10,10,' + SHRINE_DARKEN + ')';   // darken the gold
      ctx.fillRect(x, y, w, h);
      ctx.restore();
    }

    ctx.drawImage(contentCanvas, 0, 0);   // panels/text on top; shrine shows in gaps
    console.log('Composite created:', W, 'x', H);
    saveCanvas(out);
  } catch (error) {
    console.warn('Composite export failed, falling back to solid dark body:', error);
    try {
      const fb = await html2canvas(poster, contentOptions(false));
      saveCanvas(fb);
    } catch (e2) {
      console.error('Download error:', e2);
      alert('Error downloading PNG. Please try again.');
    }
  } finally {
    editables.forEach(el => el.setAttribute('contenteditable', 'true'));
    buttons.forEach(btn => btn.style.display = '');
    daySections.forEach(section => { section.style.cursor = 'move'; section.setAttribute('draggable', 'true'); });
  }
}


function setupDragAndDrop() {
  const allDaySections = document.querySelectorAll('.day-section');
  
  allDaySections.forEach(section => {
    section.setAttribute('draggable', 'true');
    section.style.cursor = 'move';
    
    section.removeEventListener('dragstart', handleDragStart);
    section.removeEventListener('dragover', handleDragOver);
    section.removeEventListener('drop', handleDrop);
    section.removeEventListener('dragend', handleDragEnd);
    section.removeEventListener('dragenter', handleDragEnter);
    section.removeEventListener('dragleave', handleDragLeave);
    
    section.addEventListener('dragstart', handleDragStart);
    section.addEventListener('dragover', handleDragOver);
    section.addEventListener('drop', handleDrop);
    section.addEventListener('dragend', handleDragEnd);
    section.addEventListener('dragenter', handleDragEnter);
    section.addEventListener('dragleave', handleDragLeave);
  });
  
  console.log(`✅ Drag & Drop enabled for ${allDaySections.length} day sections`);
}

function handleDragStart(e) {
  draggedElement = this;
  this.style.opacity = '0.5';
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  if (this !== draggedElement) {
    this.style.borderTop = '4px solid #667eea';
  }
}

function handleDragLeave(e) {
  this.style.borderTop = '';
}

function handleDrop(e) {
  e.stopPropagation();
  e.preventDefault();
  
  if (draggedElement !== this && draggedElement && this) {
    const draggedParent = draggedElement.parentNode;
    const targetParent = this.parentNode;
    
    if (draggedParent === targetParent) {
      const allSections = Array.from(draggedParent.children);
      const draggedIndex = allSections.indexOf(draggedElement);
      const targetIndex = allSections.indexOf(this);
      
      if (draggedIndex < targetIndex) {
        targetParent.insertBefore(draggedElement, this.nextSibling);
      } else {
        targetParent.insertBefore(draggedElement, this);
      }
    } else {
      const draggedNext = draggedElement.nextSibling;
      const targetNext = this.nextSibling;
      
      if (targetNext) {
        targetParent.insertBefore(draggedElement, targetNext);
      } else {
        targetParent.appendChild(draggedElement);
      }
      
      if (draggedNext) {
        draggedParent.insertBefore(this, draggedNext);
      } else {
        draggedParent.appendChild(this);
      }
    }
    
    console.log('✅ Day sections reordered');
  }
  
  this.style.borderTop = '';
  return false;
}

function handleDragEnd(e) {
  this.style.opacity = '1';
  document.querySelectorAll('.day-section').forEach(section => {
    section.style.borderTop = '';
  });
}

function setupContextMenu() {
  const contextMenu = document.getElementById('contextMenu');
  
  document.removeEventListener('contextmenu', handleContextMenu);
  document.removeEventListener('click', hideContextMenu);
  
  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('click', hideContextMenu);
  
  console.log('✅ Context menu setup complete');
}

function handleContextMenu(e) {
  const target = e.target.closest('.notice, .prog-badge, .prog-header-box');
  const contextMenu = document.getElementById('contextMenu');
  
  if (target) {
    e.preventDefault();
    currentContextTarget = target;
    contextMenu.style.display = 'block';
    contextMenu.style.left = e.pageX + 'px';
    contextMenu.style.top = e.pageY + 'px';
    console.log('✅ Context menu opened for:', target.className);
  }
}

function hideContextMenu() {
  const contextMenu = document.getElementById('contextMenu');
  contextMenu.style.display = 'none';
}

function changeTheme(theme) {
  console.log('🎨 changeTheme called with:', theme);
  
  if (!currentContextTarget) {
    console.log('❌ No target for theme change');
    return;
  }
  
  console.log('📍 Target element:', currentContextTarget.className);
  
  const isNotice = currentContextTarget.classList.contains('notice');
  const isBadge = currentContextTarget.classList.contains('prog-badge');
  const isHeaderBox = currentContextTarget.classList.contains('prog-header-box');
  
  // For BADGE or HEADER BOX - change the specific programme block
  if (isBadge || isHeaderBox) {
    console.log('🔍 Finding related programme elements...');
    
    let headerBox, badge;
    
    if (isHeaderBox) {
      headerBox = currentContextTarget;
      let nextElement = headerBox.nextElementSibling;
      while (nextElement && !nextElement.classList.contains('prog-badge')) {
        if (nextElement.querySelector && nextElement.querySelector('.prog-badge')) {
          badge = nextElement.querySelector('.prog-badge');
          break;
        }
        nextElement = nextElement.nextElementSibling;
      }
      if (!badge && nextElement && nextElement.classList.contains('prog-badge')) {
        badge = nextElement;
      }
    } else if (isBadge) {
      badge = currentContextTarget;
      let prevElement = badge.previousElementSibling;
      while (prevElement && !prevElement.classList.contains('prog-header-box')) {
        if (prevElement.querySelector && prevElement.querySelector('.prog-header-box')) {
          headerBox = prevElement.querySelector('.prog-header-box');
          break;
        }
        prevElement = prevElement.previousElementSibling;
      }
      if (!headerBox && prevElement && prevElement.classList.contains('prog-header-box')) {
        headerBox = prevElement;
      }
      
      if (!headerBox) {
        const parent = badge.parentElement;
        if (parent) {
          headerBox = parent.querySelector('.prog-header-box');
        }
      }
    }
    
    console.log('Found header box:', headerBox);
    console.log('Found badge:', badge);
    
    if (headerBox) {
      headerBox.classList.remove('prog-header-box-shahadat', 'prog-header-box-wiladat');
      if (theme === 'shahadat') {
        headerBox.classList.add('prog-header-box-shahadat');
      } else if (theme === 'wiladat') {
        headerBox.classList.add('prog-header-box-wiladat');
      }
      console.log('✅ Header box updated to', theme);
    }
    
    if (badge) {
      badge.classList.remove('prog-badge-shahadat', 'prog-badge-wiladat');
      if (theme === 'shahadat') {
        badge.classList.add('prog-badge-shahadat');
      } else if (theme === 'wiladat') {
        badge.classList.add('prog-badge-wiladat');
      }
      console.log('✅ Badge updated to', theme);
    }
    
    if (!headerBox && !badge) {
      console.log('❌ Could not find related programme elements');
    }
  }
  
  if (isNotice) {
    currentContextTarget.classList.remove('notice-shahadat', 'notice-wiladat');
    if (theme === 'shahadat') {
      currentContextTarget.classList.add('notice-shahadat');
    } else if (theme === 'wiladat') {
      currentContextTarget.classList.add('notice-wiladat');
    }
    console.log(`✅ Notice theme changed to ${theme}`);
  }
  
  hideContextMenu();
}

function toggleProgramme(day) {
  const progSection = document.getElementById('prog-' + day);
  const btn = event.target;
  
  if (progSection.classList.contains('active')) {
    progSection.classList.remove('active');
    btn.textContent = '+ Add Programme';
  } else {
    progSection.classList.add('active');
    btn.textContent = '- Remove Programme';
  }
}

function addNoticeBox(day) {
  const dayBody = event.target.closest('.day-body');
  const newNotice = document.createElement('div');
  newNotice.className = 'notice';
  newNotice.innerHTML = '<p contenteditable="true">New notice or detail here</p>';
  dayBody.insertBefore(newNotice, event.target);
  
  setTimeout(() => {
    addDeleteButtonsToNotices();
  }, 50);
}

function addScheduleItem(day) {
  const scheduleTable = event.target.previousElementSibling.querySelector('.schedule-table');
  const newRow = document.createElement('tr');
  newRow.innerHTML = '<td contenteditable="true">New Item</td><td contenteditable="true">08:00 P.M.</td>';
  scheduleTable.appendChild(newRow);
}

function addPrayerRow(day) {
  const prayerTable = event.target.previousElementSibling;
  const newRow = document.createElement('tr');
  newRow.innerHTML = '<td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Prayer Name</span></td><td class="pt" contenteditable="true">00:00 P.M.</td>';
  prayerTable.appendChild(newRow);
  console.log('✅ Prayer row added');
}

function addDeleteButtonsToNotices() {
  const allNotices = document.querySelectorAll('.notice');
  
  allNotices.forEach(notice => {
    if (!notice.querySelector('.delete-notice')) {
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-notice';
      deleteBtn.innerHTML = '×';
      deleteBtn.title = 'Delete this notice';
      deleteBtn.onclick = function(e) {
        e.stopPropagation();
        if (confirm('Delete this notice?')) {
          notice.remove();
          console.log('✅ Notice deleted');
        }
      };
      notice.appendChild(deleteBtn);
    }
  });
  
  console.log(`✅ Delete buttons added to ${allNotices.length} notices`);
}


// ============================================
// AUTO-FILL WEEK DATES (Gregorian + day names)
// ============================================
function autoFillWeek() {
  const input = document.getElementById('weekStartDate');
  if (!input || !input.value) {
    alert('Please pick the Monday of the week first.');
    return;
  }

  // Parse the chosen date (treat as local date, no timezone shift)
  const parts = input.value.split('-');
  const startDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function ordinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  // Day name elements in DOM order = Monday..Sunday (left column then right column)
  const dnames = document.querySelectorAll('#poster .day-band .dname');
  if (dnames.length === 0) {
    alert('No day sections found. Load the template first.');
    return;
  }

  dnames.forEach((el, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const text = dayNames[d.getDay()] + ' ' + ordinal(d.getDate()) + ' ' + monthNames[d.getMonth()] + '. ' + d.getFullYear();
    el.textContent = text;
  });

  // Also update the date strip top line (range Mon..Sun) if present
  const stripPs = document.querySelectorAll('#poster .date-strip p');
  if (stripPs.length >= 1) {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (dnames.length - 1));
    const range = ordinal(startDate.getDate()).toUpperCase() + ' ' + monthNames[startDate.getMonth()].toUpperCase() + '. ' + startDate.getFullYear()
      + ' \u2013 ' + ordinal(endDate.getDate()).toUpperCase() + ' ' + monthNames[endDate.getMonth()].toUpperCase() + '. ' + endDate.getFullYear();
    stripPs[0].textContent = range;
  }

  // Trigger auto-save if available
  if (typeof saveContent === 'function') {
    try { saveContent(); } catch (e) {}
  }

  console.log('✅ Week dates filled from', input.value);
}
