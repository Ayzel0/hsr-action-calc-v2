import { RelicType, ScalingStat } from "../enums";

interface IRelic {
  relicName: string;
  relicStat: ScalingStat;
  relicLevel: number;
  relicRarity: number;
  relicType: RelicType;
  getBasicData(): {
    'RelicID': string,
    'RelicName': string,
    'RelicImageLink': string,
    'RelicImagePath': string,
    'RelicType': string,
    'RelicStat': string,
    'RelicRarity': number,
    'RelicLevel': number,
  }
}

export type { IRelic }