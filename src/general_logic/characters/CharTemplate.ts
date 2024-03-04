import type { ICharStatPage, ILCStatPage } from "../stat_logic";
import { MinorTrace, MajorTrace, ITrace, ITraceData } from "../stat_logic";
import LCTemplate from "../light_cones/LCTemplate";
import { PlayableCharacterName } from "../enums";
import traceData from '../../data/traces.json';
import charData from '../../data/hsr_char_stats.json';
import { Path } from "../enums";

interface StatNumbers {
  ATK: number;
  DEF: number;
  HP: number;
  BaseSPD?: number;
  CritDamage?: number;
  CritRate?: number;
  BaseAggro?: number;
}

interface IndividualCharStats {
  Path: string;
  ImageLink: string;
  Name: string;
  BaseStats: {
    [key: string]: StatNumbers;
  }
}

interface CharDataJSON {
  [key: string]: IndividualCharStats;
}

class CharTemplate implements ICharStatPage {
  // basic information
  public characterName: PlayableCharacterName | undefined;
  public characterPath: Path | undefined;
  
  public traces: ITrace[];
  public lightCone: LCTemplate;

  constructor (
    // display information
    public characterID: string,

    // base levels
    public characterLevel: number,
    public ascensionLevel: number,
    public eidolonLevel: number,
    
    // skill levels
    public basicLevel: number,
    public skillLevel: number,
    public ultLevel: number,
    public talentLevel: number,
  ) { 
    // function to handle trace unlocks
    const processTrace = (trace: ITrace) => {
      // add unlocked to the current trace
      trace['unlocked'] = true;

      if (trace.nextObjects && trace.nextObjects.length > 0) {
        trace.nextObjects.forEach(processTrace)
      }
    }

    // look up the specific character's trace and set the class variable to the array of traces
    const typedTraceData: ITraceData = traceData as ITraceData;
    let charTraces = typedTraceData[characterID];
    charTraces.forEach(processTrace);
    this.traces = charTraces;

    // search in hsr_char_stats for path
    const typedCharData = charData as CharDataJSON;

    const getPathValueFromString = (value: string): Path | undefined => {
      const enumEntries = Object.entries(Path) as [Path, String][];
      const foundEntry = enumEntries.find(([, enumValue]) => enumValue === value);
      return foundEntry ? foundEntry[0] : undefined;
    }

    const charPathString = typedCharData[this.characterID].Path;
    this.characterPath = getPathValueFromString(charPathString);

    // get character name
    const getNameValueFromString = (value: string): PlayableCharacterName | undefined => {
      const enumEntries = Object.entries(PlayableCharacterName) as [PlayableCharacterName, string][];
      const foundEntry = enumEntries.find(([, enumValue]) => enumValue === value);
      return foundEntry ? foundEntry[0] : undefined;
    }

    const charNameString = typedCharData[this.characterID].Name;
    this.characterName = getNameValueFromString(charNameString);

    // set light cone based on recommendation
  }
}

export default CharTemplate;