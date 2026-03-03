const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// ─── Middleware ───────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve node_modules assets for offline use
app.use('/lib/jasmine', express.static(
  path.join(__dirname, 'node_modules/jasmine-core/lib/jasmine-core')
));
app.use('/lib/codemirror', express.static(
  path.join(__dirname, 'node_modules/codemirror/lib')
));
app.use('/lib/codemirror/mode/javascript', express.static(
  path.join(__dirname, 'node_modules/codemirror/mode/javascript')
));
app.use('/lib/codemirror/theme', express.static(
  path.join(__dirname, 'node_modules/codemirror/theme')
));
app.use('/lib/codemirror/addon/edit', express.static(
  path.join(__dirname, 'node_modules/codemirror/addon/edit')
));
app.use('/lib/chartjs', express.static(
  path.join(__dirname, 'node_modules/chart.js/dist')
));

// ─── Data helpers ────────────────────────────────────────────
const DATA_DIR = path.join(__dirname, 'data');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getClassFile(className) {
  return path.join(DATA_DIR, `class-${className.toLowerCase()}.json`);
}

function readClassData(className) {
  const file = getClassFile(className);
  if (!fs.existsSync(file)) return {};
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return {};
  }
}

function writeClassData(className, data) {
  ensureDataDir();
  fs.writeFileSync(getClassFile(className), JSON.stringify(data, null, 2));
}

// ─── Encouraging messages ────────────────────────────────────
function getImmediateMessage(percent) {
  if (percent === 100) {
    const msgs = [
      "Perfect score! You absolutely crushed it! 🏆",
      "Flawless victory! Nothing got past you! 🎯",
      "100%! You're a coding machine! 🤖✨",
      "All green! That's what mastery looks like! 💚"
    ];
    return msgs[Math.floor(Math.random() * msgs.length)];
  }
  if (percent >= 91) return "So close to perfection! Just a tiny bit more! 🎯";
  if (percent >= 71) return "Impressive work! You clearly understand this! 🌟";
  if (percent >= 51) return "Nice! More than halfway there — keep pushing! 🚀";
  if (percent >= 31) return "Making progress! You're building solid foundations! 💪";
  if (percent >= 1)  return "Good start! Every line of code teaches you something! 🧱";
  return "Don't worry — debugging is where the real learning happens! 🔍";
}

function getProgressMessage(history) {
  const days = Object.keys(history);
  if (days.length <= 1) return "Welcome aboard! Your journey begins today! 🎬";

  const sorted = days.sort();
  const recent = sorted.slice(-3);
  const percentages = recent.map(d =>
    Math.round((history[d].passed / history[d].total) * 100)
  );

  const latest = percentages[percentages.length - 1];
  const previous = percentages[percentages.length - 2];

  if (latest - previous >= 20) return "Wow, major improvement! That hard work is paying off! 🚀";
  if (latest > previous) return "Your skills are leveling up! 📈";
  if (percentages.every(p => p >= 90)) return "You're on fire! Consistency is the mark of a pro! 🔥";
  if (latest === previous) return "Stay curious — breakthroughs come when you least expect them! 💡";
  return "Every challenge makes you stronger — keep going! 🌱";
}

function getClassMessage(avgPercent, completionCount, totalStudents) {
  if (completionCount === totalStudents && avgPercent === 100) return "🎉 EVERYBODY aced it! Outstanding! 🎉";
  if (avgPercent >= 85) return "Outstanding class performance today! The code is strong with this group! 💪";
  if (avgPercent >= 65) return "The class is building great momentum! 🚀";
  if (avgPercent >= 40) return "The class is warming up — great things ahead! 🌅";
  return "Every expert started right here — keep at it, everyone! 🌱";
}

