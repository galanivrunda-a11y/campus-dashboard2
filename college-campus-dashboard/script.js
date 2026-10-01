/**
 * ==============================================================================
 * COLLEGE CAMPUS - SMART STUDENT DASHBOARD JAVASCRIPT
 * ==============================================================================
 * Welcome to your first "vibe code" project!
 * Every single section below has clear, friendly comments explaining:
 * 1. How LocalStorage persists data so your inputs stay saved across page refreshes.
 * 2. How the DOM (Document Object Model) updates elements on screen.
 * 3. How interactive logic (like attendance calculations and countdown timers) works.
 * ==============================================================================
 */

// Global App State (will be synchronized with browser LocalStorage)
const StorageKeys = {
  THEME: 'campus_theme',
  ATTENDANCE: 'campus_attendance_data',
  ASSIGNMENTS: 'campus_assignments_data',
  TIMETABLE: 'campus_timetable_data',
  EXAM: 'campus_exam_data',
  QUICK_NOTES: 'campus_quick_notes_data',
  NOTES: 'campus_notes_data',
  QUERIES: 'campus_queries_data',
  AI_PLAN: 'campus_ai_study_plan_data',
  EVENTS_RSVP: 'campus_events_rsvp_data'
};

/* ==============================================================================
   SECTION 1: DEFAULT DEMO DATA
   (Used when the user opens the project for the very first time)
   ============================================================================== */

const DEFAULT_ATTENDANCE = [
  { id: 1, code: 'DM', name: 'Discrete Mathematics (DM)', attended: 26, total: 30 },
  { id: 2, code: 'DC', name: 'Data Communication (DC)', attended: 24, total: 28 },
  { id: 3, code: 'ESS', name: 'Environmental Studies & Sustainability (ESS)', attended: 20, total: 22 },
  { id: 4, code: 'IKS', name: 'Indian Knowledge Systems (IKS)', attended: 18, total: 20 },
  { id: 5, code: 'PC', name: 'Professional Communication (PC)', attended: 22, total: 24 },
  { id: 6, code: 'FE', name: 'Fundamentals of Economics (FE)', attended: 25, total: 28 },
  { id: 7, code: 'EEP', name: 'Electrical & Electronics Principles (EEP)', attended: 27, total: 32 },
  { id: 8, code: 'CP', name: 'Computer Programming (CP)', attended: 33, total: 36 }
];

const DEFAULT_TIMETABLE = {
  Monday: [
    { id: 1, subject: 'DM (Discrete Mathematics)', time: '09:00 AM - 10:30 AM', room: 'Hall 302', prof: 'Dr. A. Verma' },
    { id: 2, subject: 'CP Lab (Computer Programming)', time: '11:00 AM - 01:00 PM', room: 'Lab 4B', prof: 'Prof. R. Mehta' },
    { id: 3, subject: 'DC (Data Communication)', time: '02:00 PM - 03:30 PM', room: 'Hall 105', prof: 'Dr. S. Nair' }
  ],
  Tuesday: [
    { id: 4, subject: 'EEP (Electrical & Electronics)', time: '09:30 AM - 11:00 AM', room: 'Circuits Lab', prof: 'Prof. K. Rao' },
    { id: 5, subject: 'FE (Fundamentals of Economics)', time: '11:30 AM - 01:00 PM', room: 'Hall 201', prof: 'Dr. P. Sen' },
    { id: 6, subject: 'PC (Professional Communication)', time: '02:00 PM - 03:30 PM', room: 'Comm Lab', prof: 'Ms. T. Kapoor' }
  ],
  Wednesday: [
    { id: 7, subject: 'IKS (Indian Knowledge Systems)', time: '09:00 AM - 10:30 AM', room: 'Hall 102', prof: 'Dr. B. Shastri' },
    { id: 8, subject: 'ESS (Environmental Studies)', time: '11:00 AM - 12:30 PM', room: 'Hall 204', prof: 'Dr. M. Kulkarni' },
    { id: 9, subject: 'CP (Computer Programming)', time: '02:00 PM - 04:00 PM', room: 'Hall 302', prof: 'Prof. R. Mehta' }
  ],
  Thursday: [
    { id: 10, subject: 'DC (Data Communication)', time: '09:00 AM - 10:30 AM', room: 'Hall 105', prof: 'Dr. S. Nair' },
    { id: 11, subject: 'DM (Discrete Mathematics)', time: '11:00 AM - 12:30 PM', room: 'Hall 302', prof: 'Dr. A. Verma' },
    { id: 12, subject: 'EEP Lab (Electrical & Electronics)', time: '02:00 PM - 04:00 PM', room: 'Lab 2A', prof: 'Prof. K. Rao' }
  ],
  Friday: [
    { id: 13, subject: 'FE (Fundamentals of Economics)', time: '09:00 AM - 10:30 AM', room: 'Hall 201', prof: 'Dr. P. Sen' },
    { id: 14, subject: 'ESS (Environmental Studies)', time: '11:00 AM - 12:30 PM', room: 'Hall 204', prof: 'Dr. M. Kulkarni' },
    { id: 15, subject: 'PC (Professional Communication)', time: '02:00 PM - 03:30 PM', room: 'Auditorium B', prof: 'Ms. T. Kapoor' }
  ],
  Saturday: [
    { id: 16, subject: 'CP Coding Club & Hackathon Practice', time: '10:00 AM - 01:00 PM', room: 'Open Lab 1', prof: 'Student Council' }
  ]
};

const DEFAULT_ASSIGNMENTS = [
  { id: 1, title: 'Implement Sorting Algorithms & Pointers in C++', subject: 'CP (Computer Programming)', dueDate: '2026-10-05', priority: 'High', notes: 'Submit clean GitHub repo with test cases.', completed: false },
  { id: 2, title: 'Graph Theory & Relations Mathematical Proofs', subject: 'DM (Discrete Mathematics)', dueDate: '2026-10-08', priority: 'High', notes: 'Solve Exercise 4.2 questions 1-15.', completed: false },
  { id: 3, title: 'Nyquist & Shannon Channel Capacity Numericals', subject: 'DC (Data Communication)', dueDate: '2026-10-12', priority: 'Medium', notes: 'Include step-by-step SNR calculations.', completed: true },
  { id: 4, title: 'Campus Carbon Footprint & Waste Audit Report', subject: 'ESS (Environmental Studies)', dueDate: '2026-10-15', priority: 'Medium', notes: 'Max 4 pages PDF with photo audit.', completed: false },
  { id: 5, title: 'Sulba Sutras Geometry & Vedic Mathematics Essay', subject: 'IKS (Indian Knowledge Systems)', dueDate: '2026-10-18', priority: 'Low', notes: 'Compare Baudhayana theorem with Pythagoras theorem.', completed: false },
  { id: 6, title: 'Technical Presentation on Agile & Scrum Workflow', subject: 'PC (Professional Communication)', dueDate: '2026-10-21', priority: 'Medium', notes: 'Prepare 8-minute slide deck with Q&A.', completed: false },
  { id: 7, title: 'Supply, Demand & Market Equilibrium Case Study', subject: 'FE (Fundamentals of Economics)', dueDate: '2026-10-24', priority: 'Low', notes: 'Analyze price elasticity of tech hardware.', completed: false },
  { id: 8, title: 'Kirchhoff Laws & AC Circuit Simulation', subject: 'EEP (Electrical & Electronics)', dueDate: '2026-10-27', priority: 'High', notes: 'Simulate RLC resonant circuit on Tinkercad.', completed: false }
];

