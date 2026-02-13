const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const response = document.getElementById("response");
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

let confetti = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createConfettiPiece() {
  return {
    x: Math.random() * canvas.width,
    y: -10,
    size: Math.random() * 8 + 4,
    speedY: Math.random() * 2 + 2,
    speedX: Math.random() * 2 - 1,
    color: ["#ff4d88", "#ffd166", "#7bdff2", "#b2f7ef", "#ff8fab"][Math.floor(Math.random() * 5)],
    rotation: Math.random() * Math.PI,
    rotationSpeed: Math.random() * 0.2 - 0.1,
  };
}

function burstConfetti(amount = 200) {
  for (let i = 0; i < amount; i += 1) {
    confetti.push(createConfettiPiece());
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti = confetti.filter((piece) => piece.y < canvas.height + 20);

  confetti.forEach((piece) => {
    piece.y += piece.speedY;
    piece.x += piece.speedX;
    piece.rotation += piece.rotationSpeed;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
    ctx.restore();
  });

  requestAnimationFrame(animateConfetti);
}

const noOptionMessage = "Uhh Oh Bhaisuuu I knew it... No is not an optionnn... Gonna lick you tomm.";

noBtn.addEventListener("click", () => {
  response.textContent = `❌ Error: ${noOptionMessage}`;
  alert(`Error: ${noOptionMessage}`);
});

yesBtn.addEventListener("click", () => {
  response.textContent = "Yay! You just made me the happiest person alive! 💖";
  burstConfetti(280);
  alert("YAYYYYYY!!!");
  yesBtn.textContent = "She said YES! 💍✨";
  yesBtn.disabled = true;
  noBtn.style.display = "none";
});

resizeCanvas();
animateConfetti();
window.addEventListener("resize", resizeCanvas);
