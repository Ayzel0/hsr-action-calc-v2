import LCTemplate from "./LCTemplate";
import EventEmitter from "../EventEmitter";
import { Path } from '../enums';

import type { Listener } from '../EventEmitter';

export default class WorrisomeBlissful extends LCTemplate {
  constructor (
    lcLevel: number = 80,
    ascensionLevel: number = 6,
    superimpositionLevel: number = 1,
    lcName: string = 'Worrisome, Blissful',
    path: Path = Path.theHunt,
  ) {
    super(lcLevel, ascensionLevel, superimpositionLevel, lcName, path);
  }
  
  getLCStatSummary(): void {
    console.log(this.baseATK);
    console.log(this.baseDEF);
    console.log(this.baseHP);
  }
}