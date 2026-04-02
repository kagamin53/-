/* ============================================================
   World Cup 2026 AI Lab - Main Application
   ============================================================ */

// ---- Utility Helpers ----

function shareToX(text) {
  const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function downloadCanvas(canvasId, filename) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = filename || 'worldcup2026_ailab.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ---- 1. Navigation & Routing ----

const SECTIONS = ['home', 'predictor', 'diagnosis', 'manager', 'card', 'chat'];

function navigateTo(hash) {
  window.location.hash = hash;
}

function handleRoute() {
  const hash = (window.location.hash || '#home').replace('#', '');
  const target = SECTIONS.includes(hash) ? hash : 'home';

  SECTIONS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', id !== target);
  });

  document.querySelectorAll('nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').replace('#', '');
    a.classList.toggle('active', href === target);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeHamburger();
}

function initNavigation() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();

  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
      const target = card.dataset.target;
      if (target) navigateTo(target);
    });
  });

  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleHamburger);
  }
}

function toggleHamburger() {
  const navLinks = document.getElementById('nav-links');
  if (navLinks) navLinks.classList.toggle('open');
}

function closeHamburger() {
  const navLinks = document.getElementById('nav-links');
  if (navLinks) navLinks.classList.remove('open');
}

// ---- 2. Countdown Timer ----

const WORLD_CUP_START = new Date('2026-06-11T00:00:00Z');

