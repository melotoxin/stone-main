/**
 * Helpers for splicing catalogue fields (which are written as standalone,
 * capitalised labels such as "Polished black marble" or "Oval dining table")
 * into the middle of an English sentence.
 */

/** "Polished black marble" -> "polished black marble". Leaves acronyms like "STW" alone. */
export function midSentence(label: string): string {
  if (label.length > 1 && label[1] === label[1].toUpperCase() && /[A-Z]/.test(label[1])) return label;
  return label.charAt(0).toLowerCase() + label.slice(1);
}

/** Indefinite article for a noun phrase: "an oval table", "an L-shaped desk", "a round tray". */
export function withArticle(phrase: string): string {
  return `${/^(?:[aeiou]|l-)/i.test(phrase) ? 'an' : 'a'} ${phrase}`;
}
