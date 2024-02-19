import type { ILCStatPage } from './LCStatPage';

interface ICharStatPage {
  // character level
  characterLevel: number;
  ascensionLevel: number;
  eidolonLevel: number;

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

  // light cone
  lightCone: ILCStatPage;
}

export type { ICharStatPage };