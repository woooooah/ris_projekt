## Odgovornosti članov skupine

- **Kaja Vidmar**: Razvila teste za ustvarjanje recepta, brisanje receptov, pridobivanje vseh receptov 
- **Sanja Muršič**:
- **Tara Sedovšek**: Razvila test za uspešno in neuspešno registracijo.

# Poročilo o testiranju
## TARA:
1. **Test uspešne registracije**
   - Preverja, ali se uporabnik lahko uspešno registrira z vsemi obveznimi in pravilnimi podatki.

2. **Test neuspešne registracije zaradi manjkajočih polj**
   - Preverja, ali aplikacija pravilno zavrne registracijo, ko so nekatera polja manjkajoča.
   - Pomembno je za preverjanje obnašanja aplikacije v primeru napak uporabnika.

### Analiza uspešnosti testov

**REGISTRACIJA**:<br>
- **Rezultati**:
  - Testi so pokazali, da funkcionalnost registracije pravilno obravnava tako pozitivne kot negativne scenarije.
- **Napake**:
  - Med testiranjem je bila odkrita napaka pri preverjanju manjkajočih polj.
- **Popravki**:


## KAJA:
1. **Test za ustvarjanje receptov**
  - preveri, da se recepti ustvarjajo pravilno in, da se shranijo v bazo
2. **Test brisanja receptov**
  - preveri, da se recepti lahko prvilno izbrišejo in, da je zagotovljeno pravilno obravnavanje izjem, če se poskuša izbrisati recept, ki ne obstaja 
3. **Test pridobivanja receptov**
  - preveri, da so recepti pravilno shranjeni in prvilno pridobljeni iz baze

### Analiza uspešnosti testov
Vsi testi so se izvedli uspešno, kar pomeni, da je pravilno implementirano:
- ustvarjanje receptov (preverjeno s testCreateRecipe)
- brisanje receptov (preverjeno s testDeleteNonExistentRecipe)
- pridobivanje receptov (preverjeno s testGetAllRecipes)



