package si.um.feri.ris.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import si.um.feri.ris.entities.HranilnaVrednost;
import si.um.feri.ris.entities.Recept;
import si.um.feri.ris.services.ReceptService;


@RestController
@RequestMapping("/api/recepti")
@CrossOrigin(origins = "http://localhost:3000")
public class ReceptController {

    @Autowired
    private ReceptService receptService;

    @GetMapping("all")
    public List<Recept> getAllRecipes() {
        return receptService.getAllRecipes();
    }
 
    @PostMapping("/create")
    public ResponseEntity<Recept> createRecipe(@RequestBody Recept recept) {
        Recept newRecept = receptService.createRecipe(recept);
        return ResponseEntity.ok(newRecept);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Recept> getRecipeById(@PathVariable Long id) {
        Recept recept = receptService.getReceptById(id);

        return ResponseEntity.ok(recept);
    }


    @PutMapping("/{id_recept}")
    public ResponseEntity<Recept> updateRecipe(@PathVariable Long id_recept, @RequestBody Recept updatedRecipe) {
        Recept updated = receptService.updateRecipe(id_recept, updatedRecipe);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id_recept}")
    public ResponseEntity<String> deleteRecipe(@PathVariable Long id_recept) {
        try {
            receptService.deleteRecipe(id_recept);
            return ResponseEntity.ok("izbrisan");
            // boolean deleted = receptService.deleteRecipe(id);
            // if (deleted) {
            //     return ResponseEntity.noContent().build();
            // } else {
            //     return ResponseEntity.notFound().build();
            // }
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
            // e.printStackTrace();
            // throw new RuntimeException("errorrrr deleting recept", e);
            // //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        
    } 

    @GetMapping("")
    public List<Recept> isciRecepte(@RequestParam String naslov) {
        return receptService.isciRecepte(naslov);
    }
    // @GetMapping("all")
    // public ResponseEntity<List<Recept>> getAllRecipes() {
    //     List<Recept> recepti = receptService.getAllRecipes();
    //     return ResponseEntity.ok(recepti);
    // }

    @PostMapping("/{receptId}/hranilnaVrednost")
    public ResponseEntity<HranilnaVrednost> setHranilnaVrednost(
            @PathVariable Long receptId,
            @RequestBody HranilnaVrednost hranilnaVrednost) {
        HranilnaVrednost newHranilnaVrednost = receptService.setHranilnaVrednost(receptId, hranilnaVrednost);
        return ResponseEntity.ok(newHranilnaVrednost);
    }
    
    @GetMapping("/{receptId}/hranilneVrednosti")
    public ResponseEntity<List<HranilnaVrednost>> getHranilneVrednosti(@PathVariable Long receptId) {
        Recept recept = receptService.getReceptById(receptId);
        if (recept != null) {
            List<HranilnaVrednost> hranilneVrednosti = recept.getHranilneVrednosti().stream()
                    .map(hranilnaVrednost -> new HranilnaVrednost(hranilnaVrednost.getNaziv(), hranilnaVrednost.getKolicina(), hranilnaVrednost.getMerska_enota(), null))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(hranilneVrednosti);
        }
        return ResponseEntity.notFound().build();
    }

    



}
