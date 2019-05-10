# Simple Floorplan example #

To run this example, add the following entities to your Home Assistant configuration:

```
binary_sensor:
  - platform: mqtt
    name: Living Area
    state_topic: 'binary_sensor/living_area'

  - platform: mqtt
    name: Main Bedroom
    state_topic: 'binary_sensor/main_bedroom'

  - platform: mqtt
    name: Double Garage
    state_topic: 'binary_sensor/double_garage'

light:
  - platform: mqtt
    command_topic: 'light/double_garage'
    name: Double Garage
    optimistic: true

switch:
  - platform: mqtt
    name: Living Area Fan
    command_topic: 'switch/living_area_fan'
    optimistic: true
    retain: false

camera:
  - platform: generic
    name: New York Broadway
    still_image_url: 'http://archives.earthcam.com/archives5/ecnetwork/us/ny/nyc/tsmpr/archive10/live2.jpg'

automation:
  - alias: Toggle living area binary sensor
    initial_state: 'on'
    trigger:
      platform: time_pattern
      seconds: '/2'
    action:
      - service: mqtt.publish
        data_template:
          topic: 'binary_sensor/living_area'
          payload: '{% if ((now().second % 10) <= 2) %}ON{% else %}OFF{% endif %}'

  - alias: Toggle main bedroom binary sensor
    initial_state: 'on'
    trigger:
      platform: time_pattern
      seconds: '/2'
    action:
      - service: mqtt.publish
        data_template:
          topic: 'binary_sensor/main_bedroom'
          payload: '{% if ((now().second % 10) > 2) and ((now().second % 4) <= 6) %}ON{% else %}OFF{% endif %}'

  - alias: Toggle double garage binary sensor
    initial_state: 'on'
    trigger:
      platform: time_pattern
      seconds: '/2'
    action:
      - service: mqtt.publish
        data_template:
          topic: 'binary_sensor/double_garage'
          payload: '{% if ((now().second % 10) > 4) and ((now().second % 2) <= 6) %}ON{% else %}OFF{% endif %}'
```

Then add the following to your Lovelace configuration:

```
  - cards:
      - config:
          image: /local/floorplan/examples/simple/simple.svg?v=1.1.8
          log_level: error
          rules:
            - action:
                service: homeassistant.toggle
              element: light.double_garage
              entity: light.double_garage
              image_template: '/local/floorplan/examples/simple/light_${entity.state}.svg'
              more_info: false
              propagate: true
            - action:
                service: homeassistant.toggle
              class_template: 'background-${entity.state}'
              element: light.double_garage.background
              entity: light.double_garage
            - action:
                service: homeassistant.toggle
              element: light.double_garage.text
              entity: light.double_garage
              text_template: '${entity.state}'
            - action:
                service: homeassistant.toggle
              entity: switch.living_area_fan
              more_info: false
              propagate: true
            - entity: switch.living_area_fan
              more_info: false
              states:
                - class: spinning
                  state: 'on'
            - action:
                service: homeassistant.toggle
              class_template: 'background-${entity.state}'
              element: switch.living_area_fan.background
              entity: switch.living_area_fan
            - action:
                service: homeassistant.toggle
              element: switch.living_area_fan.text
              entity: switch.living_area_fan
              text_template: '${entity.state}'
            - entity: camera.new_york_broadway
              image_template: '${entity.attributes.entity_picture}'
              image_refresh_interval: 5
            - entities:
                - binary_sensor.main_bedroom
                - binary_sensor.living_area
                - binary_sensor.double_garage
              state_transitions:
                - duration: 5
                  from_state: 'on'
                  to_state: 'off'
              states:
                - class: info-background
                  state: 'off'
                - class: warning-background
                  state: 'on'
          stylesheet: /local/floorplan/examples/simple/simple.css?v=1.1.8
        title: Simple Floorplan
        type: 'custom:floorplan-card'
    icon: 'mdi:floor-plan'
    id: system
    title: Floorplan
```

You should then see the Floorplan card in action!
