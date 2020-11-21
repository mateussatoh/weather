
window.addEventListener('load', () => {
    let lat
    let lng
    let location = document.querySelector('.location-timezone')
    let temperatureDegree = document.querySelector('.temperature-degree') 
    let footerDescription = document.querySelector('.description')
    let weatherIcon = document.querySelector('.weather-icon')
  
    let body = document.getElementById('body')
  

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            lat = position.coords.latitude
            lng = position.coords.longitude

            const proxy = 'https://cors-anywhere.herokuapp.com/'

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=27190360986b27dd836b0500cabfd2cc&lang=pt_br&units=metric`


            fetch(api)
            .then(response => {
               
                return response.json()
                
            })
            .then(data => {
                console.log(data)
                const city = data.name 
                const country = data.sys.country
                const temperatureCelcius = Math.round(data.main.temp)
                const description = data.weather[0].description
                const icon = data.weather[0].icon
                const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
                
                

                location.textContent = city + " - " + country
                temperatureDegree.textContent = String(temperatureCelcius) + "°C" 
                footerDescription.textContent = description
                weatherIcon.src = iconURL
                
                body.style.backgroundImage = `url('./assets/img/${icon}.gif')`;
                console.log(body.style.backgroundImage)
                

            }) 

        

        })
    } 
    
})