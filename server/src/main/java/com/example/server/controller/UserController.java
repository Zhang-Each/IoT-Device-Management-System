package com.example.server.controller;

import com.example.server.model.User;
import com.example.server.service.UserService;
import com.example.server.utils.RedisUtils;
import com.example.server.utils.TokenCenter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    RedisUtils redisUtils;

    @CrossOrigin
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable String id) {
        return userService.getUserInfo(id);
    }

    @RequestMapping(value = "/user/all", method = RequestMethod.GET)
    public String getAllUser() {
        return userService.getAll().toString();
    }

    @RequestMapping(value = "/user/insert/{id}/{psw}", method = RequestMethod.GET)
    public int insertNewUser(@PathVariable String id, @PathVariable String psw) {
        System.out.println(id);
        System.out.println(psw);
        return userService.insertUser(id, psw);
    }

    @CrossOrigin
    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    public Map<String, String> userLogin(@RequestBody Map<String, Object> map) {
        User user = userService.loginCheck(map);
        Map<String, String> result = new HashMap<>();
        if (user == null) {
            result.put("code", "401");
            return result;
        } else {
            result.put("code", "200");
            String token = TokenCenter.getToken(user);
            redisUtils.redisSetValue(user.getName(), token);
            System.out.println(redisUtils.redisGetValue(user.getName()));
            result.put("token", token);
            result.put("name", user.getName());
        }
        return result;
    }

    @RequestMapping(value = "/user/register", method = RequestMethod.POST)
    public int userRegister(@RequestBody Map<String, Object> form) {
        return userService.registerUser(form);
    }

    @RequestMapping(value = "/user/config/password", method = RequestMethod.POST)
    public int passwordChange(@RequestBody Map<String, Object> form) {
        return userService.changePassword(form);
    }

    @RequestMapping(value = "/user/config/info", method = RequestMethod.POST)
    public int emailChange(@RequestBody Map<String, Object> form) {
        int res1 = userService.changeEmail(form);
        int res2 = userService.changePhone(form);
        if (res1 == 1 && res2 == 1) {
            return 1;
        } else if (res1 == -2) {
            return -1;
        }
        return 0;
    }

    @RequestMapping(value = "/user/email/{email}", method = RequestMethod.GET)
    public int emailCheck(@PathVariable String email) {
        return userService.checkEmail(email);
    }
}
