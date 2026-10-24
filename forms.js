/* 三份表單的題目定義。改題目、改觀察重點只需要改這個檔案。 */

const DEVICES = ['iPad', 'Surface Go', '其他'];
const PLATFORMS = ['因材網', '酷英', '均一', '學習吧', 'PaGamO', '其他'];
const LIGHTS = [
  { k: 'green', e: '🟢', t: '綠燈' },
  { k: 'yellow', e: '🟡', t: '黃燈' },
  { k: 'red', e: '🔴', t: '紅燈' }
];
const MODES = [
  { id: '高引導式', desc: '低自學，中互學／共學，高教師導學' },
  { id: '高協作式', desc: '低自學，高互學／共學，中教師導學' },
  { id: '平衡式', desc: '中自學，中互學／共學，中教師導學' },
  { id: '高自學式', desc: '高自學，中互學／共學，低教師導學' }
];

const HEADER_FIELDS = [
  { k: 'school', l: '學校' },
  { k: 'teacher', l: '教學者姓名' },
  { k: 'observer', l: '觀察者' },
  { k: 'date', l: '日期', t: 'date' },
  { k: 'class_name', l: '班級' },
  { k: 'student_count', l: '學生數', t: 'number' },
  { k: 'subject', l: '學習領域／科目' },
  { k: 'unit', l: '單元' },
  { k: 'session_no', l: '本次為第幾節', t: 'number' },
  { k: 'session_total', l: '教學節次（共幾節）', t: 'number' }
];

const COMMENT_LABEL = {
  objectives: '學習目標與內容', strategy: '教學策略與活動',
  assessment: '評量方法與回饋', climate: '班級經營與氣氛', other: '其他意見'
};

const COMMENTS = [
  { key: 'objectives', label: '學習目標與內容', hint: '學習目標是否明確？內容是否符合學生程度？' },
  { key: 'strategy', label: '教學策略與活動', hint: '科技輔助的策略是否有效？活動設計是否能引起動機？' },
  { key: 'assessment', label: '評量方法與回饋', hint: '評量方式是否多元？教師是否能根據數據即時給予回饋？' },
  { key: 'climate', label: '班級經營與氣氛', hint: '師生互動情況？學生參與度與課堂秩序？' },
  { key: 'other', label: '其他意見' }
];

/* 六大面向檢核圖（補充說明）：顯示於「115 觀課紀錄表」與「數位與教學指引檢核表」內，僅供填寫時參考，不計分、不儲存。 */
const SIX_DIM = [
  { key: 'a1', label: '1. 核心教學活動', items: [
    { id: 'k1', type: 'check', label: '授課內容是否融入「概念評量」或即時測驗？', hint: '動態評量與成績提升具顯著相關性（r=0.079）。' },
    { id: 'k2', type: 'check', label: '是否適時導入 AI 學習夥伴進行回饋？', hint: 'AI 學習夥伴與成績提升具顯著正相關，能激發自主學習。' }
  ]},
  { key: 'a2', label: '2. 工具選擇使用', items: [
    { id: 'k3', type: 'check', label: '針對學科特性配置核心平台（如英語題庫、學習吧）？', hint: '特定學科對應平台之在籍完成率與成效有顯著關聯。' },
    { id: 'k4', type: 'check', label: '整合「作業派發」與「課堂教學」數據佐證？', hint: '此為高頻教學模式，是穩定數位化基礎的關鍵。' }
  ]},
  { key: 'a3', label: '3. 學科功能整合', items: [
    { id: 'k5', type: 'check', label: '是否避免過度沉浸於非學科核心遊戲？', hint: '學習型遊戲等功能應作為誘因而非核心教學。' },
    { id: 'k6', type: 'check', label: '「貼文牆」課程是否包含學習心得記錄或討論？', hint: '教師應導入討論區、筆記功能或共筆創作等互動功能。' },
    { id: 'k7', type: 'check', label: '「教學期」課程是否進行知識節點診斷？', hint: '運用診斷工具作為補救教學與個別補強的基礎。' }
  ]},
  { key: 'a4', label: '4. 教學互動經營', items: [
    { id: 'k8', type: 'check', label: '課堂中安排 1–2 次即時互動（如 Kahoot、Padlet 等）？', hint: '數據顯示短時高頻互動能有效活化教學氣氛。' },
    { id: 'k9', type: 'check', label: '利用平台進行小組即時討論或同步任務？', hint: '補強自動課程營造愉悅的互動氛圍。' }
  ]},
  { key: 'a5', label: '5. 課程任務設計', items: [
    { id: 'k10', type: 'check', label: '明確定義任務「完成」標準（而非僅止於登入）？', hint: '任務完成度為正向指標；進行中／未完成班與成績呈負相關。' },
    { id: 'k11', type: 'check', label: '主動關心「開啟但未完成」之學生並針對原因輔導？', hint: '及時介入能協助低參與學生突破學習卡關問題。' },
    { id: 'k12', type: 'check', label: '設定成就解鎖或進階獎勵機制以維持動能？', hint: '對提升學生持續參與平台任務有顯著吸引效果。' }
  ]},
  { key: 'a6', label: '6. 分群學生輔導', items: [
    { id: 'k13', type: 'check', label: '針對高分群學生：是否有進階挑戰或高效領域材？', hint: '提升數位任務挑戰性，並設「開啟但未完成」卡關點。' },
    { id: 'k14', type: 'check', label: '針對高效自學者：是否提供自學空間？', hint: '提供彈性自學資源，不強制其進行重複性的低階操作。' },
    { id: 'k15', type: 'check', label: '針對數位學習深度投入者：是否引導至同儕教學？', hint: '安排擔任數位學伴或進行反思任務，將高投入轉化為深層學習。' }
  ]}
];
const SUPPLEMENT = {
  title: '六大面向檢核圖（補充說明，供參考，不計分）',
  source: '本補充依屏東縣數位學習推動辦公室（屏東縣數辦）所提供之「數位教學檢核與數據解讀建議」指南整理，僅供填寫觀課紀錄時參考。',
  dims: SIX_DIM
};

