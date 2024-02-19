import { ScalingStat } from "../enums"

/**
 * enum denoting when traces are available, not when they are unlocked
 * for example, a character might have a trace available since the beginning,
 * but only is able to upgrade it at ascension 6.
 */
enum traceAvailabilityLevel {
  fromBeginning = 'FROM_BEGINNING',
  afterAscensionTwoTrace = 'AFTER_ASCENSION_TWO_TRACE',
  afterAscensionFourTrace = 'AFTER_ASCENSION_FOUR_TRACE',
  afterAscensionSixTrace = 'AFTER_ASCENSION_SIX_TRACE',
}

/**
 * enum denoting when a trace is unlocked, not when it is available. For example,
 * a trace might be unlocked at ascension 4, but you might not have the necessary
 * major trace unlocked, so you won't be able to upgrade it.
 */
enum traceUnlockCondition {
  beforeFirstMajorTrace = 'BEFORE_FIRST_MAJOR_TRACE',
  firstMajorTrace = 'FIRST_MAJOR_TRACE',
  secondMajorTrace = 'SECOND_MAJOR_TRACE',
  thirdMajorTrace = 'THIRD_MAJOR_TRACE'
}

interface IMinorTrace {
  availableFrom: traceAvailabilityLevel,
  unlockedFrom: traceUnlockCondition,
  stat: ScalingStat,
  statValue: number,
}

class MinorTrace implements IMinorTrace {
  constructor (
    public availableFrom: traceAvailabilityLevel,
    public unlockedFrom: traceUnlockCondition,
    public stat: ScalingStat,
    public statValue: number,
  ) {}
}

class MinorTraces {
  
}