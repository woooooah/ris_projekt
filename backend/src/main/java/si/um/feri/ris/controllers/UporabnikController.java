package si.um.feri.ris.controllers;

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

   

    @PostMapping("/register")
    public ResponseEntity<?> registerUporabnik(@RequestBody Uporabnik uporabnik) {
        if (uporabnikService.existsByUsername(uporabnik.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        
        Uporabnik savedUporabnik = uporabnikService.saveUporabnik(uporabnik);
        return ResponseEntity.ok(savedUporabnik);
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