interface IAction {
  scalingStat: string[];
  multiplier: number[];
  targeting: string;
  energyGen: number;
}

interface IAttack extends IAction {
  singleTargetBreak: number;
  blastBreak: number;
  aoeBreak: number;
  damageType: string;
}

interface IBuff extends IAction {
  buffedStat: string;
}