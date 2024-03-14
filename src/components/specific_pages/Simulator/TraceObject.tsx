import { ITrace } from "../../../general_logic/stat_logic";

interface ExpectedProps {
  trace: ITrace,
  handleEditTrace: (trace: ITrace) => void,
}

const TraceObject: React.FC<ExpectedProps> = ({ trace, handleEditTrace }) => {
  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // unchecks and propagates changes to nextObjects
    const disableTrace = (updatedTrace: ITrace) => {
      if (updatedTrace.nextObjects && updatedTrace.nextObjects.length > 0) {
        const newNextObjects = updatedTrace.nextObjects.map(disableTrace);
        const newTrace: ITrace = {
          ...updatedTrace, 
          unlocked: false,
          nextObjects: newNextObjects
        };
        return newTrace;
      } else {
        const newTrace: ITrace = {
          ...updatedTrace, 
          unlocked: false,
        };
        return newTrace;
      }
    }

    // checks the trace
    const enableTrace = (updatedTrace: ITrace) => {
      const newTrace = {...updatedTrace, unlocked: true};
      return newTrace
    }

    const newTrace = (e.target.checked ? enableTrace(trace) : disableTrace(trace));
    handleEditTrace(newTrace);
  }

  const ascensionRequirement = 'A' + trace.unlockRequirement.charAt(trace.unlockRequirement.length-1);
  return (
    <div className='relative'>
      <div className='flex flex-row justify-center'>
        <div className='rounded-md flex flex-row justify-center items-center'>
          {trace.traceLevel === 'major' ?
            <div className={`relative mx-[20%] my-2 ${!trace.unlocked && 'opacity-25'}`}>
              <input 
                className='absolute -left-[25px] top-[50%] -translate-y-[50%]'
                type='checkbox'
                checked={trace.unlocked}
                onChange={handleCheckChange}
              />
              <h3 className='font-semibold text-sm'>{trace.effect}</h3>
              <h4 className='text-midnight-green font-bold'>{ascensionRequirement}</h4>
            </div>
            :
            <div className={`relative my-2 ${!trace.unlocked && 'opacity-25'}`}>
              <input 
                className='absolute -left-[25px] top-[50%] -translate-y-[50%]'
                type='checkbox'
                checked={trace.unlocked}
                onChange={handleCheckChange}
              />
              <h3 className='text-center font-semibold'>{trace.scalingStat} <span className='text-midnight-green font-bold'>{trace.scalingValue}%</span></h3>
              <h4 className='text-midnight-green font-bold'>{ascensionRequirement}</h4>
            </div>
          }
        </div>
      </div>
      {(trace.nextObjects && trace.nextObjects.length > 0) && (
        <div className='flex flex-col items-center'>
          {(trace.nextObjects && trace.nextObjects.length > 1) && 
            <>
              <div className='bg-white h-5 w-1' />
              <div className='bg-white h-1 w-[199px]' />
            </>
          }
          <ul className='flex flex-row justify-center'>
            {trace.nextObjects.map((nextTrace) => 
              <div className='flex flex-col items-center w-[195px]'>
                <div className='w-1 bg-white h-5' />
                <li>
                  <TraceObject 
                    trace={nextTrace}
                    handleEditTrace={handleEditTrace}
                  />
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TraceObject;