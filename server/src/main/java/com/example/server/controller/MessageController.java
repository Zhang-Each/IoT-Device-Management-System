package com.example.server.controller;

import com.example.server.model.Message;
import com.example.server.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class MessageController {
    @Autowired
    MessageService messageService;

    @RequestMapping(value = "/message/{name}", method = RequestMethod.GET)
    public List<Message> getDevicePositions(@PathVariable String name) {
        return messageService.getMessages(name);
    }

    @RequestMapping(value = "/message/all/{device}", method = RequestMethod.GET)
    public int getMessageCount(@PathVariable String device) {
        return messageService.getAllMessageCount(device);
    }

    @RequestMapping(value = "/message/user/all/{name}", method = RequestMethod.GET)
    public int getUserMessage(@PathVariable String name) {
        return messageService.getAllMessageCountForUser(name);
    }

    @RequestMapping(value = "/message/value/{name}", method = RequestMethod.GET)
    public List<Map<String, Object>> getDeviceValues(@PathVariable String name) {
        return messageService.getDeviceValue(name);
    }

    @RequestMapping(value = "/message/info/{name}", method = RequestMethod.GET)
    public List<Map<String, Object>> getDeviceInformation(@PathVariable String name) {
        List<Map<String, Object>> res;
        res = messageService.getDeviceInfo(name);
        if (res.size() > 10) {
            int size = res.size();
            return res.subList(size - 10, size);
        }
        return res;
    }

    @RequestMapping(value = "/message/path/{name}", method = RequestMethod.GET)
    public List<Map<String, Object>> getDevicePosition(@PathVariable String name) {
        List<Map<String, Object>> result = messageService.getDevicePosition(name);
        if (result.size() >= 10) {
            int size = result.size();
            result = result.subList(size - 10, size);
        }
        return result;
    }

    @RequestMapping(value = "/message/all/value/{name}", method = RequestMethod.GET)
    public List<Map<String, Object>> getAllDeviceForUser(@PathVariable String name) {
        List<Map<String, Object>> result;
        result = messageService.getAllDeviceValueForUser(name);
        int size = result.size();
        if (size >= 40) {
            return result.subList(size - 40, size);
        }
        return result;
    }
}
