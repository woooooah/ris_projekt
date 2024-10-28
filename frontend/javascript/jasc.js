
function prikaziDatum(){
    const datum = new Date(); // nov objekt (trenutni datum)
    let dan = datum.toLocaleDateString("en-EN", {weekday: "long"}); // ime dneva v slovenščini
    let stevilo = datum.getDate();
    let mesec = datum.toLocaleDateString("en-EN", {month: "long"});

    let prikaz = dan + ", " + stevilo + ". " + mesec;
    const elementDatum = document.getElementById("datum");
    elementDatum.textContent = prikaz;

    elementDatum.style.fontWeight = "bold";
}
/*
document.addEventListener("DOMContentLoaded", function() {
    const recipeForm = document.getElementById('recipe-form');
    //
    //
    // const recipeSelector = document.getElementById('recipe-selector');

    // function fetchRecipes() {
    //     fetch('http://localhost:8080/api/recepti/all')
    //         .then(response => response.json())
    //         .then(recipes => {
    //             recipes.forEach(recipe => {
    //                 const option = document.createElement('option');
    //                 option.value = recipe.id_recept; 
    //                 option.textContent = recipe.naslov; 
    //                 recipeSelector.appendChild(option);
    //             });
    //         })
    //         .catch(error => console.error('Error fetching recipes:', error));
    // }

    // fetchRecipes();

    // recipeSelector.addEventListener('change', function() {
    //     const selectedId = recipeSelector.value;
    //     if (selectedId) {
    //         loadRecipe(selectedId);
    //     } else {
    //         clearForm();
    //     }
    // });

    // function loadRecipe(id) {
    //     fetch(`http://localhost:8080/api/recepti/${id}`)
    //         .then(response => response.json())
    //         .then(recipe => {
    //             document.getElementById('recipe-id').value = recipe.id_recept; // Set the recipe ID
    //             document.getElementById('recipe-title').value = recipe.naslov;
    //             document.getElementById('prep-time').value = recipe.cas_priprave;
    //             document.getElementById('total-time').value = recipe.skupni_cas;

    //             // Populate ingredients
    //             clearIngredients();
    //             recipe.sestavine.forEach(ingredient => {
    //                 addIngredient(ingredient.naziv, ingredient.kolicina, ingredient.enota);
    //             });

    //             // Populate steps
    //             clearSteps();
    //             recipe.koraki.forEach(step => {
    //                 addStep(step.zaporedno_st, step.opis);
    //             });

    //             document.getElementById('form-title').innerText = 'Update Recipe';
    //         })
    //         .catch(error => console.error('Error loading recipe:', error));
    // }

    // function clearForm() {
    //     document.getElementById('recipe-id').value = '';
    //     document.getElementById('recipe-title').value = '';
    //     document.getElementById('prep-time').value = '';
    //     document.getElementById('total-time').value = '';
    //     clearIngredients();
    //     clearSteps();
    //     document.getElementById('form-title').innerText = 'Create Recipe';
    // }

    // // Functions to clear ingredients and steps
    // function clearIngredients() {
    //     const ingredientSection = document.getElementById('ingredients-section');
    //     ingredientSection.innerHTML = '';
    // }

    // function clearSteps() {
    //     const stepsSection = document.getElementById('steps-section');
    //     stepsSection.innerHTML = '';
    // }




    document.getElementById('add-ingredient').addEventListener('click', function() {
        const ingredientSection = document.getElementById('ingredients-section');
        const newIngredient = document.createElement('div');
        newIngredient.classList.add('form-group', 'ingredient-item');
        newIngredient.innerHTML = `
            <input type="text" class="form-control ingredient-name" placeholder="Ingredient name" required><br>
            <input type="number" class="form-control ingredient-quantity" placeholder="Quantity" required><br>
            <input type="text" class="form-control ingredient-unit" placeholder="Unit (e.g., grams, cups)"><br>
            <button type="button" class="btn btn-outline-danger remove-ingredient">Remove</button>
        `;
        ingredientSection.appendChild(newIngredient);

        newIngredient.querySelector('.remove-ingredient').addEventListener('click', function() {
            newIngredient.remove();
        });
    });

    document.getElementById('add-step').addEventListener('click', function() {
        const stepsSection = document.getElementById('steps-section');
        const newStep = document.createElement('div');
        newStep.classList.add('form-group', 'step-item');
        newStep.innerHTML = `
            <input type="number" class="form-control step-number" placeholder="Enter the number of the step" required><br>
            <textarea class="form-control step-description" placeholder="Step description" required></textarea><br>
            <button type="button" class="btn btn-outline-danger remove-step">Remove</button>
        `;
        stepsSection.appendChild(newStep);

        newStep.querySelector('.remove-step').addEventListener('click', function() {
            newStep.remove();
        });
    });

    recipeForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const title = document.getElementById('recipe-title').value;
        const prepTime = document.getElementById('prep-time').value;
        const totalTime = document.getElementById('total-time').value;

        const ingredients = [];
        // Use querySelectorAll here to select all ingredient items
        document.querySelectorAll('.ingredient-item').forEach(item => {
            const name = item.querySelector('.ingredient-name').value;
            const quantity = item.querySelector('.ingredient-quantity').value;
            const unit = item.querySelector('.ingredient-unit').value;

            ingredients.push({
                naziv: name,
                kolicina: parseFloat(quantity),
                enota: unit
            });
        });

        const steps = [];
        // Select all step items and ensure that we get valid step-number and step-description elements
        document.querySelectorAll('.step-item').forEach(item => {
            const stepNumberElement = item.querySelector('.step-number');
            const descriptionElement = item.querySelector('.step-description');

            // Check if both elements exist before trying to access their values
            if (stepNumberElement && descriptionElement) {
                const stepNumber = stepNumberElement.value;
                const description = descriptionElement.value;

                // Push the step data if valid elements are found
                steps.push({
                    zaporedno_st: parseInt(stepNumber),
                    opis: description
                });
            }
        });

        const newRecipe = {
            naslov: title,
            cas_priprave: parseInt(prepTime),
            skupni_cas: parseInt(totalTime),
            sestavine: ingredients,
            koraki: steps
        };

        fetch('http://localhost:8080/api/recepti/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecipe)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Recipe created:', data);
            console.log('Recipe created successfully!');
            recipeForm.reset(); // Optionally, clear the form or redirect to another page
        })
        .catch(error => console.error('Error creating recipe:', error));
    });
});

/*
function resetirajObrazec() {
    document.getElementById("registracija").reset();
    document.getElementById("error-message").innerHTML = '';
  }

function preveriObrazec(event) {
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const nameValue = nameInput.value.trim();
    
    if (nameValue === "" || nameValue.length >= 50){
        nameInput.classList.add("is-invalid");
    } else {
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
    }

    const emailInput = document.getElementById("email");
    const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!valid.test(emailInput.value)){
      emailInput.classList.add("is-invalid");
    } else {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
    }

    const addressInput = document.getElementById("address")
    //let addressInput = document.forms["registracija"]["address"].value; 
    if (addressInput.value === "") {
        addressInput.classList.add("is-invalid");
    } else {
        addressInput.classList.remove("is-invalid");
        addressInput.classList.add("is-valid");
    }

    const hisnaStevilkaInput = document.getElementById("hisnaSt");
    if (hisnaStevilkaInput.value <= 0 || hisnaStevilkaInput.value == ""){
        hisnaStevilkaInput.classList.add("is-invalid");
    } else {
        hisnaStevilkaInput.classList.remove("is-invalid");
        hisnaStevilkaInput.classList.add("is-valid");
    }

    
    const posta = document.getElementById("postcode");
   // let posta = document.forms["registracija"]["postcode"].value;
    if (posta.value > 10000 || posta.value < 1000){
        posta.classList.add("is-invalid");
    } else {
        posta.classList.remove("is-invalid");
        posta.classList.add("is-valid");
    }

    const kraj = document.getElementById("city");
    //let kraj = document.forms["registracija"]["city"].value;
    if (kraj.value === ""){
        kraj.classList.add("is-invalid");
    } else {
        kraj.classList.remove("is-invalid");
        kraj.classList.add("is-valid");
    }

    const opombe = document.getElementById("opombe");
    //let opombe = document.forms["registracija"]["opombe"].value;
    if (opombe.value.length > 300) {
        opombe.classList.add("is-invalid");
    } else {
        opombe.classList.remove("is-invalid");
        opombe.classList.add("is-valid");
    }

    const kljukica = document.getElementById("agree");
    //let kljukica = document.forms["registracija"]["potrdiGumbek"];
    if (!kljukica.checked) {
        kljukica.classList.add("is-invalid");
    } else {
        kljukica.classList.remove("is-invalid");
        kljukica.classList.add("is-valid");
    }


    const rojstvoInput = document.getElementById("datum");
    const rojstvo = new Date(rojstvoInput.value);
    //const rojstvo = new Date(document.forms["registracija"]["datum"].value);
    const danes = new Date();    
    const starost = danes.getFullYear() - rojstvo.getFullYear(); 
    const mesec = danes.getMonth() - rojstvo.getMonth();
    const dan = danes.getDate() - rojstvo.getDate();
    
    if (starost < 18 || (starost === 18 && (mesec < 0 || (mesec === 0 && dan <0)))){
        rojstvoInput.classList.add("is-invalid");
    } else {
        rojstvoInput.classList.remove("is-invalid");
        rojstvoInput.classList.add("is-valid");
    }

    
}

function toUpperCase(){
    document.getElementById("name").value = document.getElementById("name").value.toUpperCase();
    document.getElementById("email").value = document.getElementById("email").value.toUpperCase();
    document.getElementById("address").value = document.getElementById("address").value.toUpperCase();
    document.getElementById("city").value = document.getElementById("city").value.toUpperCase();
}

//pred JSON dokumenotom
/*class Izdelek {
    constructor(naziv, cena, kolicina){
        this.naziv = naziv;
        this.cena = cena;
        this.kolicina = kolicina;
    }
}*/