function updateCountdown() {
  const now = new Date();
  const diff = WORLD_CUP_START - now;
  const el = document.getElementById('countdown');
  if (!el) return;

  if (diff <= 0) {
    el.textContent = 'W杯2026 開催中!';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  el.innerHTML =
    `<span class="cd-block"><strong>${days}</strong> 日</span>` +
    `<span class="cd-block"><strong>${hours}</strong> 時間</span>` +
    `<span class="cd-block"><strong>${minutes}</strong> 分</span>` +
    `<span class="cd-block"><strong>${seconds}</strong> 秒</span>`;
}

function initCountdown() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ---- 3. AI Predictor ----

let userGroupSelections = {};
let predictorSubmitted = false;

function initPredictor() {
  document.querySelectorAll('.predictor-tab').forEach(tab => {
    tab.addEventListener('click', () => switchPredictorTab(tab.dataset.tab));
  });
  switchPredictorTab('ai');
  renderAIPredictions();
  renderUserGroups();
}

function switchPredictorTab(tabId) {
  document.querySelectorAll('.predictor-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === tabId)
  );
  document.querySelectorAll('.predictor-panel').forEach(p =>
    p.classList.toggle('hidden', p.id !== `panel-${tabId}`)
  );
}

function renderAIPredictions() {
  const panel = document.getElementById('panel-ai');
  if (!panel || typeof AI_PREDICTIONS === 'undefined') return;

  const pred = AI_PREDICTIONS;
  let html = '<div class="bracket-view">';

  html += '<div class="bracket-section"><h3>グループステージ突破</h3><div class="bracket-teams">';
  if (pred.groupWinners) {
    pred.groupWinners.forEach(team => {
      html += `<span class="bracket-chip">${team}</span>`;
    });
  }
  html += '</div></div>';

  const rounds = [
    { key: 'quarterFinals', label: '準々決勝' },
    { key: 'semiFinals', label: '準決勝' },
    { key: 'final', label: '決勝' }
  ];
  rounds.forEach(round => {
    if (pred[round.key]) {
      html += `<div class="bracket-section"><h3>${round.label}</h3><div class="bracket-teams">`;
      const teams = Array.isArray(pred[round.key]) ? pred[round.key] : [pred[round.key]];
      teams.forEach(t => { html += `<span class="bracket-chip">${t}</span>`; });
      html += '</div></div>';
    }
  });

  if (pred.champion) {
    html += `<div class="bracket-section champion"><h3>優勝</h3><span class="bracket-chip gold">${pred.champion}</span></div>`;
  }

  html += '</div>';
  panel.innerHTML = html;
}

function renderUserGroups() {
  const panel = document.getElementById('panel-user');
  if (!panel || typeof GROUPS === 'undefined') return;

  let html = '<div class="group-grid">';
  Object.keys(GROUPS).forEach(groupName => {
    const teams = GROUPS[groupName];
    html += `<div class="group-card" data-group="${groupName}">`;
    html += `<h4>グループ ${groupName}</h4>`;
    teams.forEach(team => {
      html += `<button class="team-pick-btn" data-group="${groupName}" data-team="${team}" onclick="toggleGroupPick('${groupName}','${team}')">${team}</button>`;
    });
    html += `<div class="pick-status" id="pick-status-${groupName}"></div>`;
    html += '</div>';
  });
  html += '</div>';
  html += '<button id="predictor-submit" class="btn-primary" disabled onclick="submitPredictions()">予想を送信する</button>';
  panel.innerHTML = html;
}

function toggleGroupPick(group, team) {
  if (predictorSubmitted) return;
  if (!userGroupSelections[group]) userGroupSelections[group] = [];

  const sel = userGroupSelections[group];
  const idx = sel.indexOf(team);

  if (idx !== -1) {
    sel.splice(idx, 1);
  } else if (sel.length < 2) {
    sel.push(team);
  } else {
    return;
  }

  document.querySelectorAll(`.team-pick-btn[data-group="${group}"]`).forEach(btn => {
    const t = btn.dataset.team;
    const pos = sel.indexOf(t);
    btn.classList.remove('pick-1st', 'pick-2nd');
    if (pos === 0) btn.classList.add('pick-1st');
    else if (pos === 1) btn.classList.add('pick-2nd');
  });

  const status = document.getElementById(`pick-status-${group}`);
  if (status) {
    status.textContent = sel.length === 2 ? `1位: ${sel[0]} / 2位: ${sel[1]}` : '';
  }

  checkPredictorReady();
}

function checkPredictorReady() {
  const total = Object.keys(GROUPS).length;
  const filled = Object.values(userGroupSelections).filter(s => s.length === 2).length;
  const btn = document.getElementById('predictor-submit');
  if (btn) btn.disabled = filled < total;
}

function submitPredictions() {
  predictorSubmitted = true;
  renderComparison();
  switchPredictorTab('compare');
}

function renderComparison() {
  const panel = document.getElementById('panel-compare');
  if (!panel || typeof AI_PREDICTIONS === 'undefined') return;

  const aiWinners = AI_PREDICTIONS.groupWinners || [];
  let matches = 0;
  let total = 0;
  let html = '<div class="compare-grid">';

  Object.keys(GROUPS).forEach(groupName => {
    const userPicks = userGroupSelections[groupName] || [];
    html += `<div class="compare-card"><h4>グループ ${groupName}</h4>`;
    userPicks.forEach((team, i) => {
      const label = i === 0 ? '1位' : '2位';
      const isMatch = aiWinners.includes(team);
      if (isMatch) matches++;
      total++;
      html += `<div class="compare-row ${isMatch ? 'match' : 'mismatch'}">${label}: ${team} ${isMatch ? '✔' : '✘'}</div>`;
    });
    html += '</div>';
  });

  html += '</div>';

  const pct = total > 0 ? Math.round((matches / total) * 100) : 0;
  html += `<div class="match-result"><h3>AIとの一致率: ${pct}%</h3>`;
  html += `<p>${matches} / ${total} チームが一致</p>`;
  html += `<button class="btn-primary" onclick="shareToX('W杯2026 AIラボでAI予想との一致率は${pct}%でした! #W杯2026AIラボ')">結果をシェア</button>`;
  html += '</div>';

  panel.innerHTML = html;
}

// ---- 4. Player DNA Diagnosis ----

let diagnosisStep = 0;
let diagnosisStats = { speed: 0, technique: 0, power: 0, intelligence: 0, stamina: 0, leadership: 0 };

function initDiagnosis() {
  diagnosisStep = 0;
  diagnosisStats = { speed: 0, technique: 0, power: 0, intelligence: 0, stamina: 0, leadership: 0 };
  renderDiagnosisQuestion();
}

function renderDiagnosisQuestion() {
  const container = document.getElementById('diagnosis-questions');
  if (!container || typeof QUIZ_QUESTIONS === 'undefined') return;

  if (diagnosisStep >= QUIZ_QUESTIONS.length) {
    showDiagnosisResult();
    return;
  }

  const q = QUIZ_QUESTIONS[diagnosisStep];
  const progress = ((diagnosisStep) / QUIZ_QUESTIONS.length) * 100;

  let html = `<div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>`;
  html += `<p class="question-counter">${diagnosisStep + 1} / ${QUIZ_QUESTIONS.length}</p>`;
  html += `<h3 class="question-text">${q.question}</h3>`;
  html += '<div class="options-grid">';
  q.options.forEach((opt, i) => {
    html += `<button class="option-btn" onclick="answerDiagnosis(${i})">${opt.text}</button>`;
  });
  html += '</div>';

  container.innerHTML = html;
}

function answerDiagnosis(optionIndex) {
  const q = QUIZ_QUESTIONS[diagnosisStep];
  const opt = q.options[optionIndex];

  if (opt.stats) {
    Object.keys(opt.stats).forEach(key => {
      if (diagnosisStats[key] !== undefined) {
        diagnosisStats[key] += opt.stats[key];
      }
    });
  }

  diagnosisStep++;
  renderDiagnosisQuestion();
}

function showDiagnosisResult() {
  const container = document.getElementById('diagnosis-questions');
  if (!container || typeof PLAYER_ARCHETYPES === 'undefined') return;

  const sorted = Object.entries(diagnosisStats).sort((a, b) => b[1] - a[1]);
  const topStat = sorted[0][0];

  const archetype = PLAYER_ARCHETYPES.find(a => a.keyStat === topStat) || PLAYER_ARCHETYPES[0];

  container.innerHTML =
    '<div class="result-actions">' +
    `<button class="btn-primary" onclick="shareToX('W杯2026 AIラボ「サッカーDNA診断」の結果、私は${archetype.name}タイプ (${archetype.player}型) でした! #W杯2026AIラボ')">Xでシェア</button>` +
    `<button class="btn-secondary" onclick="downloadCanvas('diagnosis-canvas','soccer_dna.png')">画像を保存</button>` +
    `<button class="btn-secondary" onclick="initDiagnosis()">もう一度</button>` +
    '</div>';

  drawDiagnosisCanvas(archetype);
}

function drawDiagnosisCanvas(archetype) {
  const canvas = document.getElementById('diagnosis-canvas');
  if (!canvas) return;
  canvas.width = 600;
  canvas.height = 800;
  canvas.classList.remove('hidden');
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 800);
  const colors = archetype.colors || ['#1a1a2e', '#16213e'];
  grad.addColorStop(0, colors[0]);
  grad.addColorStop(1, colors[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 800);

  const font = "'Noto Sans JP', sans-serif";

  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 28px ${font}`;
  ctx.textAlign = 'center';
  ctx.fillText('あなたのサッカーDNA', 300, 60);

  ctx.font = `bold 36px ${font}`;
  ctx.fillStyle = '#ffd700';
  ctx.fillText(archetype.name, 300, 120);

  ctx.font = `22px ${font}`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`(${archetype.player} 型)`, 300, 160);

  drawRadarChart(ctx, 300, 380, 150, font);

  ctx.fillStyle = '#dddddd';
  ctx.font = `16px ${font}`;
  const desc = archetype.description || '';
  wrapText(ctx, desc, 300, 580, 500, 24);

  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = `14px ${font}`;
  ctx.fillText('W杯2026 AIラボ', 300, 770);
}

function drawRadarChart(ctx, cx, cy, radius, font) {
  const labels = ['Speed', 'Technique', 'Power', 'Intelligence', 'Stamina', 'Leadership'];
  const keys = ['speed', 'technique', 'power', 'intelligence', 'stamina', 'leadership'];
  const maxVal = Math.max(...Object.values(diagnosisStats), 1);
  const n = 6;

  for (let ring = 1; ring <= 4; ring++) {
    ctx.beginPath();
    const r = (radius / 4) * ring;
    for (let i = 0; i <= n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.stroke();
  }

  ctx.beginPath();
  keys.forEach((key, i) => {
    const val = diagnosisStats[key] / maxVal;
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const x = cx + radius * val * Math.cos(angle);
    const y = cy + radius * val * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
  ctx.fill();
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = `14px ${font}`;
  labels.forEach((label, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const lx = cx + (radius + 25) * Math.cos(angle);
    const ly = cy + (radius + 25) * Math.sin(angle);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, lx, ly);
  });
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = text.split('');
  let line = '';
  let ty = y;
  chars.forEach(ch => {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, x, ty);
      line = ch;
      ty += lineHeight;
    } else {
      line = test;
    }
  });
  if (line) ctx.fillText(line, x, ty);
}

// ---- 5. AI Manager ----

let selectedFormation = null;
let pitchPositions = [];
let selectedPositionIndex = null;
let assignedPlayers = {};

function initManager() {
  const formBar = document.getElementById('formation-bar');
  if (!formBar || typeof FORMATIONS === 'undefined') return;

  let html = '';
  Object.keys(FORMATIONS).forEach(name => {
    html += `<button class="formation-btn" onclick="selectFormation('${name}')">${name}</button>`;
  });
  formBar.innerHTML = html;

  const searchInput = document.getElementById('player-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderPlayerList(searchInput.value));
  }
}

function selectFormation(name) {
  selectedFormation = name;
  assignedPlayers = {};
  selectedPositionIndex = null;

  document.querySelectorAll('.formation-btn').forEach(btn =>
    btn.classList.toggle('active', btn.textContent === name)
  );

  pitchPositions = FORMATIONS[name] || [];
  renderPitch();
  renderPlayerList('');
  updateAnalyzeButton();
}

function renderPitch() {
  const container = document.getElementById('pitch');
  if (!container) return;

  let html = '<div class="pitch-field">';
  pitchPositions.forEach((pos, i) => {
    const player = assignedPlayers[i];
    const label = player ? player.name : pos.label;
    const cls = `pitch-pos${selectedPositionIndex === i ? ' selected' : ''}${player ? ' filled' : ''}`;
    html += `<div class="${cls}" style="left:${pos.x}%;top:${pos.y}%" onclick="selectPosition(${i})">${label}</div>`;
  });
  html += '</div>';

  container.innerHTML = html;
}

function selectPosition(index) {
  selectedPositionIndex = index;
  renderPitch();
  document.getElementById('player-list-panel')?.classList.remove('hidden');
}

function renderPlayerList(query) {
  const container = document.getElementById('player-list');
  if (!container || typeof STAR_PLAYERS === 'undefined') return;

  const q = (query || '').toLowerCase();
  const filtered = STAR_PLAYERS.filter(p =>
    p.name.toLowerCase().includes(q) || (p.nation && p.nation.toLowerCase().includes(q))
  );

  const usedIds = new Set(Object.values(assignedPlayers).map(p => p.id));

  let html = '';
  filtered.forEach(p => {
    const used = usedIds.has(p.id);
    html += `<button class="player-item${used ? ' used' : ''}" onclick="assignPlayer(${p.id})" ${used ? 'disabled' : ''}>`;
    html += `<span class="player-name">${p.name}</span>`;
    html += `<span class="player-pos">${p.position}</span>`;
    html += `<span class="player-rating">${p.rating}</span>`;
    html += '</button>';
  });

  container.innerHTML = html || '<p>選手が見つかりません</p>';
}

function assignPlayer(playerId) {
  if (selectedPositionIndex === null) return;
  const player = STAR_PLAYERS.find(p => p.id === playerId);
  if (!player) return;

  assignedPlayers[selectedPositionIndex] = player;
  selectedPositionIndex = null;
  document.getElementById('player-list-panel')?.classList.add('hidden');
  renderPitch();
  renderPlayerList(document.getElementById('player-search')?.value || '');
  updateAnalyzeButton();
}

function updateAnalyzeButton() {
  const btn = document.getElementById('analyze-btn');
  if (!btn) return;
  btn.disabled = Object.keys(assignedPlayers).length < pitchPositions.length;
}

async function analyzeTeam() {
  const panel = document.getElementById('analysis-result');
  if (!panel) return;

  panel.innerHTML = '<p class="typing-indicator">分析中...</p>';
  panel.classList.remove('hidden');

  const players = Object.values(assignedPlayers);
  const avgRating = (players.reduce((s, p) => s + p.rating, 0) / players.length).toFixed(1);

  const statTotals = { speed: 0, technique: 0, power: 0, intelligence: 0, stamina: 0 };
  players.forEach(p => {
    if (p.stats) {
      Object.keys(statTotals).forEach(k => { statTotals[k] += (p.stats[k] || 0); });
    }
  });

  const sortedStats = Object.entries(statTotals).sort((a, b) => b[1] - a[1]);
  const strengths = sortedStats.slice(0, 2).map(s => s[0]);
  const weaknesses = sortedStats.slice(-2).map(s => s[0]);

  const statLabels = {
    speed: 'スピード', technique: 'テクニック', power: 'パワー',
    intelligence: '戦術理解力', stamina: 'スタミナ'
  };

  const winProb = Math.min(95, Math.max(30, Math.round(avgRating * 1.1 + (statTotals[strengths[0]] / players.length) * 0.5)));

  const formationTips = {
    '4-3-3': 'サイドアタックを軸にした攻撃的スタイルが有効です。ウイングの突破力が鍵になります。',
    '4-4-2': 'バランスの取れた布陣です。2トップの連携とサイドハーフの運動量が重要です。',
    '3-5-2': 'ウイングバックの攻守の切り替えが命です。中盤の数的優位を活かしましょう。',
    '4-2-3-1': 'トップ下の創造性が攻撃の要です。ダブルボランチで守備の安定感を確保。',
    '3-4-3': '超攻撃的布陣。前線のプレスとカウンターが武器になりますが守備に注意。'
  };

  const lines = [
    `【チーム総合評価】 ${avgRating} / 100`,
    '',
    `【ストロングポイント】`,
    ...strengths.map(s => `  ● ${statLabels[s] || s}`),
    '',
    `【課題】`,
    ...weaknesses.map(s => `  ▲ ${statLabels[s] || s}`),
    '',
    `【戦術提案】`,
    formationTips[selectedFormation] || 'この布陣に合った戦術を組み立てましょう。',
    '',
    `【勝利確率】 推定 ${winProb}%`
  ];

  await typewriterEffect(panel, lines);
}

async function typewriterEffect(el, lines) {
  el.innerHTML = '';
  for (const line of lines) {
    const div = document.createElement('div');
    div.className = 'analysis-line';
    el.appendChild(div);
    for (let i = 0; i < line.length; i++) {
      div.textContent += line[i];
      await sleep(15);
    }
    await sleep(80);
  }
}

// ---- 6. Support Card Generator ----

let cardSelectedTeam = null;
let cardSelectedStyle = null;

function initCardGenerator() {
  renderTeamGrid();
}

function renderTeamGrid() {
  const grid = document.getElementById('team-grid');
  if (!grid || typeof TEAMS === 'undefined') return;

  let html = '';
  TEAMS.forEach(team => {
    html += `<button class="team-btn" onclick="selectCardTeam('${team.code}')">${team.flag} ${team.name}</button>`;
  });
  grid.innerHTML = html;
}

function selectCardTeam(code) {
  cardSelectedTeam = TEAMS.find(t => t.code === code);
  if (!cardSelectedTeam) return;

  document.querySelectorAll('.team-btn').forEach(btn =>
    btn.classList.toggle('active', btn.textContent.includes(cardSelectedTeam.name))
  );

  const stylePanel = document.getElementById('card-styles');
  if (stylePanel) {
    stylePanel.classList.remove('hidden');
    stylePanel.innerHTML =
      ['fire', 'cool', 'funny', 'poetic'].map(style => {
        const labels = { fire: '熱血', cool: 'クール', funny: 'おもしろ', poetic: 'ポエム' };
        return `<button class="style-btn" onclick="selectCardStyle('${style}')">${labels[style]}</button>`;
      }).join('');
  }

  document.getElementById('card-generate-btn')?.classList.add('hidden');
  document.getElementById('card-actions')?.classList.add('hidden');
}

function selectCardStyle(style) {
  cardSelectedStyle = style;
  document.querySelectorAll('.style-btn').forEach(btn =>
    btn.classList.toggle('active', false)
  );
  event.target.classList.add('active');

  const genBtn = document.getElementById('card-generate-btn');
  if (genBtn) {
    genBtn.classList.remove('hidden');
    genBtn.onclick = generateSupportCard;
  }
}

function generateSupportCard() {
  if (!cardSelectedTeam || !cardSelectedStyle) return;

  const canvas = document.getElementById('card-canvas');
  if (!canvas) return;
  canvas.width = 600;
  canvas.height = 800;
  canvas.classList.remove('hidden');
  const ctx = canvas.getContext('2d');
  const font = "'Noto Sans JP', sans-serif";

  const c1 = cardSelectedTeam.primaryColor || '#1a237e';
  const c2 = cardSelectedTeam.secondaryColor || '#283593';
  const grad = ctx.createLinearGradient(0, 0, 600, 800);
  grad.addColorStop(0, c1);
  grad.addColorStop(0.5, c2);
  grad.addColorStop(1, c1);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 800);

  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 600, Math.random() * 800, Math.random() * 40 + 5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.07})`;
    ctx.fill();
  }

  ctx.textAlign = 'center';
  ctx.font = `100px ${font}`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(cardSelectedTeam.flag || '', 300, 200);

  ctx.font = `bold 40px ${font}`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(cardSelectedTeam.name, 300, 300);

  let message = '';
  if (typeof SUPPORT_MESSAGES !== 'undefined' && SUPPORT_MESSAGES[cardSelectedStyle]) {
    const msgs = SUPPORT_MESSAGES[cardSelectedStyle];
    message = msgs[Math.floor(Math.random() * msgs.length)];
  }
  message = message.replace('{team}', cardSelectedTeam.name);

  ctx.font = `22px ${font}`;
  ctx.fillStyle = '#ffffff';
  wrapText(ctx, message, 300, 420, 480, 34);

  ctx.font = `bold 18px ${font}`;
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText('FIFA WORLD CUP 2026', 300, 680);

  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.font = `14px ${font}`;
  ctx.fillText('W杯2026 AIラボ', 300, 770);

  const actions = document.getElementById('card-actions');
  if (actions) {
    actions.classList.remove('hidden');
    actions.innerHTML =
      `<button class="btn-primary" onclick="shareToX('${cardSelectedTeam.name}を応援! ${message.slice(0, 60)}... #W杯2026AIラボ')">Xでシェア</button>` +
      `<button class="btn-secondary" onclick="downloadCanvas('card-canvas','support_card.png')">画像を保存</button>`;
  }
}

