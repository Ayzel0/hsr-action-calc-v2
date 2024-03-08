import Navbar from "../../page_constants/Navbar";
import charStats from '../../../data/hsr_char_stats.json';
import lcStats from '../../../data/hsr_lc_stats.json';
import { useState, useEffect, useRef } from 'react';
import CharTemplate from "../../../general_logic/characters/CharTemplate";
import useWindowDimensions from "../../../utility_functions/useWindowDimensions";
import { PlayableCharacterName } from "../../../general_logic/enums";
import type { GetRelicDictReturn } from "../../../general_logic/characters/CharTemplate";
import type { IBasicRelicInfo } from "../../../general_logic/relics/RelicTemplate";

// interfaces for loading from charStats
interface Level1BaseStats {
  ATK: number;
  DEF: number;
  HP: number;
  BaseSPD: number;
  CritRate: number;
  CritDamage: number;
  BaseAggro: number;
}

interface BaseStats {
  ATK: number;
  DEF: number;
  HP: number;
}

interface CharStat {
  Name: string;
  ImageLink: string;
  BaseStats: {
    [level: string]: Level1BaseStats | BaseStats;
  }
}

interface CharStats {
  [key: string]: CharStat;
}

// interfaces for looking up from characterDictionary
interface CharBasicInfo {
  Name: string;
  ImageLink: string;
}

interface CharacterDictionary {
  [key: string]: CharBasicInfo; // ID as key
}

interface LCBasicInfo {
  Name: string;
  ImageLink: string;
}

interface LCDictionary {
  [key: string]: LCBasicInfo;
}

interface IndividualLCStats {
  Path: string;
  Name: string;
  ImageLink: string;
  BaseStats: {
    [key: string]: {
      ATK: number;
      DEF: number;
      HP: number;
    }
  }
}

interface LCJSON {
  [key: string]: IndividualLCStats;
}

type charRelicsKey = 'head' | 'hands' | 'feet' | 'body' | 'orb' | 'rope';

