package com.example.server.service;

import com.example.server.mapper.DeviceMapper;
import com.example.server.mapper.UserMapper;
import com.example.server.model.Device;
import com.example.server.model.User;
import com.example.server.utils.RedisUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin
@Service
public class DeviceService {
    @Autowired
    DeviceMapper deviceMapper;

    @Autowired
    UserMapper userMapper;

    @Autowired
    RedisUtils redisUtils;

    public Device getDevice(String name) {
        return deviceMapper.getDevice(name);
    }

    public List<Map<String, Object>> getDeviceKindStatistic() {
        return deviceMapper.getDeviceKindStatistic();
    }

    /**
     * 获取当前用户的活跃的设备列表，活跃是指当天由消息记录的设备
     * @param user 用户名
     * @return 活跃设备列表
     */
    public List<Device> getActiveDeviceList(String user) {
        int id = userMapper.getUserInfo(user).getId();
        List<Device> res;
        res = deviceMapper.getAllDeviceList(id);
        LocalDate today = LocalDate.now();
        List<Device> active = new ArrayList<>();
        for (Device re : res) {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String activate = re.getActivate();
            if (activate.isEmpty()) {
                continue;
            }
            String day = simpleDateFormat.format(new Date(new Long(activate)));
            if (day.equals(today.toString())) {
                active.add(re);
            }
        }
        return active;
    }

    public int getActiveDeviceCount(String user) {
        return getActiveDeviceList(user).size();
    }

    /**
     * 获取当前用户的所有设备数目
     * @param user 用户名
     * @return 设备数量
     */
    public int getAllDevice(String user, String token) {
        if (!redisUtils.redisUserValidation(user, token)) {
            return -1;
        }
        int id = userMapper.getUserInfo(user).getId();
        Number result = (Number) deviceMapper.getAllDevice(id).get("result");
        return result.intValue();
    }

    /**
     * 获取当前用户的所有设备的列表
     * @param user 用户名
     * @return 设备数量
     */
    public List<Device> getAllDeviceList(String user) {
        int id = userMapper.getUserInfo(user).getId();
        return deviceMapper.getAllDeviceList(id);
    }

    /**
     * 修改设备描述信息
     * @param form 提交的修改表单
     * @return 1表示成功
     */
    public int changeDeviceConfig(Map<String, Object> form) {
        return deviceMapper.changeDeviceConfig(form);
    }

    /**
     * 创建新的设备
     * @param form 设备所需的表单
     * @return 1表示创建成功
     */
    public int createNewDevice(Map<String, Object> form) {
        if (deviceMapper.getDevice((String) form.get("name")) != null) {
            return 0;
        }
        User user = userMapper.getUserInfo(form.get("user").toString());
        form.put("id", user.getId());
        return deviceMapper.createNewDevice(form);
    }

    public List<Map<String, Object>> getDeviceKindStatisticForUser(String user) {
        int id = userMapper.getUserInfo(user).getId();
        List<Map<String, Object>> result;
        result = deviceMapper.getDeviceKindStatisticForUser(id);
        String[] kind = {
          "车载设备", "可穿戴设备", "智能家居", "基础设施", "其他设备"
        };
        for (Map<String, Object> res : result) {
            int type = Integer.parseInt(res.get("type").toString()) % 5;
            res.put("type", kind[type - 1]);
        }
        return result;
    }
}
