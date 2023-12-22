import "./style.css"
import "./global.css"


console.log("Hello World")

const container = document.querySelector("#content")

const main = document.createElement("main")
main.innerHTML = "<h1>This is the meteo for the city<h1>"

const city = document.createElement("div")
city.innerHTML = "<p>This city has 24 degrees</p>"


main.appendChild(city)
container.appendChild(main)