// ─── API: List challenges ────────────────────────────────────
app.get('/api/challenges', (req, res) => {
  const challengesDir = path.join(__dirname, 'challenges');
  if (!fs.existsSync(challengesDir)) return res.json([]);

  const days = fs.readdirSync(challengesDir)
    .filter(d => fs.statSync(path.join(challengesDir, d)).isDirectory())
    .sort()
    .map(dirName => {
      const readmePath = path.join(challengesDir, dirName, 'README.md');
      const readme = fs.existsSync(readmePath)
        ? fs.readFileSync(readmePath, 'utf-8')
        : '';
      // Extract title from first line of README or directory name
      const title = readme.split('\n')[0]?.replace(/^#+\s*/, '') || dirName;
      return { id: dirName, title };
    });

  res.json(days);
});

// ─── API: Get challenge spec + template ──────────────────────
app.get('/api/challenges/:day', (req, res) => {
  const dayDir = path.join(__dirname, 'challenges', req.params.day);
  if (!fs.existsSync(dayDir)) return res.status(404).json({ error: 'Challenge not found' });

  const specPath = path.join(dayDir, 'spec', 'challenges.spec.js');
  const srcPath = path.join(dayDir, 'src', 'solutions.js');
  const readmePath = path.join(dayDir, 'README.md');

  const spec = fs.existsSync(specPath) ? fs.readFileSync(specPath, 'utf-8') : '';
  const template = fs.existsSync(srcPath) ? fs.readFileSync(srcPath, 'utf-8') : '';
  const readme = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf-8') : '';

  res.json({ spec, template, readme });
});

// ─── API: Submit results ─────────────────────────────────────
app.post('/api/submit', (req, res) => {
  const { studentId, className, day, passed, total } = req.body;

  if (!studentId || !className || !day || total === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const data = readClassData(className);

  if (!data[studentId]) data[studentId] = {};
  data[studentId][day] = {
    passed: passed || 0,
    total,
    timestamp: new Date().toISOString()
  };

  writeClassData(className, data);

  const message = getImmediateMessage(Math.round((passed / total) * 100));
  const progressMsg = getProgressMessage(data[studentId]);

  res.json({ success: true, message, progressMessage: progressMsg });
});

// ─── API: Personal progress ─────────────────────────────────
app.get('/api/progress/:className/:studentId', (req, res) => {
  const data = readClassData(req.params.className);
  const student = data[req.params.studentId] || {};
  const message = getProgressMessage(student);
  res.json({ history: student, message });
});

// ─── API: Dashboard stats ────────────────────────────────────
app.get('/api/dashboard/:className', (req, res) => {
  const data = readClassData(req.params.className);
  const students = Object.keys(data);
  const totalStudents = students.length;

  if (totalStudents === 0) {
    return res.json({
      totalStudents: 0,
      days: {},
      tiers: { perfect: 0, above75: 0, above50: 0, below50: 0 },
      classMessage: "Waiting for submissions... 🕐"
    });
  }

  // Aggregate by day
  const days = {};
  students.forEach(sid => {
    Object.entries(data[sid]).forEach(([day, result]) => {
      if (!days[day]) days[day] = { passed: 0, total: 0, count: 0 };
      days[day].passed += result.passed;
      days[day].total += result.total;
      days[day].count += 1;
    });
  });

  // Calculate per-day averages
  const dayStats = {};
  Object.entries(days).forEach(([day, d]) => {
    dayStats[day] = {
      avgPercent: Math.round((d.passed / d.total) * 100),
      submissions: d.count
    };
  });

  // Tiers based on overall student averages
  const tiers = { perfect: 0, above75: 0, above50: 0, below50: 0 };
  students.forEach(sid => {
    const entries = Object.values(data[sid]);
    const totalPassed = entries.reduce((s, e) => s + e.passed, 0);
    const totalTests = entries.reduce((s, e) => s + e.total, 0);
    const pct = Math.round((totalPassed / totalTests) * 100);

    if (pct === 100) tiers.perfect++;
    else if (pct >= 75) tiers.above75++;
    else if (pct >= 50) tiers.above50++;
    else tiers.below50++;
  });

  // Latest day average for class message
  const sortedDays = Object.keys(dayStats).sort();
  const latestDay = sortedDays[sortedDays.length - 1];
  const latestAvg = dayStats[latestDay]?.avgPercent || 0;

  const classMessage = getClassMessage(latestAvg, tiers.perfect, totalStudents);

  res.json({ totalStudents, days: dayStats, tiers, classMessage });
});

// ─── Start server ────────────────────────────────────────────
const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

app.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIP();
  console.log(`\n  🎓 Challenge Tracker running at:`);
  console.log(`     Local:   http://localhost:${PORT}`);
  console.log(`     Network: http://${ip}:${PORT}\n`);
  console.log(`  📊 Dashboard: http://${ip}:${PORT}/dashboard.html\n`);
  ensureDataDir();
});