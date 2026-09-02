package io.nology.trivia.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost:5173",
                        "http://120.0.0.1:5173",
                        "https://mytriviagame.lol",
                        "https://www.mytriviagame.lol")
                .allowedMethods("GET", "POST", "PUT", "PATCH")
                .allowedHeaders("*");
    }
}