const DEFAULT_NOTES = [
  {
    id: 1,
    title: 'Propositional Logic, Sets & Graph Theory Cheat Sheet',
    subject: 'DM',
    content: 'Tautology: Always true statement (p ∨ ¬p).\nDe Morgan\'s Laws: ¬(p ∧ q) ≡ ¬p ∨ ¬q and ¬(p ∨ q) ≡ ¬p ∧ ¬q.\nEuler Path: A path that visits every edge exactly once. Connected graph has Euler circuit iff every vertex has even degree.\nHamiltonian Path: Visits every vertex exactly once (NP-Complete problem).',
    date: 'Sep 24, 2026'
  },
  {
    id: 2,
    title: 'OSI 7-Layer Architecture & Signal Transmission Formulas',
    subject: 'DC',
    content: 'Layers: Physical -> Data Link -> Network -> Transport -> Session -> Presentation -> Application.\nNyquist Bitrate (Noiseless): BitRate = 2 * B * log2(L)\nShannon Capacity (Noisy): C = B * log2(1 + SNR)\nAttenuation (dB): 10 * log10(P2 / P1)',
    date: 'Sep 27, 2026'
  },
  {
    id: 3,
    title: 'Pointers, Dynamic Memory & Time Complexity in C/C++',
    subject: 'CP',
    content: 'Pointer basics: int *ptr = &val; *ptr dereferences the memory address.\nDynamic allocation: int *arr = (int*)malloc(n * sizeof(int)); free(arr); or in C++: int *arr = new int[n]; delete[] arr;\nBig-O Hierarchy: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n)',
    date: 'Sep 29, 2026'
  },
  {
    id: 4,
    title: 'Kirchhoff\'s Laws & Thevenin Theorem Analysis',
    subject: 'EEP',
    content: 'KCL (Current Law): Sum of currents entering a junction = sum of currents leaving (Conservation of Charge).\nKVL (Voltage Law): Algebraic sum of voltages around any closed loop = 0 (Conservation of Energy).\nThevenin Theorem: Any linear circuit with voltage sources and resistances can be replaced by Vth in series with Rth.',
    date: 'Sep 30, 2026'
  },
  {
    id: 5,
    title: 'Ecosystems, Carbon Cycles & Biodiversity Conservation',
    subject: 'ESS',
    content: 'Trophic Levels: Producers -> Primary Consumers -> Secondary Consumers -> Apex Predators (10% Energy Transfer Law).\nCarbon Footprint: Total greenhouse gas emissions caused directly and indirectly.\nSDG 13: Climate Action & Sustainable Urban Waste Systems.',
    date: 'Oct 01, 2026'
  },
  {
    id: 6,
    title: 'Indian Knowledge Systems (IKS): Sciences, Mathematics & Astronomy',
    subject: 'IKS',
    content: 'Sulba Sutras: Ancient Sanskrit texts on geometry and altars construction.\nAryabhatiya: Place-value system, zero concept, and approximation of pi (3.1416).\nAyurveda: Tridosha theory (Vata, Pitta, Kapha) and holistic preventive health sciences.',
    date: 'Oct 01, 2026'
  }
];

const DEFAULT_BOOKS = [
  { id: 1, title: 'Discrete Mathematics and Its Applications', author: 'Kenneth H. Rosen (DM)', status: 'Reading', rating: '⭐⭐⭐⭐⭐' },
  { id: 2, title: 'Data Communications and Networking', author: 'Behrouz A. Forouzan (DC)', status: 'Completed', rating: '⭐⭐⭐⭐⭐' },
  { id: 3, title: 'The C Programming Language (ANSI C)', author: 'Brian Kernighan & Dennis Ritchie (CP)', status: 'Reading', rating: '⭐⭐⭐⭐⭐' },
  { id: 4, title: 'Basic Electrical & Electronics Engineering', author: 'D.P. Kothari & I.J. Nagrath (EEP)', status: 'Reading', rating: '⭐⭐⭐⭐☆' },
  { id: 5, title: 'Principles of Economics (Micro & Macro)', author: 'N. Gregory Mankiw (FE)', status: 'Want to Read', rating: '⭐⭐⭐⭐☆' },
  { id: 6, title: 'Environmental Studies: From Crisis to Cure', author: 'R. Rajagopalan (ESS)', status: 'Want to Read', rating: '⭐⭐⭐⭐⭐' },
  { id: 7, title: 'Technical Communication: Principles and Practice', author: 'Meenakshi Raman (PC)', status: 'Reading', rating: '⭐⭐⭐⭐☆' },
  { id: 8, title: 'Introduction to Indian Knowledge System', author: 'B. Mahadevan (IKS)', status: 'Completed', rating: '⭐⭐⭐⭐⭐' }
];

