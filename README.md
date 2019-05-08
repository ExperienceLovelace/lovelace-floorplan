# lovelace-floorplan

Floorplan for Lovelace is here!

## Quick Start

### 1) Installation

To get started, copy the following files to the `www/floorplan` folder of your Home Assistant installation (right-click on each file to save directly to disk):

- [floorplan-card.js](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/floorplan-card.js)
- [lib/floorplan.js](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/lib/floorplan.js)
- [lib/yaml.min.js](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/lib/yaml.min.js)
- [lib/jquery-3.4.1.min.js](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/lib/jquery-3.4.1.min.js)

### 2) Floorplan image

You'll then need an SVG file of your floorplan, and a CSS file for styling. You can use the samples provided to get started. Copy them to the `www/floorplan/config/home` folder your Home Assistant installation:

- [config/home/home.svg](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/config/home/home.svg)
- [config/home/home.css](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/config/home/home.css)

In the SVG file, rename the element IDs to match the entitiy IDs you have in your Home Assistant installation.

### 3) Adding to Lovelace

Add the following to the `resources:` section of your Lovelace config.

```
resources:
  - type: module
    url: /local/floorplan/floorplan-card.js?v=1.1.2
```

You can then start adding floorplan cards to your Lovelace config. Under `entities:`, make sure to add the entity IDs which you want to use in the floorplan:

```
  - cards:
      - type: 'custom:floorplan-card'
        title: Home
        config:
          image: /local/floorplan/config/home/home.svg
          stylesheet: /local/floorplan/config/home/home.css
          rules:
            - entities:
                - binary_sensor.living_room
                - binary_sensor.kitchen
              states:
                - state: 'off'
                  class: info-background
                - state: 'on'
                  class: warning-background
```

Note: If you're using the Lovelace editor that is built into the user interface, click on the three dots in the upper-right corner of the screen and select `Configure UI`. Then click on the three dots again and select `Raw config editor`. Then you'll be able to add the resources and card described above.
