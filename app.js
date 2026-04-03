/* ============================================================
   World Cup 2026 AI Lab - Main Application
   ============================================================ */

// ---- Utility Helpers ----

function shareToX(text) {
  const url = 'https://x.com/intent/tweet?text=' + encodeURIComponent(text);
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

function handleRoute() {
  const hash = (window.location.hash || '#home').replace('#', '');
  const target = SECTIONS.includes(hash) ? hash : 'home';

  SECTIONS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', id !== target);
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').replace('#', '');
    a.classList.toggle('active', href === target);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  // close mobile menu
  document.querySelector('.nav-links')?.classList.remove('open');
}

function initNavigation() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();

  // Feature cards on home
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      const feat = card.dataset.feature;
      if (feat) window.location.hash = '#' + feat;
    });
  });

  // Nav links
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelector('.nav-links')?.classList.remove('open');
    });
  });

  // Hamburger
  const toggle = document.getElementById('nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.querySelector('.nav-links')?.classList.toggle('open');
    });
  }
}

// ---- 2. Countdown Timer ----

function initCountdown() {
  function update() {
    const el = document.getElementById('countdown');
    if (!el) return;
    const now = new Date();
    const target = new Date('2026-06-11T00:00:00Z');
    const diff = target - now;
    if (diff <= 0) { el.innerHTML = '<span class="cd-block"><strong>開催中!</strong></span>'; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    el.innerHTML =
      '<span class="cd-block"><strong>' + d + '</strong> 日</span>' +
      '<span class="cd-block"><strong>' + h + '</strong> 時間</span>' +
      '<span class="cd-block"><strong>' + m + '</strong> 分</span>' +
      '<span class="cd-block"><strong>' + s + '</strong> 秒</span>';
  }
  update();
  setInterval(update, 1000);
}

// ---- 3. AI Predictor ----

var userGroupSelections = {};
var predictorSubmitted = false;

function initPredictor() {
  // Tab switching
  document.querySelectorAll('.predictor-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.predictor-tabs .tab-btn').forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('#predictor .tab-content').forEach(p => p.classList.toggle('active', p.id === tab));
    });
  });

  renderAIPredictions();
  renderUserGroups();

  document.getElementById('submit-prediction')?.addEventListener('click', () => {
    predictorSubmitted = true;
    renderComparison();
    // switch to compare tab
    document.querySelectorAll('.predictor-tabs .tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === 'compare'));
    document.querySelectorAll('#predictor .tab-content').forEach(p => p.classList.toggle('active', p.id === 'compare'));
  });
}

function renderAIPredictions() {
  const el = document.getElementById('ai-bracket');
  if (!el || typeof AI_PREDICTIONS === 'undefined') return;
  const p = AI_PREDICTIONS;

  var html = '<div class="bracket-view">';

  // Group winners
  html += '<div class="bracket-section"><h3>グループステージ 1位・2位</h3><div class="bracket-teams">';
  Object.keys(p.groupWinners).forEach(g => {
    var gw = p.groupWinners[g];
    html += '<span class="bracket-chip">' + g + ': ' + gw.first + ' / ' + gw.second + '</span>';
  });
  html += '</div></div>';

  // QF
  html += '<div class="bracket-section"><h3>準々決勝</h3><div class="bracket-teams">';
  p.quarterfinalists.forEach(t => { html += '<span class="bracket-chip">' + t + '</span>'; });
  html += '</div></div>';

  // SF
  html += '<div class="bracket-section"><h3>準決勝</h3><div class="bracket-teams">';
  p.semifinalists.forEach(t => { html += '<span class="bracket-chip">' + t + '</span>'; });
  html += '</div></div>';

  // Final
  html += '<div class="bracket-section"><h3>決勝</h3><div class="bracket-teams">';
  p.finalists.forEach(t => { html += '<span class="bracket-chip">' + t + '</span>'; });
  html += '</div></div>';

  // Champion
  html += '<div class="bracket-section champion"><h3>優勝</h3><span class="bracket-chip gold">' + p.champion + '</span>';
  html += '<p>得点王: ' + p.goldenBoot.player + ' (' + p.goldenBoot.goals + 'ゴール)</p>';
  html += '<p>ダークホース: ' + p.darkHorse + '</p>';
  html += '</div>';

  html += '</div>';
  el.innerHTML = html;
}