const DEFAULT_EVENTS = [
  { id: 1, title: 'HackSphere 2026: 36hr National Hackathon', date: 'Oct 14-16, 2026', time: '09:00 AM Onwards', venue: 'Campus Innovation Center', category: 'Tech Fest', bannerColor: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', icon: 'fa-laptop-code' },
  { id: 2, title: 'AI & Neural Networks Industry Keynote', date: 'Oct 19, 2026', time: '03:00 PM - 05:00 PM', venue: 'Main University Auditorium', category: 'Guest Lecture', bannerColor: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)', icon: 'fa-microchip' },
  { id: 3, title: 'Vibrance 2026: Annual Inter-College Cultural Gala', date: 'Nov 02-04, 2026', time: '05:00 PM - 10:00 PM', venue: 'Open Air Amphitheatre', category: 'Cultural Fest', bannerColor: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)', icon: 'fa-masks-theater' }
];

const DEFAULT_SPORTS = [
  { id: 1, name: 'Inter-Department Basketball League', time: 'Tue & Thu • 05:30 PM', venue: 'Court 1, Sports Arena', status: 'Registrations Open', category: 'basketball', icon: 'fa-basketball' },
  { id: 2, name: 'Campus Football Championship', time: 'Saturdays • 04:00 PM', venue: 'Main University Stadium', status: 'Ongoing Matches', category: 'football', icon: 'fa-futbol' },
  { id: 3, name: 'Open Badminton Tournament', time: 'Every Friday • 06:00 PM', venue: 'Indoor Sports Hall', status: 'Registrations Open', category: 'badminton', icon: 'fa-table-tennis-paddle-ball' },
  { id: 4, name: 'College Esports Valorant / BGMI League', time: 'Sundays • 07:00 PM', venue: 'Gaming Lounge & Online', status: 'Starting Next Week', category: 'esports', icon: 'fa-gamepad' }
];

const DEFAULT_QUERIES = [
  {
    id: 1,
    category: 'Examinations & Hall Ticket',
    subject: 'DM & DC mid-term mark sheet re-evaluation query',
    message: 'Respected Examination Branch, could you please clarify the deadline and process for applying for re-evaluation in Discrete Mathematics (DM) and Data Communication (DC)?',
    status: 'Resolved',
    reply: 'Dean Office: The re-evaluation portal will remain open until Oct 10th on the student intranet. No physical form required.'
  },
  {
    id: 2,
    category: 'Academics & Syllabus',
    subject: 'CP & EEP Lab Extra Sessions Request',
    message: 'Hello, our class is requesting one extra practical lab session before our upcoming mid-terms for Computer Programming (CP) and EEP circuit simulations.',
    status: 'In Progress',
    reply: 'Faculty: Noted. Lab 4B and the Circuits Lab have been reserved this Saturday from 02:00 PM to 04:00 PM for open practice.'
  }
];

const STUDY_TIPS = [
  "Use the Feynman Technique: Try explaining your Discrete Mathematics (DM) and Computer Programming (CP) concepts out loud as if teaching a beginner. It immediately exposes hidden knowledge gaps!",
  "Pomodoro Mastery: Study with 25 minutes of intense, single-task focus followed by a 5-minute screen-free break. Take a 20-minute break after 4 rounds.",
  "Spaced Repetition: Review your lecture notes within 24 hours of class, then after 3 days, and again after 1 week. This stops the Ebbinghaus forgetting curve.",
  "Active Recall beats passive re-reading: Close your textbook and write down everything you remember on a blank piece of paper. Test yourself frequently on DC, EEP, and FE.",
  "Interleaved Practice: Instead of spending 5 hours on just one subject, mix 2 hours of Discrete Mathematics (DM) with 2 hours of Data Communication (DC). It strengthens problem discrimination!"
];

/* ==============================================================================
   SECTION 2: INITIALIZATION & LOCALSTORAGE MANAGEMENT
   ============================================================================== */

/**
 * Loads data from localStorage or falls back to the default dataset.
 * Helper function to keep data persistence code clean and simple.
 */
function loadData(key, fallbackData) {
  try {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error(`Error loading ${key} from LocalStorage:`, error);
  }
  return fallbackData;
}

/**
 * Saves data into browser localStorage as a JSON string.
 */
function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to LocalStorage:`, error);
  }
}

// In-memory runtime data loaded from LocalStorage
let attendanceData = loadData(StorageKeys.ATTENDANCE, DEFAULT_ATTENDANCE);
let timetableData = loadData(StorageKeys.TIMETABLE, DEFAULT_TIMETABLE);
let assignmentsData = loadData(StorageKeys.ASSIGNMENTS, DEFAULT_ASSIGNMENTS);
let notesData = loadData(StorageKeys.NOTES, DEFAULT_NOTES);
let booksData = loadData('campus_books_data', DEFAULT_BOOKS);
let queriesData = loadData(StorageKeys.QUERIES, DEFAULT_QUERIES);
let activeAiPlan = loadData(StorageKeys.AI_PLAN, null);
let rsvpEvents = loadData(StorageKeys.EVENTS_RSVP, []);

// Upgrade/Sync check: automatically upgrade cached data to the new 8 subjects (DM, DC, ESS, IKS, PC, FE, EEP, CP)
if (!attendanceData || !attendanceData.some(s => s.code === 'DM' || s.code === 'CP')) {
  attendanceData = DEFAULT_ATTENDANCE;
  saveData(StorageKeys.ATTENDANCE, attendanceData);

  timetableData = DEFAULT_TIMETABLE;
  saveData(StorageKeys.TIMETABLE, timetableData);

  assignmentsData = DEFAULT_ASSIGNMENTS;
  saveData(StorageKeys.ASSIGNMENTS, assignmentsData);

  notesData = DEFAULT_NOTES;
  saveData(StorageKeys.NOTES, notesData);

  booksData = DEFAULT_BOOKS;
  saveData('campus_books_data', booksData);

  activeAiPlan = generateSmartStudyPlan('CP (Computer Programming)', 5, 4, 'Moderate');
  saveData(StorageKeys.AI_PLAN, activeAiPlan);
}

// Exam Target Data
let examData = loadData(StorageKeys.EXAM, {
  name: 'End-Semester Examinations (DM, DC, ESS, IKS, PC, FE, EEP, CP)',
  targetDate: '2026-10-20T10:00:00'
});

/* ==============================================================================
   SECTION 3: THEME TOGGLE (DARK / LIGHT MODE)
   ============================================================================== */

/**
 * Initializes and toggles Dark / Light Mode with LocalStorage memory.
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = themeToggleBtn.querySelector('.theme-btn-label');
  const htmlRoot = document.documentElement;

  // Retrieve existing preference or system preference
  const savedTheme = localStorage.getItem(StorageKeys.THEME) || 'light';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    saveData(StorageKeys.THEME, newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode 🌓`, 'info');
  });

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun theme-icon';
      themeIcon.style.color = '#f59e0b';
      if (themeLabel) themeLabel.textContent = 'Light Mode';
    } else {
      themeIcon.className = 'fa-solid fa-moon theme-icon';
      themeIcon.style.color = '#4f46e5';
      if (themeLabel) themeLabel.textContent = 'Dark Mode';
    }
  }
}

/* ==============================================================================
   SECTION 4: NAVIGATION & SIDEBAR (DESKTOP + MOBILE)
   ============================================================================== */

/**
 * Handles switching between dashboard tabs/sections smoothly.
 */
function navigateTo(sectionId) {
  // Update nav item active states
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.dataset.section === sectionId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Switch visible section
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(section => {
    if (section.id === sectionId) {
      section.classList.add('active-section');
    } else {
      section.classList.remove('active-section');
    }
  });

  // Close mobile sidebar if open
  closeMobileSidebar();

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = link.dataset.section;
      if (targetSection) {
        navigateTo(targetSection);
      }
    });
  });

  // Mobile menu open / close listeners
  const mobileToggleBtn = document.getElementById('mobileMenuToggle');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebar = document.getElementById('sidebar');

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => {
      sidebar.classList.add('mobile-open');
      sidebarOverlay.classList.add('show');
    });
  }

  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (sidebarOverlay) sidebarOverlay.classList.remove('show');
}

/* ==============================================================================
   SECTION 5: LIVE CLOCK & GREETING
   ============================================================================== */

function updateLiveClock() {
  const clockElement = document.getElementById('liveDateTime');
  const greetingElement = document.getElementById('greetingMessage');
  
  const now = new Date();
  
  // Format Date and Time
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const formattedDateTime = now.toLocaleDateString('en-US', options);

  if (clockElement) {
    clockElement.innerHTML = `<i class="fa-regular fa-clock"></i> ${formattedDateTime}`;
  }

  // Dynamic greeting based on current hour
  const hour = now.getHours();
  let greeting = 'Good day';
  if (hour >= 5 && hour < 12) greeting = 'Good morning';
  else if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17 && hour < 22) greeting = 'Good evening';
  else greeting = 'Burning the midnight oil';

  if (greetingElement) {
    greetingElement.innerHTML = `${greeting}, Vrunda! 👋`;
  }
}

/* ==============================================================================
   SECTION 6: ATTENDANCE TRACKER LOGIC
   ============================================================================== */

/**
 * Renders subject attendance cards, calculates overall health & bunk statistics.
 */
