$(document).ready(function() {
	var APPID = '26839131696992a3553a44f643a4f407';
	var lat;
	var long;
	var tempShower;
	//functions
	function getLocation() {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(function(position) {
				lat = position.coords.latitude;
				long = position.coords.longitude;
			});
		}
	}

	function reverseGeocoder(lat, lng) {
		var latlng = new google.maps.LatLng(lat, lng);
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({ latLng: latlng }, function(results, status) {
			if (status !== google.maps.GeocoderStatus.OK) {
				alert(status);
			}
			// This is checking to see if the Geoeode Status is OK before proceeding
			if (status == google.maps.GeocoderStatus.OK) {
				$('.location').html(`${results[3].formatted_address}`);
			}
		});
	}

	function getWeather() {
		$.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${APPID}`, function(
			result
		) {
			console.log(result);
			tempShower = result.main.temp;
			farenheit(result.main.temp);
			$('.condition').html(`${result.weather[0].description}`);
			$('.icon').html(
				`<img class="iconImage" src='http://openweathermap.org/img/w/${result.weather[0].icon}.png' />`
			);
		});
	}

	function farenheit(kelvinTemp) {
		let farenheit = Math.floor(kelvinTemp * (9 / 5) - 459.67);
		$('.temp').html(`${farenheit} F `);
	}

	function celcius(kelvinTemp) {
		let celcius = Math.floor(kelvinTemp - 273.15);
		$('.temp').html(`${celcius} C`);
	}
	//jquery events
	//get weather based on location click
	$('.weatherLocation').click(function() {
		Promise.resolve(getLocation()).then(function() {
			setTimeout(function() {
				getWeather();
				$('.show').show();
				$('button').hide();
				reverseGeocoder(lat, long);
			}, 6000);
		});
	});
	//celcius selector
	$('.cel').click(function() {
		celcius(tempShower);
	});
	$('.faren').click(function() {
		farenheit(tempShower);
	});
	//hide display
	$('.show').hide();
});
