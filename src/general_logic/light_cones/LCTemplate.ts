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
}

export { LCTemplate };
export type { IndividualLCStats, LCJSON };