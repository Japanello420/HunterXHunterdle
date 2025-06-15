import { fetchCharacters, getRandomCharacter } from "./utils.js";
import { compareCharacters } from "./compare.js";
import { renderGuessRow, showMessage, resetUI } from "./ui.js";

const MAX_ATTEMPTS = 10;

let allCharacters = [];
let secretCharacter = null;
let attempts = 0;
let guessedCharacters = [];

const guessForm = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess-input");
const restartBtn = document.querySelector("#restart-btn");
const attemptCounter = document.querySelector("#attempt-counter");
const gameStatus = document.querySelector("#game-status");
const guessesList = document.querySelector("#guesses-list");
const autocompleteList = document.querySelector("#autocomplete-list");

// === Inicjalizacja gry ===
async function initGame() {
  try {
    allCharacters = await fetchCharacters();
    secretCharacter = getRandomCharacter(allCharacters);
    attempts = 0;
    guessedCharacters = [];
    updateAttemptCounter();
    resetUI();
    hideGameState();
    const reveal = document.querySelector("#reveal-character");
    reveal.hidden = true;
    reveal.classList.remove("visible", "success", "error");
    console.log("Wylosowana postać:", secretCharacter.name);
  } catch (error) {
    console.error("Błąd przy inicjalizacji:", error);
    showMessage("Nie udało się załadować danych.", "error");
  }
}

// === Obsługa zgadywania ===
async function handleGuess(event) {
  event.preventDefault();
  const guessName = guessInput.value.trim().toLowerCase();
  const character = allCharacters.find(
    (c) => c.name.toLowerCase() === guessName
  );

  if (!character) {
    showMessage("Nie ma takiej postaci.", "error");
    return;
  }

  if (guessedCharacters.includes(character.name.toLowerCase())) {
    showMessage("Już próbowałeś tej postaci!", "error");
    return;
  }

  guessedCharacters.push(character.name.toLowerCase());

  if (attempts === 0) {
    showGameState();
    renderHeaderRow();
  }

  attempts++;
  updateAttemptCounter();
  autocompleteList.classList.remove("visible");

  const comparison = compareCharacters(character, secretCharacter);
  renderGuessRow(character, comparison);

  if (character.name === secretCharacter.name) {
    showCharacterReveal("success"); // <- zielone tło
    endGame();
  } else if (attempts >= MAX_ATTEMPTS) {
    showCharacterReveal("error"); // <- czerwone tło
    endGame();
  }

  guessInput.value = "";
  autocompleteList.innerHTML = "";
}

// === Aktualizacja licznika prób ===
function updateAttemptCounter() {
  attemptCounter.textContent = attempts;
  document.querySelector("#max-attempts").textContent = MAX_ATTEMPTS;
}

// === Zakończenie gry ===
function endGame() {
  guessInput.disabled = true;
  guessForm.querySelector("button").disabled = true;
}

// === Pokaż poprawną postać w reveal-card ===
function showCharacterReveal(outcome = "success") {
  const reveal = document.querySelector("#reveal-character");
  const img = reveal.querySelector(".reveal-img");
  const name = reveal.querySelector(".reveal-name");
  const titleEl = reveal.querySelector(".reveal-title");

  titleEl.textContent =
    outcome === "success"
      ? "🎉 Good job! It was:"
      : "❌ Maybe next time. It was:";
  img.src = secretCharacter.picture;
  img.alt = secretCharacter.name;
  name.textContent = secretCharacter.name;

  reveal.hidden = false;
  reveal.classList.add("visible");
  reveal.classList.remove("success", "error");
  reveal.classList.add(outcome);
}

// === Restart gry ===
restartBtn.addEventListener("click", () => {
  guessInput.disabled = false;
  guessForm.querySelector("button").disabled = false;
  guessInput.value = "";
  autocompleteList.innerHTML = "";
  autocompleteList.classList.remove("visible");
  initGame();
});

// === Obsługa formularza ===
guessForm.addEventListener("submit", handleGuess);

// === Autocomplete ===
guessInput.addEventListener("input", (e) => {
  const value = e.target.value.trim().toLowerCase();
  if (!value) return (autocompleteList.innerHTML = "");

  const suggestions = allCharacters
    .filter((char) => char.name.toLowerCase().startsWith(value))
    .sort((a, b) => a.name.localeCompare(b.name));

  renderAutocomplete(suggestions);
});

// === Renderowanie podpowiedzi ===
function renderAutocomplete(results) {
  autocompleteList.innerHTML = "";

  if (!results.length || !guessInput.value.trim()) {
    autocompleteList.classList.remove("visible");
    return;
  }

  results
    .filter((char) => !guessedCharacters.includes(char.name.toLowerCase()))
    .forEach((char) => {
      const li = document.createElement("li");
      li.classList.add("autocomplete-item");
      li.innerHTML = `
        <img src="${char.picture}" alt="${char.name}" class="avatar" />
        <span>${char.name}</span>
      `;
      li.addEventListener("click", () => {
        guessInput.value = char.name;
        autocompleteList.innerHTML = "";
        autocompleteList.classList.remove("visible");
        guessInput.focus();
      });
      autocompleteList.appendChild(li);
    });

  autocompleteList.classList.add("visible");
}

// === Ukryj/pokaż sekcje gry ===
function showGameState() {
  gameStatus.hidden = false;
  guessesList.hidden = false;
}

function hideGameState() {
  gameStatus.hidden = true;
  guessesList.hidden = true;
}

// === Nagłówki kolumn ===
export function renderHeaderRow() {
  const header = document.createElement("div");
  header.classList.add("guess-row", "header-row");

  header.innerHTML = `
    <div class="cell">Character</div>
    <div class="cell">Gender</div>
    <div class="cell">Nen Type</div>
    <div class="cell">Affiliation</div>
    <div class="cell">First Arc</div>
  `;

  guessesList.appendChild(header);
}

// === Start gry ===
initGame();