//LOCAL STORAGE VERZIJA:
/*
function naloziKosarico(){
    let kosaricaJSON = localStorage.getItem("kosarica");

    if(kosaricaJSON == null){
        return new Array();
    }
    return JSON.parse(kosaricaJSON); //iz niza nazaj v objekt sparsaš
}
*/
/*
function dodajVKosarico(id) {
    fetch('izdelki.json')
      .then(response => response.json())
      .then(products => {
        const izdelek = products.find(item => item.id === id);
  
        if (izdelek) {
          let kosarica = naloziKosarico();
          izdelek.kolicina = izdelek.kolicina || 1; 
  
          const existingItem = kosarica.find(item => item.id === id);
  
          if (existingItem) {
            existingItem.kolicina++;
          } else {
            kosarica.push(izdelek);
          }
  
          shraniKosarico(kosarica);
          prikaziKosarico();
          alert(`${izdelek.naslov} added to the cart!`);
        } else {
          alert(`Product with ID ${id} not found in izdelki.json`);
        }
      });
  }

  // prejsnja fukncija
/*function dodajVKosarico(naziv, cena) {
    let kosarica = naloziKosarico();
    let izdelek = kosarica.find(item => item.naziv === naziv);

    if (izdelek) {
        izdelek.kolicina++;
    } else {
        izdelek = new Izdelek(naziv, cena, 1);
        kosarica.push(izdelek);
    }

    shraniKosarico(kosarica);
    prikaziKosarico();
    alert(`${naziv} added to the basket!`);
}*/
/*
function naloziKosarico(){
    let kosaricaJSON = sessionStorage.getItem("kosarica");

    if(kosaricaJSON == null){
        return new Array();
    }
    return JSON.parse(kosaricaJSON); //iz niza nazaj v objekt sparsaš
}

function shraniKosarico(kosarica){
    let kosaricaJSON = JSON.stringify(kosarica);
    sessionStorage.setItem("kosarica", kosaricaJSON);
}
  
//LOCAL STORAGE VERZIJA
/*
function shraniKosarico(kosarica){
    let kosaricaJSON = JSON.stringify(kosarica);
    localStorage.setItem("kosarica", kosaricaJSON);
}
*/

