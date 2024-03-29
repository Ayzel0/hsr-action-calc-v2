import type { IEnemy } from './Actor';
import { DamageType } from './enums/DamageType'

// interfaces/enums
enum DebuffCategory {
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
  type: DebuffCategory;
  subtype?: DamageType;
}

class defDown implements IStatusEffect {
  name: string = 'defDown';
  duration: number;
  type: DebuffCategory = DebuffCategory.defDown;
  subtype: DamageType = DamageType.all;
  value: number;

  constructor (
    name: string,
    duration: number,
    value: number,
  ) {
    this.name = name;
    this.duration = duration;
    this.value = value;
  }
}

class Bleed implements IStatusEffect {
  name: string = 'bleed';
  duration: number;
  type: DebuffCategory = DebuffCategory.DOT;
  subType: DamageType = DamageType.physical;

  constructor(
    name: string,
    duration: number
  ) {
    this.name = name;
    this.duration = duration;
  }
}

// interfaces
export type { IStatusEffect };

// enums
export { DebuffCategory };

// classes
export { defDown };