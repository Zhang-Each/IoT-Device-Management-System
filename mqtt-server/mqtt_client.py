import paho.mqtt.publish as publish
import time

HOST = "127.0.0.1"
PORT = 1883


def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("test")


def on_message(client, userdata, msg):
    print(msg.topic + " " + msg.payload.decode("utf-8"))


if __name__ == '__main__':
    client_id = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
    # client = mqtt.Client(client_id)    # ClientId不能重复，所以使用当前时间
    # client.username_pw_set("admin", "123456")  # 必须设置，否则会返回「Connected with result code 4」
    # client.on_connect = on_connect
    # client.on_message = on_message
    # client.connect(HOST, PORT, 60)
    # client.publish("test", "你好 MQTT", qos=0, retain=False)  # 发布消息

    publish.single("test", "你好 MQTT", qos=1, hostname=HOST, port=PORT, client_id=client_id,
                   auth={'username': "admin", 'password': "123456"})
