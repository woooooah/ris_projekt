# Scrum poročilo

1. Dodaj število porcij v bazo
    - v entiteto recept sem dodala število porcij

2. Popravi testne podatke
    - popravila sem testne podatke (vključila sem število porcij)

3. Preveri, da deluje pridobivanje receptov z dodanim številom porcij
    - preverila sem, da se pravilno vrnejo recepti z dodanim številom porcij
    - pravilno deluje tako pridobivanje vseh receptov kot tudi pridobivanje posameznega recepta

4. Preveri, da deluje posodabljanje receptov z dodanim številom porcij
    - posodabljanje recepta ni delovalo kot bi moralo. Posodobilo se je vse, razen števila porcij, zato sem mogla popraviti ReceptService.java, kjer sem vključila število porcij v updateRecipe

5. Spremeni html za posamezen recept
    - dodala container za preračunavanje porcij in sestavin, vključno z vnosnim poljem in gumbom 

6. Dodajanje posameznemu receptu število porcij
    - preverila, da se posameznemu prikaže število porcij

7. Metoda za preračun porcij in prikaz 
    - posodobila posamezenrecept.js tako da sem vključila prikaz porcij
    - implementacija metode za preračun in za prikaz pop-up okna ob vnosu v vnosno polje in pritisku na gumb