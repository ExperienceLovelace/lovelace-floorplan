class FloorplanCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.setIsLoading(true);
  }

  setConfig(config) {
    this.config = config;

    this.initCard(config);
  }

  set hass(hass) {
    if (!this.config) return;

    (this.initialized ? Promise.resolve() : this.initFloorplan(hass, this.config))
      .then(() => this.floorplan.hassChanged(hass));
  }

  initFloorplan(hass, config) {
    this.initialized = true;
    
    return this.loadScripts()
      .then(() => {
        this.floorplan = new Floorplan();

        const options = {
          root: this.shadowRoot,
          hass: hass,
          openMoreInfo: this.openMoreInfo.bind(this),
          setIsLoading: this.setIsLoading.bind(this),
          config: (config && config.config) || config,
        };

        return this.floorplan.init(options)
          .then(() => this.setIsLoading(false));
      });
  }

  loadScripts() {
    const promises = [];

    promises.push(this.loadScript('/local/floorplan/lib/floorplan.js'));
    promises.push(this.loadScript('/local/floorplan/lib/yaml.min.js'));
    promises.push(this.loadScript('/local/floorplan/lib/jquery-3.4.1.min.js'));

    return Promise.all(promises);
  }

  initCard(config) {
    const root = this.shadowRoot;
    if (root.lastChild) root.removeChild(root.lastChild);

    const style = document.createElement('style');
    style.textContent = this.getStyle();
    root.appendChild(style);

    const card = document.createElement('ha-card');
    card.header = config.title;
    root.appendChild(card);

    const container = document.createElement('div');
    container.id = 'container';
    card.appendChild(container);

    const floorplan = document.createElement('div');
    floorplan.id = 'floorplan';
    container.appendChild(floorplan);

    const log = document.createElement('div');
    log.id = 'log';
    container.appendChild(log);

    const link = document.createElement('a');
    link.setAttribute('href', '#');
    link.text = 'Clear log';
    log.appendChild(link);
    link.onclick = function () { $(this).siblings('ul').html('').parent().css('display', 'none'); };

    const list = document.createElement('ul');
    log.appendChild(list);

    this.log = log;
  }

  getStyle() {
    return `
      #container {
        text-align: center;
      }

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
        text-align: left;
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

  loadScript(scriptUrl) {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.src = this.cacheBuster(scriptUrl);
      script.onload = () => {
        return resolve();
      };
      script.onerror = (err) => {
        reject(new URIError(`${err.target.src}`));
      };

      this.appendChild(script);
    });
  }

  cacheBuster(url) {
    return `${url}${(url.indexOf('?') >= 0) ? '&' : '?'}_=${new Date().getTime()}`;
  }
}

customElements.define('floorplan-card', FloorplanCard);
