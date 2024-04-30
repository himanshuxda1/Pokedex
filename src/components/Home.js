

import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./borderColor.css"



export default function Practice() {

  const [loading, setLoading] = useState(true);

  // this function sets the border color of the cards based on type
  const typeBorder = (e) => {
    if (e === "grass") {
      return "card bounce child my-3 main-card grass"
    } else if (e === "water") { return "card bounce child my-3 main-card water" } else if (e === "fire") {
      return "card bounce child my-3 main-card fire"
    } else if (e === "bug") {
      return "card bounce child my-3 main-card bug"
    } else if (e === "poison") {
      return "card bounce child my-3 main-card poison"
    } else if (e === "electric") {
      return "card bounce child my-3 main-card electric"
    } else if (e === "ground") {
      return "card bounce child my-3 main-card ground"
    } else if (e === "fairy") {
      return "card bounce child my-3 main-card fairy"
    } else if (e === "fighting") {
      return "card bounce child my-3 main-card fighting"
    } else if (e === "psychic") {
      return "card bounce child my-3 main-card psychic"
    } else if (e === "ghost") {
      return "card bounce child my-3 main-card ghost"
    } else if (e === "rock") {
      return "card bounce child my-3 main-card rock"
    } else if (e === "ice") {
      return "card bounce child my-3 main-card ice"
    } else if (e === "normal") {
      return "card bounce child my-3 main-card normal"
    }

  }
  const typeColor = (e) => {
    if (e === "grass") { return "grasst" }
    else if (e === "water") { return "watert" } else if (e === "fire") {
      return "firet"
    } else if (e === "bug") {
      return "bugt"
    } else if (e === "poison") {
      return "poisont"
    } else if (e === "electric") {
      return "electrict"
    } else if (e === "ground") {
      return "groundt"
    } else if (e === "fairy") {
      return "fairyt"
    } else if (e === "fighting") {
      return "fightingt"
    } else if (e === "psychic") {
      return "psychict"
    } else if (e === "ghost") {
      return "ghostt"
    } else if (e === "rock") {
      return "rockt"
    } else if (e === "ice") {
      return "icet"
    } else if (e === "normal") {
      return "normalt"
    }

  }
  const marginCollapse = (e) => {
    if (size <= 991) {
      return "container-fluid main-container"
    } else { return "container main-container" }

  }
  // const textCheck = (e) => {
  //   if (e === "grass") {
  //     return "black-text d-flex justify-content-center align-items-center"
  //   } else { return "type d-flex justify-content-center align-items-center" }
  // }
  const [size, setSize] = useState(window.innerWidth)
  const [pokemon, setPokemon] = useState([])

  // use effect for detecting window resize
  useEffect(() => {
    const updateWindowDimensions = () => {
      setSize(window.innerWidth)
      console.log("size is " + size);
    }
    window.addEventListener('resize', updateWindowDimensions)
    return () => window.removeEventListener('resize', updateWindowDimensions)
  }, [size])

  // Main use effect
  useEffect(() => { GetPokemon() }, [])

  const GetPokemon = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://pokeapi.co/api/v2/pokemon", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false)
        const pokemonPromises = result.results.map((items) => {
          const number = items.url.split("/").slice(-2, -1)[0];
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;

          return fetch(
            `https://pokeapi.co/api/v2/pokemon/${number}`,
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
              const type = result.types[0].type.name;

              // console.log(type);

              return {
                name: items.name,
                number: number,
                image: imageUrl,
                url: items.url,
                type: type,
              };
            });
        });

        // Wait for all promises to resolve
                // Wait for all promises to resolve
        Promise.all(pokemonPromises)
          .then((pokemonData) => {
            const obj = {
              count: result.count,
              next: result.next,
              previous: result.previous,
              results: pokemonData,
            };
            setPokemon(obj);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };
  const getNext = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(pokemon.next, requestOptions)
      .then((response) => response.json())
      .then((nextDat) => {
        const dataPromises = nextDat.results.map((items) => {
          const number = items.url.split("/").slice(-2, -1)[0];
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;

          return fetch(
            `https://pokeapi.co/api/v2/pokemon/${number}`,
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
              const type = result.types[0].type.name;

              return {
                name: items.name,
                number: number,
                image: imageUrl,
                url: items.url,
                type: type
              };
            });
        });

        Promise.all(dataPromises)
          .then((pokedata) => {
            const newData = {
              count: nextDat.count,
              next: nextDat.next,
              previous: nextDat.previous,
              results: [...pokemon.results, ...pokedata]
            }
            setPokemon(newData)
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
    <div className='container-fluid home'>
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
      {loading ? <div className="d-flex pika">
      <img className='pikachu mx-auto my-auto' src="../images/pikachu_loading.gif" alt="Loading..." />
      </div> : <div className={marginCollapse()} >
<div className="row my-3">
  {pokemon?.results?.map((items, index) => (
    <div className='col-md-3 my-1' key={index}>
      <Link to={"/pokemon"} state={{ data: items.number }} className={typeBorder(items.type)}>
        <div className="card-header d-flex justify-content-center align-items-center cheader">
          <div className="rounded-circle circle my-1" >
            <div className="imgu d-flex justify-content-center align-items-center">
              <img className='img-fluid home-img' src={items.image} alt="" />
            </div>
          </div>
        </div>
        <div className="card-body ">
          <h5 className='title-white'>{items.name.charAt(0).toUpperCase() + items.name.slice(1)}</h5>
          <div className='row'>
            <div className="col-md-6">
              <div className={typeColor(items.type)}>
                <span className="black-text d-flex justify-content-center align-items-center">{items.type.charAt(0).toUpperCase() + items.type.slice(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>)
  )}
</div>
<div className="text-center" style={{ position: "relative" }}>
  <button onClick={getNext} className='btn btn-primary text-center mb-5'>Load More</button>
</div>
</div> }
    </div>
    
    </>
  )
}




















