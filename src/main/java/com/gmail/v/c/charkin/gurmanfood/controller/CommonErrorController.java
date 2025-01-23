package com.gmail.v.c.charkin.gurmanfood.controller;

import com.gmail.v.c.charkin.gurmanfood.constants.PathConstants;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

import static com.gmail.v.c.charkin.gurmanfood.constants.Pages.ERROR_404;
import static com.gmail.v.c.charkin.gurmanfood.constants.Pages.ERROR_500;

@Controller
public class CommonErrorController implements ErrorController {

    @RequestMapping(PathConstants.ERROR)
    public String handleError(HttpServletRequest request, Model model) {
        Integer statusCode = (Integer) request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);

        if (statusCode == HttpStatus.NOT_FOUND.value()) {
            model.addAttribute("errorMessage", request.getAttribute(RequestDispatcher.ERROR_MESSAGE));
            return ERROR_404;
        }
        return ERROR_500;
    }

    @Override
    public String getErrorPath() {
        return PathConstants.ERROR;
    }
}
