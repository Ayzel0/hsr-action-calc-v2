import EventEmitter from "../EventEmitter";
import { Event } from "../enums";
import type { Listener } from "../EventEmitter";

export default class LCEffectTemplate {
  constructor (
    private event: Event,
    private callback: Listener,
  ) {}

  attach(emitter: EventEmitter) {
    emitter.on(this.event, this.callback);
  }

  detach(emitter: EventEmitter) {
    emitter.off(this.event, this.callback);
  }
}