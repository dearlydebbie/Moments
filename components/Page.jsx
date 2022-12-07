import React from 'react'
import Navbar from './Navbar'

function Page({ children }) {
  return (
    <div className="mx-6 md:max-w-2xl  md:mx-auto font-inter">
        <Navbar />
        <main>
            {children}
        </main>
    </div>
  )
}

export default Page