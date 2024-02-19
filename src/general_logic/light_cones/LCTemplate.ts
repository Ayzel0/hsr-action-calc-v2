import type { ILCStatPage } from "../stat_logic";
import lcJSON from '../data/hsr_lc_stats.json';
import { Path } from "../enums";

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
    public lcName: string,
    public lcPath: Path,
  ) {
    // get the base stats for LC
    const lcStats = lcJSON.find(json => json['Name'] === this.lcName);
    const levelKey = this.lcLevel.toString();
    if (lcStats) {
      const atkObject = lcStats.Stats.ATK as { [key: string] : number };
      const defObject = lcStats.Stats.DEF as { [key: string] : number };
      const hpObject = lcStats.Stats.HP as { [key: string] : number };
      this.baseATK = atkObject[levelKey];
      this.baseDEF = defObject[levelKey];
      this.baseHP = hpObject[levelKey];
    }
  }
}

export { LCTemplate };