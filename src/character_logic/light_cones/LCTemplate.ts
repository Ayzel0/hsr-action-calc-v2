import type { ILCStatPage } from "../stat_logic";

class LCTemplate implements ILCStatPage {
  constructor (
    // implementing interface
    public lcLevel: number,
    public ascensionLevel: number,
    public superimpositionLevel: number,

    public lcName: string,
  ) {
    // get the base stats for LC
    
  }
}

export { LCTemplate };