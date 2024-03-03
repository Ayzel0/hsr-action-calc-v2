import type { ICharStatPage, ILCStatPage } from "../stat_logic";
import { MinorTrace, MajorTrace, ITrace, ITraceData } from "../stat_logic";
import LCTemplate from "../light_cones/LCTemplate";
import { PlayableCharacterName } from "../enums";
import traceData from '../../data/traces.json';

class CharTemplate implements ICharStatPage {
  public traces: ITrace[];
  public lightCone: LCTemplate;

  constructor (
    // display information
    public characterName: PlayableCharacterName,
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

    // set light cone based on recommendation
  }
}

export default CharTemplate;