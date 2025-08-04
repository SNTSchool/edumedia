// ========== DRAG & DROP ==========
const draggables = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');
let score = 0;

draggables.forEach(item => {
  item.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', item.textContent);
  });
});

dropZones.forEach(zone => {
  zone.addEventListener('dragover', e => e.preventDefault());

  zone.addEventListener('drop', e => {
    e.preventDefault();
    const dropped = e.dataTransfer.getData('text/plain');

    if (dropped === zone.dataset.correct && !zone.classList.contains('filled')) {
      zone.textContent = `${dropped} - ${zone.textContent}`;
      zone.classList.add('filled');
      score += 1;
      updateScore();
      playSound(true);
    } else {
      playSound(false);
      alert('ลองใหม่อีกครั้งนะ');
    }
  });
});

// ========== QUIZ ==========
function checkAnswer(choice) {
  const correct = 'เป็นโค้ง';
  if (choice === correct) {
    score += 1;
    updateScore();
    playSound(true);
    alert('ถูกต้อง! 🎉');
  } else {
    playSound(false);
    alert('ลองใหม่อีกครั้งนะ');
  }
}

// ========== SCORE & TIMER ==========
function updateScore() {
  const scoreDisplay = document.getElementById('score');
  if (scoreDisplay) {
    scoreDisplay.textContent = score;
  }
}

let seconds = 0;
setInterval(() => {
  seconds++;
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const timerDisplay = document.getElementById('timer');
  if (timerDisplay) {
    timerDisplay.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
  }
}, 1000);

// ========== SOUND ==========
function playSound(correct) {
  const correctSound = document.getElementById('correctSound');
  const wrongSound = document.getElementById('wrongSound');
  if (correct && correctSound) correctSound.play();
  if (!correct && wrongSound) wrongSound.play();
}

// ========== STUDENT NAME ==========
function saveName() {
  const name = document.getElementById('studentName').value;
  if (name.trim()) {
    localStorage.setItem('studentName', name);
    document.getElementById('studentNameDisplay').textContent = name;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem('studentName');
  if (savedName) {
    document.getElementById('studentNameDisplay').textContent = savedName;
  }
});
