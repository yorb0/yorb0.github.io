
const clock = document.getElementById('clock')
const selectEstado = document.getElementById("estado")
const selectCidade = document.getElementById("cidade")

const urlEstado = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
fetch(urlEstado)
.then(response => response.json())
.then(data=>data.forEach(estado=>{
            const option = document.createElement("option")
            option.textContent = estado.nome
            option.value = estado.id
            selectEstado.appendChild(option)
    })
)

selectEstado.addEventListener("change", () => {
    selectCidade.innerHTML = '<option value="" disabled selected>selecione a cidade</option>'
    const urlCidade = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectEstado.value}/municipios`
    fetch(urlCidade)
    .then(response=>response.json())
    .then(data=>
        data.forEach(cidade=>{
            const option = document.createElement("option")
            option.textContent = cidade.nome
            option.value = cidade.nome
            selectCidade.appendChild(option)
        })
    )
})

selectCidade.addEventListener("change", e=>{
    e.preventDefault()
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=bea496d508a8a3b66dc3b6dacf9e78f8&q=${selectCidade.value}`
    fetch(urlWeather)
    .then(response=>response.json())
    .then(data=>{
            document.querySelectorAll(".info").forEach(div=>div.remove())   
            const info = document.createElement("div")
            info.classList.add('info')
            info.innerHTML += ` 
            <p>tempo: ${data.weather[0].main}</p>
            <p>temperatura: ${Math.round(data.main.temp - 273)}°C</p>
            <p>sensação: ${Math.round(data.main.feels_like-273)}°C</p>`
            const date = new Date(data.dt*1000)
            clock.textContent = `${date.getHours()}:${date.getMinutes()}`
            document.body.appendChild(info) 
            const weather = data.weather[0].description
            const urlPexels = 'https://api.pexels.com/v1/search?query='+weather
            fetch(urlPexels, {
                headers: {
                    Authorization: "IwdmYVmBuWDZsT2qOk7rndL8aa4xc4nw7NuQeo4W8fINFGB82MDbVTn1",
                },
            })
            .then(response => response.json())
            .then(data => {
                document.body.style.backgroundImage = `url(${data.photos[0].src.original})`
        })
    })
})

/*
{
    "coord": {
        "lon": -67.0527,
        "lat": -10.0759
    },
    "weather": [
        {
            "id": 801,
            "main": "Clouds",
            "description": "few clouds",
            "icon": "02d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 315.08,
        "feels_like": 312.9,
        "temp_min": 315.08,
        "temp_max": 315.08,
        "pressure": 1002,
        "humidity": 13,
        "sea_level": 1002,
        "grnd_level": 983
    },
    "visibility": 10000,
    "wind": {
        "speed": 1.91,
        "deg": 352,
        "gust": 2.54
    },
    "clouds": {
        "all": 13
    },
    "dt": 1726777770,
    "sys": {
        "country": "BR",
        "sunrise": 1726741164,
        "sunset": 1726784663
    },
    "timezone": -18000,
    "id": 3924895,
    "name": "Acrelândia",
    "cod": 200
}

*/