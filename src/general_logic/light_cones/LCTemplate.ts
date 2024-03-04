import type { ILCStatPage } from "../stat_logic";
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
    public lcLevel: number,
    public ascensionLevel: number,
    public superimpositionLevel: number,

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
    const pathString = typedLCJSON[this.lcID].Path;
    
    const getEnumByValue = (value: string): Path | undefined => {
      const entries = Object.entries(Path) as [Path, string][];
      const foundEntry = entries.find(([, enumValue]) => enumValue === value);
      return foundEntry ? foundEntry[0] : undefined;
    }

    this.lcPath = getEnumByValue(pathString);
  }
}

export { LCTemplate };