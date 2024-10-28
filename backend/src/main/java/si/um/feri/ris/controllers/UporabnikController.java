/*package si.um.feri.ris.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.um.feri.ris.entities.Uporabnik;
import si.um.feri.ris.services.UporabnikService;

@RestController
@RequestMapping("/api/uporabniki")
@CrossOrigin(origins = "http://localhost:3000")  // Allow frontend requests
public class UporabnikController {

    @Autowired
    private UporabnikService uporabnikService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUporabnik(@RequestBody Uporabnik uporabnik) {
        if (uporabnikService.existsByUsername(uporabnik.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        
        Uporabnik savedUporabnik = uporabnikService.saveUporabnik(uporabnik);
        return ResponseEntity.ok(savedUporabnik);
    }
}*/