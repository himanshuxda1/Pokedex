
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Pokemon() {

    const typeColor = (e) => {
        if (e === "grass") { 
            return "grasst" 
        }else if (e === "water")  { 
            return "watert" 
        } else if (e === "fire") {
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
        } else if(e === "flying"){
            return "flyingt"
        }

    }

    const getSpecies = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${url}`, requestOptions)
            .then((response) => response.json())
            .then((result) => { console.log(result); const bablu = result.flavor_text_entries.filter(checkEngl => { return checkEngl.language.name === "en" }); setDesc(bablu); console.log(bablu); })
            .catch((error) => console.error(error));

    }

    // This capitalizes values with a "-" and add responsive text
    const statCapital = (e) => {
        if (size >= 1200) {
            let [a, b] = e.split("-");
            a = a.slice(0, 2).toUpperCase();
            b = b.charAt(0).toUpperCase() + b.slice(1, 3);
            let c = (a + "-" + b)
            return c;
        } else {
            let [a, b] = e.split("-");
            a = a.charAt(0).toUpperCase();
            b = b.charAt(0).toUpperCase() + b.slice(1, 3);
            let c = (a + "-" + b)
            return c;
        }
    }

    // This capitalizes text without "-" and add respnsive text
    const statCapital2 = (e, key) => {
        if (size >= 999) {
            return e.charAt(0).toUpperCase() + e.slice(1);
        } else if (key !== 5) {
            return e.charAt(0).toUpperCase() + e.slice(1, 3)
        } else {
            return e.charAt(0).toUpperCase() + e.slice(1, 2) + "d"
        }
    }

    // This program calculates how much progress bar to show 
    const loadMaker = (e) => {
        if (e !== null) {
            let number = e / 2;
            return (number + "%")
        } else {
            return null;
        }
    }
    const [desc, setDesc] = useState([])
    const location = useLocation();
    const url = location?.state?.data;
    const [pokemane, setPokemane] = useState([])
    const [size, setSize] = useState(window.innerWidth)

    // use effect for detecting window resize
    useEffect(() => {
        const updateWindowDimensions = () => {
            setSize(window.innerWidth)
            console.log("size is " + size);
        }
        window.addEventListener('resize', updateWindowDimensions)
        return () => window.removeEventListener('resize', updateWindowDimensions)
    }, [])


    // main use effect
    useEffect(() => { ShowPokemon(); getSpecies() }, [url])

    const ShowPokemon = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`https://pokeapi.co/api/v2/pokemon/${url}`, requestOptions)
            .then((response) => response.json())
            .then((result) => { setPokemane(result) })
            .catch((error) => console.error(error));
    }
    return (
        <div className="mainbox">
            <div className='container'>
                <div className="my-5 text-center">
                    <div className="title">
                        {pokemane.name ? <h1 className='title-text'>{pokemane?.name?.charAt(0).toUpperCase() + pokemane?.name?.slice(1)}<span className='numberstyle'> #000{url}</span></h1> : null}
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {/*  This col includes image and stat */}
                    <div className="col-md-6">
                        <div className="main-img mb-3" >
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${url}.png`} alt="" className="img-fluid imagepok d-block mx-auto" />
                        </div>
                        <div className=" statcol d-flex justify-content-center align-items-center" >
                            <div className="row rofix">
                                {pokemane?.stats?.map((stat, index) => (
                                    <div style={{ position: "relative" }} className="col-md-2 m3" key={index}>
                                        <span style={{ position: "absolute", zIndex: "2", top: "-38px" }}>{index === 0 ? "Stats" : null}</span>
                                        <div className="vertical-stat d-flex justify-content-center"><span className="stat-name">{stat.stat.name.length < 3 ? stat.stat.name.toUpperCase() : stat.stat.name.includes("-") ?
                                            statCapital(stat.stat.name) : statCapital2(stat.stat.name, index)}</span>
                                            <div className={stat.stat.name.includes("-") ? "spl-load" : "load"} style={{ height: loadMaker(stat.base_stat) }} >
                                            </div>
                                        </div>
                                    </div>))}
                            </div>
                        </div>
                    </div>
                    {/* This col contains description/details and type-weakness */}
                    <div className="col-md-6 ">
                        <div className="description my-2 text-white">
                            {/* <h5 >{desc?.flavor_text_entries?.map((item, index) => {
                                if(url!=19){ if(index<=1) {return <span key={index}>{item.flavor_text}</span>}}else{if(index==1){return<span>{item.flavor_text}</span>}}})}</h5> */}
                            <h5 style={{ height: "100%" }} className='description my-2'> {desc[0]?.flavor_text} </h5>
                        </div>

                        <div className="char my-3" >
                            <div className="row">
                                <div className="col-md-6 d2">
                                    <span className='d-block text-white  mx-3 my-2'><h5>Height</h5></span> <span className='d-block text-black mx-3'><h4>{pokemane?.height * 10} cm</h4></span>
                                </div>
                                <div className="col-md-6 d2">
                                    <span className='d-block text-white  mx-3 my-2'><h5>Weight</h5></span> <span className='d-block text-black mx-3'><h4>{pokemane?.weight * 0.1.toPrecision(2)} kg </h4></span>
                                </div>
                                <div className="col-md-6 d2 ">
                                    <span className='d-block text-white mx-3 my-2'><h5>Abilities</h5></span> <span className='d-block text-black mx-3'><h4>{pokemane?.abilities && pokemane?.abilities?.length > 0 ? pokemane.abilities[0].ability.name.charAt(0).toUpperCase() + pokemane.abilities[0].ability.name?.slice(1) : null} </h4></span>
                                </div>
                                {/* <div className="col-md-6 d2">
                                    <span className='d-block text-white mx-3 my-2'><h5>Gender</h5></span> <span className='d-block text-black mx-3'><h4>{pokemane?.height * 10} cm</h4></span>
                                </div> */}

                            </div>
                        </div>
                        <h4 className='mb-4 text-white'>Types</h4>
                        <div className="row">
                            {pokemane?.types && pokemane.types.length > 0 ?
                                <div className="col-md-4 r3">
                                    <div className={`box d-flex justify-content-center align-items-center ${typeColor(pokemane.types[0].type.name)}`}>
                                        <span className='text-white'>{pokemane.types[0].type.name.charAt(0).toUpperCase() + pokemane.types[0].type.name?.slice(1)}</span>
                                    </div>
                                </div> : null}

                            {pokemane?.types && pokemane.types.length > 1 ?
                                <div className="col-md-4 r3">
                                    <div className={`box d-flex justify-content-center align-items-center ${typeColor(pokemane.types[1].type.name)}`}>
                                        <span className='text-white'>{pokemane.types[1].type.name.charAt(0).toUpperCase() + pokemane.types[1].type.name?.slice(1)}</span>
                                    </div>
                                </div> : null}

                        </div>

                        {/* <div className="row">
                            <span className='my-3'><h4>Weakness</h4></span>
                            <div className="col-md-4 r3">
                                <div className="box d-flex justify-content-center align-items-center">
                                    <span className='text-white'>Water</span>
                                </div>
                            </div>
                            <div className="col-md-4 r3">
                                <div className="box d-flex justify-content-center align-items-center">
                                    <span className='text-white'>Ground</span>
                                </div>
                            </div>
                            <div className="col-md-4 r3">
                                <div className="box d-flex justify-content-center align-items-center">
                                    <span className='text-white'>Rock</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div >
    )
}
