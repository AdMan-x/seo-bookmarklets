/*
 * Get All Titles
 * Copie les titres (balises h3) de la page courante, un par ligne.
 *
 * Usage : sur une page de résultats Google, Bing, DuckDuckGo, ou n'importe
 * quelle page dont les titres sont en h3.
 *
 * Limite connue : sur Google, ce bookmarklet ramasse aussi le titre des
 * annonces et le bloc "Recherches associées", qui sont eux aussi en h3.
 * C'est le comportement du bookmarklet d'origine, volontairement conservé.
 */
(function () {
  var titles = Array.from(document.querySelectorAll("h3"))
    .map(function (el) { return el.innerText.trim(); })
    .filter(function (text) { return text.length > 0; });

  if (!titles.length) {
    alert("Aucun titre trouvé sur cette page.");
    return;
  }

  copy(titles.join("\n"));
  alert(titles.length + " titres copiés !");

  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () { legacy(text); });
      return;
    }
    legacy(text);
  }

  function legacy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
  }
})();
