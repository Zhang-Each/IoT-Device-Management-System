package com.example.server.mapper;

import com.example.server.model.Device;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface DeviceMapper {
    Device getDevice(String name);

    List<Map<String, Object>> getDeviceKindStatistic();

    List<Map<String, Object>> getDeviceKindStatisticForUser(int id);

    List<Device> getActiveDeviceList(int id);

    Map<String, Object> getAllDevice(int id);

    List<Device> getAllDeviceList(int id);

    int changeDeviceConfig(@Param("form") Map<String, Object> form);

    int createNewDevice(@Param("form") Map<String, Object> map);
}
