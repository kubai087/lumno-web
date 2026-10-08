## 1. Geltungsbereich und Verantwortlicher

Diese Datenschutzerklärung („diese Erklärung“) beschreibt, wie die Browsererweiterung Lumno („die Erweiterung“) und die öffentlichen Seiten der Lumno-Website (`lumno.kubai.design`, „die Website“) mit Informationen über dich umgehen. Sie basiert auf der tatsächlichen Umsetzung der Erweiterungsversion **0.9.58** und gilt für diese und alle späteren Versionen, bis sie aktualisiert wird.

- **Entwickler und Verantwortlicher:** Lumno wird vom unabhängigen Entwickler Kubai087 (枯白啃设计) entwickelt und gepflegt, der für die in dieser Erklärung beschriebene Verarbeitung verantwortlich ist.
- **Kontakt:** [i@kubai.design](mailto:i@kubai.design). Siehe auch Abschnitt 15.
- **Gültig ab:** 8. Oktober 2026.
- **Maßgebliche Sprache:** Maßgeblich ist die vereinfacht-chinesische Fassung dieser Erklärung. Andere Sprachfassungen sind Übersetzungen zur Information; bei Abweichungen gilt die vereinfacht-chinesische Fassung.

Lumno bietet keine Konten und keinen Cloudspeicher an und betreibt keine Server, die Nutzerdaten speichern. Kontoanmeldung, Cloud-Synchronisierung und Nutzungsanalysen wurden in Version 0.9.40 aus der Erweiterung entfernt.

„Personenbezogene Daten“ meint in dieser Erklärung alle elektronisch erfassten Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen. Diese Erklärung schränkt keine Rechte ein, die dir nach geltendem Recht zustehen.

## 2. Wie wir Informationen verarbeiten

Die Kernfunktionen von Lumno laufen in deinem Browser. Um die Funktionen bereitzustellen, die du in der Oberfläche siehst und nutzt, liest oder speichert die Erweiterung folgende Informationen auf deinem Gerät. **Außer in den in Abschnitt 4 beschriebenen Fällen verlassen diese Informationen niemals dein Gerät und werden nie an Lumno oder den Entwickler gesendet.**

### 2.1 Browserdaten

- **Tabs:** URLs, Titel, Gruppen und Symbole, um Tabs zu durchsuchen, zu wechseln, zu sortieren, wiederherzustellen und zu verwalten. Wenn du den Tab-Umschalter nutzt, erstellt die Erweiterung eine Miniaturansicht des aktuellen Tabs; sie behält höchstens 12 davon, jeweils für maximal 2 Stunden und nur auf deinem Gerät.
- **Verlauf:** URLs, Titel und Besuchszeiten, um den Verlauf lokal zu durchsuchen und zu sortieren und Einträge auf deinen Wunsch zu löschen.
- **Lesezeichen:** Ordnerstruktur, Namen und URLs, um Lesezeichen auf deine Anfrage zu durchsuchen, anzuzeigen und zu verwalten.
- **Meistbesuchte Websites:** URLs und Titel zur Anzeige im neuen Tab. Websitekarten, die du anheftest oder ausblendest, werden als Einstellungen gespeichert.

### 2.2 Seiteninhalte

- **Tastenkürzel und Befehlsleiste:** Erkennt Lumnos Tastenkürzel auf Webseiten und blendet die Befehlsleiste ein.
- **Schnellaktionen für markierten Text:** Standardmäßig aus. Wenn aktiviert, liest die Erweiterung den markierten Text (bis zu 2.400 Zeichen) und verwendet ihn nur, wenn du eine Aktion auswählst.
- **Automatisches Bild-in-Bild:** Findet auf unterstützten Videoseiten das Videoelement, um Bild-in-Bild zu öffnen.
- **Fortschrittsverfolgung (Labs):** Funktioniert nur für Websitekarten, die du zur Verfolgung markierst. Liest die Vor-/Zurück-Links, strukturierten Daten und Medieninformationen der Seite, um URL und Titel dieser Karte zu aktualisieren.

### 2.3 Suche und Einstellungen

