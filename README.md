# SEO Bookmarklets

Trois bookmarklets pour récupérer en un clic les données d'une page de résultats : les titres, les URL, et le title.

Ce sont les outils que j'utilise tous les jours en audit SEO. Ils vivent dans ma barre de favoris depuis des années, les voici en un seul endroit.

## Les bookmarklets

| Bookmarklet | Ce qu'il copie | Testé sur |
|---|---|---|
| **Get All Titles** | Tous les `<h3>` de la page, un par ligne | Google, Bing, DuckDuckGo |
| **All URL** | Les URL des résultats, une par ligne, sans doublon | Google (principal), repli Bing et DuckDuckGo |
| **Title** | Le `<title>` de la page | Toutes les pages |

## Installation

1. Ouvrez `index.html` dans un navigateur, ou la version en ligne si GitHub Pages est activé.
2. Affichez la barre de favoris : `Ctrl+Maj+B` (Windows, Linux) ou `Cmd+Maj+B` (macOS).
3. Glissez le bouton voulu dans la barre de favoris.
4. Ouvrez une page de résultats, cliquez sur le favori. Le contenu est dans le presse-papier.

Alternative manuelle : créez un favori et collez le contenu du fichier `.js` correspondant dans le champ URL, précédé de `javascript:`.

## Ce qu'il faut savoir

**Get All Titles ramasse tous les `h3`, sans filtre.** Sur Google, cela inclut le titre des annonces et le bloc « Recherches associées », qui sont eux aussi des `h3`. C'est le comportement d'origine, conservé volontairement : il est prévisible, et il suffit de supprimer les lignes en trop à l'arrivée.

**All URL décode les redirections Google.** Les résultats encore servis sous la forme `/url?q=...` sont récupérés avec leur URL réelle, au lieu d'être éliminés par le filtre anti-Google.

**Le presse-papier a besoin d'un contexte sécurisé.** `navigator.clipboard` ne fonctionne qu'en HTTPS. Un repli sur `document.execCommand("copy")` prend le relais si le navigateur refuse, et une alerte confirme le nombre d'éléments copiés.

**Aucune donnée n'est envoyée nulle part.** Tout tourne dans la page, en local.

## Structure

```
bookmarklets/
  serp-titles.js   version lisible, à modifier si besoin
  serp-urls.js
  page-title.js
index.html         page d'installation, liens à glisser (version minifiée)
```

`index.html` contient une version minifiée des trois fichiers. Si vous modifiez un `.js`, reportez le changement dans `index.html`.

## Licence

MIT. Faites-en ce que vous voulez.

---

## English

Three bookmarklets to grab SERP data in one click: all result titles (`h3`), all result URLs, and the page title.

Drag a button from `index.html` into your bookmarks bar, open a search results page, click it. The content lands in your clipboard.

`Get All Titles` keeps every `h3`, ads and related searches included. `All URL` decodes Google `/url?q=` redirects. Everything runs locally, nothing is sent anywhere.

MIT licensed.
