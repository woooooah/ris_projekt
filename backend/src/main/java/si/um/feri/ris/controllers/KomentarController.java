package si.um.feri.ris.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import si.um.feri.ris.entities.Komentar;
import si.um.feri.ris.entities.Recept;
import si.um.feri.ris.services.KomentarService;
import si.um.feri.ris.services.ReceptService;

@RestController
@RequestMapping("/api/komentarji")
@CrossOrigin(origins = "http://localhost:3000") 
public class KomentarController {

    private final KomentarService komentarService;
    private ReceptService receptService;

    public KomentarController(KomentarService komentarService, ReceptService receptService) {
        this.komentarService = komentarService;
        this.receptService = receptService;
    }
    

    @GetMapping("/recept/{receptId}")
    public ResponseEntity<List<Komentar>> getKomentarjiByRecept(@PathVariable Long receptId) {
        List<Komentar> komentarji = komentarService.getCommentsByRecept(receptId);
        return ResponseEntity.ok(komentarji);
    }

    @PostMapping("/nov/recept/{receptId}")
    public ResponseEntity<Komentar> addKomentar(@PathVariable Long receptId, @RequestBody Komentar komentar) {
        try {
            // Fetch the Recept entity
            Recept recept = receptService.getReceptById(receptId);
            if (recept == null) {
                return ResponseEntity.status(404).body(null); // Recept not found
            }
    
            // Associate Recept with Komentar
            komentar.setRecept(recept);
    
            // Save the Komentar
            Komentar newKomentar = komentarService.addKomentar(komentar);
            return ResponseEntity.ok(newKomentar);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
    

        @DeleteMapping("/izbris/{komentarId}")
        public ResponseEntity<Void> deleteKomentar(@PathVariable Long komentarId) {
        try {
            komentarService.deleteKomentar(komentarId);
            return ResponseEntity.noContent().build(); // 204 No Content on successful deletion
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        }
}
