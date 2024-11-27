package si.um.feri.ris.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import si.um.feri.ris.entities.Komentar;

public interface KomentarRepository extends JpaRepository<Komentar, Long> {
    @Query("SELECT k FROM Komentar k WHERE k.recept.id_recept = ?1")
List<Komentar> findByRecept_IdRecept(Long receptId);

}

