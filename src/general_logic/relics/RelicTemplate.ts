import relicDict from '../../data/hsr_relic_dictionary.json';
import { IRelic } from './Relics';
import { RelicType, ScalingStat } from '../enums';

interface IndividualRelic {
  Name: string;
  RelicType: string;
  ImageLink: string;
  ImagePath: string;
}

interface IRelicJSON {
  [key: string]: { // id key
    Name: string;
    RelicType: string;
    ImageLink: string;
    ImagePath: string;
    Pieces: {
      [key: string]: IndividualRelic;
    }
  }
}

interface IBasicRelicInfo {
  'RelicID': string,
  'RelicName': string,
  'RelicImagePath': string,
  'RelicImageLink': string,
  'RelicType': string,
  'RelicStat': string,
  'RelicRarity': number,
  'RelicLevel': number,
}

class RelicTemplate implements IRelic {
  public relicName: string;
  public relicImagePath: string;
  public relicImageLink: string;
  constructor (
    public relicID: string,
    public relicType: RelicType, // body, head, feet, etc.
    public relicStat: ScalingStat, // main stat only, check performed in creation
    public relicRarity: number = 5,
    public relicLevel: number = 15,
  ) {
    // look up name and image path
    const typedRelicDict: IRelicJSON = relicDict as IRelicJSON;
    const relicTypeString: string = relicType;
    this.relicName = typedRelicDict[this.relicID].Pieces[relicTypeString].Name;
    this.relicImagePath = typedRelicDict[this.relicID].Pieces[relicTypeString].ImagePath;
    this.relicImageLink = typedRelicDict[this.relicID].Pieces[relicTypeString].ImageLink;
  }

  getBasicData(): IBasicRelicInfo {
    return ({
      'RelicID': this.relicID,
      'RelicName': this.relicName,
      'RelicImagePath': this.relicImagePath,
      'RelicImageLink': this.relicImageLink,
      'RelicType': this.relicType as string,
      'RelicStat': this.relicStat as string,
      'RelicRarity': this.relicRarity,
      'RelicLevel': this.relicLevel,
    });
  };
}

export default RelicTemplate;
export type { IBasicRelicInfo };