- **Suchverlauf:** Deine Eingaben sowie URLs und Titel der gewählten Ergebnisse, um die Sortierung auf deinem Gerät zu verbessern.
- **Einstellungen und Medien:** Design, Sprache, Layout, Verknüpfungen, Suchanbieter, Sperrlisten, Funktionsschalter sowie hochgeladene Verknüpfungssymbole, eigene Hintergründe und die Caches, die diese Funktionen benötigen.

### 2.4 Was wir nicht erheben

Lumno erfordert weder Registrierung noch Anmeldung. Es erhebt nicht deinen Namen, deine E-Mail-Adresse, Telefonnummer oder Postanschrift; meldet keine Nutzungszahlen, Klicks, Gerätekennungen oder Absturzdaten; und sendet deinen Verlauf, deine Lesezeichen, Tab-Listen oder Seiteninhalte niemals an den Entwickler.

## 3. Wofür die Erweiterung welche Berechtigung braucht

Die Erweiterung fordert nur die Berechtigungen an, die diese Funktionen benötigen, und keine optionalen Berechtigungen:

| Berechtigung | Zweck |
| --- | --- |
| `tabs`, `tabGroups` | Tabs abfragen, wechseln, erstellen, aktualisieren, gruppieren und wiederherstellen sowie Miniaturansichten für den Tab-Umschalter erstellen. |
| `history` | Verlauf lokal durchsuchen und sortieren und Einträge auf deinen Wunsch löschen. |
| `bookmarks` | Lesezeichen durchsuchen, anzeigen und verwalten. |
| `topSites` | Deine meistbesuchten Websites im neuen Tab anzeigen. |
| `storage`, `unlimitedStorage` | Einstellungen, Caches, eigene Bilder und die lokale Konfiguration für die WebDAV-Synchronisierung über das Standardkontingent des Browsers hinaus speichern. |
| `alarms` | Den WebDAV-Synchronisierungsstatus regelmäßig im Hintergrund prüfen. |
| `search` | Deine abgeschickten Suchanfragen an die Standardsuchmaschine des Browsers übergeben. |
| `favicon` | Website-Symbole über den Browser anzeigen. |
| `scripting` und Websitezugriff `<all_urls>` | Befehlsleiste, Tastenkürzel, Schnellaktionen für markierten Text, Bild-in-Bild und Fortschrittsverfolgung auf Webseiten bereitstellen; deine Anfrage in den gewählten KI- oder Suchdienst eintragen; Website-Symbole und Hintergrundbilder laden; die von dir konfigurierte WebDAV-Adresse erreichen. |

Der umfassende Websitezugriff wird nur für die oben genannten Funktionen genutzt. Er bedeutet nicht, dass Lumno Seiteninhalte massenhaft liest, sammelt oder hochlädt.

## 4. Daten, die dein Gerät verlassen

Die folgenden Anfragen sendet die Erweiterung direkt an den jeweiligen Drittanbieter; sie **laufen nie über einen Lumno-Server.** Der Empfänger sieht außerdem die IP-Adresse und Browserinformationen, die jede Netzwerkanfrage mit sich bringt, und verarbeitet sie nach seiner eigenen Datenschutzerklärung.

### 4.1 Online-Suchvorschläge

Während du im Suchfeld von Lumno tippst (im neuen Tab oder in der Befehlsleiste), wird deine Eingabe in Echtzeit an den Vorschlagsdienst deiner aktuellen Suchmaschine gesendet, um Vorschläge anzuzeigen. Unterstützt werden Google, Bing, Baidu, Sogou (bereitgestellt von Tencent unter `sor.html5.qq.com`), DuckDuckGo, Yandex, Quark und Shenma (`sugs.m.sm.cn`) sowie Yahoo. Durch einen Wechsel der Suchmaschine in den Einstellungen bestimmst du, wer diese Anfragen erhält.

### 4.2 Websuche, Seitensuche und KI

