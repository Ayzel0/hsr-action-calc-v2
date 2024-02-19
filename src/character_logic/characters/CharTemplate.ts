import type { ICharStatPage } from "../stat_logic";
import charJSON from '../data/hsr_char_stats.json';
import { ICharStatPage } from "../stat_logic";

class CharTemplate implements ICharStatPage {
  constructor (
    // base levels
    public charLevel: number,
    public ascensionLevel: number,
    public eidolonLevel: number,
    
    // skill levels
    public basicLevel: number,
    public skillLevel: number,
    public ultLevel: number,
    public talentLevel: number,
    
    // major traces
    public ascensionTwoTraceUnlocked: boolean,
    public ascensionFourTraceUnlocked: boolean,
    public ascensionSixTraceUnlocked: boolean,

    // minor traces
    public minorTraces
  ) {
    
  }
}