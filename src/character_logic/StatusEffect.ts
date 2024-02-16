import type { IEnemy } from './Actor';
import { DamageTypes } from './DamageTypes'

// interfaces/enums
export enum DebuffCategories {
  defDown = 'DEF_DOWN',
  dmgReceivedIncrease = 'DMG_RECEIVED_INCREASE',
  DOT = 'DAMAGE_OVER_TIME',
  resDown = 'RESISTANCE_DOWN',
  slowed = 'SLOWED',
  frozen = 'FROZEN',
  other = 'CUSTOM_DEBUFF_CATEGORY'
}

// interface for debuffs; I've implemented common debuffs here but custom ones can be implemented in character files
interface IStatusEffect {
  name: string;
  duration: number;
  type: DebuffCategories;
  subtype?: DamageTypes;
}

class defDown implements IStatusEffect {
  name: string = 'defDown';
  duration: number;
  type: DebuffCategories = DebuffCategories.defDown;

  constructor (
    name: string,
    duration: number
  ) {
    this.name = name;
    this.duration = duration;
  }
}

class Bleed implements IStatusEffect {
  name: string = 'bleed';
  duration: number;
  type: DebuffCategories = DebuffCategories.DOT;
  subType: DamageTypes = DamageTypes.physical;

  constructor(
    name: string,
    duration: number
  ) {
    this.name = name;
    this.duration = duration;
  }
}

export type { IStatusEffect };