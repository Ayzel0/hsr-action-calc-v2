import EventEmitter from './EventEmitter';

interface IActor {
  name: string;
  iconPath: string; 
  baseSpeed: number;
  unbuffedSpeed: number;
  buffedSpeed: number;
}

interface ISummon extends IActor {
  owner: string; // who owns the summon i.e. Topaz owns Numby
}

interface ICharacter extends IActor {
  element: string;
  path: string;
  rarity: number;
  currentEnergy: number;
  maxEnergy: number;
}

class Actor {
  name: string;
  iconPath: string;
  baseSpeed: number;
  unbuffedSpeed: number;
  buffedSpeed: number;
  eventEmitter: EventEmitter;

  constructor(
    name: string, 
    iconPath: string, 
    baseSpeed: number,
    unbuffedSpeed: number,
    buffedSpeed: number,
    eventEmitter: EventEmitter
  ) {
    this.name = name;
    this.iconPath = iconPath;
    this.baseSpeed = baseSpeed;
    this.unbuffedSpeed = unbuffedSpeed;
    this.buffedSpeed = buffedSpeed;
    this.eventEmitter = eventEmitter;
  }
}

class Summon extends Actor implements ISummon {
  owner: string;

  constructor(
    name: string, 
    iconPath: string, 
    baseSpeed: number,
    unbuffedSpeed: number,
    buffedSpeed: number, 
    eventEmitter: EventEmitter,
    owner: string
  ) {
    super(name, iconPath, baseSpeed, unbuffedSpeed, buffedSpeed, eventEmitter);
    this.owner = owner;
  }
}

class Character extends Actor implements ICharacter {
  element: string;
  path: string;
  rarity: number;
  currentEnergy: number;
  maxEnergy: number;

  constructor(
    name: string,
    iconPath: string,
    baseSpeed: number,
    unbuffedSpeed: number,
    buffedSpeed: number,
    eventEmitter: EventEmitter,
    element: string,
    path: string,
    rarity: number,
    currentEnergy: number,
    maxEnergy: number,
  ) {
    super(name, iconPath, baseSpeed, unbuffedSpeed, buffedSpeed, eventEmitter);
    this.element = element;
    this.path = path;
    this.rarity = rarity;
    this.currentEnergy = currentEnergy;
    this.maxEnergy = maxEnergy;
  }
}

export { Actor, Summon, Character };
export type { IActor, ISummon, ICharacter }