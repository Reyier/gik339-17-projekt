const url = "http://localhost:3001/cars";
const carListContainer = document.getElementById("carList");

window.addEventListener('load', fetchData);
function fetchData(){
  carListContainer.innerHTML = "";
  fetch(url)
  .then((response) => response.json())
  .then((object) => {
    const ul = document.createElement("ul");
    ul.classList.add("carList", "list-group");
    const cars = object.resources;

    cars.forEach((car) =>{
      console.log(car);
      const li = document.createElement('li');
      li.classList.add("list-group-item", 'd-flex', 'justify-content-between', 'align-items-center');
      const id = car.id;
      const data = [car.model, car.year, car.gear, car.fuel, car.color, car.mileage];
      const names = ['Model: ', 'Year: ', 'Gear: ', 'Fuel: ', 'Color: ', 'Milage: '];
      data.forEach((item, index) =>{
        const span = document.createElement('span');
        const html = names[index] + item + ' ';
        span.innerHTML = html;
        li.appendChild(span);
      });

      const btns = `<button class="btn btn-warning">Edit</button><button class="btn btn-danger">Delete</button>`;
      li.insertAdjacentHTML('beforeend', btns);
      li.setAttribute('id', `car_${id}`);
      li.style.backgroundColor = car.color;
      
      ul.appendChild(li); 
    });

   
    carListContainer.appendChild(ul);
  })

  .catch((error) => {
    console.error("Error fetching cars:", error);
  });
}


// // 3 MÖJLIGGÖRA UPPDATERING AV RESURS, buttons
// document.addEventListener("DOMContentLoaded", () => {
//   const editButton = document.getElementById("editButton"); 

//   editButton.addEventListener("click", () => {
   
//     const resourceId = 1; 

   
//     fetch(`http://localhost:3000/resource/${resourceId}`)
//       .then((response) => response.json())
//       .then((resource) => {
    
//         document.getElementById("inputModel").value = resource.model;
//         document.getElementById("inputYear").value = resource.year;
//         document.getElementById("inputGear").value = resource.gear;
//         document.getElementById("inputFuel").value = resource.fuel;
//         document.getElementById("inputColor").value = resource.color;
//         document.getElementById("inputMileage").value = resource.mileage;

       
//         localStorage.setItem("currentResourceId", resourceId);
//       })
//       .catch((error) => {
//         console.error("Error fetching resource:", error);
//       });
//   });
// });



// submit

const form = document.getElementById("carForm");
form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitForm();
});

function submitForm() {

  const model = document.getElementById("inputModel").value;
  const year = document.getElementById("inputYear").value;
  const gear = document.getElementById("inputGear").value;
  const fuel = document.getElementById("inputFuel").value;
  const color = document.getElementById("inputColor").value;
  const mileage = document.getElementById("inputMileage").value;

  fetch('http://localhost:3001/cars',{
    method: "POST",
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({
      model: model,
      year: year,
      gear: gear,
      fuel: fuel,
      color: color,
      mileage: mileage,
    })
  })
  .then(response => response.json())
  .then(data =>{
    if(data.error){
      console.error(error);
    }else{
      console.log("Det funka!");
      console.log(`${data.message} with an id of: ${data.id}`);
      fetchData();
    }
  })
  .catch(error =>{
    console.error(error);
  })

}



function clearFields() {
  document.getElementById("inputModel").value = "";
  document.getElementById("inputYear").value = "";
  document.getElementById("inputGear").value = "";
  document.getElementById("inputFuel").value = "";
  document.getElementById("inputColor").value = "";
  document.getElementById("inputMileage").value = "";
  console.log("Fields cleared!");
}
const clearButton = document.querySelector("#carForm button.btn-danger");
clearButton.addEventListener("click", function(e) {
  console.log('whatsapp');
  e.preventDefault();
  clearFields();
});