function renderAttendance() {
  const container = document.getElementById('subjectsAttendanceContainer');
  if (!container) return;

  container.innerHTML = '';

  let totalAttended = 0;
  let totalConducted = 0;

  attendanceData.forEach(subject => {
    totalAttended += subject.attended;
    totalConducted += subject.total;

    // Calculate percentage
    const pct = subject.total > 0 ? ((subject.attended / subject.total) * 100).toFixed(1) : 0;
    
    // Determine color class
    let colorClass = 'high';
    let fillClass = 'fill-green';
    if (pct < 75) {
      colorClass = 'low';
      fillClass = 'fill-red';
    } else if (pct < 80) {
      colorClass = 'medium';
      fillClass = 'fill-amber';
    }

    // Bunk calculation formula:
    // If pct >= 75%: How many more classes can you miss without dropping below 75%?
    // Formula: floor((attended - 0.75 * total) / 0.75)
    // If pct < 75%: How many consecutive classes must you attend to reach 75%?
    // Formula: ceil((0.75 * total - attended) / 0.25)
    let bunkAdvice = '';
    if (pct >= 75) {
      const canBunk = Math.floor((subject.attended - 0.75 * subject.total) / 0.75);
      if (canBunk > 0) {
        bunkAdvice = `<span class="bunk-status bunk-safe"><i class="fa-solid fa-circle-check"></i> Can safely miss ${canBunk} more lecture${canBunk > 1 ? 's' : ''}</span>`;
      } else {
        bunkAdvice = `<span class="bunk-status bunk-safe"><i class="fa-solid fa-triangle-exclamation"></i> On the edge! Attend next class.</span>`;
      }
    } else {
      const needToAttend = Math.ceil((0.75 * subject.total - subject.attended) / 0.25);
      bunkAdvice = `<span class="bunk-status bunk-alert"><i class="fa-solid fa-triangle-exclamation"></i> Attend next ${needToAttend} classes to reach 75%!</span>`;
    }

    const card = document.createElement('div');
    card.className = 'subj-att-card';
    card.innerHTML = `
      <div class="subj-header">
        <div>
          <span class="subj-code">${subject.code}</span>
          <h4>${subject.name}</h4>
        </div>
        <div class="subj-pct ${colorClass}">${pct}%</div>
      </div>

      <div class="progress-bar-bg">
        <div class="progress-bar-fill ${fillClass}" style="width: ${Math.min(pct, 100)}%;"></div>
      </div>

      <div class="subj-stats-row">
        <span>Attended: <strong>${subject.attended}/${subject.total}</strong></span>
        ${bunkAdvice}
      </div>

      <div class="subj-actions">
        <button class="btn-att btn-att-present" onclick="markAttendance(${subject.id}, true)">
          <i class="fa-solid fa-check"></i> Present (+1)
        </button>
        <button class="btn-att btn-att-absent" onclick="markAttendance(${subject.id}, false)">
          <i class="fa-solid fa-xmark"></i> Absent (+1)
        </button>
        <button class="btn-att btn-att-reset" title="Reset Subject" onclick="resetSubjectAttendance(${subject.id})">
          <i class="fa-solid fa-rotate-left"></i>
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  // Calculate Overall Statistics
  const overallPct = totalConducted > 0 ? ((totalAttended / totalConducted) * 100).toFixed(1) : 0;

  // Update Summary Card
  const percentageText = document.getElementById('overallAttendancePercentage');
  const circlePath = document.getElementById('overallAttendanceCircle');
  const attendedNumEl = document.getElementById('totalClassesAttendedNum');
  const conductedNumEl = document.getElementById('totalClassesConductedNum');
  const quickStatEl = document.getElementById('quickStatAttendance');
  const sidebarBadge = document.getElementById('sidebarAttendanceBadge');

  if (percentageText) percentageText.textContent = `${overallPct}%`;
  if (circlePath) circlePath.setAttribute('stroke-dasharray', `${Math.min(overallPct, 100)}, 100`);
  if (attendedNumEl) attendedNumEl.textContent = totalAttended;
  if (conductedNumEl) conductedNumEl.textContent = totalConducted;
  if (quickStatEl) quickStatEl.textContent = `${overallPct}%`;
  if (sidebarBadge) sidebarBadge.textContent = `${overallPct}%`;

  // Summary Advice
  const adviceEl = document.getElementById('attendanceSummaryAdvice');
  if (adviceEl) {
    if (overallPct >= 80) {
      adviceEl.textContent = '🌟 Excellent! You are comfortably above the college 75% minimum requirement.';
    } else if (overallPct >= 75) {
      adviceEl.textContent = '⚠️ Attention: You are close to the 75% danger zone. Don\'t miss lectures this week.';
    } else {
      adviceEl.textContent = '🚨 Warning: Attendance below 75%! You risk examination debarment if unaddressed.';
    }
  }

  // Persist to LocalStorage
  saveData(StorageKeys.ATTENDANCE, attendanceData);
}

/**
 * Mark present or absent for a specific subject
 */
function markAttendance(subjectId, isPresent) {
  const subject = attendanceData.find(s => s.id === subjectId);
  if (!subject) return;

  subject.total += 1;
  if (isPresent) {
    subject.attended += 1;
    showToast(`Marked Present in ${subject.name}! 👍`, 'success');
  } else {
    showToast(`Marked Absent in ${subject.name}`, 'info');
  }

  renderAttendance();
}

/**
 * Reset count for a specific subject
 */
function resetSubjectAttendance(subjectId) {
  const subject = attendanceData.find(s => s.id === subjectId);
  if (!subject) return;

  if (confirm(`Reset attendance counts for ${subject.name}?`)) {
    subject.attended = 0;
    subject.total = 0;
    renderAttendance();
    showToast(`Reset attendance for ${subject.name}`, 'info');
  }
}

/**
 * Add a new custom subject to attendance tracker
 */
function initAddSubject() {
  const addBtn = document.getElementById('addNewSubjectBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const name = prompt('Enter Subject Name (e.g., Cloud Computing):');
      if (!name || !name.trim()) return;

      const code = prompt('Enter Subject Code (e.g., CS406):') || 'CS' + (400 + attendanceData.length + 1);

      const newSubject = {
        id: Date.now(),
        code: code.trim().toUpperCase(),
        name: name.trim(),
        attended: 0,
        total: 0
      };

      attendanceData.push(newSubject);
      renderAttendance();
      showToast(`Subject "${name}" added to Attendance!`, 'success');
    });
  }
}

/* ==============================================================================
   SECTION 7: TIME-TABLE LOGIC & DAY SWITCHER
   ============================================================================== */

let currentTimetableDay = 'Monday';

function renderTimetable(dayName) {
  currentTimetableDay = dayName;
  const container = document.getElementById('timetableSlotsContainer');
  if (!container) return;

  container.innerHTML = '';
  const daySlots = timetableData[dayName] || [];

  if (daySlots.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <i class="fa-solid fa-mug-hot" style="font-size: 2.5rem; margin-bottom: 0.8rem; color: var(--accent);"></i>
        <h3>No classes scheduled for ${dayName}!</h3>
        <p>Enjoy your free time or schedule a study group session.</p>
      </div>
    `;
    return;
  }

  daySlots.forEach(slot => {
    const card = document.createElement('div');
    card.className = 'timetable-slot-card';
    card.innerHTML = `
      <button class="slot-delete-btn" onclick="deleteTimetableSlot('${dayName}', ${slot.id})" title="Delete Slot">
        <i class="fa-solid fa-trash-can"></i>
      </button>
      <div class="slot-time-badge">
        <i class="fa-regular fa-clock"></i> ${slot.time}
      </div>
      <h3 class="slot-subject">${slot.subject}</h3>
      <div class="slot-meta">
        <span><i class="fa-solid fa-location-dot"></i> <strong>Room:</strong> ${slot.room}</span>
        <span><i class="fa-solid fa-chalkboard-user"></i> <strong>Faculty:</strong> ${slot.prof}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

/**
 * Render Today's preview schedule in the Dashboard Overview card
 */
function renderDashboardSchedulePreview() {
  const previewContainer = document.getElementById('dashSchedulePreview');
  const dayLabel = document.getElementById('dashTodayDayName');
  if (!previewContainer) return;

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = new Date().getDay();
  let todayName = daysOfWeek[todayIndex];

  // If Sunday, default preview to Monday
  if (todayName === 'Sunday') todayName = 'Monday';

  if (dayLabel) dayLabel.textContent = `${todayName} Schedule`;

  const slots = timetableData[todayName] || [];
  previewContainer.innerHTML = '';

  if (slots.length === 0) {
    previewContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem;">No classes today. Time for revision!</p>';
    return;
  }

  slots.slice(0, 3).forEach((slot, index) => {
    const item = document.createElement('div');
    item.className = 'schedule-item';
    item.innerHTML = `
      <div class="sched-time">${slot.time.split('-')[0].trim()}</div>
      <div class="sched-details">
        <h4>${slot.subject}</h4>
        <p><i class="fa-solid fa-location-dot"></i> ${slot.room} • ${slot.prof}</p>
      </div>
      <span class="sched-badge">${index === 0 ? 'Next Class' : 'Upcoming'}</span>
    `;
    previewContainer.appendChild(item);
  });
}

function initTimetable() {
  const dayTabs = document.querySelectorAll('.day-tab');
  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTimetable(tab.dataset.day);
    });
  });

  // Set today's tab as active initially
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysOfWeek[new Date().getDay()];
  const activeTab = document.querySelector(`.day-tab[data-day="${todayName}"]`);
  if (activeTab) {
    dayTabs.forEach(t => t.classList.remove('active'));
    activeTab.classList.add('active');
    renderTimetable(todayName);
  } else {
    renderTimetable('Monday');
  }

  // Add Class Slot Form Submission
  const addClassForm = document.getElementById('addClassForm');
  if (addClassForm) {
    addClassForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const day = document.getElementById('slotDay').value;
      const subject = document.getElementById('slotSubject').value;
      const time = document.getElementById('slotTime').value;
      const room = document.getElementById('slotRoom').value;
      const prof = document.getElementById('slotProfessor').value;

      if (!timetableData[day]) timetableData[day] = [];

      timetableData[day].push({
        id: Date.now(),
        subject,
        time,
        room,
        prof
      });

      saveData(StorageKeys.TIMETABLE, timetableData);
      renderTimetable(currentTimetableDay);
      renderDashboardSchedulePreview();
      closeModal('addClassModal');
      addClassForm.reset();
      showToast(`Class slot added to ${day}!`, 'success');
    });
  }

  renderDashboardSchedulePreview();
}

function deleteTimetableSlot(dayName, slotId) {
  if (!timetableData[dayName]) return;
  timetableData[dayName] = timetableData[dayName].filter(s => s.id !== slotId);
  saveData(StorageKeys.TIMETABLE, timetableData);
  renderTimetable(dayName);
  renderDashboardSchedulePreview();
  showToast('Class slot removed', 'info');
}

/* ==============================================================================
   SECTION 8: EXAM COUNTDOWN TIMER
   ============================================================================== */

function updateCountdownTimer() {
  const target = new Date(examData.targetDate).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  // Calculate days, hours, minutes, seconds
  let days = 0, hours = 0, minutes = 0, seconds = 0;

  if (diff > 0) {
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((diff % (1000 * 60)) / 1000);
  }

  // Format with leading zeros
  const pad = (num) => String(num).padStart(2, '0');

  // Update Big Timer Display
  const bigDays = document.getElementById('bigDays');
  const bigHours = document.getElementById('bigHours');
  const bigMins = document.getElementById('bigMins');
  const bigSecs = document.getElementById('bigSecs');

  if (bigDays) bigDays.textContent = pad(days);
  if (bigHours) bigHours.textContent = pad(hours);
  if (bigMins) bigMins.textContent = pad(minutes);
  if (bigSecs) bigSecs.textContent = pad(seconds);

  // Update Mini Dashboard Clock
  const dashDays = document.getElementById('dashDays');
  const dashHours = document.getElementById('dashHours');
  const dashMins = document.getElementById('dashMins');
  const dashSecs = document.getElementById('dashSecs');
  const quickStatDays = document.getElementById('quickStatExamDays');
  const quickStatExamName = document.getElementById('quickStatExamName');

  if (dashDays) dashDays.textContent = pad(days);
  if (dashHours) dashHours.textContent = pad(hours);
  if (dashMins) dashMins.textContent = pad(minutes);
  if (dashSecs) dashSecs.textContent = pad(seconds);
  if (quickStatDays) quickStatDays.textContent = `${days} Days`;
  if (quickStatExamName) quickStatExamName.textContent = examData.name;
}

function initExamCountdown() {
  const mainExamTitle = document.getElementById('mainExamTitle');
  const dashExamTitle = document.getElementById('dashExamTitle');
  const dateFormatted = document.getElementById('mainExamDateFormatted');
  const customExamNameInput = document.getElementById('customExamNameInput');
  const customExamDateInput = document.getElementById('customExamDateInput');
  const saveBtn = document.getElementById('saveCustomExamBtn');

  // Populate titles
  if (mainExamTitle) mainExamTitle.textContent = examData.name;
  if (dashExamTitle) dashExamTitle.textContent = examData.name;
  if (dateFormatted) {
    const formatted = new Date(examData.targetDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    dateFormatted.textContent = `Target Date: ${formatted} • Morning Shift`;
  }

  // Set inputs default
  if (customExamNameInput) customExamNameInput.value = examData.name;
  if (customExamDateInput) customExamDateInput.value = examData.targetDate.split('T')[0];

  // Save Custom Exam Button
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const newName = customExamNameInput.value.trim();
      const newDate = customExamDateInput.value;

      if (!newName || !newDate) {
        showToast('Please specify both exam name and date', 'error');
        return;
      }

      examData = {
        name: newName,
        targetDate: `${newDate}T09:00:00`
      };

      saveData(StorageKeys.EXAM, examData);
      if (mainExamTitle) mainExamTitle.textContent = examData.name;
      if (dashExamTitle) dashExamTitle.textContent = examData.name;
      if (dateFormatted) {
        const formatted = new Date(examData.targetDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        dateFormatted.textContent = `Target Date: ${formatted} • Morning Shift`;
      }

      updateCountdownTimer();
      showToast('Exam countdown target updated!', 'success');
    });
  }

  // Run initial tick and schedule interval
  updateCountdownTimer();
  setInterval(updateCountdownTimer, 1000);
}

/* ==============================================================================
   SECTION 9: AI STUDY PLANNER (SIMULATED SMART GENERATOR)
   ============================================================================== */

/**
 * Generates an active learning study roadmap with spaced milestones
 */
function generateSmartStudyPlan(subject, days, dailyHours, difficulty) {
  const plan = [];
  const totalHours = days * dailyHours;

  const moduleTemplates = [
    { title: 'Core Concepts & Terminology Deep Dive', focus: 'Active Recall & High-Yield definitions', tag: 'Theory 40%' },
    { title: 'Architectures, Derivations & Diagrams', focus: 'Drawing circuit/system diagrams from memory', tag: 'Visual 25%' },
    { title: 'Numerical Problems & Algorithmic Practice', focus: 'Solving previous 5-year university exam questions', tag: 'Problem Solving' },
    { title: 'Mock Exam Simulation & Timed Drill', focus: 'Strict 90-minute closed book practice test', tag: 'Mock Test' },
    { title: 'Rapid Synthesis & Flashcard Review', focus: 'Final formula cheat sheet creation & weak area review', tag: 'Revision' }
  ];

  for (let i = 1; i <= days; i++) {
    const template = moduleTemplates[(i - 1) % moduleTemplates.length];
    plan.push({
      dayNumber: i,
      title: `Day ${i}: ${template.title}`,
      hours: `${dailyHours} Hours Planned`,
      description: `${template.focus}. Allocate ${Math.round(dailyHours * 0.6)}h to intense focus, followed by active self-testing.`,
      tags: [subject, difficulty, template.tag],
      completed: false
    });
  }

  return {
    subject,
    days,
    dailyHours,
    totalHours,
    difficulty,
    generatedAt: new Date().toLocaleDateString(),
    items: plan
  };
}

function renderAiStudyPlan() {
  const container = document.getElementById('aiPlanTimeline');
  const titleEl = document.getElementById('currentPlanTitle');
  const subtitleEl = document.getElementById('currentPlanSubtitle');
  if (!container) return;

  if (!activeAiPlan || !activeAiPlan.items || activeAiPlan.items.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-wand-magic-sparkles" style="font-size: 2.5rem; color: var(--primary); margin-bottom: 0.8rem;"></i>
        <h4>No Active Study Plan</h4>
        <p>Fill out the configuration form on the left and click "Generate Smart Study Plan" to build your custom schedule!</p>
      </div>
    `;
    if (titleEl) titleEl.textContent = 'Active AI Study Roadmap';
    if (subtitleEl) subtitleEl.textContent = 'Ready to learn efficiently';
    return;
  }

  if (titleEl) titleEl.textContent = `${activeAiPlan.subject} • ${activeAiPlan.days} Day Plan`;
  if (subtitleEl) subtitleEl.textContent = `Total ${activeAiPlan.totalHours} Study Hours • ${activeAiPlan.difficulty} Mode`;

  container.innerHTML = '';
  activeAiPlan.items.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'timeline-item';
    itemEl.innerHTML = `
      <div class="timeline-badge">${item.dayNumber}</div>
      <div class="timeline-content">
        <div class="timeline-header">
          <h4>${item.title}</h4>
          <span class="timeline-time">${item.hours}</span>
        </div>
        <p>${item.description}</p>
        <div class="timeline-tags">
          ${item.tags.map(t => `<span class="timeline-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
    container.appendChild(itemEl);
  });
}

