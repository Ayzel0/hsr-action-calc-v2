import type { ICharacter, ISummon } from '../Actor';
import type { IStatusEffect } from '../StatusEffect';
import { DebuffCategories } from '../StatusEffect';
import { Character, Summon, Enemy } from '../Actor';
import type { IEnemy } from '../Actor';
import EventEmitter from '../EventEmitter';
import { DamageTypes } from '../DamageTypes';

class ProofOfDebt implements IStatusEffect {
  // interface implementation
  name: string;
  duration: number;
  dmgIncrease: number;
  type: DebuffCategories;

  constructor(
    name: string = 'proofOfDebt',
    duration: number = -1,
    dmgIncrease: number = 0.5,
    type: DebuffCategories = DebuffCategories.dmgReceivedIncrease,
  ) {
    this.name = name;
    this.duration = duration;
    this.dmgIncrease = dmgIncrease;
    this.type = type;
  }
}

class Topaz extends Character {
  // basic attack
  normalScaling: number;
  normalStat: string;
  normalElement: string;
  normalDMGTypes: string[];

  // skill
  skillInsertDMGIncrease: number;
  skillDMGScaling: number;
  skillElement: string;
  skillDMGTypes: string[];

  //.using default lv80 stats
  constructor(
    // default values
    eventEmitter: EventEmitter = new EventEmitter(),
    name: string = 'Topaz & Numby',
    iconPath: string = '/char_icons/Topaz & Numby.png',
    baseHP: number = 931,
    baseATK: number = 620,
    baseDEF: number = 412,
    baseSPD: number = 110,
    baseTaunt: number = 75,
    maxEnergy: number = 130,
    currentHP: number = 931,
    currentATK: number = 620,
    currentDEF: number = 412,
    currentSPD: number = 110,
    currentTaunt: number = 75,
    currentEnergy: number = 0,
    element: string = 'Fire',
    path: string = 'The Hunt',
    rarity: number = 4,
    faction: string = 'Interastral Peace Corporation',

    // basic atk stuff
    normalScaling: number = 1.00,
    normalStat: string = 'ATK',
    normalElement: string = 'Fire',
    normalDMGTypes: string[] = ['fireDMG', 'normalDMG', 'insertDMG'],

    // skill stuff
    skillInsertDMGIncrease: number = 0.5,
    skillDMGScaling: number = 1.5,
    skillElement: string = 'Fire',
    skillDMGTypes: string[] = ['fireDMG', 'skillDMG', 'insertDMG']
  ) {
    super(
      name, iconPath, baseSPD, currentSPD, eventEmitter,
      baseHP, baseATK, baseDEF, baseTaunt, maxEnergy,
      currentHP, currentATK, currentDEF, currentTaunt, currentEnergy,
      element, path, rarity, faction
    );

    // basic attack
    this.normalScaling = normalScaling;
    this.normalStat = normalStat;
    this.normalElement = normalElement;
    this.normalDMGTypes = normalDMGTypes;

    // skill
    this.skillInsertDMGIncrease = skillInsertDMGIncrease;
    this.skillDMGScaling = skillDMGScaling;
    this.skillElement = skillElement;
    this.skillDMGTypes = skillDMGTypes;
  }

  // skill function
  /**
   * @param target the enemy Topaz is targeting
   * logic: 
   * step 1: checks if the target currently has proof of debt, if not applies the effect
   * step 2: checks the target's debuffs
   * step 3: deals damage along with emitting a skill use and follow-up use event
   * @return damage which the attack does 
   */
  skillAttack(target: Enemy): void {
    if (!target.hasStatusEffect('proofOfDebt')) {
      const PoD = new ProofOfDebt();
      target.addStatusEffect(PoD);
    } else {
      const statusEffects = target.statusEffects;
    }
  }
}