// Porównanie cech dwóch postaci
export const compareCharacters = (guess, target) => {
  return {
    gender: compareGender(guess.gender, target.gender),
    nenType: compareNenType(guess.nenType, target.nenType),
    affiliation: compareAffiliation(guess.affiliation, target.affiliation),
    firstArc: compareFirstArc(guess.firstArc, target.firstArc),
  };
};

// === Gender ===
const compareGender = (g1, g2) => (g1 === g2 ? "correct" : "wrong");

// === Nen Type ===
const compareNenType = (n1, n2) => {
  const list1 = Array.isArray(n1) ? n1 : [n1];
  const list2 = Array.isArray(n2) ? n2 : [n2];

  const match = list1.filter((type) => list2.includes(type));
  if (match.length === 0) return "wrong";
  if (match.length === list2.length && list1.length === list2.length)
    return "correct";
  return "partial";
};

// === Affiliation ===
const compareAffiliation = (a1, a2) => {
  const set1 = new Set(a1);
  const set2 = new Set(a2);

  const intersection = [...set1].filter((aff) => set2.has(aff));

  if (intersection.length === 0) return "wrong";
  if (intersection.length === set1.size && set1.size === set2.size)
    return "correct";
  return "partial";
};

// === First Arc ===
const arcOrder = [
  "Hunter Exam",
  "Zoldyck Family",
  "Heavens Arena",
  "Yorknew City",
  "Greed Island",
  "Chimera Ant",
  "Election",
];

const compareFirstArc = (a1, a2) => {
  if (a1 === a2) return "correct";

  const idx1 = arcOrder.indexOf(a1);
  const idx2 = arcOrder.indexOf(a2);

  if (idx1 === -1 || idx2 === -1) return "wrong";
  return idx1 < idx2 ? "earlier" : "later";
};
