import type { ILCStatPage } from './LCStatPage';
import { MinorTrace, MajorTrace } from '.';

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
  
  traces: Array<[MinorTrace | MajorTrace]>;

  // light cone
  lightCone: ILCStatPage;
}

export type { ICharStatPage };