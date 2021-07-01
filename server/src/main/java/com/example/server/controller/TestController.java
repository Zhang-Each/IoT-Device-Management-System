package com.example.server.controller;

import com.example.server.model.Device;
import com.example.server.model.Message;
import com.example.server.model.User;
import com.example.server.service.DeviceService;
import com.example.server.service.MessageService;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class TestController {
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    private RedisTemplate redisTemplate;

    @RequestMapping(value = "/test/redis/val", method = RequestMethod.GET)
    public int testRedis() {
        stringRedisTemplate.opsForValue().set("zyc", "123");
        System.out.println(stringRedisTemplate.opsForValue().get("zyc"));
        return 1;
    }

    @RequestMapping(value = "test/redis/obj", method = RequestMethod.GET)
    public int testRedisObject() {
        Map<String, Object> map = new HashMap<>();
        map.put("zyc", "123");
        map.put("index", "zyc");
        ValueOperations<String, Map> operations = redisTemplate.opsForValue();
        operations.set("obj", map);
        boolean exist = redisTemplate.hasKey("obj");
        if (exist) {
            Map<String, Object> newMap = (Map<String, Object>) redisTemplate.opsForValue().get("obj");
            System.out.println(newMap.get(newMap.get("index")));
        }
        return 1;
    }

}
