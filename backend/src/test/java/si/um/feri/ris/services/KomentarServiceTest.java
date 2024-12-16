// package si.um.feri.ris.services;

// import java.util.Arrays;
// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertFalse;
// import static org.junit.jupiter.api.Assertions.assertNotNull;
// import static org.junit.jupiter.api.Assertions.assertThrows;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import static org.mockito.Mockito.when;
// import org.mockito.MockitoAnnotations;

// import si.um.feri.ris.entities.Komentar;
// import si.um.feri.ris.entities.Recept;
// import si.um.feri.ris.entities.Uporabnik;
// import si.um.feri.ris.repositories.KomentarRepository;
// import si.um.feri.ris.repositories.ReceptRepository;
// import si.um.feri.ris.repositories.UporabnikRepository;
// class KomentarServiceTest {

//     @Mock
//     private KomentarRepository komentarRepository;

//     @Mock
//     private ReceptRepository receptRepository;

//     @Mock
//     private UporabnikRepository uporabnikRepository;

//     @InjectMocks
//     private KomentarService komentarService;

//     @BeforeEach
//     void setUp() {
//         MockitoAnnotations.openMocks(this);
//     }

//     @Test
//     void testGetCommentsByRecept() {
//         Long receptId = 1L;
//         Komentar komentar = new Komentar(1L, "Super recept!", new Uporabnik(), new Recept());
//         when(komentarRepository.findByRecept_IdRecept(receptId)).thenReturn(Arrays.asList(komentar));

//         var comments = komentarService.getCommentsByRecept(receptId);
//         assertFalse(comments.isEmpty());
//         assertEquals(1L, comments.get(0).getId());
//     }

//     @Test
//     void testAddKomentar() {
//         Long receptId = 1L;
//         Long uporabnikId = 1L;
//         Uporabnik uporabnik = new Uporabnik(uporabnikId, "testUser", "test@example.com", "test123");
//         Recept recept = new Recept(receptId, "Recept za testenine");
//         Komentar komentar = new Komentar(1L, "Super recept!", uporabnik, recept);

//         when(receptRepository.findById(receptId)).thenReturn(Optional.of(recept));
//         when(uporabnikRepository.findById(uporabnikId)).thenReturn(Optional.of(uporabnik));
//         when(komentarRepository.save(komentar)).thenReturn(komentar);

//         Komentar savedKomentar = komentarService.addKomentar(komentar);
//         assertNotNull(savedKomentar);
//         assertEquals("Super recept!", savedKomentar.getVsebina());
//     }

//     @Test
//     void testAddKomentarReceptNotFound() {
//         Long receptId = 1L;
//         Long uporabnikId = 1L;
//         Komentar komentar = new Komentar(1L, "Super recept!", new Uporabnik(), new Recept());

//         when(receptRepository.findById(receptId)).thenReturn(Optional.empty());

//         assertThrows(IllegalArgumentException.class, () -> komentarService.addKomentar(komentar));
//     }
// }
