const $ = q => document.querySelector(q);

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove('show'), 2200);
}

function todayStr() {
  return new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10); // 台北日期
}

function debounce(fn, ms) {
  let h;
  return (...a) => { clearTimeout(h); h = setTimeout(() => fn(...a), ms); };
}

// 依序執行，避免自動存檔與按鈕存檔同時建立兩筆紀錄
let _queue = Promise.resolve();
function enqueue(fn) {
  _queue = _queue.then(fn, fn);
  return _queue;
}

function downloadB64(b64, name) {
  const bin = atob(b64);
  const u8 = Uint8Array.from(bin, c => c.charCodeAt(0));
  const url = URL.createObjectURL(new Blob([u8], { type: 'application/pdf' }));
  const a = document.createElement('a');
  a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function saveText(name, text, mime) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: mime }));
  a.download = name;
  a.click();
}

/* ---------- 登入（Google Identity Services） ---------- */

const Auth = {
  claims() {
    const t = sessionStorage.getItem('idToken');
    if (!t) return null;
    try {
      const p = JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (p.exp * 1000 < Date.now()) { sessionStorage.removeItem('idToken'); return null; }
      return { email: p.email, name: p.name || p.email };
    } catch (e) { return null; }
  },
  mount(el, onSignedIn) {
    const go = () => {
      google.accounts.id.initialize({
        client_id: APP_CONFIG.CLIENT_ID,
        callback: r => { sessionStorage.setItem('idToken', r.credential); onSignedIn(); }
      });
      google.accounts.id.renderButton(el, { theme: 'filled_blue', size: 'large', text: 'signin_with', shape: 'pill', locale: 'zh-TW' });
    };
    if (window.google && google.accounts) return go();
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true;
    s.onload = go;
    document.head.appendChild(s);
  },
  signOut() {
    sessionStorage.removeItem('idToken');
    location.reload();
  }
};

/* ---------- API 呼叫 ---------- */

const API = {
  async call(action, payload = {}) {
    const idToken = sessionStorage.getItem('idToken') || '';
    if (!idToken) throw new Error('請先登入');
    const res = await fetch(APP_CONFIG.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, idToken, payload })
    });
    const j = await res.json();
    if (!j.ok) throw new Error(j.error || '發生錯誤');
    return j;
  }
};

/* ---------- 顯示格式 ---------- */

const FIELD_LABEL = {
  school_year: '學年', school: '學校', class_name: '班級', student_count: '學生數',
  teacher: '教學者姓名', observer: '觀察者', subject: '學習領域／科目', unit: '單元',
  date: '日期', session_no: '本次為第幾節', session_total: '教學節次（共幾節）',
  device: '載具', platform: '數位學習平臺', mode: '教學模式'
};

function fmtVal(v) {
  if (Array.isArray(v)) return v.length ? v.join('、') : '—';
  if (typeof v === 'boolean') return v ? '✓' : '—';
  const L = LIGHTS.find(l => l.k === v);
  if (L) return L.t;
  return (v === '' || v == null) ? '—' : v;
}

// 唯讀檢視（講師後台、個別紀錄共用）
function renderRecordView(rec) {
  const F = FORMS[rec.form] || { name: rec.form };
  const m = rec.meta || {};
  const meta = Object.keys(FIELD_LABEL)
    .filter(k => m[k] !== undefined && m[k] !== '' && m[k] !== null)
    .map(k => `<tr><th>${FIELD_LABEL[k]}</th><td>${esc(fmtVal(m[k]))}</td></tr>`).join('');

  const items = rec.items || [];
  const chk = {};
  items.forEach(i => { if (i.item_id.endsWith('_chk')) chk[i.item_id.slice(0, -4)] = i.value; });

  const rows = items.filter(i => !i.item_id.endsWith('_chk')).map(i => {
    const c = chk[i.item_id];
    const extra = c === undefined ? '' : (c ? '（已完成）' : '（未完成）');
    return `<tr><td>${esc(i.group)}</td><td>${esc(i.item_label)}</td><td>${esc(fmtVal(i.value) + extra)}</td><td>${esc(i.note || '')}</td></tr>`;
  }).join('');

  const com = Object.entries((rec.data && rec.data.comments) || {})
    .filter(([, v]) => v)
    .map(([k, v]) => `<p><b>${esc(COMMENT_LABEL[k] || k)}</b>：${esc(v)}</p>`).join('')
    || '<p class="muted">（無綜合意見）</p>';

  return `
    <h2>${esc(F.name)}　<span class="muted small">${rec.status === 'final' ? '已完成' : '草稿'}</span></h2>
    <div class="tbl-wrap"><table class="kv">${meta}</table></div>
    <h3>觀察紀錄</h3>
    <div class="tbl-wrap"><table>
      <tr><th>面向</th><th>項目</th><th>結果</th><th>描述</th></tr>${rows}
    </table></div>
    <h3>綜合意見</h3>${com}`;
}
