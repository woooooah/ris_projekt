package si.um.feri.ris.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.um.feri.ris.entities.Uporabnik;
import si.um.feri.ris.repositories.UporabnikRepository;
import si.um.feri.ris.services.UporabnikService;

@RestController
@RequestMapping("/api/uporabniki")
@CrossOrigin(origins = "http://localhost:3000")  // Allow frontend requests
public class UporabnikController {

    @Autowired
    private UporabnikService uporabnikService;

    @GetMapping
    public Iterable<Uporabnik> getAllUsers() {
        return uporabnikService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Uporabnik> getUserById(@PathVariable Long id) {
        Uporabnik user = uporabnikService.getUserById(id);
        return ResponseEntity.ok(user);
    }

   
/*
    @PostMapping("/register")
    public ResponseEntity<?> registerUporabnik(@RequestBody Uporabnik uporabnik) {
        if (uporabnik.getIme() == null || uporabnik.getPriimek() == null || uporabnik.getEmail() == null ||
        uporabnik.getUsername() == null || uporabnik.getGeslo() == null) {
        return ResponseEntity.badRequest().body("Vsa polja so obvezna!");
        
    }

        if (uporabnikService.existsByUsername(uporabnik.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        
        Uporabnik savedUporabnik = uporabnikService.saveUporabnik(uporabnik);
        return ResponseEntity.ok(savedUporabnik);
    }
         */
   @PostMapping("/register")
public ResponseEntity<?> registerUporabnik(@RequestBody Uporabnik uporabnik) {
    // Validacija polj
    if (uporabnik.getIme() == null || uporabnik.getPriimek() == null || 
        uporabnik.getEmail() == null || uporabnik.getUsername() == null || 
        uporabnik.getGeslo() == null) {
        return ResponseEntity.badRequest().body("Vsa polja so obvezna!");
    }
    

    // Preverite, ali username že obstaja
    if (uporabnikService.existsByUsername(uporabnik.getUsername())) {
        return ResponseEntity.badRequest().body("Username already exists");
    }

    try {
        // Shranimo uporabnika
        Uporabnik savedUporabnik = uporabnikService.saveUporabnik(uporabnik);
        return ResponseEntity.ok(savedUporabnik);
    } catch (Exception e) {
        // Prikažite napako v logih
        e.printStackTrace();
        return ResponseEntity.status(500).body("Napaka pri registraciji uporabnika.");
    }
}


    // PUT: Update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Uporabnik uporabnik) {
        try {
            Uporabnik updatedUser = uporabnikService.updateUser(id, uporabnik);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    /*@PutMapping("/{id}")
    public Uporabnik updateUser(@PathVariable Long id, @RequestBody UporabnikDTO UporabnikDTO) {
        Uporabnik user = UporabnikRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found with ID: " + id));

        if (UporabnikDTO.getUsername() != null) user.setUsername(UporabnikDTO.getUsername());
        if (UporabnikDTO.getEmail() != null) user.setEmail(UporabnikDTO.getEmail());
        if (UporabnikDTO.getPassword() != null) user.setPassword(UporabnikDTO.getPassword());

        return UporabnikRepository.save(user);
    }
        */

        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
            String email = credentials.get("email");
            String geslo = credentials.get("geslo");

            Optional<Uporabnik> uporabnik = uporabnikService.findByEmail(email);
            if (uporabnik.isPresent() && uporabnik.get().getGeslo().equals(geslo)) {
                return ResponseEntity.ok(Map.of(
                    "id", uporabnik.get().getId_uporabnik(),
                    "username", uporabnik.get().getUsername(),
                    "email", uporabnik.get().getEmail()
                ));
            } else {
                return ResponseEntity.status(401).body("Invalid email or password");
        }
}



        // DELETE: Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            uporabnikService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    /*@DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        if (!UporabnikRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        UporabnikRepository.deleteById(id);
    }
        */
}