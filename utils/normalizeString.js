export function normalizeString(string) {
  // remove accents and special chars like "ç" and "é"
  const normalizedString = string.normalize("NFD").replace(/\p{Diacritic}/gu, "")
  const formattedString = normalizedString.toLocaleLowerCase().replace(/[^A-Z0-9]+/ig, "-")

  return formattedString
}