// ZDAJ DELA DODAVANJE V KOŠARICO Z ID-jem !! :)))
// NEHAJ UN-DO-at !!!
/*function prikaziKosarico() {
    let kosarica = naloziKosarico();
  
    let itemList = document.getElementById("kosarica");
  
    itemList.innerHTML = "";
  
    if (kosarica.length === 0) {
      itemList.innerHTML = "<p>Your basket is empty.</p>";
    } else {
      for (let i = 0; i < kosarica.length; i++) {
        let item = kosarica[i];
  
        let listItem = document.createElement("li");
  
        listItem.innerHTML = `${item.naslov} (Price: $ ${item.cena}, Quantity: ${item.kolicina})  <button type="button" class="btn btn-outline-dark" onclick="odstraniIzdelek(${i})">Remove</button>`;
  
        itemList.appendChild(listItem);
      }

        let skupnaCenaNakupa = cenaNakupa(kosarica);

        let totalElement = document.createElement("p");
        totalElement.textContent = `Total Price: $${skupnaCenaNakupa.toFixed(2)}`; 
    
        itemList.appendChild(totalElement);
      }      
    }

  function odstraniIzdelek(index) {
    let kosarica = naloziKosarico();
    
     if (0 <= index && index < kosarica.length) {
        kosarica[index].kolicina--;

        if (kosarica[index].kolicina <= 0) {
            kosarica.splice(index, 1);
        }

        shraniKosarico(kosarica);
        prikaziKosarico();
        console.log("Item removed successfully.");
    } else {
        console.log("Invalid index. Item removal failed.");
    }
}
  
  function odstraniVse() {
    sessionStorage.removeItem("kosarica"); 
    prikaziKosarico(); 
  }

  
  function cenaNakupa(kosarica){
    let skupnaCena = 0;
    const danes = new Date();
    const datumIzteka = new Date("2024-05-18T23:59:59");

    for (let item of kosarica) {
        skupnaCena += item.cena * item.kolicina;
    }

    if (datumIzteka > danes){
        skupnaCena = (skupnaCena * 85)/100;
    }

    let shippingCost = 0;
    shippingOption = document.querySelector('input[name="shipping"]:checked');
    if (skupnaCena >= 50){
        switch (shippingOption.id){
            case 'regular':
                shippingCost = 0;
                break;
            case 'morning':
                shippingCost = 0;
                break;
            case 'express':
                shippingCost = 14.99;
                break;
        }
    } else {
        switch (shippingOption.id){
            case 'personal':
                shippingCost = 0;
                break;
            case 'regular':
                shippingCost = 5.99;
                break;
            case 'morning':
                shippingCost = 8.99;
                break;
            case 'express':
                shippingCost = 14.99;
                break;
        }
    }
    return (skupnaCena + shippingCost);
  }


    // Fetch request to Spring Boot backend
    fetch('http://localhost:8080/hello')
        .then(response => response.text())
        .then(data => {
        document.getElementById('greeting').innerText = data;
        });
 

/*
const oseba1 = {ime : "Janez", priimek: "Novak"};
const oseba2 = {ime : "Janz", priimek: "Nov"};
const poljeOseb = [oseba1, oseba2];
oseba.starost = 40;
localStorage.setItem("oseba", JSON.stringify(oseba));
const novaOseba = JSON.parse(localStorage.getItem("oseba")); // tak ven preberšš objekt ?
console.log(novaOseba);
*/

