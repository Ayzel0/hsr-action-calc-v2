import { useState, useEffect } from 'react';

import { LCTemplate } from "../../../general_logic/light_cones";
import { LCDictionary } from "./Simulator";

interface ExpectedProps {
  lightCone: LCTemplate;
  lcDict: LCDictionary;
};

const LightConeDisplay: React.FC<ExpectedProps> = ({ lightCone, lcDict }) => {
  const [lcLevel, setLCLevel] = useState<number>(lightCone.lcLevel);
  const [tempLCLevel, setTempLCLevel] = useState(0);

  useEffect(() => {
    setLCLevel(lightCone.lcLevel);
  }, [lightCone.lcLevel]);

  const handleLCLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const newValue = parseInt(e.target.value, 10);
    setTempLCLevel(newValue);
  };

  const lcImagePath = lcDict[lightCone.lcID].ImageLink;
  
  return (
    <div>
      <img src={lcImagePath} />
      <form>
        <input 
          type='number'
          value={lcLevel}
          onChange={handleLCLevelChange}
          onSubmit={handleLCLevelSubmit}
        />
      </form>
    </div>
  )
}

export default LightConeDisplay;