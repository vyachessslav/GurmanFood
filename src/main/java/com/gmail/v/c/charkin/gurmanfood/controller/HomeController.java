package com.gmail.v.c.charkin.gurmanfood.controller;

import com.gmail.v.c.charkin.gurmanfood.domain.Shawarma;
import com.gmail.v.c.charkin.gurmanfood.service.ShawarmaService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final ShawarmaService shawarmaService;

    @GetMapping("/popular")
    public ResponseEntity<?> getPopularShawarmas() {
        return ResponseEntity.ok(new PageResponse<>(shawarmaService.getPopularShawarmas()));
    }
    @GetMapping("/{id}")
    public Shawarma getShawarmaById(@PathVariable("id") Long id) {
        return shawarmaService.getShawarmaById(id);
    }
}

@Data
@AllArgsConstructor
class PageResponse<T> {
    private List<T> content;
}