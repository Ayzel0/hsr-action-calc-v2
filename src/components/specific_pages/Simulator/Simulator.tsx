import Navbar from "../../page_constants/Navbar";
import charStats from '../../../data/hsr_char_stats.json';
import lcStats from '../../../data/hsr_lc_stats.json';
import { useState, useEffect, useRef } from 'react';
import CharTemplate from "../../../general_logic/characters/CharTemplate";
import useWindowDimensions from "../../../utility_functions/useWindowDimensions";
import { PlayableCharacterName } from "../../../general_logic/enums";
import type { GetRelicDictReturn } from "../../../general_logic/characters/CharTemplate";
import type { IBasicRelicInfo } from "../../../general_logic/relics/RelicTemplate";
import SimulatorCharacterDisplay from "./SimulatorCharacterDisplay";

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

  useEffect(() => { // focuses input when search mode appears
    if (isSearchModeActive) {
      searchRefInput.current?.focus();
    }
  }, [isSearchModeActive])

  const handleCloseSearchMode = () => {
    setSearchQuery('');
    setIsSearchModeActive(false);
  }

  const searchRefInput = useRef<HTMLInputElement>(null);
  const searchRefDiv = useRef<HTMLDivElement>(null);

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

      // actually adding the character here
      if (!charIDs.includes(charID)) {
        if (activeCharacterList.length !== 3) {
          searchRefInput.current?.focus();
        } else {
          handleCloseSearchMode();
        }
        setSearchQuery('');
        const newChar = new CharTemplate(charID);
        setActiveCharacterList([...activeCharacterList, newChar]);
      }
    }
  }

  const handleRemoveCharacter = (char: CharTemplate) => {
    setActiveCharacterList(activeCharacterList.filter((filterChar) => filterChar !== char));
  }

  const handleEditCharacter = (char: CharTemplate) => {
    // find the character we're trying to edit
    const newActiveCharacterList = activeCharacterList.map(activeCharacter => {
      if (activeCharacter.characterName === char.characterName) {
        return char;
      } else {
        return activeCharacter
      }
    });
    setActiveCharacterList(newActiveCharacterList);
  }

  // handle closing search menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(searchRefInput.current && !searchRefInput.current.contains(event.target as Node) && !searchRefDiv.current?.contains(event.target as Node)) {
        handleCloseSearchMode();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRefInput, searchRefDiv]);

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
        <div className={`grid gap-5 ${width > 1000 ? 'mx-[2vw] grid-cols-4' : 'mx-0 grid-cols-2'}`}>
          {activeCharacterList && activeCharacterList.map((char) => (
            <SimulatorCharacterDisplay 
              char={char} 
              lcDictionary={lcDictionary} 
              characterDictionary={characterDictionary}
              handleRemoveCharacter={() => handleRemoveCharacter(char)}
              handleEditCharacter={() => handleEditCharacter(char)}
            />
          ))}
          {activeCharacterList.length < 4 &&
            <div 
              className="bg-slate-600 rounded-md hover:bg-slate-500 flex items-center justify-center min-h-[250px]"
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
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-800 bg-opacity-50 z-[500]'>
          <div className='absolute top-[18vh] w-[100vw]'> { /* character selection */ }
            <div className='flex flex-row justify-center'>
              <input 
                ref={searchRefInput}
                type='text'
                placeholder='Search for a character...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='bg-slate-800 text-white w-[35vw] text-2xl p-2'
              />
            </div>
            {Object.keys(searchFilteredCharacters).length > 0 &&
              <div className={`grid bg-slate-600 gap-4 p-4 mt-5 mx-5 ${width > 1000 ? 'grid-cols-10' : 'grid-cols-5'}`} ref={searchRefDiv}>
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
export type { LCBasicInfo, LCDictionary, CharBasicInfo, CharacterDictionary, charRelicsKey }