- **Web- und Seitensuche:** Abgeschickte Anfragen gehen an die Standardsuchmaschine deines Browsers oder öffnen den gewählten Suchdienst bzw. die gewählte Website in einem neuen Tab.
- **KI-Suche und Schnellaktionen für markierten Text:** Erst nachdem du eine Aktion ausgewählt hast, öffnet die Erweiterung den gewählten KI-Dienst (etwa ChatGPT, Gemini, DeepSeek, Doubao oder Kimi) und trägt deine Anfrage bzw. den markierten Text sowie den Prompt ein, den Lumno für diese Aktion formuliert.

Das entspricht einem direkten Besuch dieser Websites: Die Website erhält, was du abschickst, und kann es mit deiner dortigen Anmeldesitzung verknüpfen.

### 4.3 Website-Symbole

Um das Symbol einer Website zu laden, erhält der Favicon-Dienst von Google (`www.google.com` / `gstatic`) die Seiten-URL; wählst du Favicon.is, wird nur die Domain gesendet. Diese Anfragen enthalten weder Cookies noch Referrer, und die Symbole werden auf deinem Gerät zwischengespeichert. Eigene Symboladressen für Verknüpfungen lädt der Browser direkt von dieser Adresse.

### 4.4 Online-Hintergründe und Zitate des Tages

- **Zitat des Tages:** Standardmäßig aus. Wenn aktiviert, lädt die Erweiterung Zitate der gewählten Kategorie von Hitokoto (`v1.hitokoto.cn`) und speichert sie für den Tag zwischen.
- **Bing-Hintergründe:** Werden von `www.bing.com` geladen; die Anfrage enthält nur Markt und Bildkennung.
- **Kuratierte und Kunst-Hintergründe:** Fotos stammen von Lorem Picsum (`picsum.photos`, Quelle Unsplash), Kunstwerke aus der Open-Access-Sammlung des Cleveland Museum of Art (`openaccess-cdn.clevelandart.org`); die Anfragen enthalten nur Bild-ID und Größe.
- **Hintergründe per Bildlink:** Eingefügte Links werden mit deinen Einstellungen synchronisiert; jedes Gerät lädt das Bild einmal von dieser Adresse, komprimiert es und speichert es lokal zwischen.

Downloads von Hintergründen und Zitaten enthalten weder Cookies noch Referrer. Vorschaubilder in der Hintergrundauswahl werden wie gewöhnliche Webbilder geladen.

### 4.5 Versionshinweise und Website-Ressourcen

- **Update-Hinweise:** Nach einem Update fragt die Erweiterung den Titel dieser Version bei GitHub ab (`api.github.com`, ersatzweise `github.com`), um einen Update-Hinweis anzuzeigen. Du kannst „Update Prompts“ in den Einstellungen deaktivieren.
- **Versionshinweise-Seite:** Nach einem Update kann die Erweiterung die Versionshinweise auf der Website öffnen. Die URL enthält Einstiegsquelle, Update-Grund und Erweiterungsversion; für diese Seite gilt Abschnitt 6.
- **Feedback-Links:** Wenn du einen Feedback- oder Community-Link öffnest, lädt die Erweiterung die Konfiguration der Community-Links (`community-links.json`) und das QR-Code-Bild der Community von der Website.

Die Website wird auf GitHub Pages gehostet; GitHub kann als Hoster Anfragen einschließlich IP-Adressen protokollieren.

## 5. Synchronisierung von Einstellungen

Lumno bietet keine Cloud-Synchronisierung. Deine Einstellungen wandern nur auf den Wegen zwischen Geräten, die du wählst:

- **Integrierte Browsersynchronisierung:** Design, Suchanbieter, Verknüpfungen (Titel und URLs), angeheftete oder ausgeblendete Websitekarten (URLs und Titel), Sperrlistenregeln, Hintergrundauswahl und Bildlinks, Einstellungen für das Zitat des Tages sowie Adresse, Ordner und Benutzername deines WebDAV-Servers werden in `chrome.storage.sync` gespeichert und vom Browserhersteller entsprechend deinem Browserkonto und deinen Synchronisierungseinstellungen zwischen Geräten abgeglichen. Hochgeladene Symbole, eigene Hintergründe und WebDAV-App-Passwörter sind nie Teil der Browsersynchronisierung.
- **WebDAV-Synchronisierung (optional):** Standardmäßig aus und erst aktiv, wenn du selbst einen Server hinzufügst. Danach werden deine gesamte Konfiguration, hochgeladene Verknüpfungssymbole, eigene Hintergründe und Konfigurationssnapshots vor dem Überschreiben per HTTPS auf dem von dir angegebenen Server und Ordner gespeichert. Verlauf, Lesezeichen, offene Tabs und Symbol-Caches werden nie hochgeladen. WebDAV bietet keine Ende-zu-Ende-Verschlüsselung; die Administratoren dieses Servers können die Dateien also lesen.
- **Export und Import:** Du kannst deine Einstellungen als JSON-Datei exportieren, um sie aufzubewahren oder auf einem anderen Gerät zu importieren. Exporte enthalten keine Bilder.

## 6. Website-Analyse und Cookies

Die öffentlichen Seiten der Website laden das Analyseskript von VibeLoft und können bei der Bereitstellung Google Analytics (mit IP-Anonymisierung) aktivieren. Diese Dienste können Seiten-URLs (einschließlich Abfrageparametern) und Titel, Besuchszeiten, verweisende Seiten, Klickereignisse, Browsersprache, Geräte- und Browsertyp, ungefähren Standort, IP-Adressen sowie Cookies oder ähnliche pseudonyme Kennungen verarbeiten.

Wir nutzen diese Daten nur, um Zugriffe, Herkunft und Leistung der Website zu verstehen, und verknüpfen sie nie mit Daten in der Erweiterung. Die Erweiterung selbst lädt diese Skripte nicht. Du kannst die Website-Analyse mit den Cookie-, Skriptblocker- oder Trackingschutz-Funktionen deines Browsers blockieren, ohne dass eine Funktion der Erweiterung beeinträchtigt wird.

## 7. Weitergabe, Übertragung und Offenlegung

Lumno verkauft, vermietet oder tauscht deine personenbezogenen Daten nicht, nutzt sie nicht für personalisierte oder kontextübergreifende verhaltensbezogene Werbung und gibt sie nicht an Datenhändler oder Werbeplattformen weiter. Über das Ausführen von Aktionen hinaus, die du selbst startest, geben wir deine personenbezogenen Daten weder weiter noch übertragen oder veröffentlichen wir sie.

Dritte, die Daten erhalten können:

| Empfänger | Mögliche Daten | Zweck |
| --- | --- | --- |
| Browserhersteller (etwa Google und Microsoft) | Einstellungen in `chrome.storage.sync` und Metadaten des Browserkontos | Integrierte Synchronisierung der Erweiterungseinstellungen. |
| Dein WebDAV-Dienst (etwa Jianguoyun, ein NAS oder ein eigener Server) | Gesamte Konfiguration, Symbole, Hintergründe, Snapshots sowie Benutzername und App-Passwort für die Anmeldung | Synchronisierung von Einstellungen und Bildern nach deiner Konfiguration. |
| Suchvorschlagsdienste (Abschnitt 4.1) | Deine Eingaben und Metadaten der Anfrage | Anzeige von Suchvorschlägen. |
| Von dir gewählte Such-, KI- und Webdienste | Abgeschickte Anfragen, markierter Text und Prompts | Ausführen der Suchen und KI-Aktionen, die du startest. |
| Favicon-Dienst von Google, Favicon.is | Seiten-URL oder Domain | Anzeige von Website-Symbolen. |
| Hitokoto, Bing, Lorem Picsum, Cleveland Museum of Art | Kategorie, Markt, Bild-ID und Größe | Zitate des Tages und Online-Hintergründe, die du aktivierst. |
| GitHub | Erweiterungsversion sowie Zugriffsprotokolle für Website- und Release-Anfragen | Update-Hinweise und Hosting der Website. |
| [VibeLoft](https://vibeloft.ai/privacy), Google Analytics (falls aktiviert) | Informationen zu Website-Besuchen und technische Informationen | Analyse von Zugriffen, Herkunft und Leistung der Website. |

Wird Lumno fusioniert, übertragen oder an einen neuen Betreuer übergeben, verpflichten wir den Empfänger auf diese Erklärung oder holen erneut deine Einwilligung ein, bevor sich der Umgang mit deinen Informationen ändert. Wir können Informationen offenlegen, wenn das Gesetz oder eine rechtmäßige Anfrage einer zuständigen Behörde es verlangt; da wir keine personenbezogenen Daten über dich speichern, betrifft das in der Regel nur Daten der Website-Analyse.

## 8. Speicherung und Aufbewahrung

Die Erweiterung speichert Daten im `chrome.storage.local`, `chrome.storage.sync` und Sitzungsspeicher des Browsers sowie in einer auf die Erweiterung beschränkten IndexedDB: Hochgeladene Verknüpfungssymbole liegen in `chrome.storage.local`; eigene Hintergründe, WebDAV-Konfiguration, App-Passwörter und Wiederherstellungs-Backups in IndexedDB.

| Daten | Aufbewahrung |
| --- | --- |
| Lokale Einstellungen, Bilder, Caches und Daten zur Suchsortierung | Bis du sie in der Erweiterung löschst, die Daten der Erweiterung im Browser entfernst oder Lumno deinstallierst. |
| Miniaturansichten des Tab-Umschalters | Jeweils bis zu 2 Stunden. |
| Einstellungen in der Browsersynchronisierung | Werden vom Browserhersteller gemäß deinem Browserkonto und deinen Synchronisierungseinstellungen gespeichert und gelöscht. |
| Dateien auf deinem WebDAV-Server | Bleiben auf deinem Server, bis du sie löschst. Pausieren der Synchronisierung, Trennen der Verbindung oder Deinstallieren von Lumno löscht sie nicht. |
| Exportierte Einstellungsdateien | Werden von dir aufbewahrt und gelöscht. |
| Daten von Drittanbietern und der Website-Analyse | Werden von jedem Dienst nach dessen eigener Richtlinie aufbewahrt. |

Lumno speichert in keinem System, das es kontrolliert, personenbezogene Daten über dich.

## 9. Deine Rechte und Wahlmöglichkeiten

Du kannst:

- Alle Funktionen von Lumno ohne Registrierung oder Anmeldung nutzen.
- Suchmaschinen, KI-Dienste und Symbolquellen in den Einstellungen ändern oder Schnellaktionen für markierten Text, Zitate des Tages, Online-Hintergründe, Update-Hinweise und ähnliche Funktionen ausschalten.
- Selbst entscheiden, ob du die WebDAV-Synchronisierung nutzt, und eine Verbindung jederzeit pausieren oder entfernen.
- Die Synchronisierung von Erweiterungen in deinem Browser ausschalten, damit deine Einstellungen auf einem Gerät bleiben.
- Daten in der Erweiterung löschen, die Daten der Erweiterung im Browser entfernen oder die Erweiterung deinstallieren, um alle lokalen Daten zu entfernen.

Da Lumno keine personenbezogenen Daten über dich speichert, gibt es auf Seiten von Lumno in der Regel nichts, was eingesehen, kopiert oder gelöscht werden könnte. Um Rechte auszuüben, die dir nach geltendem Recht zustehen – etwa Auskunft, Datenübertragbarkeit, Berichtigung, Löschung, Widerruf der Einwilligung, Einschränkung oder Widerspruch –, oder bei Fragen zur Website-Analyse wende dich bitte wie in Abschnitt 15 beschrieben an uns. Wir antworten innerhalb von 15 Werktagen nach Prüfung deiner Anfrage oder innerhalb der gesetzlich vorgeschriebenen Frist. Du kannst dich außerdem bei der für dich zuständigen Datenschutzaufsichtsbehörde beschweren. Die Ausübung dieser Rechte führt niemals zu einer Benachteiligung.

Lumno erstellt keine Profile über dich und trifft keine automatisierten Entscheidungen, die dir gegenüber rechtliche Wirkung entfalten oder dich in ähnlicher Weise erheblich beeinträchtigen.

## 10. Sicherheit

Wir schützen deine Daten mit folgenden Maßnahmen:

- Browserdaten werden nur in deinem Browser verarbeitet und nie an den Entwickler gesendet.
- WebDAV akzeptiert nur HTTPS-Adressen, behält die Zertifikatsprüfung bei und lehnt Weiterleitungen bei der Authentifizierung ab.
- WebDAV-App-Passwörter bleiben im eigenen Speicher der Erweiterung auf dem aktuellen Gerät. Sie gelangen nie in die Browsersynchronisierung und werden nie Webseiten oder Content-Skripten preisgegeben.
- Downloads von Website-Symbolen und Hintergründen enthalten weder Cookies noch Referrer.

Wir empfehlen, für Lumno ein eigenes WebDAV-App-Passwort zu erstellen und dein Gerät, dein Browserkonto und dein WebDAV-Konto gut zu schützen. Keine Übertragungs- oder Speichermethode ist vollkommen sicher. Wenn du eine Sicherheitslücke findest, melde sie bitte an [i@kubai.design](mailto:i@kubai.design).

## 11. Kinder

Lumno richtet sich an ein allgemeines Publikum, ist nicht für Kinder gestaltet und erhebt wissentlich keine personenbezogenen Daten von Kindern. Kinder unter 14 Jahren sollten Lumno nur mit Zustimmung und unter Anleitung eines Elternteils oder Erziehungsberechtigten nutzen. Wenn du glaubst, dass wir versehentlich Daten eines Kindes verarbeitet haben, kontaktiere uns bitte, damit wir der Sache nachgehen können.

## 12. Verarbeitung im Ausland

Lumno betreibt keine Server, die Nutzerdaten speichern; deine Daten werden daher nie in Systeme übertragen, die Lumno kontrolliert. Browserhersteller, die von dir gewählten Such-, KI-, WebDAV- und Bilddienste sowie GitHub, VibeLoft und Google Analytics können Daten außerhalb deines Landes oder deiner Region nach ihren eigenen Datenschutzerklärungen und Übermittlungsmechanismen verarbeiten.

## 13. Nutzerdatenrichtlinie des Chrome Web Store

Die Verwendung von Informationen, die Lumno über Browser-APIs erhält, entspricht der [Nutzerdatenrichtlinie des Chrome Web Store](https://developer.chrome.com/docs/webstore/program-policies/policies), einschließlich der Anforderungen zur **eingeschränkten Nutzung** (Limited Use):

- Die Daten werden nur genutzt, um den einzigen, für Nutzer erkennbaren Zweck der Erweiterung bereitzustellen oder zu verbessern.
- Daten werden nur an die in Abschnitt 4 genannten Dienste gesendet, soweit dies für Aktionen nötig ist, die du startest.
- Die Daten werden nie verkauft oder an Dritte übertragen, nie für personalisierte Werbung genutzt und nie zur Beurteilung der Kreditwürdigkeit oder für Kreditzwecke verwendet.
- Der Entwickler hat keinen Zugriff auf deine Browserdaten oder Einstellungen.

## 14. Änderungen dieser Erklärung

Fügt Lumno neue Datenkategorien, Zwecke oder Empfänger hinzu – etwa durch die Rückkehr von Konten oder Cloud-Funktionen –, aktualisieren wir diese Erklärung und die Datenangaben im Store, bevor die Änderung wirksam wird, und weisen in der Erweiterung deutlich darauf hin; wo das Gesetz eine Einwilligung verlangt, holen wir sie erneut ein. Bei Formulierungsänderungen, aktualisierten Links oder Klarstellungen, die deine Rechte nicht einschränken, aktualisieren wir gegebenenfalls nur das Datum auf dieser Seite. Wir schränken deine Rechte aus dieser Erklärung nicht ohne deine Einwilligung ein.

## 15. Kontakt

Bei Fragen, Anmerkungen oder Anliegen zu dieser Erklärung oder zu deinen personenbezogenen Daten schreib eine E-Mail an [i@kubai.design](mailto:i@kubai.design). Du kannst auch ein öffentliches Issue auf [GitHub](https://github.com/kubai087/lumno-extension/issues) eröffnen – teile dort aber bitte keine personenbezogenen Daten.