function initAiPlanner() {
  const form = document.getElementById('aiPlannerForm');
  const clearBtn = document.getElementById('clearAiPlanBtn');
  const refreshTipBtn = document.getElementById('refreshAiTipBtn');
  const tipText = document.getElementById('aiDailyTipText');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const subject = document.getElementById('aiSubjectSelect').value;
      const days = parseInt(document.getElementById('aiDaysInput').value) || 5;
      const hours = parseInt(document.getElementById('aiHoursInput').value) || 4;
      const difficulty = document.getElementById('aiDifficultySelect').value;

      activeAiPlan = generateSmartStudyPlan(subject, days, hours, difficulty);
      saveData(StorageKeys.AI_PLAN, activeAiPlan);
      renderAiStudyPlan();
      showToast(`✨ Generated ${days}-Day AI Study Plan for ${subject}!`, 'success');
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear current AI study roadmap?')) {
        activeAiPlan = null;
        localStorage.removeItem(StorageKeys.AI_PLAN);
        renderAiStudyPlan();
        showToast('Study roadmap reset', 'info');
      }
    });
  }

  // Refresh daily AI tip
  if (refreshTipBtn && tipText) {
    refreshTipBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * STUDY_TIPS.length);
      tipText.textContent = `"${STUDY_TIPS[randomIndex]}"`;
      showToast('New study tip loaded!', 'info');
    });
  }

  // Initial render
  if (!activeAiPlan || activeAiPlan.subject.includes('Operating Systems')) {
    // Generate a default plan on first launch
    activeAiPlan = generateSmartStudyPlan('CP (Computer Programming)', 5, 4, 'Moderate');
    saveData(StorageKeys.AI_PLAN, activeAiPlan);
  }
  renderAiStudyPlan();
}

