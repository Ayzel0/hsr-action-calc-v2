import { useState, useEffect } from 'react';

import { LCTemplate } from "../../../general_logic/light_cones";
import { LCDictionary } from "./Simulator";

interface ExpectedProps {
  lightCone: LCTemplate;
  lcDict: LCDictionary;
};

const LightConeDisplay: React.FC<ExpectedProps> = ({ lightCone, lcDict }) => {
  const [lcLevel, setLCLevel] = useState<number>(lightCone.lcLevel);
  const [tempLCLevel, setTempLCLevel] = useState<string>(lightCone.lcLevel.toString());

  useEffect(() => {
    setLCLevel(lightCone.lcLevel);
  }, [lightCone.lcLevel]);

  const handleLCLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    setTempLCLevel(newValue);
  };

  const handleLCLevelSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLCLevel(parseInt(tempLCLevel, 10));
    lightCone.setLightConeLevel(parseInt(tempLCLevel, 10));
  }

  const lcImagePath = lcDict[lightCone.lcID].ImageLink;
  
  return (
    <div>
      <h2>{lightCone.getLightConeLevelDisplay()}</h2>
      <h2>{lightCone.ascensionLevel}</h2>
      <img src={lcImagePath} />
      <form onSubmit={handleLCLevelSubmit}>
        <input 
          type='number'
          value={tempLCLevel}
          onChange={handleLCLevelChange}
        />
      </form>
    </div>
  )
}

export default LightConeDisplay;