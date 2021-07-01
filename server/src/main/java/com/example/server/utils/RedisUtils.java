package com.example.server.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class RedisUtils {
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    private RedisTemplate redisTemplate;

    public void redisSetValue(String key, String value) {
        System.out.println(key);
        System.out.println(value);
        stringRedisTemplate.opsForValue().set(key, value);
    }

    public String redisGetValue(String key) {
        return stringRedisTemplate.opsForValue().get(key);
    }

    public boolean redisUserValidation(String key, String token) {
        return redisGetValue(key).equals(token)
                && TokenCenter.getTokenUserName(token).equals(key);
    }
}
