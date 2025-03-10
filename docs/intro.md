---
title: Einführung
sidebar_position: 1
---

# Einführung

Willkommen zur Lerndokumentation! In diesem Abschnitt erfährst du, wie du deine Dokumente in Docusaurus mithilfe von
`_category_.json`-Dateien und der `sidebar_position` im Frontmatter strukturieren kannst. Weitere Details zu den
verschiedenen Optionen findest du in der offiziellen Dokumentation
unter in der [Docusaurus-Dokumentation](https://docusaurus.io/docs/)

---

## Struktur und Ordner

1. **Ordner anlegen**:

   - Lege im Ordner `docs/` einen Unterordner für deine Lerndokumentation an, z. B. `docs/lerndokumentation/`.
   - Innerhalb dieses Ordners kannst du weitere Ordner für verschiedene Themen anlegen (z. B. `frontend/`, `backend/`,
     `datenbanken/` usw.).

2. **_category_.json für Ordner**:

   - In Docusaurus kannst du Ordnern eine eigene Bezeichnung oder Reihenfolge geben, indem du darin eine Datei namens
     `_category_.json` anlegst.
   - Beispiel: `docs/lerndokumentation/frontend/_category_.json`
     ```json
     {
       "label": "Frontend",
       "position": 1
     }
     ```
   - Damit sagst du Docusaurus, dass der Ordner „frontend“ in der Sidebar mit dem Label „Frontend“ erscheinen soll.
     Über `position` kannst du die Reihenfolge im Vergleich zu anderen Kategorien steuern.

3. **Weitere Kategorien**:
   - Wiederhole dasselbe Vorgehen für weitere Themenordner (z. B. `backend/`, `datenbanken/`), jeweils mit einer
     entsprechenden `_category_.json`.
   - So behältst du eine klare und saubere Struktur im Sidebar.

---

## Dateien mit Frontmatter

1. **Markdown-Dateien**

   - In jedem Themenordner legst du eine oder mehrere Markdown-Dateien an, in denen du deine Inhalte dokumentierst.
   - Jede Datei kann im sogenannten **Frontmatter** (am Anfang der Datei zwischen `---`) Angaben zur Sidebar-Position
     oder zum Titel machen:

     ```yaml
     ---
     title: "HTML und CSS Grundlagen"
     sidebar_position: 2
     ---
     # HTML und CSS Grundlagen

     In diesem Dokument geht es um grundlegende Webtechnologien wie HTML und CSS...
     ```

2. **sidebar_position**

   - Docusaurus nutzt den Wert in `sidebar_position`, um die Reihenfolge der Markdown-Dateien innerhalb des Ordners
     festzulegen.
   - Wenn du beispielsweise mehrere Dateien in deinem `frontend`-Ordner hast (z. B. `html-css.md`, `javascript.md`,
     `react.md`), kannst du in jeder Datei eine andere `sidebar_position` (1, 2, 3, …) zuweisen.

3. **Titel und Überschriften**
   - Der Wert in `title` wird als Titel deines Dokuments angezeigt.
   - Innerhalb des Dokuments verwendest du Markdown-Überschriften (`#`, `##`, `###`) für weitere Gliederungen.

---

## Beispielhafte Ordnerstruktur

```plaintext
docs
└─ lerndokumentation
   ├─ _category_.json           // z.B. Gesamtkategorie "Lerndokumentation"
   ├─ frontend
   │  ├─ _category_.json        // Label: "Frontend", position: 1
   │  ├─ html-css.md            // Frontmatter: title, sidebar_position
   │  └─ react.md
   ├─ backend
   │  ├─ _category_.json        // Label: "Backend", position: 2
   │  └─ nodejs.md
   └─ datenbanken
      ├─ _category_.json        // Label: "Datenbanken", position: 3
      └─ sql-basics.md
```

**Hinweis**: Du kannst auch eine `_category_.json` direkt im `docs/lerndokumentation/`-Ordner anlegen, um dessen Label
und Position zu steuern.

---

## Zusammenfassung

- **Ordner & Kategorien**: Verwende `_category_.json`, um Ordner in Docusaurus als eigene Kategorien erscheinen zu
  lassen und deren Reihenfolge zu steuern.
- **Frontmatter**: Nutze `sidebar_position` und `title`, um die Reihenfolge und Anzeige deines Dokuments innerhalb der
  Kategorie festzulegen.
- **Empfehlung**: Lege pro Thema einen eigenen Ordner an und erstelle darin deine Markdown-Dateien. So bleibt deine
  Lerndokumentation übersichtlich.
- **Weiterführende Infos**: Details und weitere Optionen findest du in
  der [Docusaurus-Dokumentation](https://docusaurus.io/docs/sidebar).

Mit dieser Vorgehensweise hast du eine klar strukturierte, themenbasierte Lerndokumentation, die in der Sidebar
ansprechend und leicht navigierbar präsentiert wird.
