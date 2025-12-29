// MQTT Server Configuration
export interface MqttServer {
  id: string;
  name: string;
  brokerUrl: string;
  topic: string;
  enabled: boolean;
}

export const mqttServers: MqttServer[] = [
  {
    id: 'hivemq',
    name: 'HiveMQ Public Broker',
    brokerUrl: 'wss://broker.hivemq.com:8884/mqtt',
    topic: 'msh/+/+/json/#',
    enabled: true,
  },
  {
    id: 'local',
    name: 'Local Broker',
    brokerUrl: 'wss://localhost:8884/mqtt',
    topic: 'msh/+/+/json/#',
    enabled: false,
  },
  {
    id: 'EmqX',
    name: 'EmqX public Broker',
    brokerUrl: 'wss://broker.emqx.io:8084/mqtt',
    topic: 'msh/+/+/json/#',
    enabled: true,
  },
  {
      id: 'Meshtastic',
      name: 'Meshtastic Public Broker',
      brokerUrl: 'wss://mqtt.meshtastic.org/api/v2/mqtt',
      topic: 'msh/+/+/json/#',
      enabled: true,
    },
];
