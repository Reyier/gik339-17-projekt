/*const url = "http://localhost:3000/users";

fetch(url)
    .then((response) => response.json())
    .then((users) => {
        const ul = document.createElement("ul");
        ul.classList.add("userList");
        const div = document.querySelector(".container");
        div.insertAdjacentElement("beforeend", ul);

        users.forEach(user => {
            const li = document.createElement("li");
            li.style.backgroundColor = user.color;
            const firstName = user.firstName;
            const lastName = user.lastName;
            const userName = user.username;
            const br = `<br/>`;
            const html = `<li>Name: ${firstName} ${lastName} ${br}Username: ${userName}</>`;
            ul.insertAdjacentElement('beforeend',li);
            li.insertAdjacentHTML('beforeend', html);
        })
        
    });

var checkboxElement = document.getElementById("divStyle")

var textElements = document.getElementsByClassName("textfield")

var buttonElement = document.getElementsByTagName("button") [0]

var outputElement = document.getElementsByClassName("output") [0]

checkboxElement.addEventListener("change", () => {
    outputElement.style.backgroundColor = textElements [0].value
})

buttonElement.addEventListener("click", () => {
    outputElement.remove()
}
)

function onInput (event) {
    console.log("Input target", event.target)

    const targetName = event.target.name
    if(targetName === "content"){
        outputElement.innerHTML = textElements[1].value
    }
} */


 const url = "http://localhost:3000/cars";
 const carListContainer = document.getElementById('carList');

fetch(url)
    .then((response) => response.json())
    .then((cars) => {
        const ul = document.createElement("ul");
        ul.classList.add("carList");

        
        cars.forEach(car => {
            const li = document.createElement("li");
            li.style.backgroundColor = car.inputColor;
            const model = car.model;
            const year = car.year;
            const gear = car.gear;
            const fuel = car.fuel;
            const color = car.color;
            const mileage = car.mileage;
            
            const html = `<li>Name: ${model} ${year} ${gear} ${fuel} ${color} ${mileage}</li>`;
            
            ul.insertAdjacentElement('beforeend',li);
            li.insertAdjacentHTML('beforeend', html);
        })
        carListContainer.appendChild(ul);
    })

    .catch((error) => {
        console.error('Error fetching cars:', error);
      });



      // Att göra 2. VISA ALLA (R I CRUD)