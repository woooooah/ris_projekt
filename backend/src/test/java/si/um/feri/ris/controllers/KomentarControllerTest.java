// package si.um.feri.ris.controllers;

// import java.util.Arrays;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import static org.mockito.ArgumentMatchers.any;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import static org.mockito.Mockito.doNothing;
// import static org.mockito.Mockito.doThrow;
// import static org.mockito.Mockito.when;
// import org.mockito.MockitoAnnotations;
// import org.springframework.test.web.servlet.MockMvc;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
// import org.springframework.test.web.servlet.setup.MockMvcBuilders;

// import si.um.feri.ris.entities.Komentar;
// import si.um.feri.ris.entities.Recept;
// import si.um.feri.ris.entities.Uporabnik;
// import si.um.feri.ris.services.KomentarService;
// import si.um.feri.ris.services.ReceptService;
// class KomentarControllerTest {

//     private MockMvc mockMvc;

//     @Mock
//     private KomentarService komentarService;

//     @Mock
//     private ReceptService receptService;

//     @InjectMocks
//     private KomentarController komentarController;

//     @BeforeEach
//     void setUp() {
//         MockitoAnnotations.openMocks(this);
//         mockMvc = MockMvcBuilders.standaloneSetup(komentarController).build();
//     }

//     @Test
//     void testGetCommentsByRecept() throws Exception {
//         Long receptId = 1L;
//         Komentar komentar1 = new Komentar(1L, "Odličen recept!", new Uporabnik(), new Recept());
//         Komentar komentar2 = new Komentar(2L, "Zelo dobro!", new Uporabnik(), new Recept());
//         when(komentarService.getCommentsByRecept(receptId)).thenReturn(Arrays.asList(komentar1, komentar2));

//         mockMvc.perform(get("/api/komentarji/recept/{receptId}", receptId))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$[0].id").value(1L))
//                 .andExpect(jsonPath("$[1].id").value(2L));
//     }

//     @Test
//     void testAddKomentar() throws Exception {
//         Long receptId = 1L;
//         Komentar komentar = new Komentar(1L, "Super recept!", new Uporabnik(), new Recept());
//         when(receptService.getReceptById(receptId)).thenReturn(new Recept(receptId, "Recept za testenine"));
//         when(komentarService.addKomentar(any(Komentar.class))).thenReturn(komentar);

//         mockMvc.perform(post("/api/komentarji/nov/recept/{receptId}", receptId)
//                 .contentType("application/json")
//                 .content("{\"vsebina\":\"Super recept!\", \"uporabnikId\":1}"))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.vsebina").value("Super recept!"))
//                 .andExpect(jsonPath("$.id").value(1L));
//     }

//     @Test
//     void testDeleteKomentar() throws Exception {
//         Long komentarId = 1L;
//         doNothing().when(komentarService).deleteKomentar(komentarId);

//         mockMvc.perform(delete("/api/komentarji/izbris/{id}", komentarId))
//                 .andExpect(status().isNoContent());
//     }

//     @Test
//     void testDeleteKomentarNotFound() throws Exception {
//         Long komentarId = 1L;
//         doThrow(new IllegalArgumentException("Komentar with ID 1 does not exist.")).when(komentarService).deleteKomentar(komentarId);

//         mockMvc.perform(delete("/api/komentarji/izbris/{id}", komentarId))
//                 .andExpect(status().isBadRequest());
//     }
// }
