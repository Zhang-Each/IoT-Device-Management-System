package cn.edu.zju.cs.bs;

import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import java.util.Vector;

public class IOTClient implements MqttCallback {
    public static void main(String[] args) {
        int devices = 1;
        String mqttServer = "tcp://localhost:1883";
        String topic = "testapp";
        String clientPrefix = "device";

        try {
            Properties properties = new Properties();
            FileInputStream in = new FileInputStream("iot.properties");
            properties.load(in);
            devices = Integer.parseInt(properties.getProperty("devices"));
            mqttServer = properties.getProperty("server");
            topic = properties.getProperty("topic");
            clientPrefix = properties.getProperty("prefix");

            if ((args.length > 0) && "server".equals(args[0])) {
                IOTClient server = new IOTClient();
                server.subscribe(mqttServer, topic);
            } else {
                Vector<WorkerThread> threadVector = new Vector<WorkerThread>();
                for (int i = 0; i < devices; i++) {
                    WorkerThread thread = new WorkerThread();
                    thread.setDeviceId(i + 1);
                    thread.setMqttServer(mqttServer);
                    thread.setTopic(topic);
                    thread.setClientPrefix(clientPrefix);
                    threadVector.add(thread);
                    thread.start();
                }
                for (WorkerThread thread : threadVector) {
                    thread.join();
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public void subscribe(String mqttServer, String topic) {
        try {
            MemoryPersistence persistence = new MemoryPersistence();
            String clientId = "iotserver";
            int qos = 2;
            MqttClient mqttClient = new MqttClient(mqttServer, clientId, persistence);
            MqttConnectOptions connOpts = new MqttConnectOptions();
            connOpts.setCleanSession(true);
            mqttClient.setCallback(this);
            // Connect to the MQTT server
            System.out.println("Connecting to broker: " + mqttServer);
            mqttClient.connect(connOpts);
            System.out.println("Connected");
            mqttClient.subscribe(topic, qos);

            // Continue waiting for messages until the Enter is pressed
            System.out.println("Press <Enter> to exit");
            System.in.read();

            // Disconnect the client from the server
            mqttClient.disconnect();
            System.out.println("Disconnected");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void connectionLost(Throwable throwable) {

    }

    @Override
    public void messageArrived(String topic, MqttMessage mqttMessage) throws Exception {
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date now = new Date();
        System.out.println("Time:\t" + sdf.format(now) +
                "  Topic:\t" + topic +
                "  Message:\t" + new String(mqttMessage.getPayload()));
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {

    }
}
