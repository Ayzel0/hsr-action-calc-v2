import type { ILCStatPage } from './LCStatPage';
import { ITrace } from '.';

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
  
  traces: ITrace[];

  // light cone
  lightCone: ILCStatPage;
}

export type { ICharStatPage };