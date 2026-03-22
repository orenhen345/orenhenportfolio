/**
 * Vimeo "Where can this be embedded?" checks the parent page URL.
 * A ?query string can break allowlists (e.g. file://.../work-5.html?orenportfolio).
 * Run synchronously in <head> before <body> so embed iframes see a clean document URL.
 * Keeps a dev marker as #orenportfolio when there was no other hash.
 */
(function () {
  try {
    var u = new URL(window.location.href);
    if (u.search.indexOf("orenportfolio") === -1) return;
    var existingHash = u.hash;
    u.searchParams.delete("orenportfolio");
    if (!existingHash) u.hash = "#orenportfolio";
    history.replaceState(null, "", u.toString());
  } catch (e) {}
})();