const FORMS = {
  /* ---------- 115 觀課紀錄表（屏東縣群校數位學習） ---------- */
  f115: {
    name: '115 觀課紀錄表',
    hintLabel: '觀察重點',
    hasDevice: true,
    modes: MODES,
    comments: COMMENTS,
    sections: [
      { key: 'self', label: '學生自學（個人）', items: [
        { id: 'self1', type: 'score', label: '完成預習，並知道學習目標', hint: '學生進入課堂時能否說出本節目標？' },
        { id: 'self2', type: 'score', label: '筆記和整理學習的內容', hint: '學生是否以自己的方式整理重點？' },
        { id: 'self3', type: 'score', label: '找出學習困難的地方', hint: '學生是否會主動標記不懂的題目？' },
        { id: 'self4', type: 'score', label: '完成多元評量（前後測）', hint: '前後測是否都完成，並有進步的證據？' }
      ]},
      { key: 'group', label: '組內共學（小組）', items: [
        { id: 'grp1', type: 'score', label: '彼此核對及補充答案', hint: '組員是否互相檢查答案並補充說明？' },
        { id: 'grp2', type: 'score', label: '合作解決學習的困難', hint: '困難出現時，組員是否一起討論而非單人解決？' },
        { id: 'grp3', type: 'score', label: '合作展示學習的成果', hint: '每位組員是否都有展示或說明的分工？' }
      ]},
      { key: 'inter', label: '組間互學（跨組／全班）', items: [
        { id: 'int1', type: 'score', label: '相互比較及分析學習成果', hint: '各組是否會比較不同做法的優缺點？' },
        { id: 'int2', type: 'score', label: '相互提出問題及不同意見', hint: '組間提問是否具體、有依據？' },
        { id: 'int3', type: 'score', label: '依據它組的意見修改答案', hint: '學生能否說明自己為何修改答案？' }
      ]},
      { key: 'teacher', label: '教師導學（個人／小組／全班）', items: [
        { id: 'tch1', type: 'score', label: '連結先備知識，並引導學習目標與策略', hint: '教師是否先連結舊經驗再進入新內容？' },
        { id: 'tch2', type: 'score', label: '運用多元評量檢核學習成效', hint: '評量是否包含口頭、作答與數據等多種方式？' },
        { id: 'tch3', type: 'score', label: '根據學習難點給予回饋', hint: '回饋是否針對學生的具體錯誤？' },
        { id: 'tch4', type: 'score', label: '進行學習總結及延伸', hint: '課程結束時是否有總結與延伸問題？' },
        { id: 'tch5', type: 'score', label: '指派課後任務，引導自主學習', hint: '任務是否清楚，學生能否在課後獨立完成？' }
      ]}
    ],
    supplement: SUPPLEMENT
  },

  /* ---------- 數位與教學指引檢核表（附件一＋附件二） ---------- */
  fAI: {
    name: '數位與教學指引檢核表',
    hintLabel: '檢核說明',
    checkText: '已完成此項',
    legend: '🟢 綠燈：鼓勵使用（AI 作為學習輔助工具）　🟡 黃燈：可使用但需查核並標示　🔴 紅燈：不可使用（違反 AI 倫理與學術誠信）',
    comments: COMMENTS,
    sections: [
      { key: 'prep', label: '課程上課之備課階段', items: [
        { id: 'ai_p1', type: 'light', label: '教材準備', hint: '確認並準備所有數位教材和資源，如影片、互動式教學工具等。' },
        { id: 'ai_p2', type: 'light', label: '教學目標', hint: '設定明確的教學目標，符合108課綱的核心素養和學習重點。' },
        { id: 'ai_p3', type: 'light', label: '工具熟悉度', hint: '教師需熟悉使用數位教學工具及平臺，如因材網、CoolEnglish、Padlet等。' },
        { id: 'ai_p4', type: 'light', label: '學生準備', hint: '確認學生具備基本的數位學習能力和工具操作能力。' },
        { id: 'ai_p5', type: 'light', label: '教學計劃', hint: '制定詳細的教學計劃，包括課程流程、活動設計和評量方式。' }
      ]},
      { key: 'act', label: '教學活動', items: [
        { id: 'ai_a1', type: 'light', label: '引導與激發', hint: '透過教學活動引導學生進入學習狀態，並激發學習動機。' },
        { id: 'ai_a2', type: 'light', label: '資源應用', hint: '適時運用數位資源進行教學，如語音辨識系統進行口說練習。' },
        { id: 'ai_a3', type: 'light', label: '小組合作', hint: '設計小組合作活動，促進學生間的互動與協作學習。' },
        { id: 'ai_a4', type: 'light', label: '即時反饋', hint: '透過數位工具即時檢視並反饋學生的學習狀況，進行差異化之教學。' },
        { id: 'ai_a5', type: 'light', label: '多樣化教學', hint: '採用多種數位教學策略，如翻轉教室、自主學習等，提升教學效果。' }
      ]},
      { key: 'post', label: '課後評量', items: [
        { id: 'ai_r1', type: 'light', label: '學習回饋', hint: '收集學生的學習成果，並進行分析與評價。' },
        { id: 'ai_r2', type: 'light', label: '多元評量', hint: '採用多元評量方式，如口說辨識結果、互動問答記錄、成果發表等。' },
        { id: 'ai_r3', type: 'light', label: '改進計劃', hint: '根據評量結果，制定後續教學改進計劃，提升教學質量與學生學習成效。' },
        { id: 'ai_r4', type: 'light', label: '反思與調整', hint: '反思教學過程，根據實際情況進行教學策略的調整與改進。' },
        { id: 'ai_r5', type: 'light', label: '長期跟進', hint: '持續跟進學生的學習進度和成效，提供持續性支持和指導。' }
      ]},
      { key: 'scaffold', label: '附件二：數位教學教案鷹架表（運用手法請勾選 A–G）',
        cols: [
          { k: 'A', t: '內容趣味化' }, { k: 'B', t: '貼近真實情境' },
          { k: 'C', t: '抽象概念具體化' }, { k: 'D', t: '減少時空限制' },
          { k: 'E', t: '學習適性化' }, { k: 'F', t: '重複練習' }, { k: 'G', t: '其他' }
        ],
        items: [
          { id: 'ai_s1', type: 'matrix', label: '教師備課｜1.共同備課' },
          { id: 'ai_s2', type: 'matrix', label: '教師備課｜2.教材統整' },
          { id: 'ai_s3', type: 'matrix', label: '教師備課｜3.其他' },
          { id: 'ai_s4', type: 'matrix', label: '課前課中課後｜1.引起動機' },
          { id: 'ai_s5', type: 'matrix', label: '課前課中課後｜2.學習紀錄' },
          { id: 'ai_s6', type: 'matrix', label: '課前課中課後｜3.討論與溝通' },
          { id: 'ai_s7', type: 'matrix', label: '課前課中課後｜4.搜尋與協作' },
          { id: 'ai_s8', type: 'matrix', label: '課前課中課後｜5.創造與發表' },
          { id: 'ai_s9', type: 'matrix', label: '課前課中課後｜6.測驗與評量' },
          { id: 'ai_s10', type: 'matrix', label: '課前課中課後｜7.學習數據分析' },
          { id: 'ai_s11', type: 'matrix', label: '課前課中課後｜8.差異化教學' },
          { id: 'ai_s12', type: 'matrix', label: '課前課中課後｜9.回饋與修正' },
          { id: 'ai_s13', type: 'matrix', label: '課前課中課後｜10.其他' }
        ]
      }
    ],
    supplement: SUPPLEMENT
  }
};
