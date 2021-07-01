package com.example.server.mapper;

import com.example.server.model.Message;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface MessageMapper {
    List<Message> getMessages(String name);

    Map<String, Object> getAllMessageCount(String name);

    List<Map<String, Object>> getDeviceValue(String name);

    List<Map<String, Object>> getDeviceInfo(String name);

    List<Map<String, Object>> getDevicePosition(String name);

    List<Map<String, Object>> getMessageList(String name);
}
