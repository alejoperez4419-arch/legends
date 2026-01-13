let selectedCards = [];
let loadingInterval = null;

// Ir a sección 2
function goToCards() {
  document.getElementById("section1").classList.remove("active");
  document.getElementById("section2").classList.add("active");

  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";
  selectedCards = [];

  /* =========================
     CARTAS DE JUGADORES (1–12)
  ========================= */
  for (let i = 1; i <= 12; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img src="${i}.png" alt="player ${i}">`;
    card.onclick = () => toggleSelect(card, `Player Card ${i}|${i}.png`);
    cardsContainer.appendChild(card);
  }

  /* =========================
     RECOMPENSAS ÚNICAS 🔥
  ========================= */
  const rewards = [
    {
      text: "100.000 Coins",
      img: "coin.png"
    },
    {
      text: "1.000.000 GP",
      img: "gp.png"
    },
    {
      text: "1.000.000 ePoints",
      img: "epoints.png"
    }
  ];

  rewards.forEach(r => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${r.img}" alt="${r.text}">
      <div style="color:white;font-size:17px;margin-top:6px;">
        ${r.text}
      </div>
    `;
    card.onclick = () =>
      toggleSelect(card, `${r.text}|${r.img}`);
    cardsContainer.appendChild(card);
  });
}

// Selección múltiple
function toggleSelect(card, reward) {
  if (card.classList.contains("selected")) {
    card.classList.remove("selected");
    selectedCards = selectedCards.filter(c => c !== reward);
  } else {
    card.classList.add("selected");
    selectedCards.push(reward);
  }
}

// Ir a sección 3
function goToSearching() {
  if (selectedCards.length === 0) {
    alert("Please select at least one reward.");
    return;
  }

  document.getElementById("section2").classList.remove("active");
  document.getElementById("section3").classList.add("active");

  document.getElementById("searchingPlayer").innerText =
    "ID: " + document.getElementById("playerID").value;

  const loadingText = document.getElementById("loadingText");
  loadingText.innerText = "Loading";

  if (loadingInterval) clearInterval(loadingInterval);

  let dots = 0;
  loadingInterval = setInterval(() => {
    dots = (dots + 1) % 4;
    loadingText.innerText = "Loading" + ".".repeat(dots);
  }, 400);

  setTimeout(() => {
    clearInterval(loadingInterval);

    document.getElementById("section3").classList.remove("active");
    document.getElementById("section4").classList.add("active");

    const finalCards = document.getElementById("finalCards");
    finalCards.innerHTML = "";

    selectedCards.forEach(item => {
      const [text, img] = item.split("|");

      let cardDiv = document.createElement("div");
      cardDiv.classList.add("card", "selected");
      cardDiv.innerHTML = `
        <img src="${img}">
        <div style="color:white;font-size:17px;margin-top:6px;">
          ${text}
        </div>
      `;
      finalCards.appendChild(cardDiv);
    });

    launchConfetti();
  }, 1500);
}

// Confetti
function launchConfetti() {
  confetti({
    particleCount: 160,
    spread: 80,
    origin: { y: 0.6 }
  });
}

// Reiniciar
function restart() {
  if (loadingInterval) clearInterval(loadingInterval);

  document.getElementById("section4").classList.remove("active");
  document.getElementById("section1").classList.add("active");
  document.getElementById("playerID").value = "";
}
