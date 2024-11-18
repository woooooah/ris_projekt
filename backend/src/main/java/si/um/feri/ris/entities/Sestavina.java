package si.um.feri.ris.entities;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
/*import java.util.HashSet;
import java.util.Set;*/

@Entity
@Table(name = "Sestavina")
public class Sestavina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_sestavina;

    @Column(nullable = false)
    private String naziv;

    @Column(nullable = false)
    private double kolicina;

    //@Column(nullable = true)
    private String enota;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tk_recept", nullable = false) // Custom foreign key name
    @JsonBackReference // to daš v child-a, ker drugače imaš infinite loop in MILIJON outputov, v parenta pa daš @JsonManagedReference !!!!
    private Recept recept;

    // //GETTERJI
    // public Long getId_sestavina() {
    //     return id_sestavina;
    // }

    // public String getNaziv() {
    //     return naziv;
    // }

    // public double getKolicina() {
    //     return kolicina;
    // }

    // public String getEnota() {
    //     return enota;
    // }

    // public Recept getRecept() {
    //     return recept;
    // }

    // //SETTERJI

    // public void setId_sestavina(Long id_sestavina) {
    //     this.id_sestavina = id_sestavina;
    // }

    // public void setNaziv(String naziv) {
    //     this.naziv = naziv;
    // }

    // public void setKolicina(double kolicina) {
    //     this.kolicina = kolicina;
    // }

    // public void setEnota(String enota) {
    //     this.enota = enota;
    // }

    public void setRecept(Recept recept) {
        this.recept = recept;
    }
}
