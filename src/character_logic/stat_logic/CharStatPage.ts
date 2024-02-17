import { ScalingStat } from "../enums/ScalingStat";

interface ICharStatPage {
  // character level
  characterLevel: number;
  ascensionLevel: number;

  // skill levels
  basicLevel: number;
  skillLevel: number;
  ultLevel: number;
  talentLevel: number;
  
  // major trace unlocks
  ascensionTwoTraceUnlocked: boolean;
  ascensionFourTraceUnlocked: boolean;
  ascensionSixTraceUnlocked: boolean;

  // minor trace unlocks
  minorTraces: {
    [key: string]: boolean;
  };
}

export type { ICharStatPage };