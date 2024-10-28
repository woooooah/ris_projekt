package si.um.feri.ris.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClassicEndpoint {
    @GetMapping("")
    public String getClassicInfo(){
        return "Classic endpoint deluje :)";
    }
}