/* ==============================================================================
   SECTION 10: ASSIGNMENTS TRACKER
   ============================================================================== */

let currentAssignmentFilter = 'all';

function renderAssignments() {
  const container = document.getElementById('assignmentsContainer');
  const allCountEl = document.getElementById('allCount');
  const pendingCountEl = document.getElementById('pendingCount');
  const completedCountEl = document.getElementById('completedCount');
  const pendingBadge = document.getElementById('pendingAssignmentsCount');
  const quickStatTasks = document.getElementById('quickStatPendingTasks');
  if (!container) return;

  // Filter items
  let filtered = assignmentsData;
  if (currentAssignmentFilter === 'pending') {
    filtered = assignmentsData.filter(a => !a.completed);
  } else if (currentAssignmentFilter === 'completed') {
    filtered = assignmentsData.filter(a => a.completed);
  }

  // Sort items
  const sortCriteria = document.getElementById('assignmentSortSelect')?.value || 'dueDate';
  filtered.sort((a, b) => {
    if (sortCriteria === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortCriteria === 'priority') {
      const pMap = { High: 3, Medium: 2, Low: 1 };
      return pMap[b.priority] - pMap[a.priority];
    }
    if (sortCriteria === 'subject') return a.subject.localeCompare(b.subject);
    return 0;
  });

  // Update counts
  const totalCount = assignmentsData.length;
  const pendingCount = assignmentsData.filter(a => !a.completed).length;
  const completedCount = assignmentsData.filter(a => a.completed).length;

  if (allCountEl) allCountEl.textContent = totalCount;
  if (pendingCountEl) pendingCountEl.textContent = pendingCount;
  if (completedCountEl) completedCountEl.textContent = completedCount;
  if (pendingBadge) pendingBadge.textContent = pendingCount;
  if (quickStatTasks) quickStatTasks.textContent = `${pendingCount} Tasks`;

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <i class="fa-solid fa-clipboard-check" style="font-size: 2.5rem; color: var(--success); margin-bottom: 0.8rem;"></i>
        <h4>No assignments in this view</h4>
        <p>All caught up or click "+ New Assignment" to add coursework.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(assign => {
    const card = document.createElement('div');
    card.className = `assignment-card ${assign.completed ? 'completed' : ''}`;
    
    // Priority class
    const prioClass = assign.priority.toLowerCase();

    card.innerHTML = `
      <div class="assign-header">
        <span class="assign-subject">${assign.subject}</span>
        <span class="priority-pill priority-${prioClass}">${assign.priority} Priority</span>
      </div>

      <div>
        <h4 class="assign-title">${assign.title}</h4>
        <p class="assign-desc">${assign.notes || 'No extra notes provided.'}</p>
      </div>

      <div class="assign-footer">
        <div class="assign-date">
          <i class="fa-regular fa-calendar"></i> Due: ${assign.dueDate}
        </div>
        <div class="assign-actions">
          <button class="btn-icon-check" onclick="toggleAssignmentStatus(${assign.id})" title="${assign.completed ? 'Mark Incomplete' : 'Mark Completed'}">
            <i class="fa-regular ${assign.completed ? 'fa-circle-check' : 'fa-circle'}"></i>
          </button>
          <button class="btn-icon-del" onclick="deleteAssignment(${assign.id})" title="Delete Assignment">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleAssignmentStatus(id) {
  const item = assignmentsData.find(a => a.id === id);
  if (!item) return;

  item.completed = !item.completed;
  saveData(StorageKeys.ASSIGNMENTS, assignmentsData);
  renderAssignments();
  showToast(item.completed ? 'Assignment marked as completed! 🎉' : 'Assignment moved to pending', 'info');
}

function deleteAssignment(id) {
  assignmentsData = assignmentsData.filter(a => a.id !== id);
  saveData(StorageKeys.ASSIGNMENTS, assignmentsData);
  renderAssignments();
  showToast('Assignment removed', 'info');
}

function initAssignments() {
  // Filter tabs
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentAssignmentFilter = pill.dataset.filter;
      renderAssignments();
    });
  });

  // Sort dropdown
  const sortSelect = document.getElementById('assignmentSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', renderAssignments);
  }

  // Add Assignment Form Modal
  const addForm = document.getElementById('addAssignmentForm');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('assignTitle').value;
      const subject = document.getElementById('assignSubject').value;
      const priority = document.getElementById('assignPriority').value;
      const dueDate = document.getElementById('assignDueDate').value;
      const notes = document.getElementById('assignNotes').value;

      assignmentsData.unshift({
        id: Date.now(),
        title,
        subject,
        priority,
        dueDate,
        notes,
        completed: false
      });

      saveData(StorageKeys.ASSIGNMENTS, assignmentsData);
      renderAssignments();
      closeModal('addAssignmentModal');
      addForm.reset();
      showToast('New assignment added!', 'success');
    });
  }

  renderAssignments();
}

/* ==============================================================================
   SECTION 11: CLASS NOTES & DOWNLOAD CHEAT SHEET
   ============================================================================== */

function renderNotes() {
  const container = document.getElementById('notesContainer');
  if (!container) return;

  const searchQuery = document.getElementById('notesSearchInput')?.value.toLowerCase() || '';
  const subjectFilter = document.getElementById('notesSubjectFilter')?.value || 'all';

  const filtered = notesData.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery) || note.content.toLowerCase().includes(searchQuery);
    const matchesSubject = subjectFilter === 'all' || note.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <i class="fa-regular fa-file-lines" style="font-size: 2.5rem; color: var(--text-subtle); margin-bottom: 0.8rem;"></i>
        <h4>No notes found</h4>
        <p>Try searching different terms or create a new class note.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(note => {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `
      <div>
        <span class="note-subj-tag">${note.subject}</span>
        <h4 class="note-title">${note.title}</h4>
      </div>
      <div class="note-body">${note.content}</div>
      <div class="note-footer">
        <span><i class="fa-regular fa-calendar"></i> ${note.date}</span>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn-link" onclick="downloadNote(${note.id})" title="Download as text file">
            <i class="fa-solid fa-download"></i> Save .txt
          </button>
          <button class="btn-icon-del" onclick="deleteNote(${note.id})" title="Delete Note">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function downloadNote(id) {
  const note = notesData.find(n => n.id === id);
  if (!note) return;

  const content = `===============================\n${note.title.toUpperCase()}\nSubject: ${note.subject}\nDate: ${note.date}\n===============================\n\n${note.content}\n\nDownloaded from College Campus Smart Dashboard`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`Downloaded "${note.title}.txt"! 📥`, 'success');
}

function deleteNote(id) {
  notesData = notesData.filter(n => n.id !== id);
  saveData(StorageKeys.NOTES, notesData);
  renderNotes();
  showToast('Note deleted', 'info');
}

function initNotes() {
  const searchInput = document.getElementById('notesSearchInput');
  const subjectFilter = document.getElementById('notesSubjectFilter');
  const addNoteForm = document.getElementById('addNoteForm');

  if (searchInput) searchInput.addEventListener('input', renderNotes);
  if (subjectFilter) subjectFilter.addEventListener('change', renderNotes);

  if (addNoteForm) {
    addNoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('noteTitle').value;
      const subject = document.getElementById('noteSubject').value;
      const content = document.getElementById('noteContent').value;

      notesData.unshift({
        id: Date.now(),
        title,
        subject,
        content,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });

      saveData(StorageKeys.NOTES, notesData);
      renderNotes();
      closeModal('addNoteModal');
      addNoteForm.reset();
      showToast('Class note saved successfully!', 'success');
    });
  }

  renderNotes();
}

