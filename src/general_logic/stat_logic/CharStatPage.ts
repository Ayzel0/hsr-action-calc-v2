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
  
  traces: {
    [key: string]: boolean;
  };

  // light cone
  lightCone: ILCStatPage;
}

export type { ICharStatPage };