function renderUserGroups() {
  var grid = document.getElementById('groups-grid');
  if (!grid || typeof GROUPS === 'undefined') return;

  var html = '';
  Object.keys(GROUPS).forEach(groupName => {
    var teams = GROUPS[groupName];
    html += '<div class="group-card" data-group="' + groupName + '">';
    html += '<h4>Group ' + groupName + '</h4>';
    teams.forEach(team => {
      html += '<button class="team-row" data-group="' + groupName + '" data-team="' + team.name + '">' + team.flag + ' ' + team.name + '</button>';
    });
    html += '<div class="pick-status" id="pick-' + groupName + '"></div>';
    html += '</div>';
  });
  grid.innerHTML = html;

  // Click handlers
  grid.querySelectorAll('.team-row').forEach(btn => {
    btn.addEventListener('click', () => {
      if (predictorSubmitted) return;
      var g = btn.dataset.group;
      var t = btn.dataset.team;
      if (!userGroupSelections[g]) userGroupSelections[g] = [];
      var sel = userGroupSelections[g];
      var idx = sel.indexOf(t);
      if (idx !== -1) { sel.splice(idx, 1); }
      else if (sel.length < 2) { sel.push(t); }
      else { return; }

      // Update button styles
      grid.querySelectorAll('.team-row[data-group="' + g + '"]').forEach(b => {
        var pos = sel.indexOf(b.dataset.team);
        b.classList.remove('pick-1st', 'pick-2nd');
        if (pos === 0) b.classList.add('pick-1st');
        else if (pos === 1) b.classList.add('pick-2nd');
      });

      var status = document.getElementById('pick-' + g);
      if (status) status.textContent = sel.length === 2 ? '1位: ' + sel[0] + ' / 2位: ' + sel[1] : '';

      // Enable submit?
      var total = Object.keys(GROUPS).length;
      var filled = Object.values(userGroupSelections).filter(s => s.length === 2).length;
      var submitBtn = document.getElementById('submit-prediction');
      if (submitBtn) submitBtn.disabled = filled < total;
    });
  });
}

function renderComparison() {
  var el = document.getElementById('compare-result');
  if (!el || typeof AI_PREDICTIONS === 'undefined') return;

  var matches = 0, total = 0;
  var html = '<div class="compare-grid">';
  Object.keys(GROUPS).forEach(g => {
    var userPicks = userGroupSelections[g] || [];
    var aiPicks = AI_PREDICTIONS.groupWinners[g];
    html += '<div class="compare-card"><h4>Group ' + g + '</h4>';
    userPicks.forEach((team, i) => {
      var label = i === 0 ? '1位' : '2位';
      var aiMatch = (i === 0 && aiPicks.first === team) || (i === 1 && aiPicks.second === team);
      if (aiMatch) matches++;
      total++;
      html += '<div class="compare-row ' + (aiMatch ? 'match' : 'mismatch') + '">' + label + ': ' + team + ' ' + (aiMatch ? '✅' : '❌') + '</div>';
    });
    html += '</div>';
  });
  html += '</div>';

  var pct = total > 0 ? Math.round((matches / total) * 100) : 0;
  html += '<div class="match-score"><h3>AIとの一致率: ' + pct + '%</h3>';
  html += '<p>' + matches + ' / ' + total + ' が一致</p>';
  html += '<button class="btn-primary" id="share-prediction">結果をXでシェア</button></div>';
  el.innerHTML = html;

  document.getElementById('share-prediction')?.addEventListener('click', () => {
    shareToX('W杯2026 AIラボでAI予想との一致率は' + pct + '%でした！ #W杯2026AIラボ');
  });
}

// ---- 4. Player DNA Diagnosis ----

var diagnosisStep = 0;
var diagnosisAnswers = [];

function initDiagnosis() {
  diagnosisStep = 0;
  diagnosisAnswers = [];
  document.getElementById('quiz-container')?.classList.remove('hidden');
  document.getElementById('diagnosis-result')?.classList.add('hidden');
  renderDiagnosisQuestion();

  document.getElementById('retry-diagnosis')?.addEventListener('click', () => {
    initDiagnosis();
  });
  document.getElementById('share-diagnosis-x')?.addEventListener('click', () => {
    // will be updated after result
  });
  document.getElementById('download-diagnosis')?.addEventListener('click', () => {
    downloadCanvas('diagnosis-canvas', 'soccer_dna.png');
  });
}

