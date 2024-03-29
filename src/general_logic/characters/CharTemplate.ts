import type { ICharStatPage } from "../characters";
import type { IRelic } from "../relics/Relics";
import { ITrace, ITraceData } from "./traces";
import LCTemplate from "../light_cones/LCTemplate";
import { PlayableCharacterName, RelicType, ScalingStat } from "../enums";
import traceData from '../../data/traces.json';
import charData from '../../data/hsr_char_stats.json';
import { Path } from "../enums";
import defaultLightCones from "../defaults/DefaultLightCone";
import defaultCharStats from '../defaults/DefaultCharStats';
import defaultRelicSet from "../defaults/DefaultRelicSet";
import RelicTemplate from "../relics/RelicTemplate";
import { IBasicRelicInfo } from "../relics/RelicTemplate";

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

interface IDefaultRelicSet {
  [charID: string]: {
    twoPieceID: string;
    fourPieceID: string;
    planarID: string;
    bodyStat: keyof typeof ScalingStat;
    feetStat: keyof typeof ScalingStat;
    orbStat: keyof typeof ScalingStat;
    ropeStat: keyof typeof ScalingStat;
  } // id lookup
}

interface GetRelicDictReturn {
  head: IBasicRelicInfo, 
  hands: IBasicRelicInfo,
  orb: IBasicRelicInfo,
  feet: IBasicRelicInfo,
  body: IBasicRelicInfo,
  rope: IBasicRelicInfo,
}

class CharTemplate implements ICharStatPage {
  // basic information
  public characterName: PlayableCharacterName | undefined;
  public characterPath: Path | undefined;
  
  public traces: ITrace[];
  public lightCone: LCTemplate;

  public relics: IRelic[];

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
    /**
     * TRACES
     */

    /**
     * unlocks all traces recursively
     * @param trace "base trace" for which we recurse through nextObjects through
     */
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
    console.log(this.traces);

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

    // add relics
    const typedDefaultRelicSet: IDefaultRelicSet = defaultRelicSet as IDefaultRelicSet;
    const twoPieceRelicID: string = typedDefaultRelicSet[this.characterID].twoPieceID;
    const fourPieceRelicID: string = typedDefaultRelicSet[this.characterID].fourPieceID;
    const planarOrnamentID: string = typedDefaultRelicSet[this.characterID].planarID;
    const head = new RelicTemplate(twoPieceRelicID, RelicType.head, ScalingStat.flatAttack);
    const hands = new RelicTemplate(twoPieceRelicID, RelicType.hands, ScalingStat.flatHP);

    const stringToRelicType = (value: string): ScalingStat | undefined => {
      const enumKeys = Object.keys(ScalingStat) as Array<keyof typeof ScalingStat>;
      const matchedKey = enumKeys.find(key => key === value);
      return matchedKey ? ScalingStat[matchedKey] : undefined;
    };

    const feetStat = stringToRelicType(typedDefaultRelicSet[this.characterID].feetStat) as ScalingStat;
    const feet = new RelicTemplate(fourPieceRelicID, RelicType.feet, feetStat);

    const bodyStat = stringToRelicType(typedDefaultRelicSet[this.characterID].bodyStat) as ScalingStat;
    const body = new RelicTemplate(fourPieceRelicID, RelicType.body, bodyStat);

    const orbStat = stringToRelicType(typedDefaultRelicSet[this.characterID].orbStat) as ScalingStat;
    const orb = new RelicTemplate(planarOrnamentID, RelicType.orb, orbStat)

    const ropeStat = stringToRelicType(typedDefaultRelicSet[this.characterID].ropeStat) as ScalingStat;
    const rope = new RelicTemplate(planarOrnamentID, RelicType.rope, ropeStat);

    const relicArray = [
      head, hands, feet, body, orb, rope
    ]
    this.relics = relicArray;
  };

  /**
   * getter function for all relics
   * @returns dictionary with all relics
   */
  getRelicDict(): GetRelicDictReturn {
    return ({
      'head': this.relics[0].getBasicData(),
      'hands': this.relics[1].getBasicData(),
      'orb': this.relics[4].getBasicData(),
      'feet': this.relics[2].getBasicData(),
      'body': this.relics[3].getBasicData(),
      'rope': this.relics[5].getBasicData()
    });
  };

  /**
   * edits the character traces
   * @param newTraces new traces for the character
   * @returns void
   */
  setTraces(newTraces: ITrace[]): void {
    this.traces = newTraces;
  }
}

export default CharTemplate;
export type { GetRelicDictReturn }