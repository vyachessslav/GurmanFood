package com.gmail.v.c.charkin.gurmanfood.service;

import com.gmail.v.c.charkin.gurmanfood.constants.ErrorMessage;
import com.gmail.v.c.charkin.gurmanfood.domain.Shawarma;
import com.gmail.v.c.charkin.gurmanfood.dto.request.SearchRequest;
import com.gmail.v.c.charkin.gurmanfood.repository.ShawarmaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShawarmaService {

    private final ShawarmaRepository shawarmaRepository;

    public Shawarma getShawarmaById(Long shawarmaId) {
        return shawarmaRepository.findById(shawarmaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, ErrorMessage.SHAWARMA_NOT_FOUND));
    }

    public List<Shawarma> getPopularShawarmas() {
        List<Long> shawarmaIds = Arrays.asList(1L, 2L, 3L, 4L, 5L, 6L, 7L, 8L, 9L, 10L, 11L, 12L);
        return shawarmaRepository.findByIdIn(shawarmaIds);
    }

    public Page<Shawarma> getShawarmasByFilterParams(SearchRequest request, Pageable pageable) {
        Integer startingPrice = request.getPrice();
        Integer endingPrice = startingPrice + (startingPrice == 0 ? 100000 : 100);
        return shawarmaRepository.getShawarmasByFilterParams(
                request.getCategories(),
                request.getMoralities(),
                startingPrice,
                endingPrice,
                pageable);
    }

    public Page<Shawarma> searchShawarmas(SearchRequest request, Pageable pageable) {
        return shawarmaRepository.searchShawarmas(request.getSearchType(), request.getText(), pageable);
    }
}
