import type { ILCStatPage } from './LCStatPage';
import { ITrace } from '.';
import { IRelic } from '.';

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

  // relics
  relics: IRelic[];
}

export type { ICharStatPage };