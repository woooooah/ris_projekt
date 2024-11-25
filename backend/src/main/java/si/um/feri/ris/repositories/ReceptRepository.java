package si.um.feri.ris.repositories;

import java.util.List;
// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import si.um.feri.ris.entities.Recept;

public interface ReceptRepository extends JpaRepository<Recept, Long>{   
     // Custom query to get distinct Recept entries
    @Query("SELECT DISTINCT r FROM Recept r LEFT JOIN FETCH r.sestavine")
    List<Recept> findAllDistinct(); 

    List<Recept> findByNaslovContainingIgnoreCase(String naslov);

    // Optional<Recept> receptId(Long id_r);


}