const Simulator = () => {
  const { width, height } = useWindowDimensions(); // window width and height

  const [activeCharacterList, setActiveCharacterList] = useState<CharTemplate[]>([]); // characters which the user has selected
  const [characterDictionary, setCharacterDictionary] = useState<CharacterDictionary>({}); // maps ids to basic info (name and picture)
  const [lcDictionary, setLCDictionary] = useState<LCDictionary>({}) // maps lc ids to name and picture
  const [searchQuery, setSearchQuery] = useState(''); // allows for the user to search for characters
  const [searchFilteredCharacters, setSearchFilteredCharacters] = useState<CharacterDictionary>({}); // results for search query
  const [isSearchModeActive, setIsSearchModeActive] = useState(false); // handle "search mode"

  // loads basic character information
  useEffect(() => {
    // characters
    const charIDs: Array<string> = Object.keys(charStats);
    const typedCharStats: CharStats = charStats as CharStats;
    charIDs.forEach((charID) => {
      setCharacterDictionary(previousCharacterDictionary => ({
        ...previousCharacterDictionary,
        [charID]: {
          'Name': typedCharStats[charID]['Name'],
          'ImageLink': typedCharStats[charID]['ImageLink'] 
        }
      }));
    });
    
    // light cones
    const lcIDs: Array<string> = Object.keys(lcStats);
    const typedLCIDs: LCJSON = lcStats as LCJSON;
    lcIDs.forEach((lcID) => {
      setLCDictionary(previousLCDictionary => ({
        ...previousLCDictionary, 
        [lcID]: {
          'Name': typedLCIDs[lcID]['Name'],
          'ImageLink': typedLCIDs[lcID]['ImageLink']
        }
      }));
    });
  }, []);

  // update filteredCharacters when search query changes
  useEffect(() => {
    // nothing in search bar
    if (searchQuery.trim() === '') {
      setSearchFilteredCharacters({});
    } else { // there is something in the search bar
      const filtered = Object.keys(characterDictionary).reduce((accumulator, currentID) => {
        const character = characterDictionary[currentID];
        if (character.Name.toLowerCase().includes(searchQuery.toLowerCase())) {
          accumulator[currentID] = character;
        }
        return accumulator;
      }, {} as CharacterDictionary)
      setSearchFilteredCharacters(filtered);
    }
  }, [searchQuery]);

  // open and close search mode
  const handleOpenSearchMode = () => {
    setIsSearchModeActive(true);
  }

  const handleCloseSearchMode = () => {
    setIsSearchModeActive(false);
  }

  const searchRef = useRef<HTMLDivElement>(null);

  // add characters to the list
  const handleAddCharacter = (charName: string) => {
    if (activeCharacterList.length < 4) {
      // get the character ID corresponding to charName string
      const getCharIDFromString = (charName: string): string => {
        // look up in char dictionary
        const idKeys = Object.keys(characterDictionary);
        const characterID = idKeys.find((id) => charName === characterDictionary[id].Name);
        return characterID ? characterID : '8001'; // returns Male Physblazer if can't find character
      }

      const charIDs: string[] = activeCharacterList.map((char) => char.characterID);
      const charID: string = getCharIDFromString(charName);
      if (!charIDs.includes(charID)) {
        const newChar = new CharTemplate(charID);
        setActiveCharacterList([...activeCharacterList, newChar]);
        console.log(newChar);
      }
    }
  }

  const handleRemoveCharacter = (char: CharTemplate) => {
    setActiveCharacterList(activeCharacterList.filter((filterChar) => filterChar !== char));
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchQuery('');
        handleCloseSearchMode();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // relics debug
  useEffect(() => {
    activeCharacterList.forEach((char) => {
      console.log(char.getRelicDict());
    })
  }, [activeCharacterList]);

  return (
    <div className='relative'>
      <Navbar />
      <div> { /* selected characters */ }
        <h1 className='text-center text-white text-2xl font-bold mt-5 mb-2'>Active Characters</h1>
        <div className={`grid gap-5 ${width > 1000 ? 'mx-[10vw] grid-cols-4' : 'mx-0 grid-cols-2'}`}>
          {activeCharacterList && activeCharacterList.map((char) => (
            <div 
              key={char.characterID}
              className='bg-off-white rounded-lg flex flex-col items-center relative'
            >
              <div className='absolute bg-red-500 p-1 rounded right-2 top-2 hover:bg-red-600 opacity-75' onClick={() => handleRemoveCharacter(char)}> { /* remove character button */ }
                <svg data-icon="cross" width="16" height="16" viewBox="0 0 16 16" role="img">
                  <path d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z" fillRule="evenodd"></path>
                </svg>
              </div>

              { /* character portion */ }
              <div className='flex flex-row justify-center w-[100%] flex-grow'> 
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
              <div className='bg-slate-700 w-[100%] flex flex-grow'> 
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
              <div className='bg-slate-800 w-[100%] rounded-b-md'> 
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
                      <div key={relicKey}>
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
          ))}
          {activeCharacterList.length < 4 &&
            <div 
              className="bg-slate-600 rounded-md hover:bg-slate-500 flex items-center justify-center min-h-[450px]"
              onClick={handleOpenSearchMode}
            >
              <svg fill="white" data-icon="plus" width="30" height="30" viewBox="0 0 20 20" role="img">
                <path d="M16 9h-5V4c0-.55-.45-1-1-1s-1 .45-1 1v5H4c-.55 0-1 .45-1 1s.45 1 1 1h5v5c0 .55.45 1 1 1s1-.45 1-1v-5h5c.55 0 1-.45 1-1s-.45-1-1-1z" fillRule="evenodd" />    
              </svg>
            </div>
          }
        </div>
      </div>
      {isSearchModeActive &&
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-800 bg-opacity-50'>
          <div className='absolute top-[18vh] w-[100vw]' ref={searchRef}> { /* character selection */ }
            <div className='flex flex-row justify-center'>
              <input 
                type='text'
                placeholder='Search for a character...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='bg-slate-800 text-white w-[35vw] text-2xl p-2'
              />
            </div>
            {Object.keys(searchFilteredCharacters).length > 0 &&
              <div className={`grid bg-slate-600 gap-4 p-4 mt-5 mx-5 ${width > 1000 ? 'grid-cols-10' : 'grid-cols-5'}`}>
                {Object.entries(searchFilteredCharacters).map(([id, character]) => (
                  <div 
                    key={id} 
                    className='bg-midnight-green cursor-pointer'
                    onClick={() => handleAddCharacter(character.Name)}
                  >
                    <div>
                      <img src={character.ImageLink} alt={character.Name} className=''/>
                      <div className='bg-off-white flex flex-row justify-center items-center text-center h-[60px]'>
                        <p className='font-semibold text-sm'>{character.Name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Simulator;