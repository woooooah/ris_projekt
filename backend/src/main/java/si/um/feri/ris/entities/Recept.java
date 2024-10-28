package si.um.feri.ris.entities;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;

import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonManagedReference;

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

    // One Recept can have many Sestavina
    @OneToMany(mappedBy = "recept", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private List<Sestavina> sestavine = new ArrayList<>();

    @OneToMany(mappedBy = "recept", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private List<Korak> koraki = new ArrayList<>();


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

    public void setSestavine(List<Sestavina> sestavine) {
        this.sestavine = sestavine;
    }

    public void setKoraki(List<Korak> koraki) {
        this.koraki = koraki;
    }
}