function renderDiagnosisQuestion() {
  var qEl = document.getElementById('quiz-question');
  var oEl = document.getElementById('quiz-options');
  var pBar = document.getElementById('quiz-progress-bar');
  if (!qEl || !oEl || typeof QUIZ_QUESTIONS === 'undefined') return;

  if (diagnosisStep >= QUIZ_QUESTIONS.length) {
    showDiagnosisResult();
    return;
  }

  var q = QUIZ_QUESTIONS[diagnosisStep];
  var progress = (diagnosisStep / QUIZ_QUESTIONS.length) * 100;
  if (pBar) pBar.style.width = progress + '%';

  qEl.innerHTML = '<p class="question-counter">' + (diagnosisStep + 1) + ' / ' + QUIZ_QUESTIONS.length + '</p><h3>' + q.question + '</h3>';

  var html = '';
  q.options.forEach((opt, i) => {
    html += '<button class="quiz-option" data-idx="' + i + '">' + opt.text + '</button>';
  });
  oEl.innerHTML = html;

  oEl.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      var idx = parseInt(btn.dataset.idx);
      diagnosisAnswers.push(QUIZ_QUESTIONS[diagnosisStep].options[idx]);
      diagnosisStep++;
      renderDiagnosisQuestion();
    });
  });
}

function showDiagnosisResult() {
  document.getElementById('quiz-container')?.classList.add('hidden');
  document.getElementById('diagnosis-result')?.classList.remove('hidden');

  var result = calculateQuizResult(diagnosisAnswers);
  var arch = result.archetype;
  var stats = result.stats;

  // Draw canvas
  drawDiagnosisCanvas(arch, stats);

  // Details
  var details = document.getElementById('result-details');
  if (details) {
    details.innerHTML = '<h3>' + arch.name + '</h3><p class="archetype-subtitle">' + arch.subtitle + '</p>' +
      '<p class="archetype-player">' + arch.famousPlayer + ' 型</p>' +
      '<p class="archetype-desc">' + arch.description + '</p>';
  }

  // Update share button
  var shareBtn = document.getElementById('share-diagnosis-x');
  if (shareBtn) {
    shareBtn.onclick = () => {
      shareToX('W杯2026 AIラボ「サッカーDNA診断」の結果、私は' + arch.name + '（' + arch.famousPlayer + '型）でした！ #W杯2026AIラボ');
    };
  }
}

function drawDiagnosisCanvas(archetype, stats) {
  var canvas = document.getElementById('diagnosis-canvas');
  if (!canvas) return;
  canvas.width = 600; canvas.height = 800;
  var ctx = canvas.getContext('2d');
  var font = "'Noto Sans JP', sans-serif";

  // Background gradient
  var grad = ctx.createLinearGradient(0, 0, 600, 800);
  grad.addColorStop(0, archetype.color || '#1a1a2e');
  grad.addColorStop(1, '#0a0a1a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 800);

  // Decorative circles
  for (var i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 600, Math.random() * 800, Math.random() * 50 + 10, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,' + (Math.random() * 0.05) + ')';
    ctx.fill();
  }

  ctx.textAlign = 'center';

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px ' + font;
  ctx.fillText('あなたのサッカーDNA', 300, 55);

  // Archetype name
  ctx.font = 'bold 40px ' + font;
  ctx.fillStyle = '#ffd700';
  ctx.fillText(archetype.name, 300, 115);

  // Famous player
  ctx.font = '22px ' + font;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(archetype.famousPlayer + ' 型', 300, 155);

  // Radar chart
  drawRadarChart(ctx, 300, 370, 140, stats, font);

  // Description
  ctx.fillStyle = '#dddddd';
  ctx.font = '16px ' + font;
  wrapText(ctx, archetype.description, 300, 570, 500, 24);

  // Watermark
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.font = 'bold 16px ' + font;
  ctx.fillText('W杯2026 AIラボ ⚽', 300, 770);
}

