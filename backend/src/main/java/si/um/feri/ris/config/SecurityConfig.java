/*package si.um.feri.ris.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    /* 
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/uporabniki/register").permitAll()
                .anyRequest().authenticated())
            .httpBasic();
        return http.build();
    }
*/
    /*@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }*/
/*
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Disable authentication for all endpoints
        http
            .authorizeHttpRequests((authz) -> authz
                .anyRequest().permitAll()
            )
            .csrf().disable(); // Disable CSRF for simplicity, but be cautious of this in production

        return http.build();
    }
} */
