package si.um.feri.ris.entities;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Recept")
public class Recept {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_recept;

    @Column(nullable = false)
    private String naslov;

    @Column(nullable = false)
    private Long cas_priprave;

    @Column(nullable = false)
    private Long skupni_cas;

    @Column(nullable = false)
    private Long stevilo_porcij; 

    @OneToMany(mappedBy = "recept", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<HranilnaVrednost> hranilneVrednosti = new ArrayList<>();

    public interface Summary {}

    @JsonView(Summary.class)
    @JsonManagedReference
    public List<HranilnaVrednost> getHranilneVrednosti() {
        return hranilneVrednosti;
    }

    public void setHranilneVrednosti(List<HranilnaVrednost> hranilneVrednosti) {
        this.hranilneVrednosti = hranilneVrednosti;
    }

    // One Recept can have many Sestavina
    @OneToMany(mappedBy = "recept", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private List<Sestavina> sestavine = new ArrayList<>();

    @OneToMany(mappedBy = "recept", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private List<Korak> koraki = new ArrayList<>();

    //Komentarji 
    @OneToMany(mappedBy = "recept", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Komentar> komentarji = new ArrayList<>();


    public Recept(Long id_recept, String naslov) {
        this.id_recept = id_recept;
        this.naslov = naslov;
    }
    
    // Optional: Include a default no-argument constructor (important for JPA)
    public Recept() {
    }
    


    //GETTERJI
    public Long getId_recept() {
        return id_recept;
    }

    public String getNaslov() {
        return naslov;
    }

    public Long getCas_priprave() {
        return cas_priprave;
    }

    public Long getSkupni_cas() {
        return skupni_cas;
    }

    public Long getStevilo_porcij() {
        return stevilo_porcij;
    }

    public List<Sestavina> getSestavine() {
        return sestavine;
    }

    public List<Korak> getKoraki() {
        return koraki;
    }

    //SETTERJI
    public void setId_recept(Long id_recept) {
        this.id_recept = id_recept;
    }

    public void setNaslov(String naslov) {
        this.naslov = naslov;
    }

    public void setCas_priprave(Long cas_priprave) {
        this.cas_priprave = cas_priprave;
    }

    public void setSkupni_cas(Long skupni_cas) {
        this.skupni_cas = skupni_cas;
    }

    public void setStevilo_porcij(Long stevilo_porcij) {
        this.stevilo_porcij = stevilo_porcij;
    }

    public void setSestavine(List<Sestavina> sestavine) {
        this.sestavine = sestavine;
    }

    public void setKoraki(List<Korak> koraki) {
        this.koraki = koraki;
    }
}
