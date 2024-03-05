import type { ICharStatPage } from "../stat_logic";
import { ITrace, ITraceData } from "../stat_logic";
import LCTemplate from "../light_cones/LCTemplate";
import { PlayableCharacterName } from "../enums";
import traceData from '../../data/traces.json';
import charData from '../../data/hsr_char_stats.json';
import { Path } from "../enums";
import defaultLightCones from "../defaults/DefaultLightCone";
import defaultCharStats from '../defaults/DefaultCharStats';

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

interface IDefaultLC {
  [key: string]: string;
}

interface IDefaultCharStats {
  [key: string]: number;
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
    public characterLevel: number = defaultCharStats['defaultCharLevel'],
    public ascensionLevel: number = defaultCharStats['defaultCharAscension'],
    public eidolonLevel: number = defaultCharStats['defaultEidolonLevel'],
    
    // skill levels
    public basicLevel: number = defaultCharStats['defaultBasicLevel'],
    public skillLevel: number = defaultCharStats['defaultSkillLevel'],
    public ultLevel: number = defaultCharStats['defaultUltLevel'],
    public talentLevel: number = defaultCharStats['defaultTalentLevel'],
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

    // allow lookups
    const typedCharData = charData as CharDataJSON;

    // get char path
    if (typedCharData && typedCharData[characterID].Path) {
      this.characterPath = typedCharData[characterID].Path as Path;
    }

    // get character name
    if (typedCharData && typedCharData[characterID].Name) {
      this.characterName = typedCharData[characterID].Name as PlayableCharacterName;
    }

    // set light cone based on recommendation

    // get default light cone data
    const typedDefaultLightCones = defaultLightCones as IDefaultLC;
    const defaultLightConeID = typedDefaultLightCones[this.characterID];

    // create new light cone 
    this.lightCone = new LCTemplate(
      80,
      6,
      1,
      defaultLightConeID
    );
  }
}

export default CharTemplate;