# 🎓 College Campus - Modern Student Smart Dashboard

Welcome to your first **vibe code** project! **College Campus** is a modern, responsive, all-in-one student operating dashboard built with pure **HTML5, CSS3, and Vanilla JavaScript**.

No build tools, no npm packages, and no complex frameworks needed — everything runs directly in your web browser with complete **LocalStorage persistence**!

---

## 🚀 How to Run the Project

1. **Option 1 (Easiest)**:
   - Open File Explorer and navigate to:
     `C:\Users\Vrunda\.gemini\antigravity\scratch\college-campus-dashboard\`
   - Double-click **`index.html`** to launch it in your favorite browser (Chrome, Edge, Firefox, Brave, Safari).

2. **Option 2 (Terminal / PowerShell)**:
   ```powershell
   Start-Process "C:\Users\Vrunda\.gemini\antigravity\scratch\college-campus-dashboard\index.html"
   ```

3. **Recommended Workspace**:
   - Set `C:\Users\Vrunda\.gemini\antigravity\scratch\college-campus-dashboard` as your active workspace in Antigravity or VS Code.

---

## ✨ Features Included

| Feature | Description |
| :--- | :--- |
| 🌓 **Dark & Light Mode** | One-click toggle in top navigation with smooth colors and LocalStorage memory. |
| 📊 **Dashboard Overview** | Quick metric cards (Attendance, Next Exam, Pending Tasks, CGPA) + Today's Schedule. |
| ⏱️ **Live Exam Countdown** | Real-time countdown timer (Days, Hours, Minutes, Seconds) with customizable date & title setter. |
| 📝 **Quick Sticky Notes** | Instant scratchpad with auto-save to LocalStorage as you type. |
| 📋 **Smart Attendance Tracker** | Interactive (+1 Present, +1 Absent, Reset), bunk calculator (>75% allowance / required classes), and circular SVG health ring. |
| 🗓️ **Weekly Time-Table** | Day switcher tabs (Mon - Sat) + add custom lecture slots with room & professor. |
| ✨ **AI Study Planner** | Generates tailored multi-day study roadmaps with focus hours and active recall milestones. |
| 🎯 **Assignments Tracker** | Priority badges (High, Medium, Low), completion checkbox, due date sorting, and filter tabs. |
| 📚 **Class Notes & Cheat Sheets** | Searchable subject notes with instant **Download as .txt** cheat sheet feature. |
| 📖 **Reference Books Catalog** | University textbook recommendations with interactive reading status toggle. |
| 🏆 **Exam Results & GPA** | Marksheet table, credits tracker, distinction scorecards, and printable grade cards (`Ctrl+P` or print button). |
| ⚽ **Sports & Campus Events** | Upcoming tournaments, festivals, hackathons, and RSVP registration passes. |
| 🎧 **Helpdesk & Student Queries** | Submit support queries to faculty/admin with ticket statuses and interactive FAQ accordion. |

---

## 🗂️ Project File Structure

```text
college-campus-dashboard/
│
├── index.html        # Clean semantic markup with modern accessible layouts & modal forms
├── style.css         # Modern CSS variables, glassmorphic cards, animations, responsive design
├── script.js         # Beginner-friendly, step-by-step commented JavaScript with LocalStorage
└── README.md         # Project documentation & guide
```

---

## 💡 How LocalStorage Works in this Code

When you make changes (mark attendance, add an assignment, write a quick note, or switch themes), the app converts JavaScript objects into JSON strings and stores them in your browser:

```javascript
// Saving data
localStorage.setItem('campus_theme', 'dark');

// Loading data
const savedTheme = localStorage.getItem('campus_theme') || 'light';
```

Even if you close your browser or refresh the page, your data remains intact!

---

## 🎨 Customizing the Dashboard

- **Change Student Name**: In `index.html`, look for `<div class="user-info">` and replace `Vrunda Patel` with your own name.
- **Change Primary Theme Color**: In `style.css`, change `--primary: #4f46e5;` under `:root` to your favorite hex color (e.g. `#2563eb` for royal blue, `#059669` for emerald, or `#d946ef` for neon magenta).
- **Configured Subjects**:
  1. **DM**: Discrete Mathematics
  2. **DC**: Data Communication
  3. **ESS**: Environmental Studies & Sustainability
  4. **IKS**: Indian Knowledge Systems
  5. **PC**: Professional Communication
  6. **FE**: Fundamentals of Economics
  7. **EEP**: Electrical & Electronics Principles
  8. **CP**: Computer Programming
- **Add More Subjects**: Click the **"+ Add New Subject"** button inside the Attendance Tracker or edit `DEFAULT_ATTENDANCE` in `script.js`.
