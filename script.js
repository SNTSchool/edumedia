const video = document.getElementById("lessonVideo");
const timerBox = document.getElementById("timerBox");
const timerDisplay = document.getElementById("timer");
const quizSection = document.getElementById("quizSection");
const summarySection = document.getElementById("summarySection");
const summaryText = document.getElementById("summaryText");

let startTime = null;
let intervalId = null;
let userAnswer = "";
let timeSpent = 0;

// เริ่มนาฬิกาเมื่อวิดีโอเริ่มเล่น
video.addEventListener("play", () => {
  if (!startTime) {
    startTime = Date.now();
    timerBox.style.display = "block";
    intervalId = setInterval(updateTimer, 1000);
  }
});

// หยุดนาฬิกาเมื่อวิดีโอหยุด
video.addEventListener("pause", () => {
  clearInterval(intervalId);
});

// แสดงคำถามเมื่อถึงเวลา
video.addEventListener("timeupdate", () => {
  if (video.currentTime > 15 && video.currentTime < 20) {
    quizSection.style.display = "block";
  }

  // แสดงสรุปเมื่อวิดีโอจบ
  if (video.currentTime >= video.duration - 1) {
    showSummary();
  }
});

// ฟังก์ชันจับเวลา
function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  timeSpent = elapsed;
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// ส่งคำตอบ
function submitAnswer() {
  userAnswer = document.getElementById("answer").value;
  alert(`คุณตอบว่า: ${userAnswer} ✅`);
}

// แสดงผลการเรียน
function showSummary() {
  quizSection.style.display = "none";
  timerBox.style.display = "none";
  summarySection.style.display = "block";

  summaryText.innerHTML = `
    📝 คำตอบของคุณ: <strong>${userAnswer || "ยังไม่ได้ตอบ"}</strong><br>
    ⏱ เวลาที่ใช้เรียน: <strong>${timerDisplay.textContent}</strong>
  `;
}
