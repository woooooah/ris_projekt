package si.um.feri.ris.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import jakarta.transaction.Transactional;
import si.um.feri.ris.entities.Korak;
import si.um.feri.ris.entities.Recept;
import si.um.feri.ris.entities.Sestavina;
import si.um.feri.ris.repositories.ReceptRepository;
// import si.um.feri.ris.exceptions.ReceptNotFoundException;

@Service
public class ReceptService {
    @Autowired
    private ReceptRepository receptRepository;

    public List<Recept> getAllRecipes() {
        return receptRepository.findAllDistinct();
    }

    public Recept createRecipe(Recept recept) {
        if (recept.getCas_priprave() == null || recept.getSkupni_cas() == null) {
            throw new IllegalArgumentException("Preparation time and total time cannot be null");
        }
        return receptRepository.save(recept);
    }

    public Recept updateRecipe(Long id, Recept updatedRecipe) {
        return receptRepository.findById(id).map(existingRecipe -> {
            
            existingRecipe.setNaslov(updatedRecipe.getNaslov());
            existingRecipe.setCas_priprave(updatedRecipe.getCas_priprave());
            existingRecipe.setSkupni_cas(updatedRecipe.getSkupni_cas());
    
            //zbrises vse obstojece in posodobis nove
            existingRecipe.getSestavine().clear();
            for (Sestavina sestavina : updatedRecipe.getSestavine()) {
                sestavina.setRecept(existingRecipe); // referenca na "starsa"
                existingRecipe.getSestavine().add(sestavina); 
            }
    
            existingRecipe.getKoraki().clear();
            for (Korak korak : updatedRecipe.getKoraki()) {
                korak.setRecept(existingRecipe); 
                existingRecipe.getKoraki().add(korak); 
                
            }
    
            return receptRepository.save(existingRecipe); 
        }).orElse(null);
    }
    
    // @Transactional
    // public void deleteRecipe(Long id) {
    //     Optional<Recept> receptOptional = receptRepository.findById(id);

    //     if (receptOptional.isPresent()) {
    //         Recept recept = receptOptional.get();
        
    //     // Ensure related entities are properly removed
    //     recept.getSestavine().clear();  // Clear all ingredients
    //     recept.getKoraki().clear();      // Clear all steps

    //     receptRepository.delete(recept); // Now delete the recipe
    //     } else {
    //         throw new RuntimeException("Recipe not found with id: " + id);
    //     }
    // }


    //@Transactional
    public void deleteRecipe(Long id) {
        if (receptRepository.existsById(id)) {
            receptRepository.deleteById(id);
            //return true;
        } else {
            throw new RuntimeException(" ni najden recept z id:" +id);
            //return false;
        }
    }

    public List<Recept> isciRecepte(String naslov) {
        return receptRepository.findByNaslovContainingIgnoreCase(naslov);
    }   

    // public Recept getRecipeById(Long id_recept) {
    //     Optional<Recept> optionalRecept = receptRepository.findById(id_recept);
    //     return optionalRecept.orElse(null);
    //     // return receptRepository.findById(id_recept).orElse(null);
    // }

    public Recept getReceptById(Long id) {
        return receptRepository.findById(id).orElse(null);
                // .orElseThrow(() -> new ReceptNotFoundException("Recept not found with id: " + id));
    }
    
    // public Recept receptId(Long id_r) {
    //     // Optional<Recept
    //     return receptRepository.receptId(id_r);
    // }

    // public ReceptService(ReceptRepository receptRepository) {
    //     this.receptRepository = receptRepository;
    // }

    // public Recept getReceptById(Long id) {
    //     return receptRepository.findById(id)
    //             .orElseThrow(() -> new ReceptNotFoundException("Recept not found with id: " + id));
    // }


}