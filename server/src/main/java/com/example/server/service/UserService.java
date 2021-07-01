package com.example.server.service;

import com.example.server.mapper.UserMapper;
import com.example.server.model.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    UserMapper userMapper;

    public User getUserInfo(String id) {
        System.out.println(id);
        return userMapper.getUserInfo(id);
    }

    public List<User> getAll() {
        return userMapper.getAll();
    }

    public int insertUser(String id, String password) {
        return userMapper.insertUser(id, password);
    }

    /**
     * 注册用户时候的api
     * @param form 注册用户时提交的表单，用map形式存储json数据
     * @return 1表示注册成功，-1表示注册失败
     */
    public int registerUser(Map<String, Object> form) {
        // 首先要判断这个新注册的用户名是否已经存在，已经存在则不能注册
        if (userMapper.getUserInfo((String) form.get("name")) != null) {
            return -1;
        } else if (userMapper.checkEmail(form.get("email").toString()) != null) {
            return -2;
        } else {
            return userMapper.registerUser(form);
        }
    }

    /**
     * 修改密码的api
     * @param form 用户提交的表单，包含用户名和新密码
     * @return 1表示修改成功
     */
    public int changePassword(Map<String, Object> form) {
        User user = userMapper.getUserInfo((String) form.get("name"));
        if (user == null || !user.getPassword().equals(form.get("old"))) {
            return -1;
        }
        return userMapper.changePassword(form);
    }

    public int changeEmail(Map<String, Object> form) {
        if (userMapper.getUserInfo((String) form.get("name")) == null) {
            return -1;
        } else if (userMapper.checkEmail(form.get("email").toString()) != null) {
            return -2;
        }
        return userMapper.changeEmail(form);
    }

    public User loginCheck(Map<String, Object> form) {
        return userMapper.loginCheck(form);
    }

    public int changePhone(Map<String, Object> form) {
        if (userMapper.getUserInfo((String) form.get("name")) == null) {
            return -1;
        }
        return userMapper.changePhone(form);
    }

    public int checkEmail(String email) {
        if (userMapper.checkEmail(email) == null) {
            return 1;
        }
        return 0;
    }
}
