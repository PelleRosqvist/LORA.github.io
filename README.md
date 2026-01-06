

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
|   |__icons         #iconer och småbilder
|   |  |__
|   |__images        #Bilder helt enkelt
|   |  |__ logo.png
|   |
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
|   |       backround.svg
│   ├── components
│   │   └── NodeCard.astro   #Definerar hur nodekorten ser ut
|   |       Welcome.astro    #Tja en sorts välkomstsida 
|   |__config
|   |  |_ mqtt-servers.ts    #Definerar MQTT servrar som används
|   | 
│   ├── layouts
│   │   └── Layout.astro
|   |       MainLayouts.astro  #Main layout helt enkelt
│   └── pages
│   |    └── index.astro
|   |       mqtt-servers.astro
|   |       nodes.astro         #Definerar vilka nodes som ska visas 
|   |__styles
|   |    |__ global.css
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🛟 Driftstatus & Arkitektur

Detta projekt använder en **MQTT-över-WebSockets** arkitektur för att visualisera LoRa-trafik i realtid.

### Nuvarande Status
![MQTT Status](https://img.shields.io/badge/MQTT_Broker-Online-brightgreen?style=for-the-badge&logo=mqtt)
![Network](https://img.shields.io/badge/Network-Tailscale_Protected-blue?style=for-the-badge&logo=tailscale)
![--](https://camo.githubusercontent.com/db0c7bea55b4406f80e95c71e98f3a199e865cd59af7463ca69ae97c47c04fdd/68747470733a2f2f62616467656e2e6e65742f7374617469632f636f666665652532306472756e6b2f3639342532304c2f364634453337)
### Så fungerar det
Systemet är uppbyggt som en kedja från LoRa mesh nätet till din webbläsare:

1.  **LoRa-Noder:** Skickar sensordata och meddelanden via Meshtastic-protokollet.
2.  **Raspberry Pi (Gateway):** Tar emot radiosignaler och publicerar dem till en lokal **Mosquitto MQTT-broker**.
3.  **MQTT Broker:** Fungerar som projektets "postkontor" (Broker). Den sorterar inkommande JSON-data på olika *topics*.
4.  **Webb-monitor (Astro):** Denna webbsida prenumererar på MQTT-topics via **WebSockets (Port 9001)** och uppdaterar gränssnittet i realtid utan att sidan behöver laddas om.

> [!TIP]
> För säker fjärradministration av MQTT-servern används **Tailscale**. Det skapar en krypterad tunnel direkt till MQTT servern, vilket gör att vi kan underhålla systemet säkert utan att exponera onödiga portar mot internet.




## MQTT server
MQTT-servern (Mosquitto på en Pi 5) fungerar som ett digitalt postkontor.

Den sparar ingen data permanent.
Dess enda uppgift är att ta emot meddelanden från "Publicerare" (dina LoRa-noder/Meshtastic) och skicka dem vidare till "Prenumeranter" (din webbsida).
Den använder Topics (t.ex. msh/2/json/LongFast/...) för att sortera posten så att rätt mottagare får rätt information.

2. Kopplingen till Webbsidan (Mottagaren)
websidan är tänkt att funka som live-monitor. Istället för att ladda om sidan för att se ny info, står webbsidan i ständig kontakt med MQTT-servern via en WebSocket.
Anslutning: När du öppnar sidan i webbläsaren, ringer den upp din Pi på port 9001.
Prenumeration: Sidan säger till servern: "Hörru, skicka allt som börjar på msh/# till mig!".
Reaktion: Varje gång en LoRa-nod skickar ett paket till din Pi, "puffar" MQTT-servern ut det meddelandet direkt till webbläsaren.

3. Varför det kallas "Driftinfo"
Eftersom MQTT skickar data i realtid, blir din webbsida en direkt spegling av hur nätverket mår just nu:
Status: Om servern svarar är "systemet uppe".
Aktivitet: Du ser direkt när någon skickar ett meddelande eller när en nod skickar en positionsuppdatering.
Telemetri: Du kan visa batterispänning på fjärran noder, signalstyrka (SNR) och hur många hopp ett meddelande har gjort.
Flödet i praktiken:
LoRa-Nod: "Här är min batterinivå!" (Radiovåg)
Din Pi: Tar emot radion, gör om till JSON och skickar till Mosquitto.
Mosquitto: "Jag har nytt meddelande på topic msh/json!"
Webbsidan: Tar emot JSON-paketet via WebSocket och ändrar texten på skärmen från "12.4V" till "12.2V".

## Saftey onboard
Tailscale som din privata MQTT-brygga
Ingen exponering: Du kan stänga port 9001 i routern helt. Mosquitto-broker "syns" inte längre på det öppna internetet, vilket tar bort 100% av risken för externa attacker.

Fixerad IP-adress: Även om din hemrouter startar om och får en ny publik IP från din leverantör, så behåller din Raspberry Pi alltid samma Tailscale-IP (t.ex. 100.80.90.100). Din kod behöver alltså aldrig uppdateras.

Kryptering ingår: Tailscale använder WireGuard-protokollet, vilket innebär att all data mellan din webbläsare och din Pi är krypterad "by default", även om du bara kör ws:// (utan S).

En viktig detalj för framtiden: Tailscale Funnel
Om du i framtiden ändå vill visa datan på GitHub Pages men behålla Tailscale-säkerheten, finns en funktion som heter Tailscale Funnel. Den gör det möjligt att exponera enbart din MQTT-port (9001) till det publika nätet via Tailscales noder. Det fungerar lite som Cloudflare Tunnel men styrs direkt inifrån Tailscale.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
