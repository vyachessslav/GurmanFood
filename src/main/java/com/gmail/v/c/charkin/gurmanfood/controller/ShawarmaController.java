package com.gmail.v.c.charkin.gurmanfood.controller;

import com.gmail.v.c.charkin.gurmanfood.constants.Pages;
import com.gmail.v.c.charkin.gurmanfood.constants.PathConstants;
import com.gmail.v.c.charkin.gurmanfood.dto.request.SearchRequest;
import com.gmail.v.c.charkin.gurmanfood.service.ShawarmaService;
import com.gmail.v.c.charkin.gurmanfood.utils.ControllerUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(PathConstants.SHAWARMA)
public class ShawarmaController {

    private final ShawarmaService shawarmaService;

    public ShawarmaController(ShawarmaService shawarmaService) {
        this.shawarmaService = shawarmaService;
    }

    @GetMapping("/{shawarmaId}")
    public ResponseEntity<?> getShawarmaById(@PathVariable Long shawarmaId) {
        return ResponseEntity.ok(shawarmaService.getShawarmaById(shawarmaId));
    }

    @GetMapping
    public ResponseEntity<?> getShawarmasByFilterParams(SearchRequest request, Pageable pageable) {
        return ResponseEntity.ok(shawarmaService.getShawarmasByFilterParams(request, pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchShawarmas(SearchRequest request, Pageable pageable) {
        return ResponseEntity.ok(shawarmaService.searchShawarmas(request, pageable));
    }
}