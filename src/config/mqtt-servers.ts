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
      id: 'smaland-pi',
      name: 'Småland Signalist Pi',
  // Om du kör utan SSL/WSS (se varning nedan)
      brokerUrl: 'wss://mqtt.rosqvist.net', 
      topic: 'msh/#',
      enabled: true,
  // Lägg till dessa i objektet för att hantera inloggningen
     username: 'signalist',
     password: 'småland'
    },
  {
    id: 'EmqX',
    name: 'EmqX public Broker',
    brokerUrl: 'wss://broker.emqx.io:8084/mqtt',
    topic: 'msh/+/+/json/#',
    enabled: true,
  },
  
];
