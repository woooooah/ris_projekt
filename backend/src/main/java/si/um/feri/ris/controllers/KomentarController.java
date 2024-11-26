package si.um.feri.ris.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import si.um.feri.ris.entities.Komentar;
import si.um.feri.ris.services.KomentarService;

@RestController
@RequestMapping("/api/komentarji")
@CrossOrigin(origins = "http://localhost:3000") 
public class KomentarController {

    private final KomentarService komentarService;

    public KomentarController(KomentarService komentarService) {
        this.komentarService = komentarService;
    }

    @GetMapping("/recept/{receptId}")
    public ResponseEntity<List<Komentar>> getKomentarjiByRecept(@PathVariable Long receptId) {
        List<Komentar> komentarji = komentarService.getCommentsByRecept(receptId);
        return ResponseEntity.ok(komentarji);
    }

    @PostMapping
    public ResponseEntity<Komentar> addKomentar(@RequestBody Komentar komentar) {
        Komentar newKomentar = komentarService.addKomentar(komentar);
        return ResponseEntity.ok(newKomentar);
    }
}
