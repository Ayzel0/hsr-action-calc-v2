import type { ICharacter, ISummon } from '../Actor';
import { Character, Summon, Enemy } from '../Actor';
import type { IEnemy } from '../Actor';
import type { IStatusEffect } from '../StatusEffect';
import { DebuffCategories, defDown } from '../StatusEffect';
import EventEmitter from '../EventEmitter';

// enums
import { DamageTypes } from '../enums/DamageTypes';
import { Factions } from '../enums/Factions';
import { Elements } from '../enums/Elements';
import { Paths } from '../enums/Paths';

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

class TopazAndNumby extends Character {
  // basic attack
  normalScaling: number;
  normalStat: string;
  normalDMGTypes: string[];

  // skill
  skillInsertDMGIncrease: number;
  skillDMGScaling: number;
  skillDMGTypes: DamageTypes[] = [DamageTypes.skill, DamageTypes.fire, DamageTypes.insert];

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
    element: Elements = Elements.fire,
    path: string = Paths.theHunt,
    rarity: number = 5,
    faction: Factions = Factions.IPC,

    // basic atk stuff
    normalScaling: number = 1.00,
    normalStat: string = 'ATK',
    normalElement: string = 'Fire',
    normalDMGTypes: DamageTypes[] = [DamageTypes.normal, DamageTypes.insert],

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
  skillAttack(target: Enemy): number {
    let dmgIncreaseValue = 0;
    let defDownValue = 0;
    if (!target.hasStatusEffect('proofOfDebt')) {
      const PoD = new ProofOfDebt();
      target.addStatusEffect(PoD);
    } else {
      const statusEffects = target.statusEffects;
      statusEffects.forEach(statusEffect => {
        if (statusEffect.type === DebuffCategories.defDown) {
          if (statusEffect.subtype === DamageTypes.all || /* check if the def down is for skill/insert/fire dmg type as well */) 
          defDownValue += (statusEffect as defDown).value;
        } else if (statusEffect.type === DebuffCategories.dmgReceivedIncrease) {
          // adjust dmgIncreaseValue
        }
      })
    }
    return 0;
  }
}