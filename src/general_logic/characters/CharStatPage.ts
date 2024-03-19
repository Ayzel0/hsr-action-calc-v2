import type { ILCStatPage } from '../light_cones/LCStatPage';
import { ITrace } from './traces';
import { IRelic } from '../relics';

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