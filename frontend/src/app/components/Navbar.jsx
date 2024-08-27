import React from 'react'
import Image from 'next/image'
const Navbar = () => {
  return (
    <nav className='w-full px-16 py-6'>
      <Image src='/logo.png' alt='logo' width={114} height={41} />
    </nav>
  )
}

export default Navbar
