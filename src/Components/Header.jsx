import React from 'react'

export default function Header() {
  return (
    <header className="bg-yellow-500 
                       p-4 
                       shadow-md 
                       sticky 
                       top-0 
                       z-20 
                       flex 
                       items-center">
      <h1 className="text-white 
                     font-['McLaren'] 
                     text-3xl 
                     font-light">
        Keeper
      </h1>
    </header>
  )
}