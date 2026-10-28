/*
 * Title
 * Copie le title de la page courante (le contenu de la balise <title>).
 *
 * Usage : n'importe quelle page. Pratique pour récupérer un title sans
 * passer par l'inspecteur ou le code source.
 *
 * Le bookmarklet d'origine utilisait uniquement navigator.clipboard, qui
 * échoue silencieusement si le navigateur refuse la permission. Un repli
 * sur execCommand est ajouté, plus une confirmation visible.
 */
(function () {
  var title = document.title.trim();

  if (!title) {
    alert("Aucun title sur cette page.");
    return;
  }

  copy(title);
  alert("Title copié :\n\n" + title);

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
