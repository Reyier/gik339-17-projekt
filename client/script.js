
const url = "http://localhost:3000/cars";
const carListContainer = document.getElementById("carList");

fetch(url)
  .then((response) => response.json())
  .then((cars) => {
    const ul = document.createElement("ul");
    ul.classList.add("carList");

    cars.forEach((car) => {
      const li = document.createElement("li");
      li.style.backgroundColor = car.inputColor;
      const model = car.model;
      const year = car.year;
      const gear = car.gear;
      const fuel = car.fuel;
      const color = car.color;
      const mileage = car.mileage;

      const html = `<li>Name: ${model} ${year} ${gear} ${fuel} ${color} ${mileage}</li>`;

      ul.insertAdjacentElement("beforeend", li);
      li.insertAdjacentHTML("beforeend", html);
    });
    carListContainer.appendChild(ul);
  })

  .catch((error) => {
    console.error("Error fetching cars:", error);
  });

// 3 MÖJLIGGÖRA UPPDATERING AV RESURS
document.addEventListener("DOMContentLoaded", () => {
  const editButton = document.getElementById("editButton"); 

  editButton.addEventListener("click", () => {
   
    const resourceId = 1; 

   
    fetch(`http://localhost:3000/resource/${resourceId}`)
      .then((response) => response.json())
      .then((resource) => {
    
        document.getElementById("inputModel").value = resource.model;
        document.getElementById("inputYear").value = resource.year;
        document.getElementById("inputGear").value = resource.gear;
        document.getElementById("inputFuel").value = resource.fuel;
        document.getElementById("inputColor").value = resource.color;
        document.getElementById("inputMileage").value = resource.mileage;

       
        localStorage.setItem("currentResourceId", resourceId);
      })
      .catch((error) => {
        console.error("Error fetching resource:", error);
      });
  });
});



const form = document.getElementById("carForm");
form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitForm();
});

function submitForm() {
  const formData = new FormData();

  formData.append('additionalData', 'additionalValue');

  const model = document.getElementById("inputModel").value;
  const year = document.getElementById("inputYear").value;
  const gear = document.getElementById("inputGear").value;
  const fuel = document.getElementById("inputFuel").value;
  const color = document.getElementById("inputColor").value;
  const mileage = document.getElementById("inputMileage").value;

  formData.append('model', model);
  formData.append('year', year);
  formData.append('gear', gear);
  formData.append('fuel', fuel);
  formData.append('color', color);
  formData.append('mileage', mileage);

  console.log("Form submitted!");

  submitFormData(formData);
}

function submitFormData(formData) {
    fetch("http://localhost:3000/cars", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data sent successfully:", data);
      })
      .catch((error) => {
        console.error("There was an error sending the data:", error);
      });
  }

const clearButton = document.querySelector("#carForm button.btn-danger");
clearButton.addEventListener("click", function(e) {
  e.preventDefault();
  clearFields();
});

function clearFields() {
  document.getElementById("inputModel").value = "";
  document.getElementById("inputYear").value = "";
  document.getElementById("inputGear").value = "";
  document.getElementById("inputFuel").value = "";
  document.getElementById("inputColor").value = "";
  document.getElementById("inputMileage").value = "";
  console.log("Fields cleared!");
}
