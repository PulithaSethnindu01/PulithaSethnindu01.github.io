// ======= LOCAL STORAGE FUNCTIONS =======

// Load achievements if not present
function loadAchievements() {
  if(!localStorage.getItem("achievements")) {
    // If no achievements in storage, set default initial achievements
    const defaultAchievements = [
      { title: "Won Astronomy Competition", date: "2025-06-10", description: "Our team won the national astronomy competition.", image: "achievement (1).jpg" },
      { title: "Won Astronomy Competition", date: "2025-06-10", description: "Our team won the national astronomy competition.", image: "achievement (2).jpg" },
      { title: "Astro Workshop", date: "2025-05-15", description: "Hosted a workshop on star observation.", image: "achievement (5).jpg" }
    ];
    localStorage.setItem("achievements", JSON.stringify(defaultAchievements));
  }
}

// Add new achievement (from admin)
function addAchievementData(title, date, description, image) {
  const achievements = JSON.parse(localStorage.getItem("achievements"));
  achievements.push({ title, date, description, image });
  localStorage.setItem("achievements", JSON.stringify(achievements));
}

// Get all achievements
function getAchievements() {
  return JSON.parse(localStorage.getItem("achievements") || "[]");
}
