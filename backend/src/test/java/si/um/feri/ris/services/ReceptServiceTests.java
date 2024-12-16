// package si.um.feri.ris.services;

// import org.junit.jupiter.api.Assertions;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// import si.um.feri.ris.entities.Recept;
// import si.um.feri.ris.repositories.ReceptRepository;

// import java.util.List;

// @SpringBootTest
// class ReceptServiceTests {

//     @Autowired
//     private ReceptService receptService;

//     @Autowired
//     private ReceptRepository receptRepository;

//     @BeforeEach
//     void setUp() {
//         receptRepository.deleteAll();
//     }

//     @Test
//     void testCreateRecipe() {
        
//         Recept recept = new Recept();
//         recept.setNaslov("Testni Recept");
//         recept.setCas_priprave(30L);
//         recept.setSkupni_cas(60L);

//         Recept savedRecept = receptService.createRecipe(recept);

//         Assertions.assertNotNull(savedRecept.getId_recept(), "ID should not be null after saving.");
//         Assertions.assertEquals("Testni Recept", savedRecept.getNaslov(), "Naslov recepta se ne ujema.");
//     }

//     @Test
//     void testDeleteNonExistentRecipe() {
     
//         Long nonExistentId = 999L;

//         RuntimeException exception = Assertions.assertThrows(
//                 RuntimeException.class,
//                 () -> receptService.deleteRecipe(nonExistentId),
//                 "Expected an exception for non-existent recipe deletion."
//         );

//         Assertions.assertEquals(" ni najden recept z id:" + nonExistentId, exception.getMessage());
//     }

//     @Test
//     void testGetAllRecipes() {
       
//         Recept recept1 = new Recept();
//         recept1.setNaslov("Recept 1");
//         recept1.setCas_priprave(20L);
//         recept1.setSkupni_cas(50L);
//         receptService.createRecipe(recept1);

//         Recept recept2 = new Recept();
//         recept2.setNaslov("Recept 2");
//         recept2.setCas_priprave(40L);
//         recept2.setSkupni_cas(70L);
//         receptService.createRecipe(recept2);

//         List<Recept> allRecipes = receptService.getAllRecipes();

//         Assertions.assertEquals(2, allRecipes.size(), "All recipes size should be 2.");
//     }
// }
