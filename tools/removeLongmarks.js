export const removeLongmarks = (text) => {
  return text
    .replaceAll("ā", "a")
    .replaceAll("ī", "i")
    .replaceAll("ō", "o")
    .replaceAll("ē", "e")
    .replaceAll("ū", "u")
    .replaceAll("ȳ", "y")
    .replaceAll("Ē", "E")
    .replaceAll("Ō", "O")
    .replaceAll("Ā", "A")
    .replaceAll("Ī", "I")
    .replaceAll("Ū", "U")
    .replaceAll("Ȳ", "Y");
};
