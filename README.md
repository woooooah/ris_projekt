# FlavourfulFinds
**Ime skupine:** tbd <br>
**Članice skupine:** Sanja Muršič, Tara Sedovšek, Kaja Vidmar


## Dokumentacija za razvijalce
1. ***Opis projektne sstrukture***
    1. **Backend**
        Backend vsebuje:
        - config: Konfiguracije in nastavitve aplikacije.
        - controllers: API kontrolerji, ki obravnavajo različne zahteve (npr. ReceptController).
        - entities: Modeli podatkovne baze, ki definirajo strukturo podatkov.
        - repositories: Dostop do podatkovne baze z uporabo JPA.
        - services: Povezovanje kontrolerjev in podatkovne modele.
        - RisApplocations.java: Razred, ki omogoča zagon Spring Boot aplikacije.

    2. **Frontend**
        Frontend vsebuje:
        - javascript: app.js - pošiljanje zahtev na backend in jasc.js - za funkcionalnost spletne strani.
        - HTML datoteke: Vse strani uporabniškega vmesnika (npr. `index.html`, `login.html`).
        - stilska_predloga.css: CSS datoteka za oblikovanje.
2. ***Standardi kodiranja***
    1. **Struktura projekta**: 
    Projekt je razdeljen na backend in frontend, kjer vsak del ločen v poimenovane mape, kot so controllers, entities, services in repositories za backend in javascript, slike in html datoteke za frontend.

    2. **Slog**: 
    V backendu uporabljamo PascalCase za poimenovanje razredov - vsaka prva črka besede je z veliko začetnico (npr. `ReceptController.java`).
1. ***Opis projektne sstrukture***
    1. **Backend**
        Backend vsebuje:
        - config: Konfiguracije in nastavitve aplikacije.
        - controllers: API kontrolerji, ki obravnavajo različne zahteve (npr. ReceptController).
        - entities: Modeli podatkovne baze, ki definirajo strukturo podatkov.
        - repositories: Dostop do podatkovne baze z uporabo JPA.
        - services: Povezovanje kontrolerjev in podatkovne modele.
        - RisApplocations.java: Razred, ki omogoča zagon Spring Boot aplikacije.

    2. **Frontend**
        Frontend vsebuje:
        - javascript: app.js - pošiljanje zahtev na backend in jasc.js - za funkcionalnost spletne strani.
        - HTML datoteke: Vse strani uporabniškega vmesnika (npr. `index.html`, `login.html`).
        - stilska_predloga.css: CSS datoteka za oblikovanje.
2. ***Standardi kodiranja***
    1. **Struktura projekta**: 
    Projekt je razdeljen na backend in frontend, kjer vsak del ločen v poimenovane mape, kot so controllers, entities, services in repositories za backend in javascript, slike in html datoteke za frontend.

    2. **Slog**: 
    V backendu uporabljamo PascalCase za poimenovanje razredov - vsaka prva črka besede je z veliko začetnico (npr. `ReceptController.java`).


## Navodila za nameščanje in zagon aplikacije
1. ***Predpogoji***
    Za nameščanje je nujno potrebno, da imaš na računalniku nameščeno naslednje:
    1. **Java Development Kit (JDK)** - Verzija 11 ali višja
        - namestitev: https://www.oracle.com/java/technologies/downloads/?er=221886
        - preveri namestitev v terminalu: `java -version`

    2. **Node.js in npm** - Node.js verzija 14 ali višja, npm verzija 6 ali višja
        - namestitev: https://nodejs.org/en
        - preveri namestitev v terminalu: `node -v` in `npm -v`
    3. **Git** - da lahko iz GitHuba kloniraš repozitorij
        - namestitev: https://git-scm.com/downloads
        - preveri namestitev z ukazom: `git --version`

2. ***Kloniraj repozitorij (Clone Repository)***
    Z ukazi:
    - `git clone https://github.com/woooooah/ris_projekt.git`
    - `cd ris_projekt`

3. ***Kreiranje podatkovne baze***
    - V ris_projekt/backend/src/main/resources izberi datoteko baza_recepti.sql.
    - Odpri jo v svojem IDE in stisni na run button, ki bo ustvaril podatkovno bazo. 

4. ***Pogon zaledja (backenda)***
    Z naslednjimi ukazi poženi backend.
    - `cd ris_projekt`
    - `cd backend`
    - `./mvnw clean install` - to naredimo le pvič, da zgradimo projekt
    - `./mvnw spring-boot:run` - s tem ukazom poženemo backend server, sedaj teče na: http://localhost:8080

