package com.gmail.v.c.charkin.gurmanfood.service;

import com.gmail.v.c.charkin.gurmanfood.dto.response.MessageResponse;
import com.gmail.v.c.charkin.gurmanfood.dto.request.UserRequest;

public interface RegistrationService {

    MessageResponse registration(UserRequest user);

    MessageResponse activateEmailCode(String code);
}
