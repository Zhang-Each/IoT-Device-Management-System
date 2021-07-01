package com.example.server.model;

public class Message {
    private String device;
    private int alert;
    private String info;
    private double lat;
    private double lng;
    private String stamp;
    private int value;

    public double getLat() {
        return lat;
    }

    public double getLng() {
        return lng;
    }

    public int getAlert() {
        return alert;
    }

    public int getValue() {
        return value;
    }

    public String getDevice() {
        return device;
    }

    public String getInfo() {
        return info;
    }

    public String getStamp() {
        return stamp;
    }

    public void setAlert(int alert) {
        this.alert = alert;
    }

    public void setDevice(String device) {
        this.device = device;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public void setStamp(String stamp) {
        this.stamp = stamp;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
