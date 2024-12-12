package si.um.feri.ris.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "HranilnaVrednost")
public class HranilnaVrednost {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_hranila;

    @Column(nullable = false)
    private String naziv;

    @Column(nullable = false)
    private Double kolicina;

    @Column(nullable = false)
    private String merska_enota;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "recept_id", nullable = false)
    private Recept recept;

    // Constructors
    public HranilnaVrednost() {
    }

    public HranilnaVrednost(String naziv, Double kolicina, String merska_enota, Recept recept) {
        this.naziv = naziv;
        this.kolicina = kolicina;
        this.merska_enota = merska_enota;
        this.recept = recept;
    }

    // Getters and Setters
    public Long getId_hranila() {
        return id_hranila;
    }

    public void setId_hranila(Long id_hranila) {
        this.id_hranila = id_hranila;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public Double getKolicina() {
        return kolicina;
    }

    public void setKolicina(Double kolicina) {
        this.kolicina = kolicina;
    }

    public String getMerska_enota() {
        return merska_enota;
    }

    public void setMerska_enota(String merska_enota) {
        this.merska_enota = merska_enota;
    }

    public interface WithoutRecept {}
    
    @JsonView(WithoutRecept.class)
    public Recept getRecept() {
        return recept;
    }

    public void setRecept(Recept recept) {
        this.recept = recept;
    }
}

