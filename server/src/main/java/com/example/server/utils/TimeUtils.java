package com.example.server.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeUtils {
    public static String changStampToTime(String stamp) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return format.format(new Date(Long.parseLong(stamp)));
    }

    public static void main(String[] args) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(format.format(new Date(Long.parseLong("1619241613093"))));
    }
}
