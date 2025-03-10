# Lerndokumentation

Willkommen zu deiner persönlichen Lerndokumentation mit [Docusaurus](https://docusaurus.io/)!

In diesem Projekt kannst du deine Lernfortschritte, Dokumentationen und Themen für die Ausbildung festhalten und als
statische Website veröffentlichen. Dieses README erklärt dir Schritt für Schritt, wie du das Projekt installierst,
anpasst und auf GitHub Pages deployst.

---

## Hinweis zu GitHub Pages und öffentlichen Repositories

> **Wichtig:** GitHub Pages ist in der kostenlosen Version nur für **öffentliche** Repositories verfügbar. Wenn du ein
> privates Repository verwenden möchtest, benötigst du GitHub Enterprise (oder einen kostenpflichtigen Plan mit
> entsprechendem Feature).
>
> Daher solltest du sicherstellen, **keine sensiblen Daten** in diesem Repo zu speichern oder zu committen, falls du das
> Repository dennoch öffentlich schalten musst, um GitHub Pages zu nutzen.

1. **Aktiviere GitHub Pages**

   - Navigiere zu **GitHub.com → Dein Repository → Settings → Pages → Build and deployment → Source**
   - Wähle **GitHub Actions** anstelle von “Deploy from a branch”.

2. **Überprüfe GitHub Environment „github-pages“**
   - In **GitHub.com → Dein Repository → Settings → Environments** sollte ein Environment namens **github-pages**
     sichtbar sein.

---

## 1. Voraussetzungen

- [Node.js](https://nodejs.org/) (empfohlene LTS-Version, z. B. 18.x)
- Ein GitHub-Konto (um das Projekt zu forken und später zu deployen)
- SSH-Setup (empfohlen):
  Siehe [GitHub-Dokumentation zum Einrichten einer SSH-Verbindung](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

---

## 2. Projekt-Setup

1. **Repository forken**

   - Klicke in GitHub auf `Fork`, um das Projekt in deinen eigenen GitHub-Account zu kopieren.
   - Stelle sicher, dass dein geforktes Repository **privat** ist, **wenn** du nicht möchtest, dass es öffentlich
     einsehbar ist (beachte aber, dass GitHub Pages ohne Enterprise-Plan für private Repos nicht funktioniert).

2. **Lokale Kopie klonen**

   - Klone dein geforktes Repository auf deinen Rechner:
     ```bash
     git clone https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
     ```
   - Wechsle in das Projektverzeichnis:
     ```bash
     cd <REPO_NAME>
     ```

3. **Abhängigkeiten installieren**

   - Installiere alle benötigten Pakete:
     ```bash
     npm i
     ```

---

## 3. Lokale Entwicklung

Starte den Entwicklungsserver mit Hot-Reload:

```bash
npm run start
```

- Danach öffnet sich im Browser automatisch eine Seite unter `http://localhost:3000`, in der du deine Dokumentation
  anschauen kannst.
- Änderungen an Markdown-Dateien oder Konfigurationen werden in den meisten Fällen automatisch aktualisiert, ohne dass
  du den Server neu starten musst.

---

## 4. Projektstruktur

Ein kurzer Überblick über wichtige Ordner und Dateien:

- **`/docs`**: Hier liegen deine Markdown-Dateien.
  - Du kannst Unterordner für verschiedene Themen anlegen und `_category_.json` nutzen, um die Sidebar-Struktur zu
    verwalten.
- **`/sidebars.ts`**: Hier kannst du (falls nötig) manuell die Sidebar konfigurieren.
- **`/static`**: Statische Ressourcen (Bilder, CSS, etc.).
- **`/src`**: Seiten und Komponenten in React.
- **`docusaurus.config.ts`**: Hauptkonfigurationsdatei für Docusaurus (Titel, Favicon,
  Deployment-Einstellungen, etc.).
- **`package.json`**: Enthält Informationen zu Skripten und Abhängigkeiten.

---

## 5. Build und Deployment

### 5.1 Static Build

Um deine Website lokal als statisches Projekt zu bauen:

```bash
npm run build
```

- Nach erfolgreichem Build findest du alle statischen Dateien im Ordner `build/`.
- Du kannst diesen Ordner auf jedem beliebigen Webserver bereitstellen (z. B. Netlify, Vercel – beachte aber deren
  Zahlungspläne, falls du private Inhalte schützen willst).

### 5.2 GitHub Pages

1. **Vorbereitung**

   - Stelle sicher, dass du in `docusaurus.config.ts` bzw. `.js` `organizationName` und `projectName` korrekt
     eingetragen hast.
   - Commite deine Änderungen und pushe sie auf den `main`-Branch deines Repos.
   - Aktiviere in den Repository-Einstellungen unter **Settings > Pages** das neue Build-System mit GitHub Actions.

2. **Deployment starten**

   - Führe folgenden Befehl aus, um auf GitHub Pages zu deployen:
     ```bash
     npm run deploy
     ```
   - Dieser Befehl baut die Website und pusht den generierten `build/`-Ordner in den `gh-pages`-Branch.

3. **Resultat ansehen**

   - Nach dem Deployment sollte deine Seite unter `https://<YOUR_USERNAME>.github.io/<REPO_NAME>` erreichbar sein.
   - Prüfe gegebenenfalls in den Repository-Einstellungen, ob GitHub Pages aktiviert ist und der Branch `gh-pages`
     ausgewählt ist.
   - **Achtung:** Funktioniert nur, wenn dein Repository öffentlich ist oder du einen kostenpflichtigen Plan/Enterprise
     nutzt.

> **Tipp:** Wenn du SSH für GitHub verwendest, kannst du `USE_SSH=true npm run deploy` verwenden. Wenn nicht, wird
> automatisch HTTPS verwendet.

---

## 6. Häufige Probleme

- **Broken Links**: Per Voreinstellung wirft Docusaurus einen Fehler, wenn ein Link ins Leere führt. Siehe
  `onBrokenLinks: "throw"` in `docusaurus.config.ts`. Du kannst das Verhalten anpassen.
- **Deployment klappt nicht**: Prüfe, ob `organizationName` und `projectName` im Config-File korrekt sind und ob du
  Schreibrechte auf den `gh-pages`-Branch hast.
- **Privates Repo**: Für private Repos ist GitHub Pages nur mit kostenpflichtigen Plänen oder Enterprise-Versionen
  nutzbar.  
  Wenn du das Repo privat hältst und keinen kostenpflichtigen Plan hast, könntest du eine andere Hosting-Lösung wählen
  (z. B. Cloudflare Pages mit Access, selbst gehostetes Setup etc.).

---

## 7. Weiterführende Informationen

- [Docusaurus-Dokumentation](https://docusaurus.io/docs)
- [Markdown Crash Course](https://www.markdownguide.org/getting-started/)
- [GitHub Pages-Dokumentation](https://docs.github.com/en/pages)

---

### Kontakt / Support

- Bei technischen Fragen wende dich an deine Ausbildner/in oder deinen Betreuer/in.
- Falls du generelle Fragen zu Docusaurus oder GitHub hast, findest du meistens Hilfe in den offiziellen Dokumentationen
  oder auf Stack Overflow.

Viel Erfolg mit deiner Lerndokumentation!
