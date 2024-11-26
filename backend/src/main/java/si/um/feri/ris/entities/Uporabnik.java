package si.um.feri.ris.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Uporabnik")
public class Uporabnik {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_uporabnik;

    @Column(nullable = false)
    private String ime;

    @Column(nullable = false)
    private String priimek;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String geslo; // to bo shranjevalo šifrirano geslo

    @Column(nullable = false)
    private boolean admin;
    
     public Long getId_uporabnik() {
         return id_uporabnik;
     }

     public String getIme() {
         return ime;
     }

     public String getPriimek() {
         return priimek;
     }

     public String getEmail() {
         return email;
     }

     public String getUsername() {
         return username;
     }

     public String getGeslo() {
         return geslo;
     }

     public void setId_uporabnik(Long id_uporabnik) {
         this.id_uporabnik = id_uporabnik;
     }

     public void setIme(String ime) {
         this.ime = ime;
     }

     public void setPriimek(String priimek) {
         this.priimek = priimek;
     }

     public void setEmail(String email) {
         this.email = email;
     }

     public void setUsername(String username) {
         this.username = username;
     }

     public void setGeslo(String geslo) {
         this.geslo = geslo;
     }
//Komentarji povezava
     @OneToMany(mappedBy = "uporabnik", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Komentar> komentarji = new ArrayList<>();


}