function drawRadarChart(ctx, cx, cy, radius, stats, font) {
  var labels = ['Speed', 'Technique', 'Power', 'Intelligence', 'Stamina', 'Leadership'];
  var keys = ['speed', 'technique', 'power', 'intelligence', 'stamina', 'leadership'];
  var n = 6;

  // Grid rings
  for (var ring = 1; ring <= 4; ring++) {
    ctx.beginPath();
    var r = (radius / 4) * ring;
    for (var i = 0; i <= n; i++) {
      var angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      var x = cx + r * Math.cos(angle);
      var y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Data polygon
  ctx.beginPath();
  keys.forEach((key, i) => {
    var val = (stats[key] || 0) / 100;
    var angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    var x = cx + radius * val * Math.cos(angle);
    var y = cy + radius * val * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
  ctx.fill();
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Labels
  ctx.fillStyle = '#ffffff';
  ctx.font = '14px ' + font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  labels.forEach((label, i) => {
    var angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    var lx = cx + (radius + 28) * Math.cos(angle);
    var ly = cy + (radius + 28) * Math.sin(angle);
    ctx.fillText(label, lx, ly);
  });
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var chars = text.split('');
  var line = '';
  var ty = y;
  chars.forEach(ch => {
    var test = line + ch;
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

var selectedFormation = null;
var pitchPositions = [];
var selectedPositionIndex = null;
var assignedPlayers = {};

function initManager() {
  var formBar = document.getElementById('formation-options');
  if (!formBar || typeof FORMATIONS === 'undefined') return;

  var html = '';
  Object.keys(FORMATIONS).forEach(name => {
    html += '<button class="formation-btn" data-formation="' + name + '">' + name + '</button>';
  });
  formBar.innerHTML = html;

  formBar.querySelectorAll('.formation-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectFormation(btn.dataset.formation);
      formBar.querySelectorAll('.formation-btn').forEach(b => b.classList.toggle('active', b === btn));
    });
  });

  var searchInput = document.getElementById('player-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderPlayerList(searchInput.value));
  }

  document.getElementById('analyze-btn')?.addEventListener('click', analyzeTeam);
}

function selectFormation(name) {
  selectedFormation = name;
  assignedPlayers = {};
  selectedPositionIndex = null;
  pitchPositions = FORMATIONS[name]?.positions || [];
  renderPitch();
  renderPlayerList('');
  updateAnalyzeButton();
}

function renderPitch() {
  var container = document.getElementById('pitch');
  if (!container) return;

  var html = '<div class="pitch-field">';
  pitchPositions.forEach((pos, i) => {
    var player = assignedPlayers[i];
    var label = player ? player.nameJa : pos.role;
    var cls = 'pitch-pos' + (selectedPositionIndex === i ? ' selected' : '') + (player ? ' filled' : '');
    html += '<div class="' + cls + '" style="left:' + pos.x + '%;top:' + pos.y + '%" data-posidx="' + i + '">' + label + '</div>';
  });
  html += '</div>';
  container.innerHTML = html;

  container.querySelectorAll('.pitch-pos').forEach(el => {
    el.addEventListener('click', () => {
      selectedPositionIndex = parseInt(el.dataset.posidx);
      renderPitch();
    });
  });
}

function renderPlayerList(query) {
  var container = document.getElementById('player-list');
  if (!container || typeof STAR_PLAYERS === 'undefined') return;

  var q = (query || '').toLowerCase();
  var filtered = STAR_PLAYERS.filter(p =>
    p.name.toLowerCase().includes(q) || p.nameJa.includes(q) || p.team.includes(q)
  );

  var usedNames = new Set(Object.values(assignedPlayers).map(p => p.name));
  var html = '';
  filtered.forEach((p, idx) => {
    var globalIdx = STAR_PLAYERS.indexOf(p);
    var used = usedNames.has(p.name);
    html += '<button class="player-item' + (used ? ' used' : '') + '" data-pidx="' + globalIdx + '" ' + (used ? 'disabled' : '') + '>';
    html += '<span class="player-name">' + p.nameJa + '</span>';
    html += '<span class="player-pos">' + p.position + '</span>';
    html += '<span class="player-rating">' + p.rating + '</span>';
    html += '</button>';
  });
  container.innerHTML = html || '<p>選手が見つかりません</p>';

  container.querySelectorAll('.player-item:not(.used)').forEach(btn => {
    btn.addEventListener('click', () => {
      if (selectedPositionIndex === null) return;
      var pidx = parseInt(btn.dataset.pidx);
      assignedPlayers[selectedPositionIndex] = STAR_PLAYERS[pidx];
      selectedPositionIndex = null;
      renderPitch();
      renderPlayerList(document.getElementById('player-search')?.value || '');
      updateAnalyzeButton();
    });
  });
}

function updateAnalyzeButton() {
  var btn = document.getElementById('analyze-btn');
  if (btn) btn.disabled = Object.keys(assignedPlayers).length < pitchPositions.length;
}

async function analyzeTeam() {
  var panel = document.getElementById('analysis-result');
  if (!panel) return;
  panel.classList.remove('hidden');
  panel.innerHTML = '<p class="typing-indicator">AI分析中...</p>';

  var players = Object.values(assignedPlayers);
  var avgRating = (players.reduce((s, p) => s + p.rating, 0) / players.length).toFixed(1);

  var statTotals = { speed: 0, technique: 0, power: 0, intelligence: 0, stamina: 0 };
  players.forEach(p => {
    if (p.stats) Object.keys(statTotals).forEach(k => { statTotals[k] += (p.stats[k] || 0); });
  });

  var sortedStats = Object.entries(statTotals).sort((a, b) => b[1] - a[1]);
  var strengths = sortedStats.slice(0, 2).map(s => s[0]);
  var weaknesses = sortedStats.slice(-2).map(s => s[0]);

  var statLabels = { speed: 'スピード', technique: 'テクニック', power: 'パワー', intelligence: '戦術理解力', stamina: 'スタミナ' };

  var winProb = Math.min(95, Math.max(30, Math.round(avgRating * 1.1 + (statTotals[strengths[0]] / players.length) * 0.5)));

  var formationTips = {
    '4-3-3': 'サイドアタックを軸にした攻撃的スタイルが有効です。ウイングの突破力が鍵。',
    '4-4-2': 'バランスの取れた布陣。2トップの連携とサイドハーフの運動量が重要。',
    '3-5-2': 'ウイングバックの攻守切り替えが命。中盤の数的優位を活かしましょう。',
    '4-2-3-1': 'トップ下の創造性が攻撃の要。ダブルボランチで守備の安定感を確保。',
    '5-3-2': '堅守速攻型。5バックで守りを固め、カウンターで一気に攻める。'
  };

  var lines = [
    '【チーム総合評価】 ' + avgRating + ' / 100',
    '',
    '【ストロングポイント】',
    '  ● ' + (statLabels[strengths[0]] || strengths[0]),
    '  ● ' + (statLabels[strengths[1]] || strengths[1]),
    '',
    '【課題】',
    '  ▲ ' + (statLabels[weaknesses[0]] || weaknesses[0]),
    '  ▲ ' + (statLabels[weaknesses[1]] || weaknesses[1]),
    '',
    '【戦術提案 - ' + selectedFormation + '】',
    formationTips[selectedFormation] || 'この布陣に合った戦術を組み立てましょう。',
    '',
    '【勝利確率】 推定 ' + winProb + '%'
  ];

  await typewriterEffect(panel, lines);
}

async function typewriterEffect(el, lines) {
  el.innerHTML = '';
  for (var li = 0; li < lines.length; li++) {
    var div = document.createElement('div');
    div.className = 'analysis-line';
    el.appendChild(div);
    var line = lines[li];
    for (var i = 0; i < line.length; i++) {
      div.textContent += line[i];
      await sleep(15);
    }
    await sleep(60);
  }
}

// ---- 6. Support Card Generator ----

var cardSelectedTeam = null;
var cardSelectedStyle = null;

function initCardGenerator() {
  renderTeamGrid();

  document.querySelectorAll('.style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      cardSelectedStyle = btn.dataset.style;
      document.querySelectorAll('.style-btn').forEach(b => b.classList.toggle('active', b === btn));
      document.getElementById('generate-card-btn')?.removeAttribute('disabled');
    });
  });

  document.getElementById('generate-card-btn')?.addEventListener('click', generateSupportCard);
  document.getElementById('share-card-x')?.addEventListener('click', () => {
    if (cardSelectedTeam) shareToX(cardSelectedTeam.name + 'を応援！ #W杯2026AIラボ');
  });
  document.getElementById('download-card')?.addEventListener('click', () => {
    downloadCanvas('card-canvas', 'support_card.png');
  });
  document.getElementById('regenerate-card')?.addEventListener('click', () => {
    document.getElementById('card-preview')?.classList.add('hidden');
    document.getElementById('card-options')?.classList.remove('hidden');
  });
}

function renderTeamGrid() {
  var grid = document.getElementById('team-selector-grid');
  if (!grid || typeof TEAMS === 'undefined') return;

  var html = '';
  TEAMS.forEach(team => {
    html += '<button class="team-select-btn" data-code="' + team.nameEn + '">' + team.flag + ' ' + team.name + '</button>';
  });
  grid.innerHTML = html;

  grid.querySelectorAll('.team-select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      cardSelectedTeam = TEAMS.find(t => t.nameEn === btn.dataset.code);
      if (!cardSelectedTeam) return;
      grid.querySelectorAll('.team-select-btn').forEach(b => b.classList.toggle('active', b === btn));
      document.getElementById('card-options')?.classList.remove('hidden');
      cardSelectedStyle = null;
      document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
    });
  });
}

