import type { ICharStatPage } from "../stat_logic";
import { MinorTrace, MajorTrace } from "../stat_logic";
import LCTemplate from "../light_cones/LCTemplate";
import { PlayableCharacterName } from "../enums";

class CharTemplate implements ICharStatPage {
  constructor (
    // display information
    public characterName: PlayableCharacterName,

    // base levels
    public characterLevel: number,
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
    public traces: Array<[MinorTrace | MajorTrace]>,

    // light cone
    public lightCone: LCTemplate,
  ) { }
}

export default CharTemplate;