

import { React, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import "./borderColor.css"


export default function Practice() {
  const refOne = useRef(null)
  const refTwo = useRef(null)
  const [loading, setLoading] = useState(true);
  const [nextLoading, setNextLoading] = useState(false);
  const [searchData, setSearchData] = useState(null)
  const [filterDat, setFilterDat] = useState(null)
  const [searchEmpty, setSearchEmpty] = useState(true)
  const [outside, setOutside] = useState(null)


  // This detects clicks outside the input
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    };
  }, [])

  // This function sets the click outside state
  const handleClickOutside = (e) => {
    if (refOne.current && refTwo.current) { // Check if refs are not null
      if (!refOne.current.contains(e.target) && !refTwo.current.contains(e.target)) {
        console.log("outside");
        setOutside(true);
      } else {
        console.log("inside");
        setOutside(false);
      }
    }
  }

  const giveState = (filterDat) => {
    if (filterDat !== null) {
      return filterDat[0].url.split("/").slice(-2, -1)[0]
    }
  }
  // This is the fitler function that filters the searchData on input
  function filterData(searchValue) {
    if (searchValue === "") {
      setSearchEmpty(true)
    } else {
      setSearchEmpty(false)
      const filteredData = (searchData.filter(item => item.name.includes(searchValue)));
      setFilterDat(filteredData);
      console.log(filteredData);
    }
  }

  // This generates the list items or suggestions
  const listGenerator = () => {
    if (outside === true) {
      return null
    } else if (outside === false) {
      if (searchEmpty === false) {
        if (filterDat !== null) {
          return filterDat?.map((items, indx) => {
            if (indx <= 10) {
              return <li onClick={(e) => {
                handleListSelect(items.name.charAt(0).toUpperCase() + items.name.slice(1)); filterData(items.name.toLowerCase());
              }} key={indx}>{items.name.charAt(0).toUpperCase() + items.name.slice(1)}</li>
            } else { return null }
          })
        }
      } else {
        return null;
      }
    }
  }
  // This will make selection from the list possible on click
  const handleListSelect = (pokeName) => {
    refOne.current.value = pokeName;
    setOutside(true)
  }

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
    } else if (e === "dragon") {
      return "card bounce child my-3 main-card dragon"
    } else {
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
    } else if (e === "dragon") {
      return "dragont"
    } else {
      return "normalt"
    }

  }
  const marginCollapse = (e) => {
    if (size <= 991) {
      return "container-fluid main-container"
    } else { return "container main-container" }

  }

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

  // Once the serach data is ready it is logged
  useEffect(() => {
    if (searchData !== null)
      // console.log(searchData)
      ;
  }, [searchData])

  // Main use effect
  useEffect(() => { getPokemon(); GetSearchData() }, [])

  const getPokemon = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://pokeapi.co/api/v2/pokemon", requestOptions)
      .then((response) => response.json())
      .then((result) => {

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
        Promise.all(pokemonPromises)
          .then((pokemonData) => {
            const obj = {
              count: result.count,
              next: result.next,
              previous: result.previous,
              results: pokemonData,
            }; setLoading(false)
            setPokemon(obj);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const GetSearchData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302", requestOptions)
      .then((response) => response.json())
      .then((result) => { setSearchData(result.results) })
      .catch((error) => console.error(error));
  }

  // This fetches next 20 on load more 
  const getNext = () => {
    setNextLoading(true);
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
            setNextLoading(false)
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className='container-fluid top'>
      <div className='home'>
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className='row align-items-center rowl'>
            <div className="col-md-6">
              <Link to={"/"} className="navbar-brand ms-3" href="/">
                <img src="/images/game.png" alt="" style={{ height: "50px", width: "50px" }} />
                <span className='mx-3 title-white'>Pokedex</span>
              </Link>
            </div>
            <div className="col-md-6">
              <form className="d-flex align-items-center " role="search">
                <div className='mx-2' style={{ width: "100%", position: "relative" }}><input ref={refOne} style={{ borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px" }} onChange={(e) => filterData(e.target.value.toLowerCase())} className="form-control me-2 align-middle" type="search" placeholder="Search Pokemon" aria-label="Search" />
                  <ul ref={refTwo} className='suggestions'>
                    {listGenerator()}
                  </ul>
                </div>
                <Link to={"/pokemon"} state={{ data: giveState(filterDat) }} className="btn btn-outline-success" type="button">
                  Search
                </Link>
              </form>
            </div>
          </div>
        </nav>
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
            {nextLoading ? <h6><img style={{ height: "100px", width: "150px" }} src="../images/pikachu_loading.gif" alt="" /></h6> : <button onClick={getNext} className='btn btn-primary text-center mb-5'>Load More</button>}
          </div>
        </div>}
      </div>
    </div>
  )
}
