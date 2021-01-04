<table align="center">
<tr>
<td>
<h1 align="center">
⚠️ Please migrate to <a href="https://github.com/ExperienceLovelace/ha-floorplan"><b>ha-floorplan</b></a> ⚠️ 
</h1>
<p align="center">
lovelace-floorplan has been replaced with <a href="https://github.com/ExperienceLovelace/ha-floorplan"><b>ha-floorplan</b></a>.<br><br>Please check out the new solution, and let us know what you think.<br><br>
</p>
</td>
</tr>
</table>

# lovelace-floorplan

Floorplan for Lovelace is here!

## Installation

### HACS
**Just add the URI to [HACS](https://hacs.xyz/)'s as custom repository.**

In the procress, kindly note down the location of the files. Normally you'll find them in the community/lovelace-floorplan-directory.

### Manual

#### 1) Download files from repo

To get started, copy the [dist/floorplan-card.js](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/floorplan-card.js) to `www/lovelace-floorplan` folder of your Home Assistant installation (You can right-click the file, to save it to your disk):

#### 2) Floorplan image

You'll then need an SVG file of your floorplan, and a CSS file for styling. You can use the samples provided to get started. Copy them to the `www/lovelace-floorplan/examples/simple` folder of your Home Assistant installation:

- [examples/simple/simple.svg](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/examples/simple/simple.svg)
- [examples/simple/simple.css](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/examples/simple/simple.css)

In the SVG file, rename the element IDs to match the entitiy IDs you have in your Home Assistant installation.

#### 3) Adding to Lovelace

Add the following to the `resources:` section of your Lovelace config.

```
resources:
  - type: module
    url: /local/lovelace-floorplan/floorplan-card.js?v=1.1.14
```

You can then start adding floorplan cards to your Lovelace config. Under `entities:`, make sure to add the entity IDs which you want to use in the floorplan:

```
  - cards:
      - config:
          image: /local/lovelace-floorplan/examples/simple/simple.svg?v=1.1.14
          rules:
            - entities:
                - binary_sensor.main_bedroom
                - binary_sensor.living_area
                - binary_sensor.double_garage
              states:
                - class: 'binary-sensor-off'
                  state: 'off'
                - class: 'binary-sensor-on'
                  state: 'on'
          stylesheet: /local/lovelace-floorplan/examples/simple/simple.css?v=1.1.14
        title: Simple Floorplan
        type: 'custom:floorplan-card'
    icon: 'mdi:floor-plan'
    id: system
    title: Floorplan
```

Note: If you're using the Lovelace editor that is built into the user interface, click on the three dots in the upper-right corner of the screen and select `Configure UI`. Then click on the three dots again and select `Raw config editor`. Then you'll be able to add the resources and card described above.

## Floorplan examples

To get started with some fully working examples, try some of the floorplans below:

- [Simple Floorplan](https://github.com/ExperienceLovelace/lovelace-floorplan/tree/master/examples/simple)
- [Ring doorbell](https://github.com/ExperienceLovelace/lovelace-floorplan/tree/master/examples/ring)


### Options

#### Option: `long_click`

You'll find the primary functions of Floorplan, by looking into the Floorplan examples.

However, Floorplan supports Long Press, too. Here's one example on how to use the function:
```yaml
- config:
      image: /local/floorplan/examples/simple/429.svg?v=5
      rules:
        - action:
            service: light.toggle
            data:
              entity_id: light.triplespot_office
          element: area.office
          entities:
            - light.triplespot_office
          long_click:
              data:
                card:
                  type: entities
                  entities:
                    - light.triplespot_office
                    - media_player.sonos_office
                title: Custom Entity card
              service: browser_mod.popup
```

For the best results, use [HASS Browser Mod](https://github.com/thomasloven/hass-browser_mod).

Here's a sample snippet, only containing the `long_click` option:
```yaml
long_click:
    data:
      card:
        type: entities
        entities:
          - light.triplespot_office
          - media_player.sonos_office
      title: Custom Entity card
    service: browser_mod.popup
```

Credit(s): [Alfiegerner](https://github.com/Alfiegerner)

#### Option: `image_mobile`

You're able to define a seperate SVG-file for mobile-devices. If `image_mobile` are defined, Floorplan will use that for all known mobile devices.
```yaml
- config:
      image: /local/floorplan/examples/simple/429.svg?v=5
      image_mobile: /local/floorplan/examples/simple/429_transformed.svg?v=5
      rules:
        - action:
            service: light.toggle
            data:
              entity_id: light.triplespot_office
          element: area.office
          entities:
            - light.triplespot_office
          ...
```

Credit(s): [Alfiegerner](https://github.com/Alfiegerner) - _[exetico](https://github.com/exetico) has provided a hot-fix for the logic(s). `image` will be used, if `image_mobile` are not defined._

#### Option: `pre_load`
The `pre_load_ option are implemented to prevent "not found errors" for cards like hui-gauge. It is still unclear if it is still required.

_I'll update details related to this, in near future._

```yaml
- config:
      image: /local/floorplan/examples/simple/429.svg?v=5
      preload_cards:
        - map
        - gui-gauge
      preload_rows:
        - lock-entity-row
      rules:
        ...
```

Credit(s): [Alfiegerner](https://github.com/Alfiegerner)

#### Option: `no_entity_id`
If you want so use a service like `hue.hue_activate_scene`, which doesn't accept an entitiy_id, use `no_entity_id` instead.

```yaml
- config:
      rules:
        - action:
            no_entity_id: true
            service: hue.hue_activate_scene
            data:
                scene_name: 'sleep-time'
                group_name: 'bedroom'
          element: button-heating
          more_info: false
```


## Inspiration and Support
Check the [Floorplan-section](https://community.home-assistant.io/c/third-party/floorplan/28) on the Home Assistant Community.


## Building floorplan-card.js
The script is bundled with browserify. 

To build floorplan-card.js, just run:
 1. `npm install`
 2. `npm run build`
