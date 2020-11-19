
window.addEventListener('load', () => {
    let lat
    let lng
    let location = document.querySelector('.location-timezone')
    let temperatureDegree = document.querySelector('.temperature-degree') 

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            lat = position.coords.latitude
            lng = position.coords.longitude

            const proxy = 'https://cors-anywhere.herokuapp.com/'

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=27190360986b27dd836b0500cabfd2cc`


            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                const city = data.name 
                const country = data.sys.country
                const temperatureCelcius = Math.round(data.main.temp - 273.15)

                console.log(city,temperatureCelcius)
                location.textContent = city + " - " + country
                temperatureDegree.textContent = String(temperatureCelcius) + "°C" 
            }) 

        

        })
    } 
    
})