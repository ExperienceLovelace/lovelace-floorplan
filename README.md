# lovelace-floorplan

Floorplan for Lovelace is here!

To get started, add this to the `resources` section of your Lovelace config:

```
resources:
  - type: module
    url: /local/floorplan/floorplan-card.js
  - type: module
    url: /local/floorplan/lib/yaml.min.js
  - type: module
    url: /local/floorplan/lib/jquery-3.4.1.min.js
```

Then you can start adding floorplan cards to your UI:

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
              state_transitions:
                - from_state: 'on'
                  to_state: 'off'
                  duration: 10
```