// ---- 7. AI Chat ----

let chatMessages = [];

function initChat() {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  if (!form || !input) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    sendChatMessage(text);
  });

  document.querySelectorAll('.chat-suggestion').forEach(btn => {
    btn.addEventListener('click', () => {
      sendChatMessage(btn.textContent);
    });
  });
}

async function sendChatMessage(text) {
  addChatBubble(text, 'user');

  const typingId = addChatBubble('...', 'bot');

  await sleep(600 + Math.random() * 500);

  const reply = getChatResponse(text);
  const typingEl = document.getElementById(typingId);
  if (typingEl) typingEl.textContent = reply;

  scrollChatToBottom();
}

function addChatBubble(text, sender) {
  const container = document.getElementById('chat-messages');
  if (!container) return '';

  const id = 'msg-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.id = id;
  bubble.textContent = text;
  container.appendChild(bubble);
  scrollChatToBottom();
  return id;
}

function scrollChatToBottom() {
  const container = document.getElementById('chat-messages');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

function getChatResponse(input) {
  if (typeof CHAT_RESPONSES === 'undefined') {
    return 'W杯2026が楽しみですね!';
  }

  const lower = input.toLowerCase();

  for (const entry of CHAT_RESPONSES) {
    if (entry.keywords && entry.keywords.some(kw => lower.includes(kw.toLowerCase()))) {
      const responses = Array.isArray(entry.responses) ? entry.responses : [entry.response];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  const fallbacks = [
    '面白い質問ですね!W杯2026では48チームが参加する史上最大の大会になります。',
    'いい視点です!ちなみに、2026年大会はアメリカ・カナダ・メキシコの3カ国共催です。',
    'なるほど!W杯の歴史で最多優勝はブラジルの5回です。2026年はどうなるでしょう?',
    '興味深いですね!2026年大会では104試合が行われる予定です。',
    'その質問は奥が深いですね。W杯2026の開幕戦はメキシコシティで行われます!'
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// ---- Initialization ----

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCountdown();
  initPredictor();
  initDiagnosis();
  initManager();
  initCardGenerator();
  initChat();
});
