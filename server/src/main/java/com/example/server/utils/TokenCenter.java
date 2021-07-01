package com.example.server.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.server.model.User;

import java.util.Date;

public class TokenCenter {
    public static String getToken(User user) {
        long effective = System.currentTimeMillis() + 60* 60 * 1000;
        Date date1 = new Date();
        Date date2 = new Date(effective);
        String token;
        token = JWT.create().withAudience(user.getName())
                .withIssuedAt(date1).withExpiresAt(date2)
                .sign(Algorithm.HMAC256(user.getPassword()));
        return token;
    }

    public static String getTokenUserName(String token) {
        String user = JWT.decode(token).getAudience().get(0);
        return user;
    }

}
