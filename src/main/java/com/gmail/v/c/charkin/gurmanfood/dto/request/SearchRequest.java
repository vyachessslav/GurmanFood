package com.gmail.v.c.charkin.gurmanfood.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class SearchRequest {
    private List<String> categories;
    private List<String> moralities;
    private Integer price = 0;
    private String searchType;
    private String text;
}
