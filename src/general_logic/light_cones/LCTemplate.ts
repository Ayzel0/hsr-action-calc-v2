import type { ILCStatPage } from "../stat_logic";
import lcJSON from '../../data/hsr_lc_stats.json';
import { Path } from "../enums";

interface IndividualLCStats {
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
  public baseATK: number = -1;
  public baseDEF: number = -1;
  public baseHP: number = -1;
  
  constructor (
    // implementing interface
    public lcLevel: number,
    public ascensionLevel: number,
    public superimpositionLevel: number,

    // LC unique data
    public lcID: string,
    public lcPath: Path,
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
  }
}

export { LCTemplate };