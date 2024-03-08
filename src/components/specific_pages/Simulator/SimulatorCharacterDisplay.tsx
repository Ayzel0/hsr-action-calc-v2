import { useState } from "react";
import CharTemplate from "../../../general_logic/characters/CharTemplate";
import type { LCDictionary, CharacterDictionary, charRelicsKey } from "./Simulator";

interface ExpectedProps {
  char: CharTemplate;
  lcDictionary: LCDictionary;
  characterDictionary: CharacterDictionary;
  handleRemoveCharacter: (char: CharTemplate) => void;
}

const SimulatorCharacterDisplay: React.FC<ExpectedProps> = ({ 
  char,
  lcDictionary,
  characterDictionary,
  handleRemoveCharacter
}) => {
  const [showRelicDropdown, setShowRelicDropdown] = useState(false);
  const handleRelicDropdownClick = () => {
    setShowRelicDropdown(!showRelicDropdown);
  }
  return (
    <div 
      key={char.characterID}
      className='bg-off-white rounded-lg flex flex-col items-center relative min-h-[250px]'
    >
      <div className='absolute bg-red-500 p-1 rounded right-2 top-2 hover:bg-red-600 opacity-75 z-30' onClick={() => handleRemoveCharacter(char)}> { /* remove character button */ }
        <svg data-icon="cross" width="16" height="16" viewBox="0 0 16 16" role="img">
          <path d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z" fillRule="evenodd"></path>
        </svg>
      </div>
      <div className='absolute bg-zinc-300 p-1 rounded right-10 top-2 opacity-75 z-30' onClick={handleRelicDropdownClick}>
        <svg data-icon="caret-down" width="16" height="16" viewBox="0 0 16 16" role="img">
          <path d="M12 6.5c0-.28-.22-.5-.5-.5h-7a.495.495 0 00-.37.83l3.5 4c.09.1.22.17.37.17s.28-.07.37-.17l3.5-4c.08-.09.13-.2.13-.33z" fillRule="evenodd" />
        </svg>
      </div>
      
      { /* character portion */ }
      <div className='flex flex-row justify-center w-[100%] flex-grow min-h-[140px] z-20'> 
        <div className='bg-slate-600 flex rounded-t-md w-[100%] '>
          <div className='p-4 text-white'>
            <p className='font-semibold text-lg'>{char.characterName} (E{char.eidolonLevel})</p>
            <div className='ml-2 mt-1'>
              <p>Lv. {char.characterLevel}</p>
              <p>Skills: {char.basicLevel}/{char.skillLevel}/{char.ultLevel}/{char.talentLevel}</p>
            </div>
          </div>
          <img 
            src={characterDictionary[char.characterID].ImageLink} 
            className='h-[125px] ml-auto rounded-tr-md'
          />
        </div>
      </div>

      {/* light cone portion */}
      <div className={`bg-slate-700 w-[100%] flex flex-grow z-20 ${!showRelicDropdown && 'rounded-b-md'}`}> 
        <img 
          src={lcDictionary[char.lightCone.lcID].ImageLink} 
          className='w-[80px] h-[95px] my-2 ml-2'
        />
        <div className='bg-dark-teal rounded w-[100%] p-2 m-4'>
          <p className='font-semibold text-md'>{char.lightCone.lcName} (S{char.lightCone.superimpositionLevel})</p>
          <div className='ml-2'>
            <p>Lv. {char.lightCone.lcLevel}</p>
          </div>
        </div>
      </div>
      
      { /* Relics Portion */ }
      <div className={`bg-slate-800 w-[100%] rounded-b-md absolute top-full transition ease-in-out duration-300 z-10 ${showRelicDropdown ? 'translate-y-0' : '-translate-y-full'}`}> 
        <h2 className='font-semibold text-center text-white text-lg py-2'>Relic Loadout</h2>
        <div className='grid grid-cols-3 gap-2 px-3 pb-4'>
          {Object.keys(char.getRelicDict()).map(relicKey => {
            const currentRelic = char.getRelicDict()[relicKey as charRelicsKey];
            let currentRelicType = currentRelic.RelicType;
            if (currentRelicType === 'PlanarSphere') {
              currentRelicType = 'Planar Sphere';
            } else if (currentRelicType === 'LinkRope') {
              currentRelicType = 'Link Rope';
            }
            return (
              <div key={relicKey} className='z-0'>
                <div className='flex flex-col justify-center items-center'>
                  <h3 className='text-off-white font-semibold underline underline-offset-2'>{currentRelicType}</h3>
                  <div className='grid grid-cols-2'>
                    <div className='relative'>
                      <div className='absolute bg-teal bottom-0 right-0 text-sm rounded-tl-md rounded-br-md px-1'>
                        <p>Lv{currentRelic.RelicLevel}</p>
                      </div>
                      <img
                        className='w-[75px]'
                        src={currentRelic.RelicImageLink}
                      />
                    </div>
                    <p className='w-[100%] text-white text-sm ml-[3px]'>{currentRelic.RelicStat}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SimulatorCharacterDisplay;