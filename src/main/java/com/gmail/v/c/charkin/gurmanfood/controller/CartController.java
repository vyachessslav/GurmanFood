package com.gmail.v.c.charkin.gurmanfood.controller;

import com.gmail.v.c.charkin.gurmanfood.constants.Pages;
import com.gmail.v.c.charkin.gurmanfood.constants.PathConstants;
import com.gmail.v.c.charkin.gurmanfood.domain.Shawarma;
import com.gmail.v.c.charkin.gurmanfood.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping(PathConstants.CART)
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<Shawarma>> getCart() {
        return ResponseEntity.ok(cartService.getShawarmasInCart());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addShawarmaToCart(@RequestParam("shawarmaId") Long shawarmaId) {
        try {
            cartService.addShawarmaToCart(shawarmaId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/remove")
    public ResponseEntity<?> removeShawarmaFromCart(@RequestParam("shawarmaId") Long shawarmaId) {
        try {
            cartService.removeShawarmaFromCart(shawarmaId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
