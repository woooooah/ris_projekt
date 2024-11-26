package si.um.feri.ris.services;

import java.util.List;

import org.springframework.stereotype.Service;

import si.um.feri.ris.entities.Komentar;
import si.um.feri.ris.repositories.KomentarRepository;

@Service
public class KomentarService {

    private final KomentarRepository komentarRepository;

    public KomentarService(KomentarRepository komentarRepository) {
        this.komentarRepository = komentarRepository;
    }

    public List<Komentar> getCommentsByRecept(Long receptId) {
        return komentarRepository.findByRecept_IdRecept(receptId);
    }

    public Komentar addKomentar(Komentar komentar) {
        return komentarRepository.save(komentar);
    }
    
}