5. ***Napolni bazo*** 
    - ris_projekt/backend/src/main/resources izberi datoteko data.sql.
    - napolni bazo

6. ***Pogon pročelja (frontenda)***
    Za delovanje aplikacije ni dovolj, da zaženemo le backend, ko teče backend server, potrebujemo zagnati tudi frontend server, na katerem se lahko potem prikazujejo tudi podatki iz backenda (kompletna aplikacija)
    - `cd ris_projekt`
    - `cd frontend`
    - `npm install` - inštalira node_modules, ki so potrebni za zagon bakcenda
    - `node server.js` - s tem ukazom zaženemo frontend server, ki sedaj teče na: http://localhost:3000

7. ***Dostop do aplikacije***
    Ko oba serverja (frontend in backend) tečeta, lahko dostopamo do aplikacije na: http://localhost:3000



## Navodila za razvijalce – prispevanje k projektu

 1. ***Orodja in ogrodja***
    Backend:
    •	Framework: Spring Boot
    •	Java:  verzija "1.8.0_401"
    •	Build orodje: Maven

    Frontend:
    •	Jeziki: JavaScript, HTML, CSS
    •	Priporočena knjižnica: ni obvezne knjižnice, ampak priporočamo uporabo jQuery za enostavnejšo manipulacijo DOM, če je to potrebno.

    Splošna orodja:
    •	IDE: Priporočena sta IntelliJ IDEA ali Eclipse za backend (Spring Boot) in Visual Studio Code za frontend.
    •	GitHub: Za upravljanje verzij in prispevanje uporabite GitHub, kjer je gostovan repozitorij.

2. ***Okolje***
    Java in Maven:
    •	Prepričajte se, da imate nameščen Java 11 (ali novejšo različico). Preverite z ukazom: `java -version`
    •	Prepričajte se, da imate nameščen Maven za gradnjo projekta: `mvn -version`
    Spring Boot aplikacija:
    •	V projektu najdite glavno aplikacijsko datoteko (RisApplication.java) in jo zaženite v vašem IDE ali uporabite ukaz za zagon v terminalu: `mvn spring-boot:run`

    Frontend:
    •	Sprednji del spletne strani je zgrajen z HTML, CSS in JavaScript in ne zahteva posebne namestitve ali predprocesorja. Vse datoteke so v mapi ris_projekt/frontend.

3. ***Prispevanje***
    •	Sledite dogovorjenemu stilu pisanja kode (uporabite privzeti stil za Java v Spring Boot in osnovna priporočila za HTML, CSS in JavaScript).
    •	Pišite jasna in jedrnata commit sporočila v katerih natančno opišete katere spremembe ste naredili.
    •	GitHub repozitorij vsebuje osnovno README datoteko s povzetkom projekta, navodili za namestitev in uporabo. Dokumentacija naj bo redno posodobljena glede na spremembe v aplikaciji.

## Vizija projekta
1. ***Filtriranje in enostavno iskanje***
    Uporabnikom omogoča iskanje receptov po času priprave in stopnji zahtevnosti in enastovno iskanje vse na enem mestu.

2. ***Prikaz hranilne vrednosti***
    Prikaz hranilne vrednosti vsakega recepta, vključno s kalorijami, beljakovinami, ogljikovimi hidrati, maščobami in drugimi hranili. Ta funkcionalnost bi pomagala uporabnikom, ki sledijo določeni prehrani ali imajo posebne zdravstvene zahteve.

3. ***Ocene in komentarji***
    Uporabniki lahko ocenjujejo recepte in delijo svoje izkušnje ter nasvete za izboljšave. 

4. ***Shranjevanje receptov***
    Registrirani uporabniki lahko shranjujejo/všečkajo željene recepte.

5. ***Možnost prilaogditve količine sestavin***
    Aplikacija omogoča prilagajanje količine sestavin glede na število oseb. Uporabnik lahko izbere, za koliko oseb želi kuhati, in aplikacija samodejno prilagodi količine sestavin.

6. ***Kopiranje receptov***
    Registrirani uporabniki je omogočeno kopiranje receptov v pdf obliki.






    





<!-- (maybe useful, jaz se nisem spomnila, sem morala guglat) :)
    # so naslovi (#=h1, ##=h2 ...) 
    **nekaj** je boldano
    *nekaj* je italic
    ***nekaj*** je bold&italic
-->