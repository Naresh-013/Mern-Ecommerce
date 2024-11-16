import React,{ useState} from 'react'
import {Link} from 'react-router-dom'


const Nav = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className='fixed flex-wrap z-[20] w-full'>
    <ul className='flex px-9 bg-black  sticky-top-0  text-white space-x-8 h-8 items-center'>
        <li>
            <Link to='/'>Home</Link>
        </li>
        <li className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white"
          >
            Products
          </button>
          {dropdownOpen && (
            <ul className="absolute bg-blue-200  text-black mt-2">
            
              <li className="p-2 hover:bg-blue-700">
                <a href="#topTrending">Top Trending</a>
              </li>
              <li className="p-2 hover:bg-blue-700">
                <a href="#recentlyAdded">Recently Added</a>
              </li>
            </ul>
          )}
        </li>
        
        
        <li>
            <Link to='./About'>About</Link>
        </li>
        <li>
            <Link to='./Contact'>Contact</Link>
        </li>
        
        
    </ul>
    </div>
      
    
  )
}

export default Nav
