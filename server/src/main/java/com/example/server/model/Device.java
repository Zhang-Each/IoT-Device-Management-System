package com.example.server.model;

public class Device {
    private int id;
    private String name;
    private String description;
    private String userid;
    private int kind;
    private String activate;

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getUserid() {
        return userid;
    }

    public int getKind() {
        return kind;
    }

    public String getActivate() {
        return activate;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public void setKind(int kind) {
        this.kind = kind;
    }

    public void setActivate(String activate) {
        this.activate = activate;
    }
}
