/*
 * All URL
 * Copie toutes les URL des résultats de la page courante, une par ligne.
 *
 * Optimisé pour Google (les liens des résultats portent l'attribut data-ved),
 * avec un repli pour Bing et DuckDuckGo si aucun data-ved n'est trouvé.
 *
 * Deux différences assumées avec le bookmarklet d'origine :
 * 1. Les redirections Google du type /url?q=... sont décodées pour récupérer
 *    l'URL réelle. Sans ça, les résultats encore servis sous cette forme
 *    étaient purement éliminés par le filtre anti-google.
 * 2. Les doublons sont supprimés, comme dans l'original.
 */
(function () {
  var nodes = Array.from(document.querySelectorAll("a[data-ved]"));

  if (!nodes.length) {
    nodes = Array.from(
      document.querySelectorAll("#search a[href], #b_results a[href], a.result__a")
    );
  }

  var urls = nodes
    .map(function (el) { return realUrl(el.href); })
    .filter(function (url) {
      if (!url) { return false; }
      try {
        var u = new URL(url);
        if (u.protocol !== "http:" && u.protocol !== "https:") { return false; }
        if (u.hostname.indexOf("google.") !== -1) { return false; }
        if (url.indexOf("aclk") !== -1) { return false; }
        return true;
      } catch (e) {
        return false;
      }
    });

  var unique = Array.from(new Set(urls));

  if (!unique.length) {
    alert("Aucun lien trouvé. Essaie de faire défiler un peu !");
    return;
  }

  copy(unique.join("\n"));
  alert(unique.length + " URLs copiées !");

  function realUrl(href) {
    try {
      var u = new URL(href, location.href);
      if (u.pathname === "/url") {
        var target =
          u.searchParams.get("q") ||
          u.searchParams.get("url") ||
          u.searchParams.get("u");
        if (target && /^https?:\/\//i.test(target)) {
          return target;
        }
      }
      return u.href;
    } catch (e) {
      return null;
    }
  }

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