function generateSupportCard() {
  if (!cardSelectedTeam || !cardSelectedStyle) return;

  var canvas = document.getElementById('card-canvas');
  if (!canvas) return;
  canvas.width = 600; canvas.height = 800;
  var ctx = canvas.getContext('2d');
  var font = "'Noto Sans JP', sans-serif";

  var c1 = cardSelectedTeam.colors?.primary || '#1a237e';
  var c2 = cardSelectedTeam.colors?.secondary || '#283593';
  var grad = ctx.createLinearGradient(0, 0, 600, 800);
  grad.addColorStop(0, c1);
  grad.addColorStop(0.5, c2);
  grad.addColorStop(1, c1);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 800);

  // Decorative
  for (var i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 600, Math.random() * 800, Math.random() * 40 + 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,' + (Math.random() * 0.07) + ')';
    ctx.fill();
  }

  ctx.textAlign = 'center';

  // Flag
  ctx.font = '100px ' + font;
  ctx.fillText(cardSelectedTeam.flag || '', 300, 200);

  // Team name
  ctx.font = 'bold 40px ' + font;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(cardSelectedTeam.name, 300, 300);

  // Message
  var message = getRandomSupportMessage(cardSelectedStyle, cardSelectedTeam.name);
  ctx.font = '22px ' + font;
  ctx.fillStyle = '#ffffff';
  wrapText(ctx, message, 300, 420, 480, 34);

  // FIFA text
  ctx.font = 'bold 18px ' + font;
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText('FIFA WORLD CUP 2026', 300, 680);

  // Watermark
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '14px ' + font;
  ctx.fillText('W杯2026 AIラボ', 300, 770);

  // Show preview
  document.getElementById('card-options')?.classList.add('hidden');
  document.getElementById('card-preview')?.classList.remove('hidden');
}

