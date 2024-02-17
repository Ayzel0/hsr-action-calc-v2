import EventEmitter from './EventEmitter';
import type { IStatusEffect } from './StatusEffect.ts';
import { Faction } from './enums/Faction.ts';

interface IActor {
  name: string;
  iconPath: string; 
  baseSPD: number;
  currentSPD: number;
}

interface ISummon extends IActor {
  owner: string; // who owns the summon i.e. Topaz owns Numby
}

interface ICharacter extends IActor {
  // base stats
  baseHP: number;
  baseATK: number;
  baseDEF: number;
  baseTaunt: number;
  maxEnergy: number;
  
  // current stats
  currentHP: number;
  currentATK: number;
  currentDEF: number;
  currentTaunt: number;
  currentEnergy: number;
  
  // other stuff
  element: string;
  path: string;
  rarity: number;
  faction: Faction;
}

interface IEnemy extends IActor {
  statusEffects: IStatusEffect[]
}

class Actor {
  name: string;
  iconPath: string;
  baseSPD: number;
  currentSPD: number;
  eventEmitter: EventEmitter;

  constructor(
    name: string, 
    iconPath: string, 
    baseSPD: number,
    currentSPD: number,
    eventEmitter: EventEmitter
  ) {
    this.name = name;
    this.iconPath = iconPath;
    this.baseSPD = baseSPD;
    this.currentSPD = currentSPD;
    this.eventEmitter = eventEmitter;
  }
}

class Summon extends Actor implements ISummon {
  owner: string;

  constructor(
    name: string, 
    iconPath: string, 
    baseSPD: number,
    currentSPD: number, 
    eventEmitter: EventEmitter,
    owner: string
  ) {
    super(name, iconPath, baseSPD, currentSPD, eventEmitter);
    this.owner = owner;
  }
}

class Character extends Actor implements ICharacter {
  // base stats
  baseHP: number;
  baseATK: number;
  baseDEF: number;
  baseTaunt: number;
  maxEnergy: number;
  
  // current stats
  currentHP: number;
  currentATK: number;
  currentDEF: number;
  currentTaunt: number;
  currentEnergy: number;
  
  // other stuff
  element: string;
  path: string;
  rarity: number;
  faction: Faction;

  constructor(
    name: string,
    iconPath: string,
    baseSPD: number,
    currentSPD: number,
    eventEmitter: EventEmitter,
    baseHP: number,
    baseATK: number,
    baseDEF: number,
    baseTaunt: number,
    maxEnergy: number,
    currentHP: number,
    currentATK: number,
    currentDEF: number,
    currentTaunt: number,
    currentEnergy: number,
    element: string,
    path: string,
    rarity: number,
    faction: Faction,
  ) {
    super(name, iconPath, baseSPD, currentSPD, eventEmitter);
    this.baseHP = baseHP;
    this.baseATK = baseATK;
    this.baseDEF = baseDEF;
    this.baseTaunt = baseTaunt;
    this.maxEnergy = maxEnergy;
    this.currentHP = currentHP;
    this.currentATK = currentATK;
    this.currentDEF = currentDEF;
    this.currentTaunt = currentTaunt;
    this.currentEnergy = currentEnergy;
    this.element = element;
    this.path = path;
    this.rarity = rarity;
    this.faction = faction;
  }
}

class Enemy extends Actor implements IEnemy {
  statusEffects: IStatusEffect[];

  constructor(
    name: string,
    iconPath: string,
    baseSPD: number,
    currentSPD: number,
    eventEmitter: EventEmitter,
    statusEffects: IStatusEffect[],
  ) {
    super(name, iconPath, baseSPD, currentSPD, eventEmitter);
    this.statusEffects = statusEffects;
  }

  /**
   * @param effectName: effect name we're checking for
   * @returns boolean either true or false if enemy has the effect or not  
   */
  hasStatusEffect(effectName: string): boolean {
    return this.statusEffects.some(effect => effect.name === effectName);
  }

  /**
   * @param statusEffect: status effect to add
   * @returns void
   */
  addStatusEffect(statusEffect: IStatusEffect): void {
    this.statusEffects.push(statusEffect);
  }

  getAllStatusEffects(): IStatusEffect[] {
    return this.statusEffects;
  }
}

export { Actor, Summon, Character, Enemy };
export type { IActor, ISummon, ICharacter, IEnemy }