# ČSOP Trosečníci - Vícestránkový Web (HTML, CSS, JS)

Tento repozitář obsahuje vícestránkovou verzi webu ČSOP Trosečníci, přepsanou z původní React aplikace do čistého HTML, CSS a JavaScriptu. Každá sekce webu je nyní samostatný HTML soubor, což zjednodušuje nasazení na statické hostingy, jako jsou GitHub Pages.

## Struktura souborů

Web se skládá z následujících hlavních souborů a adresářů:

**HTML stránky:**
- `index.html` - Hlavní úvodní stránka s přehledem organizace a aktivit
- `about.html` - Stránka o organizaci, její misi a hodnotách
- `locations.html` - Informace o chráněných územích a biocentrech
- `projects.html` - Aktuální a dokončené projekty organizace
- `karel.html` - Stránka věnovaná zakladateli Karlu Málkovi "Charliemu"
- `letter.html` - Charlieho dopis jako duchovní odkaz organizace
- `contact.html` - Kontaktní informace a formulář

**Styly a skripty:**
- `styles.css` - Kompletní CSS styly pro všechny stránky včetně responzivního designu
- `script.js` - JavaScript pro interaktivní funkce, jazykové přepínání a validaci formulářů
- `favicon.ico` - Ikona webu

**Obrázky:**
- `images/` - Adresář pro všechny obrázky webu (logo, fotografie, ilustrace)
- `images/README.md` - Detailní popis všech potřebných obrázků

## Klíčové funkce

**Responzivní design** zajišťuje správné zobrazení na všech zařízeních od mobilních telefonů po desktopy. **Jazykové přepínání** umožňuje zobrazení obsahu v češtině i angličtině s automatickým ukládáním preference uživatele. **Interaktivní navigace** obsahuje mobilní menu s plynulými animacemi a **kontaktní formulář** s validací a automatickým odesláním emailu.

**Optimalizace pro vyhledávače** je zajištěna sémantickými HTML tagy, správnými meta tagy a strukturovanými daty. **Přístupnost** je podporována alt texty pro obrázky, správnou strukturou nadpisů a klávesovou navigací.

## Nasazení na GitHub Pages

Pro nasazení webu na GitHub Pages postupujte podle následujících kroků:

Nahrajte všechny soubory z tohoto adresáře do kořenového adresáře vašeho GitHub repozitáře. V nastavení repozitáře přejděte na sekci **Pages** a jako zdroj vyberte **Deploy from a branch**. Zvolte větev `main` (nebo tu, kam jste soubory nahráli) a složku `/ (root)`. GitHub automaticky sestaví a nasadí váš web na adrese `https://username.github.io/repository-name/`.

## Přidání obrázků

Web je připraven pro obrázky, které můžete přidat do adresáře `images/`. V souboru `images/README.md` najdete detailní seznam všech potřebných obrázků s doporučenými rozměry a formáty. Web bude fungovat i bez obrázků díky fallback řešením v CSS.

**Logo organizace** se zobrazí v navigaci na všech stránkách. **Fotografie projektů a lokalit** oživí obsah a pomohou návštěvníkům lépe pochopit práci organizace. **Portrét Karla Málka** dodá osobní rozměr stránkám věnovaným zakladateli.

## Technické detaily

Web využívá moderní CSS Grid a Flexbox pro responzivní layout, CSS animace pro plynulé přechody a JavaScript ES6+ pro interaktivní funkce. Všechny styly jsou organizovány v jednom CSS souboru pro snadnou údržbu a rychlé načítání.

**Kompatibilita** je zajištěna se všemi moderními prohlížeči včetně Chrome, Firefox, Safari a Edge. **Výkon** je optimalizován pomocí efektivního CSS, minimálního JavaScriptu a optimalizovaných obrázků.

## Údržba a aktualizace

Pro přidání nového obsahu jednoduše upravte příslušný HTML soubor. Styly můžete upravovat v `styles.css` a nové interaktivní funkce přidávat do `script.js`. Všechny texty podporují jazykové přepínání pomocí `data-cs` a `data-en` atributů.

**Zálohování** doporučujeme pravidelně pomocí Git verzování. **Testování** proveďte vždy na lokálním serveru před nahráním změn na GitHub Pages.

## Podpora

Tento web je navržen jako kompletní řešení pro prezentaci organizace ČSOP Trosečníci. Všechny soubory jsou dobře dokumentovány a strukturovány pro snadnou údržbu i méně technicky zdatnými uživateli.
