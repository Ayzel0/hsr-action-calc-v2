import { ScalingStat } from "../../enums"

/**
 * enum denoting unlock conditions for traces, i.e. after level 75, after level 80, etc.
 */
enum unlockCondition {
  level1 = 'LEVEL_1',
  ascension2 = 'ASCENSION_2',
  asecnsion3 = 'ASCENSION_3',
  ascension4 = 'ASCENSION_4',
  ascension5 = 'ASCENSION_5',
  ascension6 = 'ASCENSION_6',
  level75 = 'LEVEL_75',
  level80 = 'LEVEL_80'
}

interface IMajorTrace {
  prerequisite: IMinorTrace | IMajorTrace | true,
  unlockedFrom: unlockCondition,
  unlocked: boolean,
}

interface IMinorTrace {
  prerequisite: IMinorTrace | IMajorTrace | true,
  unlockedFrom: unlockCondition,
  stat: ScalingStat,
  statValue: number,
  unlocked: boolean,
}

class MinorTrace implements IMinorTrace {
  constructor (
    public prerequisite: IMinorTrace | IMajorTrace | true,
    public unlockedFrom: unlockCondition,
    public stat: ScalingStat,
    public statValue: number,
    public unlocked: boolean,
  ) {}
}

class MajorTrace implements IMajorTrace {
  constructor (
    public prerequisite: IMinorTrace | IMajorTrace | true,
    public unlockedFrom: unlockCondition,
    public unlocked: boolean,
  ) {}
}

interface ITrace {
  id: string;
  traceLevel: string;
  unlockRequirement: string;
  effect?: string;
  scalingStat?: string;
  scalingValue?: number;
  nextObjects?: ITrace[];
  unlocked?: boolean;
}

interface ITraceData {
  [key: string]: ITrace[];
}

export type { IMajorTrace, IMinorTrace, ITrace, ITraceData }
export { MinorTrace, MajorTrace, unlockCondition }