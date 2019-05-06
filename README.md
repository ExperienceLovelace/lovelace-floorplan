# lovelace-floorplan

Floorplan for Lovelace is here!

To get started, copy the following files to the `www/floorplan` folder of your Home Assistant config (right-click on each file to save them directly):

- [floorplan-card.js](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/floorplan-card.js)
- [lib/floorplan.js](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/lib/floorplan.js)
- [lib/yaml.min.js](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/lib/yaml.min.js)
- [lib/jquery-3.4.1.min.js](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/lib/jquery-3.4.1.min.js)

Add the following to the `resources` section of your Lovelace config:

```
resources:
  - type: module
    url: /local/floorplan/floorplan-card.js
```

Then you can start adding floorplan cards to your Lovelace config:

```
  - cards:
      - type: 'custom:floorplan-card'
        title: Home
        config:
          image: /local/floorplan/config/home/home.svg
          stylesheet: /local/floorplan/config/home/home.css
          rules:
            - entities:
                - binary_sensor.front_hallway
                - binary_sensor.salon
                - binary_sensor.back_hallway
                - binary_sensor.kitchen
              states:
                - state: 'off'
                  class: info-background
                - state: 'on'
                  class: warning-background
```
