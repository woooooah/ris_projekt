package si.um.feri.ris.services;

import java.util.List;

import org.springframework.stereotype.Service;

import si.um.feri.ris.entities.Komentar;
import si.um.feri.ris.entities.Recept;
import si.um.feri.ris.entities.Uporabnik;
import si.um.feri.ris.repositories.KomentarRepository;
import si.um.feri.ris.repositories.ReceptRepository;
import si.um.feri.ris.repositories.UporabnikRepository;

@Service
public class KomentarService {

    private final ReceptRepository receptRepository;
    private final KomentarRepository komentarRepository;
    private final UporabnikRepository uporabnikRepository;


    public KomentarService(KomentarRepository komentarRepository, ReceptRepository receptRepository, UporabnikRepository uporabnikRepository) {
        this.komentarRepository = komentarRepository;
        this.receptRepository = receptRepository;
        this.uporabnikRepository = uporabnikRepository;
    }
    

    public List<Komentar> getCommentsByRecept(Long receptId) {
        return komentarRepository.findByRecept_IdRecept(receptId);
    }

    public Komentar addKomentar(Komentar komentar) {
        // Check if Recept exists in the database
        Long receptId = komentar.getRecept().getId_recept();
        Long uporabnikId = komentar.getUporabnik().getId_uporabnik();

        Recept recept = receptRepository.findById(receptId)
                .orElseThrow(() -> new IllegalArgumentException("Recept with ID " + receptId + " does not exist."));
        

            // Fetch and validate Uporabnik
        Uporabnik uporabnik = uporabnikRepository.findById(uporabnikId)
                .orElseThrow(() -> new IllegalArgumentException("Uporabnik with ID " + uporabnikId + " does not exist."));

    
        // Associate the existing Recept with the Komentar
        komentar.setRecept(recept);
        komentar.setUporabnik(uporabnik);

    
        // Save the Komentar
        return komentarRepository.save(komentar);
    }
    
    
}

