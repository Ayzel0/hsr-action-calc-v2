import type { ILCStatPage } from "./LCStatPage";
import lcJSON from '../../data/hsr_lc_stats.json';
import { Path } from "../enums";

interface IndividualLCStats {
  Path: string;
  Name: string;
  ImageLink: string;
  BaseStats: {
    [key: string]: {
      ATK: number;
      DEF: number;
      HP: number;
    }
  }
}

interface LCJSON {
  [key: string]: IndividualLCStats;
}

const ascensionBreakpoints = [20, 30, 40, 50, 60, 70, 80];

export default class LCTemplate implements ILCStatPage {
  // base stats
  public baseATK: number = -1;
  public baseDEF: number = -1;
  public baseHP: number = -1;

  // info looked up using id
  public lcName: string;
  public lcPath: Path | undefined;
  
  constructor (
    // implementing interface
    public lcLevel: number = 80,
    public ascensionLevel: number = 6,
    public superimpositionLevel: number = 1,

    // LC unique data
    public lcID: string,
  ) {
    // read json
    const typedLCJSON = lcJSON as LCJSON;

    // get base stats
    const individualLCStats: IndividualLCStats = typedLCJSON[this.lcID]
    const levelKey = this.lcLevel.toString();
    if (individualLCStats) {
      this.baseATK = individualLCStats.BaseStats[levelKey]['ATK'];
      this.baseDEF = individualLCStats.BaseStats[levelKey]['DEF'];
      this.baseHP = individualLCStats.BaseStats[levelKey]['HP'];
    }

    // get name
    this.lcName = typedLCJSON[this.lcID].Name;

    // get path
    if (typedLCJSON && typedLCJSON[this.lcID].Path) {
      this.lcPath = typedLCJSON[this.lcID].Path as Path;
    }
  }

  setLightConeLevel(newLevel: number): void {
    // read json
    const typedLCJSON = lcJSON as LCJSON;
    const individualLCStats: IndividualLCStats = typedLCJSON[this.lcID];
    const levelKey = this.lcLevel.toString();

    let maxLevel = ascensionBreakpoints[this.ascensionLevel];
    let minLevel = this.ascensionLevel > 0 ? ascensionBreakpoints[this.ascensionLevel - 1] : 0;
    if ((newLevel >= minLevel) && (newLevel <= maxLevel)) {
      // don't need to change ascension stuff, just change base stats
      this.baseATK = individualLCStats.BaseStats[levelKey].ATK;
      this.baseDEF = individualLCStats.BaseStats[levelKey].DEF;
      this.baseHP = individualLCStats.BaseStats[levelKey].HP;
    } else {
      // it's outside of the range, meaning that we need to change the ascension level
      for (let i = 0; i < ascensionBreakpoints.length; i++) {
        let low = i != 0 ? ascensionBreakpoints[i-1] : 0;
        let high = ascensionBreakpoints[i];
        if ((newLevel >= low) && (newLevel <= high)) {
          this.ascensionLevel = i;
        }
      }
      this.baseATK = individualLCStats.BaseStats[levelKey].ATK;
      this.baseDEF = individualLCStats.BaseStats[levelKey].DEF;
      this.baseHP = individualLCStats.BaseStats[levelKey].HP;
    }
  }

  getLightConeLevelDisplay(): string {
    if (ascensionBreakpoints.includes(this.lcLevel)) {
      let high = ascensionBreakpoints[this.ascensionLevel];
      if (this.lcLevel == high) {
        return this.lcLevel.toString() + '/' + this.lcLevel.toString();
      } else {
        return this.lcLevel.toString() + '/' + high.toString();
      }
    } else {
      let high = ascensionBreakpoints[this.ascensionLevel];
      return this.lcLevel.toString() + '/' + high.toString();
    }
  }
}

export { LCTemplate };
export type { IndividualLCStats, LCJSON };