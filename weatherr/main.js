
const date = new Date()
let diaNoite = 'dia'
if(date.getHours() >= 18 || date.getHours() <= 6){
    diaNoite = 'noite'
}

const clock = document.getElementById('clock')
const selectEstado = document.getElementById("estado")
const selectCidade = document.getElementById("cidade")
const form = document.getElementById("form")

clock.textContent = `${date.getHours()}:${date.getMinutes()} ${diaNoite}`

const urlEstado = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
fetch(urlEstado)
.then((response) => response.json())
.then((data) =>
        data.forEach(estado=>{
            const option = document.createElement("option")
            option.textContent = estado.nome + ' ' + estado.id
            option.value = estado.id
            selectEstado.appendChild(option)
        })
    )

selectEstado.addEventListener("change", () => {
    selectCidade.innerHTML = '<option value="" disabled selected>selecione a cidade</option>'
    const urlCidade = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectEstado.value}/municipios`
    fetch(urlCidade)
        .then((response) => response.json())
        .then((data) =>
            data.forEach((cidade) => {
                const option = document.createElement("option")
                option.textContent = cidade.nome
                option.value = cidade.nome
                selectCidade.appendChild(option)
            })
        )
})

form.addEventListener("submit", e=> {
    e.preventDefault()
        // limpar as divs de info
        form.querySelectorAll(".info").forEach(div=>div.remove())   
        
        let weatherDescription = null
        
        const urlWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${selectCidade.value}&appid=bea496d508a8a3b66dc3b6dacf9e78f8`
        fetch(urlWeather)
        .then((response) => response.json())
        .then((data) => {
            const info = document.createElement("div")
            info.classList.add('info')
            try{
                info.innerHTML += `
                <img src='https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png'>
                <p>tempo: ${data.list[0].weather[0].description}</p>
                <p>temperatura: ${Math.round(data.list[0].main.temp - 273)}°C</p>
                <p>sensação térmica: ${Math.round(data.list[0].main.feels_like-273)}°C</p>
                <p>pressão: ${Math.round(data.list[0].main.pressure)}hPa</p>
                 `
            }
            catch{
                info.innerHTML += '<p>cidade não encontrada</p>'
                form.appendChild(info)
                return null
            }
            form.appendChild(info)
            weatherDescription = data.list[0].weather[0].description
            const urlPexels = 'https://api.pexels.com/v1/search?query='+weatherDescription
            fetch(urlPexels, {
                headers: {
                    Authorization: "IwdmYVmBuWDZsT2qOk7rndL8aa4xc4nw7NuQeo4W8fINFGB82MDbVTn1",
                },
            })
            .then((response) => response.json())
            .then((data) => {
                document.body.style.backgroundImage = `url(${data.photos[0].src.original})`
            })
        })
    })
