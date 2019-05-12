# Ring doorbell example #

This example demonstrates some basic features of Floorplan:

- Ring doorbell camera changes colour when binary sensor is triggered
- Ring doorbell button displays blue spinner when doorbell button is pressed
- Floorplan configuration is stored in separate file (ring.yaml) and referenced from Lovelace card

![image](https://user-images.githubusercontent.com/2073827/57588545-26806a80-7559-11e9-8888-77185b789c7d.png)

## 1) Copy files

To run this example, copy the following files to the `www/floorplan/examples/simple` folder of your Home Assistant configuration:

- [ring.yaml](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/examples/ring/ring.yaml)
- [ring.svg](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/examples/ring/ring.svg)
- [ring.css](https://raw.githubusercontent.com/pkozul/lovelace-floorplan/master/www/floorplan/examples/ring/ring.css)

## 2) Create entities

To run this example, add the [Ring](https://www.home-assistant.io/components/ring) component to your Home Assistant configuration:

```
ring:
  username: !secret ring_username
  password: !secret ring_password
```

## 3) Add to Lovelace

Then add the following to your Lovelace configuration:

```
  - cards:
      - config: /local/floorplan/config/ring/ring.yaml
        title: Ring
        type: 'custom:floorplan-card'  
```

You should then see the Floorplan card in action!
