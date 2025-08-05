const questions = [
  {
    question: "วัตถุถูกยิงจากพื้นด้วยความเร็วต้น v₀ ที่มุม θ และตกลงที่ระดับเดิม ความเร็วขณะตกกระทบพื้นจะเป็นอย่างไร?",
    choices: [
      "มีขนาดและทิศเหมือนเดิม",
      "มีขนาดเท่าเดิม แต่ทิศตรงข้าม",
      "มีขนาดลดลง เพราะสูญเสียพลังงานศักย์",
      "มีขนาดเพิ่มขึ้น เพราะรวมความเร็วในแนวดิ่งและแนวราบ"
    ],
    correct: 1
  },
  {
    question: "ถ้าค่า g เปลี่ยนจาก 9.8 เป็น 5 m/s² (v₀ คงที่) วิถีโพรเจกไทล์จะเป็นอย่างไร?",
    choices: [
      "ระยะทางราบลดลง",
      "เวลาอยู่ในอากาศลดลง",
      "วิถีจะโค้งมากขึ้น",
      "วิถีจะสูงขึ้นและไกลขึ้น"
    ],
    correct: 3
  },
  {
    question: "ยิงลูกบอลสองลูกที่มุม θ และ 90°−θ ด้วย v₀ เท่ากัน ระยะทางราบจะ...",
    choices: [
      "มุมมากกว่าไกลกว่า",
      "มุมน้อยกว่าไกลกว่า",
      "เท่ากัน",
      "ขึ้นกับมวลวัตถุ"
    ],
    correct: 2
  },
  {
    question: "ถ้า v₀ เพิ่มเป็น 2 เท่า (มุมเท่าเดิม) ระยะทางราบจะ...",
    choices: [
      "เพิ่มเป็น 2 เท่า",
      "เพิ่มเป็น 4 เท่า",
      "เพิ่มเล็กน้อยเพราะแรงต้าน",
      "เท่าเดิม"
    ],
    correct: 1
  }
];

let userAnswers = [];

function renderQuiz() {
  const container = document.getElementById("quizContainer");
  questions.forEach((q, index) => {
    const section = document.createElement("section");
    section.classList.add("section");
    section.innerHTML = `
      <h2>คำถาม ${index + 1}</h2>
      <p>${q.question}</p>
      <div class="button-group">
        ${q.choices.map((choice, i) => `
          <button onclick="selectAnswer(${index}, ${i}, this)">
            ${choice}
          </button>
        `).join("")}
      </div>
    `;
    container.appendChild(section);
  });
}

function selectAnswer(qIndex, choiceIndex, btn) {
  userAnswers[qIndex] = choiceIndex;

  // ล้างปุ่มก่อนหน้า
  const buttons = btn.parentElement.querySelectorAll("button");
  buttons.forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

function submitQuiz() {
  let score = 0;
  userAnswers.forEach((ans, i) => {
    if (ans === questions[i].correct) score++;
  });

  const correctSound = document.getElementById("correctSound");
  const wrongSound = document.getElementById("wrongSound");
  const result = document.getElementById("result");

  if (score === questions.length) {
    correctSound.play();
    result.innerHTML = `🎉 เก่งมาก! คุณตอบถูกทั้งหมด (${score}/${questions.length})`;
  } else {
    wrongSound.play();
    result.innerHTML = `คุณได้ ${score}/${questions.length} ข้อ ลองดูเฉลยแล้วทบทวนอีกครั้ง ✨`;
  }
}

window.addEventListener("DOMContentLoaded", renderQuiz);
