import React from 'react'

export default function Footer() {

    const year = new Date().getFullYear();
  return (
    <div>
       <footer>
      <p>Copyright &copy; {year}</p>
    </footer>
    </div>
  )
}
