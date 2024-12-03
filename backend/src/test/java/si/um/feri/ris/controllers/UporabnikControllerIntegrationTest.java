package si.um.feri.ris.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import si.um.feri.ris.entities.Uporabnik;
import si.um.feri.ris.repositories.UporabnikRepository;

@SpringBootTest
@AutoConfigureMockMvc
public class UporabnikControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UporabnikRepository uporabnikRepository;

    /**
     * Test preveri, ali se uporabnik uspešno shrani v bazo podatkov ob pravilnih podatkih.
     */
    @Test
    void testSuccessfulRegistrationIntegration() throws Exception {
        // Priprava testnega uporabnika
        Uporabnik testUser = new Uporabnik();
        testUser.setIme("Janez");
        testUser.setPriimek("Novak");
        testUser.setEmail("janez.novak@example.com");
        testUser.setUsername("jnovak");
        testUser.setGeslo("geslo123");

        // Preverjanje stanja baze pred testom
        long initialCount = uporabnikRepository.count();

        // Simulacija HTTP zahteve za registracijo
        mockMvc.perform(post("/api/uporabniki/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(testUser)))
                .andExpect(status().isOk());

        // Preverjanje, ali je uporabnik uspešno dodan v bazo
        long finalCount = uporabnikRepository.count();
        assertThat(finalCount).isEqualTo(initialCount + 1);

        // Počistimo bazo po testu
        uporabnikRepository.deleteAll();
    }

    /**
     * Test preveri, ali registracija ne uspe, če uporabnik z istim e-naslovom že obstaja.
     */
    @Test
    void testRegistrationFailsForDuplicateEmail() throws Exception {
        // Priprava testnega uporabnika
        Uporabnik existingUser = new Uporabnik();
        existingUser.setIme("Janez");
        existingUser.setPriimek("Novak");
        existingUser.setEmail("janez.novak@example.com");
        existingUser.setUsername("jnovak");
        existingUser.setGeslo("geslo123");

        // Shranimo uporabnika v bazo
        uporabnikRepository.save(existingUser);

        // Poskus registracije novega uporabnika z istim email naslovom
        Uporabnik duplicateUser = new Uporabnik();
        duplicateUser.setIme("Maja");
        duplicateUser.setPriimek("Horvat");
        duplicateUser.setEmail("janez.novak@example.com");
        duplicateUser.setUsername("maja");
        duplicateUser.setGeslo("geslo123");

        // Simulacija HTTP zahteve za registracijo z dvojnim e-poštnim naslovom
        mockMvc.perform(post("/api/uporabniki/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(duplicateUser)))
                .andExpect(status().isBadRequest());

        // Počistimo bazo po testu
        uporabnikRepository.deleteAll();
    }
}
