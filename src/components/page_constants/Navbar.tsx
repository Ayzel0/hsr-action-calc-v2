import useWindowDimensions from "../../utility_functions/useWindowDimensions";
import HamburgerMenu from '/src/svgs/menu-burger-horizontal-svgrepo-com.svg';

import { useState } from "react";

const Navbar = () => {
  const { width, height } = useWindowDimensions(); // window width and height
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  return (
    <>
      {width > 1000 ?
        /* full screen display */
        <div className='bg-off-white'>
          <div className='flex flex-row text-lg font-semibold'>
            <div className='p-4 hover:bg-slate-200 mr-1'>
              <p className=''>Star Rail Simulator</p>
            </div>
            {/* divider goes here */}
            <div className='flex flex-col justify-center'>
              <div className='bg-gray-400 w-[1px] h-[30px]'></div>
            </div>
            <div className='ml-1'>
              <ul className='flex flex-row'>
                <li className='p-4 hover:bg-slate-200'>Teams Database</li>
                <a href='/sim'><li className='p-4 hover:bg-slate-200'>Simulator</li></a>
                <li className='p-4 hover:bg-slate-200'>Usage Guide</li>
                <li className='p-4 hover:bg-slate-200'>Changelog</li>
                <li className='p-4 hover:bg-slate-200'>Discord</li>
              </ul>
            </div>
          </div>
        </div>
        :
        /* mobile display */
        <div>
          <div className='bg-off-white z-50 relative'>
            <div className='flex flex-row text-lg font-semibold justify-between'>
              <div className='p-4 hover:bg-slate-200 mr-1'>
                <p className=''>Star Rail Simulator</p>
              </div>
              <div className='flex justify-center items-center'>
                <button 
                  className='box-border border-2 border-off-white hover:border-slate-400 rounded mr-4 w-8'
                  onClick={handleShowDropdown}
                >
                  <img 
                    src={HamburgerMenu} 
                  />
                </button>
              </div>
            </div>
          </div>
          <div className='relative'>
            <div className={`absolute top-full transition ease-in-out duration-300 ${showDropdown ? 'translate-y-0' : '-translate-y-full'}`}>
              <div className='bg-offer-white w-[100vw]'>
                <ul className='font-semibold'>
                  <li className='p-4 hover:bg-slate-200'>Teams Database</li>
                  <a href='/sim'><li className='p-4 hover:bg-slate-200'>Simulator</li></a>
                  <li className='p-4 hover:bg-slate-200'>Usage Guide</li>
                  <li className='p-4 hover:bg-slate-200'>Changelog</li>
                  <li className='p-4 hover:bg-slate-200'>Discord</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Navbar;