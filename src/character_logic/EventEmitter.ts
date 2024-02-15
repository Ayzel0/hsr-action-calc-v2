type Listener = (...args: any[]) => void;

class EventEmitter {
  // listeners for each event emitter
  private listeners: {
    [event: string]: Listener[]
  } = {};

  // adding listeners
  on(event: string, listener: Listener): void {
    // check if we already have a listener for this event
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    // add a listener to the listener array for given event
    this.listeners[event].push(listener);
  }

  // method for emitting an event to all listeners
  emit(event: string, ...args:any[]): void {
    if(this.listeners[event]) {
      this.listeners[event].forEach(listener => listener(...args));
    }
  }

  // method for removing an event emitter
  off(event: string, listenerToRemove: Listener): void {
    if(this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== listenerToRemove);
    }
  }
}

export default EventEmitter;