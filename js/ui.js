// Helper: formatuje atrybut do stringa (np. array -> CSV)
const formatAttribute = (val) => (Array.isArray(val) ? val.join(", ") : val);

// DOM elementy
const guessesList = document.querySelector("#guesses-list");
const messageEl = document.querySelector("#message");

// Renderuje jedną zgadywaną postać
export function renderGuessRow(character, comparison) {
  const row = document.createElement("div");
  row.classList.add("guess-row", "fade-in");

  row.innerHTML = `
    <div class="cell avatar-cell">
      <img src="${character.picture}" alt="${character.name}" title="${
    character.name
  }" />
    </div>
    <div class="cell">${createTag(comparison.gender, character.gender)}</div>
    <div class="cell">${createTag(
      comparison.nenType,
      formatAttribute(character.nenType)
    )}</div>
    <div class="cell">${createTag(
      comparison.affiliation,
      formatAttribute(character.affiliation)
    )}</div>
    <div class="cell">${createTag(
      comparison.firstArc,
      character.firstArc
    )}</div>
  `;

  guessesList.appendChild(row);
}

// Tworzy kolorowy tag z ikoną i wartością
export function createTag(status, value = "") {
  let cls = "";
  let label = "";

  switch (status) {
    case "correct":
      cls = "tag-success";
      break;
    case "partial":
      cls = "tag-warning";
      break;
    case "wrong":
      cls = "tag-error";
      break;
    case "earlier":
      label = "🔼";
      cls = "tag-warning";
      break;
    case "later":
      label = "🔽";
      cls = "tag-warning";
      break;
    default:
      label = "?";
      cls = "tag-error";
  }

  return `<span class="tag ${cls}">${label}${value}</span>`;
}

// Pokazuje komunikat
export function showMessage(text, type = 'info') {
  const el = document.querySelector('#message');
  if (!el) {
    console.warn('Nie znaleziono #message w DOM.');
    return;
  }

  el.textContent = text;
  el.className = `message ${type}`;
}

export function resetUI() {
  const list = document.querySelector('#guesses-list');
  const counter = document.querySelector('#attempt-counter');
  const message = document.querySelector('#message');

  if (list) list.innerHTML = '';
  if (counter) counter.textContent = '0';
  if (message) {
    message.textContent = '';
    message.className = 'message';
  }
}
