package com.example.HouseGoods.security.authorization;

import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.client.ClientRole;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


public class ClientDetails implements UserDetails {

    private Client client;

    public ClientDetails(Client client) {
        this.client = client;
    }

    public Client getClient() {
        return client;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ClientRole role = client.getRole();
        if (role == null || role.name().isBlank()) {
            return List.of(new SimpleGrantedAuthority("ROLE_USER")); // роль по умолчанию
        }
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name().toUpperCase()));
    }

    @Override
    public @Nullable String getPassword() {
        return client.getPassword();
    }

    @Override
    public String getUsername() {
        return client.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
