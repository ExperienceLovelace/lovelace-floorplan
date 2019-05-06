import './lib/yaml.min.js';
import './lib/jquery-3.4.1.min.js';
import './lib/floorplan.js';

class FloorplanCard extends Polymer.Element {
  constructor() {
    super();
  }

  set hass(hass) {
    this.ensureFloorplan(hass)
      .then(() => {
        this.floorplan.hassChanged(hass);
      })
      .catch((err) => {
      });
  }

  initCard() {
    if (this.children.length) return;

    const card = document.createElement('ha-card');
    card.innerHTML = `
      <div id="log">
        <a href="#" onclick="$(this).siblings('ul').html('').parent().css('display', 'none');">Clear log</a>
        <ul></ul>
      </div>

      <div id="floorplan" on-tap="stopPropagation"></div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #floorplan {
        width: 100%;
        height: 100%;
      }

      .loading-container {
        text-align: center;
        padding: 8px;
      }

      .loading {
        height: 0px;
        overflow: hidden;
      }

      #log {
        max-height: 150px;
        overflow: auto;
        background-color: #eee;
        display: none;
        padding: 10px;
      }

      #log ul {
        list-style-type: none;
        padding-left: 0px;
      }

      .error {
        color: #FF0000;
      }

      .warning {
        color: #FF851B;
      }

      .info {
        color: #0000FF;
      }

      .debug {
        color: #000000;
      }
    `;
    card.appendChild(style);

    this.log = $("#log", card)[0];

    this.appendChild(card);
  }

  setConfig(config) {
    this.config = config;
  }

  ensureFloorplan(hass) {
    if (this.floorplan) return Promise.resolve();

    this.initCard();

    try {
      this.floorplan = new Floorplan();

      const options = {
        doc: this,
        hass: hass,
        openMoreInfo: this.openMoreInfo.bind(this),
        setIsLoading: this.setIsLoading.bind(this),
        config: (this.config && this.config.config) || this.config,
      };

      return this.floorplan.init(options)
        .then(() => {
          this.setIsLoading(false);
        });
    }
    catch(err) {
      this.setIsLoading(false);
      this.logError(err);
      return Promise.reject(err);
    }
  }

  openMoreInfo(entityId) {
    this.fire('hass-more-info', { entityId: entityId });
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  logError(message) {
    console.error(message);

    $(this.log).find('ul').prepend(`<li class="error">${message}</li>`)
    $(this.log).css('display', 'block');
  }

  fire(type, detail, options) {
    options = options || {};
    detail = (detail === null || detail === undefined) ? {} : detail;
    const event = new Event(type, {
      bubbles: options.bubbles === undefined ? true : options.bubbles,
      cancelable: Boolean(options.cancelable),
      composed: options.composed === undefined ? true : options.composed
    });
    event.detail = detail;
    const node = options.node || this;
    node.dispatchEvent(event);
    return event;
  }
}

customElements.define('floorplan-card', FloorplanCard);
