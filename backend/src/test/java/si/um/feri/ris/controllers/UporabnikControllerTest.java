// package si.um.feri.ris.controllers;

// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

// import com.fasterxml.jackson.databind.ObjectMapper;

// import org.junit.jupiter.api.Test;
// import org.mockito.Mockito;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.MediaType;
// import org.springframework.test.web.servlet.MockMvc;

// import si.um.feri.ris.entities.Uporabnik;
// import si.um.feri.ris.services.UporabnikService;

// @SpringBootTest
// @AutoConfigureMockMvc
// public class UporabnikControllerTest {

//     @Autowired
//     private MockMvc mockMvc;

//     @MockBean
//     private UporabnikService uporabnikService;


//     // uspešna registracija
//     @Test
//     void testSuccessfulRegistration() throws Exception {
//         // Priprava uporabnika
//         Uporabnik testUser = new Uporabnik();
//         testUser.setIme("Janez");
//         testUser.setPriimek("Novak");
//         testUser.setEmail("janez.novak@example.com");
//         testUser.setUsername("jnovak");
//         testUser.setGeslo("geslo123");

//         Mockito.when(uporabnikService.saveUporabnik(Mockito.any(Uporabnik.class))).thenReturn(testUser);

        
//         mockMvc.perform(post("/api/uporabniki/register")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(new ObjectMapper().writeValueAsString(testUser)))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.username").value("jnovak"))
//                 .andExpect(jsonPath("$.email").value("janez.novak@example.com"));
//     }

//      //  neuspešno registracijo, ko manjkajo obvezna polja.

//     @Test
//     void testFailedRegistrationDueToMissingFields() throws Exception {
        
//         Uporabnik invalidUser = new Uporabnik(); 

//         mockMvc.perform(post("/api/uporabniki/register")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(new ObjectMapper().writeValueAsString(invalidUser)))
//                 .andExpect(status().isBadRequest());
//     }
// }
