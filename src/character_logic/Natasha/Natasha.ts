import CharTemplate from "../../general_logic/characters/CharTemplate";
import { PlayableCharacterName } from "../../general_logic/enums";

class Natasha extends CharTemplate {
  constructor (
    // display information
    characterName: PlayableCharacterName = PlayableCharacterName.natasha,
    characterID: number = 1105,

    // base levels
    public characterLevel: number = 80,
    public ascensionLevel: number = 6,
    public eidolonLevel: number = 0,

    // skill levels
    public basicLevel: number = 5,
    public skillLeveL: number = 9,
    public ultLevel: number = 9,
    public talentLevel: number = 9,

    // traces
    public traces: Array
  ) {
    super()
  }
}