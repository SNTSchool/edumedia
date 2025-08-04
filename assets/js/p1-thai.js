// Drag & Drop
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
      document.getElementById('correctSound').play();
    } else {
      document.getElementById('wrongSound').play();
      alert('ลองใหม่อีกครั้งนะ');
    }
  });
});

// Quiz
function checkAnswer(choice) {
  const correctAnswers = ['ขนม', 'คน'];
  if (correctAnswers.includes(choice)) {
    score += 1;
    updateScore();
    document.getElementById('correctSound').play();
    alert('ถูกต้อง! 🎉');
  } else {
    document.getElementById('wrongSound').play();
    alert('ลองใหม่อีกครั้งนะ');
  }
}

function updateScore() {
  document.getElementById('score').textContent = score;
}

// Timer
let seconds = 0;
setInterval(() => {
  seconds++;
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  document.getElementById('timer').textContent = `${min}:${sec.toString().padStart(2, '0')}`;
}, 1000);

// Student Name
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
