import { Event } from "./enums";

type Listener = (...args: any[]) => void;

class EventEmitter {
  // listeners for each event emitter
  private listeners: {
    [Key in Event]?: Listener[]
  } = {};

  // adding listeners
  on(event: Event, listener: Listener): void {
    // check if we already have a listener for this event
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    // add a listener to the listener array for given event
    this.listeners[event]!.push(listener);
  }

  // method for emitting an event to all listeners
  emit(event: Event, ...args:any[]): void {
    if(this.listeners[event]) {
      this.listeners[event]?.forEach(listener => listener(...args));
    }
  }

  // method for removing an event emitter
  off(event: Event, listenerToRemove: Listener): void {
    if(this.listeners[event]) {
      this.listeners[event] = this.listeners[event]!.filter(listener => listener !== listenerToRemove);
    }
  }
}

export default EventEmitter;
export type { Listener };