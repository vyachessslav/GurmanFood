package com.gmail.v.c.charkin.gurmanfood.service;

import com.gmail.v.c.charkin.gurmanfood.domain.Shawarma;
import com.gmail.v.c.charkin.gurmanfood.domain.User;
import com.gmail.v.c.charkin.gurmanfood.repository.ShawarmaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final UserService userService;
    private final ShawarmaRepository shawarmaRepository;

    public List<Shawarma> getShawarmasInCart() {
        User user = userService.getAuthenticatedUser();
        return user.getShawarmaList();
    }

    @Transactional
    public void addShawarmaToCart(Long shawarmaId) {
        User user = userService.getAuthenticatedUser();
        Shawarma shawarma = shawarmaRepository.getOne(shawarmaId);
        user.getShawarmaList().add(shawarma);
    }

    @Transactional
    public void removeShawarmaFromCart(Long shawarmaId) {
        User user = userService.getAuthenticatedUser();
        Shawarma shawarma = shawarmaRepository.getOne(shawarmaId);
        user.getShawarmaList().remove(shawarma);
    }
}
