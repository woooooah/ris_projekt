package si.um.feri.ris.services;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import si.um.feri.ris.entities.Uporabnik;
import si.um.feri.ris.repositories.UporabnikRepository;

@Service
public class UporabnikService {

    @Autowired
    private UporabnikRepository uporabnikRepository;

    public Iterable<Uporabnik> getAllUsers() {
        return uporabnikRepository.findAll();
    }

    /*@Autowired
    private PasswordEncoder passwordEncoder;
    */

    public Uporabnik saveUporabnik(Uporabnik uporabnik) {
        // Encrypt password
        //uporabnik.setGeslo(passwordEncoder.encode(uporabnik.getGeslo()));
        return uporabnikRepository.save(uporabnik);
    }

    public boolean existsByUsername(String username) {
        return uporabnikRepository.findByUsername(username).isPresent();
    }

    public Uporabnik getUserById(Long id) {
        return uporabnikRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found with ID: " + id));
    }
    

    // Update an existing user
    public Uporabnik updateUser(Long id, Uporabnik uporabnik) {
        Uporabnik user = uporabnikRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found with ID: " + id));

        if (uporabnik.getUsername() != null) user.setUsername(uporabnik.getUsername());
        if (uporabnik.getEmail() != null) user.setEmail(uporabnik.getEmail());
        if (uporabnik.getGeslo() != null) user.setGeslo(uporabnik.getGeslo());

        return uporabnikRepository.save(user);
    }
    // Delete a user
    public void deleteUser(Long id) {
        if (!uporabnikRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        uporabnikRepository.deleteById(id);
    }
    

}

/*
package si.um.feri.ris.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import si.um.feri.ris.entity.Uporabnik;
import si.um.feri.ris.repository.UporabnikRepository;

@Service
public class UporabnikService {
    @Autowired
    private UporabnikRepository uporabnikRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Method to register a new user
    public Uporabnik registerUser(Uporabnik uporabnik) {
        // Encrypt password
        uporabnik.setGeslo(passwordEncoder.encode(uporabnik.getGeslo()));
        // Save user to the database
        return uporabnikRepository.save(uporabnik);
    }

    // Method to find a user by username
    public Uporabnik findByUsername(String username) {
        return uporabnikRepository.findByUsername(username);
    }

}
* */