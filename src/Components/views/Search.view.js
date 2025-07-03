import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_KEY = '5f0ff0b1427445c89cf175259252906';


const SearchView = () => {

	const text = useParams()['text'];
	let navigate = useNavigate()

	/** @type {[WeatherObject]} */
	const [weather, setWeather] = useState()
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		initData();

		// eslint-disable-next-line
	}, [])

	function initData() {
		setLoading(true);

		setTimeout(async ()=>{
			let data = await getWeather();
			setWeather(data);
			setLoading(false)
		}, 1000)
	}

	async function getWeather() {
		try {
			const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${text}`;
			const res = await axios.get(url);
			return res.data;
		} catch (error) {
			alert('City not found!');
			navigate('/')
			return null
		}
	}

	return (<>
		<div className="container mt-4">
			<div className="row">

				{isLoading && <div className="col-12">
					<div className="d-flex justify-content-center align-items-center h-80">
						<div className="spinner-container">
							<div className="spinner-border text-primary" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					</div>
				</div>}


				{(!isLoading && weather) && <div className="row m-0">


					{/* Status */}
					<div className="col-12">
						<div className="card border-0 shadow mb-3 text-bg-light">
							<div className="card-body">

								<div className="d-flex justify-content-between align-items-center">
									<button onClick={()=> navigate('/')}  className="btn border-0 text-secondary fs-3">
										<i className="fa-solid fa-home"></i>
									</button>

									<div className="fs-2">
										{weather.current.is_day ? <span>😎 Day</span> : <span>🌚 Night</span>}
									</div>
									
								</div>


								{/* City Name */}
								<div className="fs-5 text-center">
									<div><span className="mx-1">{weather.location.name}</span></div>
								</div>

								{/* Tempreture */}
								<div className="fs-large text-center text-primary mb-4">{weather.current.temp_c}C</div>

								{/* Condition */}
								<div className="text-center mb-4">
									<img width={50} src={weather.current.condition.icon} alt="" />
									<div>{weather.current.condition.text}</div>
								</div>

								{/* Highest and lowest temp */}
								<div className="text-center mb-3">
									<code className="mx-1 text-danger">H: {weather.current.heatindex_c}°</code>
									<code className="mx-1 text-black">/</code>
									<code className="mx-1 text-primary">L: {weather.current.dewpoint_c}°</code>
								</div>

							</div>
						</div>
					</div>

					<div className="col-12 col">

						<div className="card border-0 shadow of-none mb-3">
							<ul className="list-group list-group-flush rounded-0">

								{/* Humidity */}
								<li className="list-group-item">
									<div className="d-flex justify-content-between">
										<span>
											<span>🌫️</span>
											<span className="ms-2">Humidity</span>
										</span>
										<span>{weather.current.humidity} %</span>
									</div>
								</li>

								{/* Wind */}
								<li className="list-group-item">
									<div className="d-flex justify-content-between">
										<span>
											<span>💨</span>
											<span className="ms-2">Wind</span>
										</span>
										<span>{weather.current.wind_kph} kph</span>
									</div>
								</li>

								{/* Last Update */}
								<li className="list-group-item">
									<div className="d-flex justify-content-between">
										<span>
											<span>📅</span>
											<span className="ms-2">Last Update</span>
										</span>
										<span>{weather.current.last_updated}</span>
									</div>
								</li>

								{/* Last Update */}
								<li className="list-group-item">
									<div className="d-flex justify-content-between">
										<span>
											<span>🌏</span>
											<span className="ms-2">Country</span>
										</span>
										<span>{weather.location.country}</span>
									</div>
								</li>

								{/* Last Update */}
								<li className="list-group-item">
									<div className="d-flex justify-content-between">
										<span>
											<span>🕒</span>
											<span className="ms-2">Region</span>
										</span>
										<span>{weather.location.region}</span>
									</div>
								</li>
							</ul>
						</div>
					</div>

				</div>}

			</div>
		</div>
	</>);
}

export default SearchView;

// eslint-disable-next-line
const WeatherObject = {
	"location": {
		"name": "Berat",
		"region": "Berat",
		"country": "Albania",
		"lat": 40.7058,
		"lon": 19.9522,
		"tz_id": "Europe/Tirane",
		"localtime_epoch": 1751237966,
		"localtime": "2025-06-30 00:59"
	},
	"current": {
		"last_updated_epoch": 1751237100,
		"last_updated": "2025-06-30 00:45",
		"temp_c": 21.3,
		"temp_f": 70.3,
		"is_day": 0,
		"condition": {
			"text": "Clear",
			"icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
			"code": 1000
		},
		"wind_mph": 6.3,
		"wind_kph": 10.1,
		"wind_degree": 111,
		"wind_dir": "ESE",
		"pressure_mb": 1015,
		"pressure_in": 29.96,
		"precip_mm": 0,
		"precip_in": 0,
		"humidity": 43,
		"cloud": 0,
		"feelslike_c": 21.3,
		"feelslike_f": 70.3,
		"windchill_c": 21.3,
		"windchill_f": 70.3,
		"heatindex_c": 24,
		"heatindex_f": 75.3,
		"dewpoint_c": 8.3,
		"dewpoint_f": 46.9,
		"vis_km": 10,
		"vis_miles": 6,
		"uv": 0,
		"gust_mph": 13.2,
		"gust_kph": 21.2
	}
}