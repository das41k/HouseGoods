package com.example.HouseGoods.security.jwt;

import com.example.HouseGoods.security.authorization.ClientDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
public class JwtUtils {

    @Value("${jwtSecret}")
    private String jwtSecret;

    @Value("${jwtExpiration}")
    private int jwtExpiration;

    public String generateJwtToken(Authentication authentication) {
        ClientDetails clientDetails = (ClientDetails) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(clientDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpiration))
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }

    public String getEmailFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token).getBody().getSubject();
    }


    public void validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(jwtSecret)
                    .build()
                    .parseClaimsJws(authToken);
        } catch (IllegalArgumentException e) {
            log.error("Invalid JWT Token: {}", e.getMessage());
            throw new JwtException("Неверный формат JWT токена");
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT Token: {}", e.getMessage());
            throw new JwtException("Срок действия JWT токена истек");
        }  catch (SignatureException e) {
            log.error("Incorrect JWT Token: {}", e.getMessage());
            throw new JwtException("Недействительный JWT токен");
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT Token: {}", e.getMessage());
            throw new JwtException("Неподдерживаемый тип JWT токена");
        } catch (MalformedJwtException e) {
            log.error("Malformed JWT Token: {}", e.getMessage());
            throw new JwtException("Неверный формат JWT токена");
        }
    }
}
