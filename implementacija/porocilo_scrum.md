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
