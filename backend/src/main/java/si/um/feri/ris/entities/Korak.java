package si.um.feri.ris.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "Korak")
public class Korak {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_korak;

    @Column(nullable = false)
    private int zaporedno_st;

    @Lob
    private String opis;

    //en recept ima več korakov
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tk_recept", nullable = false) // Custom foreign key name
    @JsonBackReference
    private Recept recept;

    //GETTERJI
    public Long getId_korak() {
        return id_korak;
    }

    public int getZaporedno_st() {
        return zaporedno_st;
    }

    public String getOpis() {
        return opis;
    }

    public Recept getRecept() {
        return recept;
    }

    //SETTERJI
    public void setId_korak(Long id_korak) {
        this.id_korak = id_korak;
    }

    public void setZaporedno_st(int zaporedno_st) {
        this.zaporedno_st = zaporedno_st;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public void setRecept(Recept recept) {
        this.recept = recept;
    }
}