/* ==============================================================================
   SECTION 12: REFERENCE BOOKS CATALOG
   ============================================================================== */

function renderBooks() {
  const container = document.getElementById('booksContainer');
  if (!container) return;

  container.innerHTML = '';
  booksData.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <div class="book-cover">
        <i class="fa-solid fa-book"></i>
      </div>
      <div class="book-details">
        <h4>${book.title}</h4>
        <p class="book-author"><i class="fa-solid fa-user-pen"></i> ${book.author}</p>
        <div class="book-rating">${book.rating}</div>
        <button class="book-status" onclick="cycleBookStatus(${book.id})">
          Status: <strong>${book.status}</strong>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function cycleBookStatus(id) {
  const book = booksData.find(b => b.id === id);
  if (!book) return;

  const states = ['Want to Read', 'Reading', 'Completed'];
  const nextIndex = (states.indexOf(book.status) + 1) % states.length;
  book.status = states[nextIndex];

  saveData('campus_books_data', booksData);
  renderBooks();
  showToast(`Book status set to "${book.status}"`, 'info');
}

function initBooks() {
  const suggestBtn = document.getElementById('suggestBookBtn');
  if (suggestBtn) {
    suggestBtn.addEventListener('click', () => {
      const title = prompt('Enter Book Title:');
      if (!title || !title.trim()) return;

      const author = prompt('Enter Author name(s):') || 'Recommended Faculty Author';

      booksData.push({
        id: Date.now(),
        title: title.trim(),
        author: author.trim(),
        status: 'Want to Read',
        rating: '⭐⭐⭐⭐⭐'
      });

      saveData('campus_books_data', booksData);
      renderBooks();
      showToast(`"${title}" added to your Reading List! 📚`, 'success');
    });
  }

  renderBooks();
}

/* ==============================================================================
   SECTION 13: CAMPUS EVENTS & SPORTS ACTIVITIES
   ============================================================================== */

function renderEvents() {
  const container = document.getElementById('eventsContainer');
  const miniList = document.getElementById('dashEventMiniList');
  if (!container) return;

  container.innerHTML = '';

  DEFAULT_EVENTS.forEach(event => {
    const isRsvpd = rsvpEvents.includes(event.id);
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <div class="event-banner" style="background: ${event.bannerColor};">
        <i class="fa-solid ${event.icon}"></i>
      </div>
      <div class="event-content">
        <div>
          <span class="badge-tag" style="background: var(--primary-light); color: var(--primary);">${event.category}</span>
          <h3 class="event-title">${event.title}</h3>
          <div class="event-meta">
            <span><i class="fa-regular fa-calendar"></i> ${event.date}</span>
            <span><i class="fa-regular fa-clock"></i> ${event.time}</span>
            <span><i class="fa-solid fa-location-dot"></i> ${event.venue}</span>
          </div>
        </div>
        <button class="btn ${isRsvpd ? 'btn-outline' : 'btn-primary'} btn-block" onclick="toggleEventRsvp(${event.id})">
          <i class="fa-solid ${isRsvpd ? 'fa-check' : 'fa-ticket'}"></i> ${isRsvpd ? 'Registered / In Calendar' : 'RSVP Free Pass'}
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  // Render mini preview in dashboard
  if (miniList) {
    miniList.innerHTML = '';
    DEFAULT_EVENTS.slice(0, 2).forEach(ev => {
      const parts = ev.date.split(' ');
      const month = parts[0];
      const day = parts[1]?.replace(',', '') || '15';

      const miniItem = document.createElement('div');
      miniItem.className = 'event-mini-item';
      miniItem.innerHTML = `
        <div class="event-date-badge">
          <span class="day">${day.slice(0, 2)}</span>
          <span class="month">${month}</span>
        </div>
        <div class="event-mini-info">
          <h4>${ev.title}</h4>
          <p><i class="fa-solid fa-location-dot"></i> ${ev.venue}</p>
        </div>
      `;
      miniList.appendChild(miniItem);
    });
  }
}

function toggleEventRsvp(id) {
  if (rsvpEvents.includes(id)) {
    rsvpEvents = rsvpEvents.filter(eventId => eventId !== id);
    showToast('Event RSVP cancelled', 'info');
  } else {
    rsvpEvents.push(id);
    showToast('Ticket reserved & added to your calendar! 🎟️', 'success');
  }
  saveData(StorageKeys.EVENTS_RSVP, rsvpEvents);
  renderEvents();
}

function renderSports() {
  const container = document.getElementById('sportsContainer');
  if (!container) return;

  container.innerHTML = '';
  DEFAULT_SPORTS.forEach(sport => {
    const card = document.createElement('div');
    card.className = 'sport-card';
    card.innerHTML = `
      <div class="sport-banner ${sport.category}">
        <i class="fa-solid ${sport.icon}"></i>
      </div>
      <div class="sport-content">
        <div>
          <span class="status-pill safe">${sport.status}</span>
          <h3 class="sport-title mt-2">${sport.name}</h3>
          <div class="sport-meta">
            <span><i class="fa-regular fa-clock"></i> ${sport.time}</span>
            <span><i class="fa-solid fa-location-dot"></i> ${sport.venue}</span>
          </div>
        </div>
        <button class="btn btn-outline btn-block" onclick="showToast('Registered for ${sport.name} trial session!', 'success')">
          <i class="fa-solid fa-plus"></i> Join Sports Club
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function initSportsAndEvents() {
  const joinSportsBtn = document.getElementById('openJoinSportsModalBtn');
  if (joinSportsBtn) {
    joinSportsBtn.addEventListener('click', () => {
      showToast('Registration open! Visit the Sports Complex reception desk between 4-6 PM.', 'info');
    });
  }

  renderEvents();
  renderSports();
}

/* ==============================================================================
   SECTION 14: STUDENT QUERIES & HELPDESK
   ============================================================================== */

function renderQueries() {
  const container = document.getElementById('queryListContainer');
  const countBadge = document.getElementById('queryTotalCount');
  if (!container) return;

  if (countBadge) countBadge.textContent = `${queriesData.length} Tickets`;

  container.innerHTML = '';

  if (queriesData.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No questions submitted yet. Click "Ask New Query" to connect with staff.</p>';
    return;
  }

  queriesData.forEach(ticket => {
    const card = document.createElement('div');
    card.className = 'query-ticket';
    const isResolved = ticket.status === 'Resolved';

    card.innerHTML = `
      <div class="query-ticket-header">
        <span class="ticket-cat">${ticket.category}</span>
        <span class="ticket-status ${isResolved ? 'status-resolved' : 'status-open'}">${ticket.status}</span>
      </div>
      <h4>${ticket.subject}</h4>
      <p>${ticket.message}</p>
      ${ticket.reply ? `<div class="ticket-reply"><strong>Response:</strong> ${ticket.reply}</div>` : ''}
    `;
    container.appendChild(card);
  });
}

function initQueries() {
  const addForm = document.getElementById('addQueryForm');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const category = document.getElementById('queryCategory').value;
      const subject = document.getElementById('querySubject').value;
      const message = document.getElementById('queryMessage').value;

      const newTicket = {
        id: Date.now(),
        category,
        subject,
        message,
        status: 'In Progress',
        reply: 'Campus Helpdesk received your inquiry. Automated ticket generated.'
      };

      queriesData.unshift(newTicket);
      saveData(StorageKeys.QUERIES, queriesData);
      renderQueries();
      closeModal('addQueryModal');
      addForm.reset();
      showToast('Query submitted! Ticket #0' + Math.floor(100 + Math.random() * 900) + ' created.', 'success');

      // Simulated automated follow-up response after 3 seconds for delightful vibe
      setTimeout(() => {
        newTicket.status = 'Resolved';
        newTicket.reply = `Dean Office: Inquiry logged and addressed. Please check your official college email for confirmation.`;
        saveData(StorageKeys.QUERIES, queriesData);
        renderQueries();
      }, 3500);
    });
  }

  // FAQ Accordion functionality
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

      // If clicked item was not open, open it
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  renderQueries();
}

/* ==============================================================================
   SECTION 15: QUICK STICKY NOTES (LOCALSTORAGE AUTO-SAVE)
   ============================================================================== */

function initQuickNotes() {
  const textarea = document.getElementById('quickNotesTextarea');
  const saveBtn = document.getElementById('saveQuickNotesBtn');
  const clearBtn = document.getElementById('clearQuickNotesBtn');
  const statusPill = document.getElementById('quickNoteStatus');

  if (!textarea) return;

  // Load saved scratchpad text from LocalStorage
  const savedNote = localStorage.getItem(StorageKeys.QUICK_NOTES) || '';
  textarea.value = savedNote;

  // Auto-save on typing with debounced feedback
  let typingTimer;
  textarea.addEventListener('input', () => {
    if (statusPill) statusPill.innerHTML = 'Typing... <i class="fa-solid fa-pen"></i>';
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      localStorage.setItem(StorageKeys.QUICK_NOTES, textarea.value);
      if (statusPill) statusPill.innerHTML = 'Saved <i class="fa-solid fa-check"></i>';
    }, 700);
  });

  // Manual save button
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      localStorage.setItem(StorageKeys.QUICK_NOTES, textarea.value);
      if (statusPill) statusPill.innerHTML = 'Saved <i class="fa-solid fa-check"></i>';
      showToast('Quick sticky note saved!', 'success');
    });
  }

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (textarea.value.trim() && confirm('Clear this sticky note?')) {
        textarea.value = '';
        localStorage.removeItem(StorageKeys.QUICK_NOTES);
        if (statusPill) statusPill.innerHTML = 'Empty <i class="fa-solid fa-circle"></i>';
        showToast('Sticky note cleared', 'info');
      }
    });
  }
}

/* ==============================================================================
   SECTION 16: MODAL POPUPS & TOAST NOTIFICATION HELPERS
   ============================================================================== */

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('show');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('show');
}

function initModals() {
  // Modal opening triggers
  const modalTriggers = [
    { btnId: 'openAddClassModalBtn', modalId: 'addClassModal' },
    { btnId: 'openAddAssignmentModalBtn', modalId: 'addAssignmentModal' },
    { btnId: 'openAddNoteModalBtn', modalId: 'addNoteModal' },
    { btnId: 'openQueryModalBtn', modalId: 'addQueryModal' }
  ];

  modalTriggers.forEach(({ btnId, modalId }) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', () => openModal(modalId));
    }
  });

  // Close buttons (X and Cancel)
  document.querySelectorAll('[data-close]').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modalId = closeBtn.dataset.close;
      closeModal(modalId);
    });
  });

  // Close when clicking modal backdrop outside card
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('show');
      }
    });
  });

  // Print Marksheet button
  const printBtn = document.getElementById('printMarksheetBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Notification Bell Dropdown Toggle
  const notifBellBtn = document.getElementById('notifBellBtn');
  const notifDropdown = document.getElementById('notifDropdown');
  const clearNotifBtn = document.getElementById('clearNotifBtn');

  if (notifBellBtn && notifDropdown) {
    notifBellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!notifDropdown.contains(e.target) && e.target !== notifBellBtn) {
        notifDropdown.classList.remove('show');
      }
    });
  }

  if (clearNotifBtn) {
    clearNotifBtn.addEventListener('click', () => {
      const list = document.getElementById('notifList');
      if (list) list.innerHTML = '<li style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">No new notifications</li>';
      const dot = document.querySelector('.notif-dot');
      if (dot) dot.style.display = 'none';
      showToast('Notifications marked as read', 'info');
    });
  }
}

/**
 * Modern floating Toast Notification
 * @param {string} message - Message to display
 * @param {string} type - 'success', 'error', or 'info'
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${icon} toast-icon"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto remove after 3.2 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==============================================================================
   SECTION 17: GLOBAL SEARCH BAR
   ============================================================================== */

function initGlobalSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;

      // Check if matches a section or subject
      if (query.includes('note')) {
        navigateTo('class-notes');
      } else if (query.includes('exam') || query.includes('count')) {
        navigateTo('exam-countdown');
      } else if (query.includes('time') || query.includes('class')) {
        navigateTo('timetable');
      } else if (query.includes('attend')) {
        navigateTo('attendance');
      } else if (query.includes('assign') || query.includes('task')) {
        navigateTo('assignments');
      } else if (query.includes('plan') || query.includes('ai')) {
        navigateTo('ai-planner');
      } else if (query.includes('sport')) {
        navigateTo('sports');
      } else if (query.includes('result') || query.includes('gpa')) {
        navigateTo('exam-results');
      } else if (query.includes('query') || query.includes('help')) {
        navigateTo('queries');
      } else {
        // Default to notes search
        navigateTo('class-notes');
        const notesSearch = document.getElementById('notesSearchInput');
        if (notesSearch) {
          notesSearch.value = query;
          renderNotes();
        }
      }
      showToast(`Showing search results for "${query}"`, 'info');
      searchInput.value = '';
    }
  });
}

/* ==============================================================================
   APP BOOTSTRAP: RUN WHEN DOM READY
   ============================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 College Campus Dashboard is starting up...');

  // Initialize core systems
  initTheme();
  initNavigation();
  initExamCountdown();
  initAttendance();
  initTimetable();
  initAiPlanner();
  initAssignments();
  initNotes();
  initBooks();
  initSportsAndEvents();
  initQueries();
  initQuickNotes();
  initModals();
  initGlobalSearch();

  // Setup real-time clock
  updateLiveClock();
  setInterval(updateLiveClock, 1000);

  console.log('✅ Dashboard loaded successfully with LocalStorage persistence!');
});

function initAttendance() {
  initAddSubject();
  renderAttendance();
}
