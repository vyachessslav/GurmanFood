package com.gmail.v.c.charkin.gurmanfood.controller;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
class PageResponse<T> {
    private List<T> content;
}
