import React from 'react'

export default function Navbar() {
  return (
    <div className="navb">
          <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container">
              <a className="navbar-brand" href="/">
                <img src="/images/game.png" alt="" style={{ height: "50px", width: "50px" }} />
                <span className='mx-3 title-white'>Pokedex</span>
              </a>
            </div>
          </nav>
        </div>
  )
}
