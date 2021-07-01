package com.example.server.mapper;

import com.example.server.model.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UserMapper {
    User getUserInfo(String id);

    List<User> getAll();

    int insertUser(String id, String password);

    int registerUser(@Param("form") Map<String, Object> form);

    int changePassword(@Param("form") Map<String, Object> form);

    int changeEmail(@Param("form") Map<String, Object> form);

    int changePhone(@Param("form") Map<String, Object> form);

    User loginCheck(@Param("form") Map<String, Object> form);

    User checkEmail(String email);
}
