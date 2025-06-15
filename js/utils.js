// Pobranie postaci z lokalnego JSON
export async function fetchCharacters() {
  try {
    const response = await fetch("./data/hxhdb.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const characters = await response.json();
    return characters;
  } catch (err) {
    console.error("Błąd podczas pobierania postaci:", err);
    throw err;
  }
}

// Losuje losową postać z listy
export const getRandomCharacter = (characters) => {
  const index = Math.floor(Math.random() * characters.length);
  return characters[index];
};