// ---- 7. AI Chat ----

function initChat() {
  var input = document.getElementById('chat-input');
  var sendBtn = document.getElementById('chat-send');

  function send() {
    if (!input) return;
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    sendChatMessage(text);
  }

  if (sendBtn) sendBtn.addEventListener('click', send);
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); send(); } });

  document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => sendChatMessage(btn.textContent));
  });
}

async function sendChatMessage(text) {
  addChatBubble(text, 'user');

  var typingId = addChatBubble('...', 'bot');

  await sleep(600 + Math.random() * 600);

  var reply = '';
  if (typeof findChatResponse === 'function') {
    reply = findChatResponse(text);
  }
  if (!reply) {
    var fallbacks = [
      '面白い質問ですね！W杯2026では48チームが参加する史上最大の大会になります。',
      'いい視点です！2026年大会はアメリカ・カナダ・メキシコの3カ国共催です。',
      'なるほど！W杯の歴史で最多優勝はブラジルの5回。2026年はどうなるでしょう？',
      '興味深いですね！2026年大会では104試合が行われる予定です。',
      'W杯2026の決勝はニューヨークのMetLife Stadiumで行われます！'
    ];
    reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  var el = document.getElementById(typingId);
  if (el) {
    el.querySelector('.chat-bubble')
      ? (el.querySelector('.chat-bubble').textContent = reply)
      : (el.textContent = reply);
  }
  scrollChatToBottom();
}

function addChatBubble(text, sender) {
  var container = document.getElementById('chat-messages');
  if (!container) return '';

  var id = 'msg-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
  var wrapper = document.createElement('div');
  wrapper.className = 'chat-msg ' + sender;
  wrapper.id = id;

  if (sender === 'bot') {
    wrapper.innerHTML = '<div class="chat-avatar">🤖</div><div class="chat-bubble">' + text + '</div>';
  } else {
    wrapper.innerHTML = '<div class="chat-bubble">' + text + '</div>';
  }

  container.appendChild(wrapper);
  scrollChatToBottom();
  return id;
}

function scrollChatToBottom() {
  var container = document.getElementById('chat-messages');
  if (container) container.scrollTop = container.scrollHeight;
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
