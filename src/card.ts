import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  css,
  PropertyValues
} from "lit-element";
import {
  HomeAssistant,
  handleClick,
  longPress,
  hasConfigOrEntityChanged
} from "custom-card-helpers";

import { MultiroomConfig } from "./types";

@customElement("pa-multiroom")
class MultiroomCard extends LitElement {
  @property() public hass?: HomeAssistant;

  @property() private config?: MultiroomConfig;

  public setConfig(config: MultiroomConfig): void {
    if (!config || config.show_error) {
      throw new Error("Invalid configuration");
    }
    if (!config.entities) {
      throw new Error("Please define at least one entity");
    }

    this.config = config;
    this.config.tap_action = config.tap_action || { action: 'toggle' };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has("config")) {
      return true;
    }
    console.log('Check if some entity changed');
    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    if (oldHass && this.config && this.config.entities) {
      return (this.config.entities.find((entity) => {
        console.log(`Entity ${JSON.stringify(entity)} state is ${this.hass!.states[entity.entity]}, old was ${JSON.stringify(oldHass.states)}`);
        return oldHass.states[entity.entity] !== this.hass!.states[entity.entity];
      }));
    }
    return false;
  }

  // Render html for only one entity (source/sink pair)
  private renderEntity(entityConf): TemplateResult | void {
    if (!this.config || !this.hass) {
      return html``;
    }
    const stateObj = this.hass.states[entityConf];

    if (!stateObj) {
      return html`
       <hui-warning-element
         label=${this.hass.localize(
    "ui.panel.lovelace.warning.entity_not_found",
    "entity",
    entityConf.entity
  )}
       ></hui-warning-element>
     `;
    }
    return html`
      <div
        class="entity"
        .entityConf="${entityConf}"
        @click="${this._handleTap}"
      >
        ${html`
              <state-badge
                .stateObj="${stateObj}"
                overrideIcon="mdi:speaker"
              ></state-badge>
            `
}
      </div>
    `;
  }

  protected render(): TemplateResult | void {
    if (!this.config || !this.hass) {
      return html``;
    }

    // Hash to map a sink and source to the entity : entities_per_sink[sink][source] = Entity
    const entities_per_sink = {};
    // We need all sources to render, store them to avoid parsing entities too often
    const all_sources :string[] = [];

    this.config.entities.forEach((entity: string) => {
      if (!this || !this.hass) {
        return false;
      }
      // format is pa_multiroom|sink|source
      if (this.hass.states[entity].attributes) {
        if (this.hass.states[entity].attributes.friendly_name) {
          const _:string[] = (this.hass.states[entity].attributes.friendly_name as string).split('|');
          if (!(_[1] in entities_per_sink)) {
            entities_per_sink[_[1]] = {};
          }
          entities_per_sink[_[1]][_[2]] = entity;
          if (!all_sources.includes(_[2])) {
            all_sources.push(_[2]);
          }
        }
      }
      return true;
    });

    // At this point we got all sources and populated entities_per_sink hash
    // Sort sources to be sure to always get the same order
    all_sources.sort();

    const lines: TemplateResult[] = [];
    Object.keys(entities_per_sink).forEach((sink: string) => {
      const obj: TemplateResult[] = [];
      obj.push(html`<td class="room">${sink}</td>`);
      all_sources.forEach((source) => {
        if (source in entities_per_sink[sink]) {
          obj.push(html`<td class="entity">${this.renderEntity(entities_per_sink[sink][source])}</td>`);
        } else {
          obj.push(html`<td></td>`);
        }
      });
      lines.push(html`<tr>${obj}</tr>`);
    });

    const sources : TemplateResult[] = [];
    all_sources.forEach((source: string) => {
      if ((this.config) && (this.config.sources) && (source in this.config.sources) && ("icon" in this.config.sources[source])) {
        sources.push(html`<th><ha-icon icon="${this.config.sources[source].icon}" style="${this.config.sources[source].style}"/></th>`);
      } else {
        sources.push(html`<th>${source}</th>`);
      }
    });

    return html`
      <ha-card header="Multiroom">
        ${
  all_sources.length > 0
    ? html`
                <div class="forecast clear">
    <table>
      <thead>
        <tr>
          <th></th>
                  ${sources}
        </tr>
           </thead>
                  ${html`<tbody>${lines}</tbody>`}
    </tbody>
          </table>
                </div>
              `
    : ""
}
      </ha-card>
    `;
  }

  private _handleTap(): void {
    handleClick(this, this.hass!, this.config!, false, false);
  }

  private _handleHold(): void {
    handleClick(this, this.hass!, this.config!, true, false);
  }

  static get styles(): CSSResult {
    return css`
      .warning {
        display: block;
        color: black;
        background-color: #fce588;
        padding: 8px;
      }
    `;
  }
}
