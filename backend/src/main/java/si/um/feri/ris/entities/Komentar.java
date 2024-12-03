package si.um.feri.ris.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Komentar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vsebina;

    @ManyToOne
    @JoinColumn(name = "tk_uporabnik", nullable = false)
    private Uporabnik uporabnik;

    @ManyToOne
    @JoinColumn(name = "tk_recept", nullable = false)
    private Recept recept;

    private String datum;

    //konstruktorji

    public Komentar(Long id, String vsebina, Uporabnik uporabnik, Recept recept) {
        this.id = id;
        this.vsebina = vsebina;
        this.uporabnik = uporabnik;
        this.recept = recept;
    }

        // Default Constructor
        public Komentar() {
        }
    

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVsebina() {
        return vsebina;
    }

    public void setVsebina(String vsebina) {
        this.vsebina = vsebina;
    }


    public Uporabnik getUporabnik() {
        return uporabnik;
    }

    public void setUporabnik(Uporabnik uporabnik) {
        this.uporabnik = uporabnik;
    }

    public Recept getRecept() {
        return recept;
    }

    public void setRecept(Recept recept) {
        this.recept = recept;
    }

    public String getDatum() {
        return datum;
    }

    public void setDatum(String datum) {
        this.datum = datum;
    }
}

