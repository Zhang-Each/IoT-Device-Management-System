import paho.mqtt.client as mqtt
import time
import json
import mysql.connector

host = "127.0.0.1"
port = 1883
db = mysql.connector.connect(
        host="localhost",  # 数据库主机地址
        user="root",  # 数据库用户名
        passwd="123456",  # 数据库密码
        database="bs"  # 数据库名称
    )


def server_start():
    client_id = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
    client = mqtt.Client(client_id)  # ClientId不能重复，所以使用当前时间
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(host, port, 60)
    client.loop_forever()



def on_connect(client, user_data, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("testapp")


def on_message(client, user_data, msg):
    msg_json = json.loads(msg.payload.decode("utf-8"))
    write_into_db(msg_json)
    # {'alert': 0, 'clientId': 'device0002', 'info': 'Device Data 2021/04/06 10:54:03', 'lat': 30.22204067707062,
    # 'lng': 120.44824849367143, 'timestamp': 1617677643777, 'value': 52}


def write_into_db(msg_json):
    cursor = db.cursor()
    msg_sql = "INSERT INTO `message` VALUES('{}', {}, '{}', {}, {}, '{}', {});".format(
        msg_json["clientId"], msg_json["alert"], msg_json["info"],
        msg_json["lat"], msg_json["lng"], msg_json["timestamp"], msg_json["value"]
    )
    cursor.execute(msg_sql)
    device_sql = "UPDATE `device` SET `activate` = '{}' WHERE `name` = '{}';".format(
        msg_json["timestamp"], msg_json["clientId"]
    )
    cursor.execute(device_sql)
    db.commit()


if __name__ == '__main__':
    server_start()
    db.close()
