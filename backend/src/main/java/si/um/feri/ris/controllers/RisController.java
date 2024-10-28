package si.um.feri.ris.controllers;

//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RisController{
    @GetMapping("/info")
    public String getInfo(){
            return "Info endpoint deluje. Hello world indeed.";
        }
}


