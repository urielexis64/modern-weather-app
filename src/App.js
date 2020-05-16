import React, {useState} from 'react';
import Lottie from 'react-lottie';

import snowfall from './assets/snowfall.json';
import sunny from './assets/sunny.json';
import mist from './assets/mist.json';
import rain from './assets/rain.json';
import clouds from './assets/clouds.json';

const api = {
	key: '2bfeaabdca00f9f2e594409eff15fb98',
	base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});

	const search = (evt) => {
		if (evt.key == 'Enter') {
			fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setQuery('');
				});
		}
	};

	const dateBuilder = (d) => {
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	const snowOptions = {
		animationData: snowfall,
	};
	const sunnyOptions = {
		animationData: sunny,
	};
	const mistOptions = {
		animationData: mist,
	};
	const rainOptions = {
		animationData: rain,
	};
	const cloudsOptions = {
		animationData: clouds,
	};

	let weatherDesc = typeof weather.main != 'undefined' ? weather.weather[0].main : '';

	return (
		<div
			className={
				typeof weather.main != 'undefined'
					? weather.main.temp > 20
						? 'app warm'
						: 'app cold'
					: 'app'
			}
		>
			<main>
				<div className="search-box">
					<input
						type="text"
						className="search-bar"
						placeholder="Search..."
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					/>
				</div>

				{typeof weather.main != 'undefined' ? (
					<div>
						<div className="location-box">
							<div className="location">
								{weather.name}, {weather.sys.country}
							</div>
							<div className="date">{dateBuilder(new Date())}</div>
						</div>
						<div className="weather-box">
							<div className="temp">{Math.round(weather.main.temp)}°C</div>
							<div className="weather">{weather.weather[0].main}</div>
						</div>

						<Lottie
							options={
								weatherDesc === 'Clear'
									? sunnyOptions
									: weatherDesc === 'Snow'
									? snowOptions
									: weatherDesc === 'Mist'
									? mistOptions
									: weatherDesc === 'Clouds'
									? cloudsOptions
									: weatherDesc === 'Rain'
									? rainOptions
									: ''
							}
							style={{visibility: window.innerWidth < 392 ? 'visible' : 'hidden'}}
						/>
					</div>
				) : (
					<h1 className="not-found">City not found</h1>
				)}
			</main>
		</div>
	);
}

export default App;
