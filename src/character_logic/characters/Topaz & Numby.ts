import type { ICharacter, ISummon } from '../Actor';
import { Character, Summon, Enemy } from '../Actor';
import type { IEnemy } from '../Actor';
import type { IStatusEffect } from '../StatusEffect';
import { DebuffCategory, defDown } from '../StatusEffect';
import EventEmitter from '../EventEmitter';

// enums
import { DamageType } from '../enums/DamageType';
import { Faction } from '../enums/Faction';
import { Element } from '../enums/Element';
import { Path } from '../enums/Path';
import { PlayableCharacterName } from '../enums/PlayableCharacterName';
import { ScalingStat } from '../enums/ScalingStat';

// stat page
import type { ICharStatPage } from '../stat_logic/CharStatPage';

// character stats json
import charStatsJSON from '../data/hsr_char_stats.json';

/**
 * Starting character setup; order of setup is stat page => character unique effects => character skill logic
 */

const specialLevels = [20, 30, 40, 50, 60, 70];
const charName = 'Topaz & Numby';

// interface to resolve some json import issues

class TopazStatPage implements ICharStatPage {
  private baseHP: number;
  private baseATK: number;
  private baseDEF: number;
  private baseSPD: number = 110;
  private baseTaunt: number = 75;

  constructor (
    public characterLevel: number,
    public ascensionLevel: number,
    public basicLevel: number,
    public skillLevel: number,
    public ultLevel: number,
    public talentLevel: number,
    public ascensionTwoTraceUnlocked: boolean,
    public ascensionFourTraceUnlocked: boolean,
    public ascensionSixTraceUnlocked: boolean,
    public minorTraces: { [key: string]: boolean; }
  ) {
    /**
     * setting base HP/ATK/DEF by looking values up from json
     */

    // first check if it's on an ascension breakpoint
    if (!specialLevels.some(level => level === characterLevel)) { // if it's not on breakpoint, job is easy
      const levelKey = this.characterLevel.toString(); 

      const charStats = charStatsJSON.find(charStats => charStats['Character Name'] === charName);
      if (charStats) {
        const atkObject = charStats.Stats.ATK as { [key: string] : number };
        const defObject = charStats.Stats.DEF as { [key: string] : number };
        this.baseATK = atkObject[levelKey] ?? 0;
        this.baseDEF = defObject[levelKey] ?? 0;
      }
    } else { // if it is on an asension breakpoint, then generate a unique levelKey to look it up
      const levelKey: string = (() => {
        switch (characterLevel) {
          case 20:
            if (ascensionLevel === 0) {
              return '20';
            }
            return '20+';
          case 30:
            if (ascensionLevel === 1) {
              return '30';
            }
            return '30+';
          case 40:
            if (ascensionLevel === 2) {
              return '40';
            }
            return '40+';
          case 50:
            if (ascensionLevel === 3) {
              return '50';
            }
            return '50+';
          case 60:
            if (ascensionLevel === 4) {
              return '60';
            }
            return '60+';
          case 70:
            if (ascensionLevel === 5) {
              return '70';
            }
            return '70+';
          default:
            return '1';
        }
      })();

      // look up value
      const charStats = charStatsJSON.find(charStats => charStats['Character Name'] === charName);
      if (charStats) {
        const atkObject = charStats.Stats.ATK as { [key: string] : number};
        this.baseATK = atkObject[levelKey] ?? 0;
      }
    }
  }
}

class ProofOfDebt implements IStatusEffect {
  // interface implementation
  name: string;
  duration: number;
  dmgIncrease: number;
  type: DebuffCategory;

  constructor(
    name: string = 'proofOfDebt',
    duration: number = -1,
    dmgIncrease: number = 0.5,
    type: DebuffCategory = DebuffCategory.dmgReceivedIncrease,
  ) {
    this.name = name;
    this.duration = duration;
    this.dmgIncrease = dmgIncrease;
    this.type = type;
  }
}

class TopazAndNumby extends Character {
  // basic attack
  normalDamageMultiplier: number;
  normalDamageScalingStat: ScalingStat;
  normalElement: Element = Element.fire;
  normalDMGTypes: DamageType[] = [DamageType.fire, DamageType.normal, DamageType.insert];

  // skill damage increase
  skillInsertDMGIncrease: number;

  // skill damage
  skillDamageMultiplier: number;
  skillDamageScalingStat: ScalingStat = ScalingStat.ATK;
  skillElement: Element = Element.fire; 
  skillDMGTypes: DamageType[] = [DamageType.skill, DamageType.fire, DamageType.insert];

  // ultimate scaling
  ultimateNumbyDamageMultiplierIncrease: number;
  ultimateNumbyCDMGIncrease: number;

  //.using default lv80 stats
  constructor(
    // default values
    eventEmitter: EventEmitter = new EventEmitter(),
    name: PlayableCharacterName = PlayableCharacterName.topazAndNumby,
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
    element: Element = Element.fire,
    path: string = Path.theHunt,
    rarity: number = 5,
    faction: Faction = Faction.IPC,

    // basic atk stuff
    normalDamageMultiplier: number = 1.00,
    normalDamageScalingStat: ScalingStat = ScalingStat.ATK,
    normalElement: Element = Element.fire,
    normalDMGTypes: DamageType[] = [DamageType.normal, DamageType.insert],

    // skill stuff
    skillInsertDMGIncrease: number = 0.5,
    skillDamageMultiplier: number = 1.5,
    skillDamageScalingStat: ScalingStat = ScalingStat.ATK,
    skillElement: Element = Element.fire,
    skillDMGTypes: DamageType[] = [DamageType.fire, DamageType.skill, DamageType.insert],

    // ultimate stuff
    ultimateNumbyCDMGIncrease: number = 0.12,
    ultimateNumbyDamageMultiplierIncrease: number = 0.75,
  ) {
    super(
      name, iconPath, baseSPD, currentSPD, eventEmitter,
      baseHP, baseATK, baseDEF, baseTaunt, maxEnergy,
      currentHP, currentATK, currentDEF, currentTaunt, currentEnergy,
      element, path, rarity, faction
    );

    // basic attack
    this.normalDamageMultiplier = normalDamageMultiplier;
    this.normalDamageScalingStat = normalDamageScalingStat;
    this.normalElement = normalElement;
    this.normalDMGTypes = normalDMGTypes;

    // skill
    this.skillInsertDMGIncrease = skillInsertDMGIncrease;
    this.skillDamageMultiplier = skillDamageMultiplier;
    this.skillDamageScalingStat = skillDamageScalingStat;
    this.skillElement = skillElement;
    this.skillDMGTypes = skillDMGTypes;

    // ultimate
    this.ultimateNumbyCDMGIncrease = ultimateNumbyCDMGIncrease;
    this.ultimateNumbyDamageMultiplierIncrease = ultimateNumbyDamageMultiplierIncrease;
  }

  // skill function
  /**
   * @param target the enemy Topaz is targeting
   * @returns damage which the attack does 
   * logic: 
   * step 1: checks if the target currently has proof of debt, if not applies the effect
   * step 2: checks the target's debuffs
   * step 3: deals damage along with emitting a skill use and follow-up use event
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
        if (statusEffect.type === DebuffCategory.defDown) {
          if (statusEffect.subtype === DamageType.all || this.skillDMGTypes.some(dmgType => dmgType === statusEffect.subtype)) {
            defDownValue += (statusEffect as defDown).value;
          }
        } else if (statusEffect.type === DebuffCategory.dmgReceivedIncrease) {
          // adjust dmgIncreaseValue
        }
      })
    }
    return 0;
  }
}