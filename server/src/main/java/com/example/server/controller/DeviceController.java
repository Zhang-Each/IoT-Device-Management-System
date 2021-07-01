package com.example.server.controller;

import com.example.server.model.Device;
import com.example.server.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class DeviceController {
    @Autowired
    DeviceService deviceService;

    @RequestMapping(value = "/device/{name}", method = RequestMethod.GET)
    public Device GetDevice(@PathVariable String name) {
        return deviceService.getDevice(name);
    }

    @RequestMapping(value = "/device/statistic", method = RequestMethod.GET)
    public List<Map<String, Object>> getDeviceKindStatistic() {
        return deviceService.getDeviceKindStatistic();
    }

    @RequestMapping(value = "/device/query/all/{user}", method = RequestMethod.POST)
    public int getAllDeviceForUser(@PathVariable String user, @RequestBody Map<String, Object> map) {
        String token = "";
        if (map.containsKey("token")) {
            token = map.get("token").toString();
        }
        return deviceService.getAllDevice(user, token);
    }

    @RequestMapping(value = "/device/query/list/all/{user}", method = RequestMethod.GET)
    public List<Device> getAllDeviceList(@PathVariable String user) {
        return deviceService.getAllDeviceList(user);
    }

    @RequestMapping(value = "/device/query/active/{user}", method = RequestMethod.GET)
    public List<Device> getActiveDeviceList(@PathVariable String user) {
        return deviceService.getActiveDeviceList(user);
    }

    @RequestMapping(value = "/device/query/list/active/{user}", method = RequestMethod.GET)
    public int getActiveDeviceForUser(@PathVariable String user) {
        return deviceService.getActiveDeviceCount(user);
    }

    @RequestMapping(value = "/device/config", method = RequestMethod.POST)
    public int changeDeviceConfig(@RequestBody Map<String, Object> map) {
        return deviceService.changeDeviceConfig(map);
    }

    @RequestMapping(value = "/device/new", method = RequestMethod.POST)
    public int createNewDevice(@RequestBody Map<String, Object> map) {
        return deviceService.createNewDevice(map);
    }

    @RequestMapping(value = "/device/statistic/{user}", method = RequestMethod.GET)
    public List<Map<String, Object>> getDeviceKindStatisticForUser(@PathVariable String user) {
        return deviceService.getDeviceKindStatisticForUser(user);
    }
}
