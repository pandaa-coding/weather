import {useEffect, useState } from "react";
import countryList from '../utils/countries.json';
import { useNavigate } from "react-router-dom";

const HomeView = () => {
    let navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [citySearch, setCitySearch] = useState('');
    const [isLoading, setLoading] = useState(false);

    const [activeCountry, setActiveCountry] = useState()
    const [cities, setCities] = useState([])

    function getFlag(code) {
        return `https://hatscripts.github.io/circle-flags/flags/${code.toLowerCase()}.svg`
    }

    function fetchCities(code) {
        return new Promise(async function (resolve, reject) {
            const filePath =  './utils/cities.json'
            try {
                let res = await fetch(filePath);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const list = await res.json()

                let nList = list.filter((city) => city.country === code);
                resolve(nList);
            } catch (error) {
                console.log(error)
                reject(new Error('something went wrong'));
            }
        })
    }

    async function selectCountry(code) {
        setCitySearch('');
        setLoading(true);
        let cityList = [];
        if (!activeCountry || activeCountry !== code) {
            setActiveCountry(code);
            cityList = await fetchCities(code) ?? [];
        } else {
            setActiveCountry(null)
        }

        setCities(cityList)
        setLoading(false);
    }

    function showWeather(city){
        navigate(`/search/${city.name}`)
    }

    return (<>
        <div className="container">
            <div className="row mt-3">
                <div className="col-12">
                    <div className="card border-0 shadow mb-3 p-2 ">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="input-group">
                               {!activeCountry ? <input
                                    type="search" className="form-control border-0 shadow-none" placeholder="Find Country"
                                    value={search} onChange={(e) => setSearch(e.target.value)} /> 
                                : <input
                                    type="search" className="form-control border-0 shadow-none" placeholder="Find City"
                                    value={citySearch} onChange={(e) => setCitySearch(e.target.value)} />}

                                <div className="input-group-text border-0 bg-white py-0 pointer" onClick={()=> selectCountry(activeCountry)}>
                                    {activeCountry && <div className="img-container-2" style={{ backgroundImage: `url(${getFlag(activeCountry)})` }}></div>}
                                </div>
                            </div>


                            <div className="fs-4 d-none d-lg-flex align-items-center d-l">
                                <input value={'⛅ Weather App'} type="text" className="form-control border-0 shadow-none fs-5" disabled />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Countries */}
                <div className="col-12 col-lg-4 ">
                    <div className={`card border-0 shadow of-none mb-3 ${activeCountry && 'd-none d-lg-block'}`}>
                        <div className="list-group list-group-flush rounded-0 h-80 of-auto">
                            {countryList
                            .filter((country)=> country.name.toLowerCase().includes(search.toLowerCase()))
                            .map((country, ind) =>
                                <li 
                                    onClick={(e) => selectCountry(country.code)} key={ind}
                                    className={`list-group-item list-group-item-action ${activeCountry === country.code && 'active'}`}>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className="d-flex align-items-center">
                                                <div className="img-container me-2" style={{ backgroundImage: `url(${getFlag(country.code)})` }}></div>
                                                <div>{country.name}</div>
                                            </div>

                                            <div className="d-flex">
                                                {(activeCountry === country.code && !isLoading) && <span>{cities.length}</span>}
                                            </div>
                                        </div>
                                </li>)}
                        </div>
                    </div>
                </div>

                {/* Cities */}
                <div className="col-12 col-lg-8">
                    <div className={`card h-80 border-0 shadow ${!activeCountry && 'd-none d-lg-block'}`}>
                        {isLoading && <div className="d-flex justify-content-center align-items-center h-100">
                           <div className="spinner-container">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>}

                        {!isLoading && <div className="list-group list-group-flush h-80 of-auto">
                            {cities
                            .filter((city)=> city.name.toLowerCase().includes(citySearch.toLowerCase()))
                            .map((city, ind) =>
                                <li key={ind} className={`list-group-item list-group-item-action`} onClick={()=> showWeather(city)}>

                                    <div className='d-flex justify-content-between align-items-center' >
                                        <div>{city.name}</div>

                                        <div className="d-flex">
                                            <div className="badge text-bg-primary mx-1">{city.country}</div>
                                        </div>
                                    </div>
                                </li>)}
                        </div>}
                    </div>
                </div>

            </div>
        </div>
    </>);
}

export default HomeView;