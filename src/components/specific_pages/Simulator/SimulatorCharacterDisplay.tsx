import { useState, useEffect, useRef } from "react";
import CharTemplate from "../../../general_logic/characters/CharTemplate";
import TraceObject from "./TraceObject";
import type { LCDictionary, CharacterDictionary } from "./Simulator";
import { ITrace } from "../../../general_logic/characters/traces/Traces";

interface ExpectedProps {
  char: CharTemplate;
  lcDictionary: LCDictionary;
  characterDictionary: CharacterDictionary;
  handleRemoveCharacter: (char: CharTemplate) => void;
  handleEditCharacter: (char: CharTemplate) => void;
}

const SimulatorCharacterDisplay: React.FC<ExpectedProps> = ({ 
  char,
  lcDictionary,
  characterDictionary,
  handleRemoveCharacter,
  handleEditCharacter
}) => {
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [currentEditScreen, setCurrentEditScreen] = useState('Traces');
  const editScreenOptions = ['Traces', 'Light Cone', 'Character Stats'];

  const handleEditTrace = (updatedTrace: ITrace) => {
    /**
     * recursively finds new traces to update
     * @param traces the old dict of traces which we're updating
     */
    const recursivelyUpdateTraces = (oldTraces: ITrace[], newTrace: ITrace): ITrace[] => {
      // check top level
      return (oldTraces.map((oldTrace) => {
        if (oldTrace.id === newTrace.id) {
          return newTrace;
        } else if (oldTrace.nextObjects && oldTrace.nextObjects.length > 0) {
          return {
            ...oldTrace, 
            nextObjects: recursivelyUpdateTraces(oldTrace.nextObjects, newTrace)
          };
        } else {
          return oldTrace;
        }
      }));
    }

    const newTraces = recursivelyUpdateTraces(char.traces, updatedTrace);
    char.setTraces(newTraces);
    handleEditCharacter(char);
  }

  // renders diff components based on currentEditScreen
  const renderEditScreen = (): JSX.Element => {
    switch(currentEditScreen) {
      case 'Traces':
        return (
          <>
            <div className='columns-2 mx-4 mb-4'>
              {char.traces.sort((a, b) => (
                parseInt(a.unlockRequirement.charAt(a.unlockRequirement.length-1)) - parseInt(b.unlockRequirement.charAt(b.unlockRequirement.length-1))
              )).map((trace) => (
                <div className='break-inside-avoid mb-4 bg-dark-teal rounded-2xl' key={trace.id}>
                  <TraceObject 
                    trace={trace}
                    handleEditTrace={handleEditTrace}
                  />
                </div>
              ))}
            </div>
          </>
        )
      default:
        return <></>
    }
  }

  const handleChangeEditScreen = (newScreen: string) => {
    setCurrentEditScreen(newScreen);
  }

  const handleRelicDropdownClick = () => {
    setShowEditScreen(!showEditScreen);
  }

  // handling showing and hiding edit screen
  const editDivRef = useRef<HTMLDivElement>(null);
  const handleCloseEditScreen = () => {
    setShowEditScreen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editDivRef.current && !editDivRef.current.contains(event.target as Node)) {
        handleCloseEditScreen();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editDivRef])

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
      <div className={`absolute bg-zinc-300 p-1 rounded right-10 top-2 hover:bg-zinc-400 opacity-75 z-30`} onClick={handleRelicDropdownClick}>
        <svg data-icon="caret-down" width="16" height="16" viewBox="0 0 16 16" role="img" className={`transition-transform ${showEditScreen && 'rotate-180'}`}>
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
      <div className={`bg-slate-700 w-[100%] flex flex-grow z-20 ${!showEditScreen && 'rounded-b-md'}`}> 
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
      
      { /* Show Edit */ }
      {showEditScreen &&
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-800 bg-opacity-50 z-[500] overflow-y-scroll'>
          <div className='absolute top-[10vh] right-[50%] translate-x-[50%] bg-zinc-400 w-[80vw] rounded' ref={editDivRef}>
            <div className=''>
              <div>
                <ul className='flex flex-row'>
                  {editScreenOptions.map((option) => {
                    if (option === currentEditScreen) {
                      return <li 
                        className='px-2 py-3 mx-2 text-midnight-green underline underline-offset-4 hover:cursor-pointer'
                        key={option}
                      >{option}</li>
                    } else {
                      return <li 
                        className='px-2 py-3 mx-2 hover:text-midnight-green hover:underline hover:underline-offset-4 hover:cursor-pointer'
                        key={option}
                        onClick={() => handleChangeEditScreen(option)}
                      >{option}</li>
                    }
                  })}
                </ul>
              </div>
              <div className=''>
                {renderEditScreen()}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default SimulatorCharacterDisplay;