// pri XML si moras sam sparsat 
//const rawData = await response.json 
// CORS napaka, Fetch je promise-based, boljse kot xtml
// live server 


/*
fetch('izdelki.json')
.then(response => response.json()) // Sparsaš JSON response
.then(products => {
    let output = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('jsonIzdelek'); 

        const image = document.createElement('img');
        image.src = product.url;

        productElement.appendChild(image);

        const separator = document.createElement('hr');
        productElement.appendChild(separator);
        
        const title = document.createElement('h3');
        title.textContent = product.naslov;
        productElement.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `By: ${product.avtor}`;
        productElement.appendChild(author);

        const price = document.createElement('p');
        price.textContent = `Price: €${product.cena.toFixed(2)}`; 
        productElement.appendChild(price);

        const description = document.createElement('p');
        description.textContent = product.opis;
        productElement.appendChild(description);

 /*
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.classList.add('btn', 'btn-outline-dark');

        addToCartButton.addEventListener('click', () => {
            dodajVKosarico(product.id); 
        });

        productElement.appendChild(addToCartButton);
       */
/*
        output += productElement.outerHTML;
    });
    document.getElementById('product-list').innerHTML = output;
})
//.catch(err => console.error('Error fetching products:', err)); 

fetch('izdelki.json')
  .then(response => response.json())
  .then(products => {
    const productList = document.getElementById('product-tabela');

    // Naslovna vrstica tabele
    const headerRow = document.createElement('tr');
    headerRow.classList.add('product-header');


    const headerTitle = document.createElement('th');
    headerTitle.textContent = 'Title';
    headerRow.appendChild(headerTitle);

    const headerAuthor = document.createElement('th');
    headerAuthor.textContent = 'Author';
    headerRow.appendChild(headerAuthor);

    const headerPrice = document.createElement('th');
    headerPrice.textContent = 'Price';
    headerRow.appendChild(headerPrice);


    productList.appendChild(headerRow);

    // vrstica za vsak izdelek
    products.forEach(product => {
      const productRow = document.createElement('tr');

      const imageCell = document.createElement('td');
      const productImage = document.createElement('img');
      productImage.src = product.url;
      productImage.alt = product.naslov;
      imageCell.appendChild(productImage);
      productRow.appendChild(imageCell);


      const titleCell = document.createElement('td');
      titleCell.textContent = product.naslov;
      productRow.appendChild(titleCell);

      const authorCell = document.createElement('td');
      authorCell.textContent = `${product.avtor}`;
      productRow.appendChild(authorCell);

      const priceCell = document.createElement('td');
      priceCell.textContent = `$${product.cena.toFixed(2)}`;
      productRow.appendChild(priceCell);

      productList.appendChild(productRow);
    });
  })
//zdaj dela vse i think


async function fetchUsers() {
    try {
      const response = await fetch('uporabniki.json'); 
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
}
  
const signInButton = document.getElementById('sign-in-btn');
signInButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const users = await fetchUsers();
    
    const foundUser = users.find(user => user.uporabniskoIme === username && user.geslo === password);
    
    if (foundUser) {
        storeUserInSessionStorage(foundUser);
        alert('You are now logged in!');
    } else {
        alert('Invalid username or password!');
    }
});
  
function storeUserInSessionStorage(user) {
    const userJSON = JSON.stringify(user);
    sessionStorage.setItem('currentUser', userJSON);
}


function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  
*/


  
  
  