import * as en from "./languages/en.json";

const languages = {
  en: en,
};

export function localize(string: string, search = "", replace = ""): string {
  const section = string.split(".")[0];
  const key = string.split(".")[1];

  const lang = (
    localStorage.getItem("selectedLanguage") ||
    navigator.language.split("-")[0] ||
    "en"
  )
    .replace(/['"]+/g, "")
    .replace("-", "_");
  let translated: string;

  try {
    translated = languages[lang][section][key];
  } catch (e) {
    translated = languages["en"][section][key];
  }

  if (translated === undefined) translated = languages["en"][section][key];

  if (search !== "" && replace !== "") {
    translated = translated.replace(search, replace);
  }
  return translated;
}
