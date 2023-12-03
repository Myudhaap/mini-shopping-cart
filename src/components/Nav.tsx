import React from 'react'

type PropsType = {
  viewCart: boolean,
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = ({viewCart, setViewCart}: PropsType) => {

  const button = viewCart 
                ? <button className='bg-white py-1 px-4 rounded-sm hover:opacity-75 transition ease-in-out duration-500' onClick={() => setViewCart(false)}>View Products</button>
                : <button className='bg-white py-1 px-4 rounded-sm hover:opacity-75 transition ease-in-out duration-500' onClick={() => setViewCart(true)}>View Cart</button>
  
  const content = (
    <nav className='nav mt-2 text-end'>
      {button}
    </nav>
  )

  return content
}

export default Nav