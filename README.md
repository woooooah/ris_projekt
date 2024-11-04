# FlavourfulFinds
**Ime skupine:** tbd <br>
**Članice skupine:** Sanja Muršič, Tara Sedovšek, Kaja Vidmar


## Dokumentacija za razvijalce



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

3. ***Pogon zaledja (backenda)***
    Z naslednjimi ukazi poženi backend.
    - `cd ris_projekt`
    - `cd backend`
    - `./mvnw clean install` - to naredimo le pvič, da zgradimo projekt
    - `./mvnw spring-boot:run` - s tem ukazom poženemo backend server, sedaj teče na: http://localhost:8080

4. ***Pogon pročelja (frontenda)***
    Za delovanje aplikacije ni dovolj, da zaženemo le backend, ko teče backend server, potrebujemo zagnati tudi frontend server, na katerem se lahko potem prikazujejo tudi podatki iz backenda (kompletna aplikacija)
    - `cd ris_projekt`
    - `cd frontend`
    - `npm install` - inštalira node_modules, ki so potrebni za zagon bakcenda
    - `node server.js` - s tem ukazom zaženemo frontend server, ki sedaj teče na: http://localhost:3000

5. ***Dostop do aplikacije***
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






<!-- (maybe useful, jaz se nisem spomnila, sem morala guglat) :)
    # so naslovi (#=h1, ##=h2 ...) 
    **nekaj** je boldano
    *nekaj* je italic
    ***nekaj*** je bold&italic
-->