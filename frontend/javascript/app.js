fetch('http://localhost:8080/info')
    .then(response => response.text())
    .then(data => {
        document.getElementById('greeting').innerText = data;
    })
    .catch(error => {
        console.error('BLA BLA BLA sError fetching the /info endpoint:', error);
    });

document.addEventListener("DOMContentLoaded", function(){
    fetch('http://localhost:8080/api/recepti/all')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const receptContainer = document.getElementById('recept-list');

        const rowDiv = document.createElement('div');
        rowDiv.className = "row";

        data.forEach(recept => {
            const receptItem = document.createElement('div');
            receptItem.className = "produkt col-lg-3 col-md-4 col-sm-6";
            const imageUrl = "slike/food/hbd.jpeg";
            receptItem.innerHTML = `
                <img src="${imageUrl}" alt="${recept.naslov}">
                <h5>${recept.naslov}</h5>
                ${Math.floor(recept.skupni_cas / 60)}h ${recept.skupni_cas % 60}min
            
            `;
        rowDiv.appendChild(receptItem);
        });

        receptContainer.appendChild(rowDiv);
    })
    .catch(error => console.error('Error fetching recipes:', error));
});


document.addEventListener("DOMContentLoaded", function() {
    const recipeForm = document.getElementById('recipe-form');
    //
    //
    const recipeSelector = document.getElementById('recipe-selector');

    function fetchRecipes() {
        fetch('http://localhost:8080/api/recepti/all')
            .then(response => response.json())
            .then(recipes => {
                recipes.forEach(recipe => {
                    const option = document.createElement('option');
                    option.value = recipe.id_recept; 
                    option.textContent = recipe.naslov; 
                    recipeSelector.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching recipes:', error));
    }

    fetchRecipes();

    

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





document.addEventListener("DOMContentLoaded", function() {
    const isciForm= document.getElementById('isciForm');
    const receptList =document.getElementById('recept-list');

    if (!receptList) {
        console.error("Could not find element with ID 'recept-list'");
        return;
    }

    isciForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const query = document.getElementById('brskaj').value;
        searchRecipes(query);
    });


    function searchRecipes(query) {
        const url =`http://localhost:8080/api/recepti?naslov=${encodeURIComponent(query)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayRecipes(data);
            })
            .catch(error => console.error('Error fetching recipes:', error));
    }

    function displayRecipes(recipes) {
        receptList.innerHTML = '';
        if (recipes.length === 0) {
            receptList.innerHTML = '<p>ne najdemo.</p>';
        } else {
            const rowDiv = document.createElement('div');
            rowDiv.className = "row";
            recipes.forEach(recipe => {
                const receptItem = document.createElement('div');
                receptItem.className = "produkt col-lg-3 col-md-4 col-sm-6";
                receptItem.setAttribute("data-id", recipe.id_recept); 
                
                const imageUrl = "slike/food/hbd.jpeg";
                receptItem.innerHTML = `
                    <img src="${imageUrl}" alt="${recipe.naslov}">
                    <h5>${recipe.naslov}</h5>
                    ${Math.floor(recipe.skupni_cas / 60)}h ${recipe.skupni_cas % 60}min <br>
                    <button class="btn btn-outline-danger" onclick="deleteRecipe(${recipe.id_recept})">Delete</button>
                    
                `;
                rowDiv.appendChild(receptItem);
            });
            receptList.appendChild(rowDiv);
        }
    }

    function loadRecipe(recipeId) {
        // Implement the logic to load and populate the form for editing
        console.log("Load recipe for editing:", recipeId);
    }

    
});  

function deleteRecipe(recipeId) {
    const confirmDelete = confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
        const url = `http://localhost:8080/api/recepti/${recipeId}`;

        fetch(url, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log('Recipe deleted successfully');

                const recipeElement = document.querySelector(`div[data-id="${recipeId}"]`);
                if (recipeElement) {
                    recipeElement.remove(); // Remove the deleted recipe from the UI
                }


                //searchRecipes(''); // Refresh the list after deletion
            } else {
                return response.text().then(text => {
                    console.error('Error deleting recipe:', text);
                    console.log('Error deleting recipe: ' + text);
                });
            }
        })
        .catch(error => {
            console.error('Error deleting recipe:', error);
        });
    }
}

    // function deleteRecipe(recipeId) {
    //     const confirmDelete = confirm("Are you sure you want to delete this recipe?");
    //     if (confirmDelete) {
    //         const url = `http://localhost:8080/api/recepti/${recipeId}`;

    //         fetch(url, {
    //             method: 'DELETE'
    //         })
    //         .then(response => {
    //             if (response.ok) {
    //                 alert('Recipe deleted successfully');
    //                 searchRecipes(''); // Refresh the list after deletion
    //             } else {
    //                 alert('Error deleting recipe');
    //             }
    //         })
    //         .catch(error => console.error('Error deleting recipe:', error));
    //     }
    // }












// document.addEventListener("DOMContentLoaded", function(){
//     const recipeForm = document.getElementById('recipe-form');

//     document.getElementById('add-ingredient').addEventListener('click', function() {
//         const ingredientSection = document.getElementById('ingredients-section');
//         const newIngredient = document.createElement('div');
//         newIngredient.classList.add('form-group', 'ingredient-item');
//         newIngredient.innerHTML = `
//             <input type="text" class="form-control ingredient-name" placeholder="Ingredient name" required><br>
//             <input type="number" class="form-control ingredient-quantity" placeholder="Quantity" required><br>
//             <input type="text" class="form-control ingredient-unit" placeholder="Unit (e.g., grams, cups)"><br>
//             <button type="button" class="btn btn-outline-danger remove-ingredient">Remove</button>
//         `;
//         ingredientSection.appendChild(newIngredient);

//         newIngredient.querySelector('.remove-ingredient').addEventListener('click', function () {
//         newIngredient.remove();
//         });
//     });


//     document.getElementById('add-step').addEventListener('click', function() {
//         const stepsSection = document.getElementById('steps-section');
//         const newStep = document.createElement('div');
//         newStep.classList.add('form-group', 'step-item');
//         newStep.innerHTML = `
//           <input type="number" class="form-control step-number" placeholder="Enter the number of the step" required><br>
//           <textarea class="form-control step-description" placeholder="Step description" required></textarea><br>
//           <button type="button" class="btn btn-outline-danger remove-step">Remove</button>
//         `;
//         stepsSection.appendChild(newStep); 

//         newStep.querySelector('.remove-step').addEventListener('click', function () {
//             newStep.remove();
//         });
//     });


//     recipeForm.addEventListener('submit', function (e) {
//         e.preventDefault();

//         const title = document.getElementById('recipe-title').value;
//         const prepTime = document.getElementById('prep-time').value;
//         const totalTime = document.getElementById('total-time').value;

//         const ingredients = [];
//         document.querySelector('.ingredient-item').forEach(item => {
//             const name = item.querySelector('.ingredient-name').value;
//             const quantity = item.querySelector('ingredient-quantity').value;
//             const unit = item.querySelector('.ingredient-unit').value;

//             ingredients.push({
//                 naziv: name, 
//                 kolicina: parseFloat(quantity),
//                 enota: unit
//             });

//         });


//         const steps = [];
//         document.querySelectorAll('.step-item').forEach(item => {
//             const stepNumber = item.querySelector('.step-number').value;
//             const description = item.querySelector('.step-description').value;
//             steps.push({
//                 zaporedno_st: parseInt(stepNumber),
//                 opis: description
//             });
//         });


//         const newRecipe = {
//             naslov: title,
//             cas_priprave: parseInt(prepTime),
//             skupni_cas: parseInt(totalTime),
//             sestavine: ingredients,
//             koraki: steps
//         };

//         fetch('http://localhost:8080/api/recepti/create', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newRecipe)
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Recipe created:', data);
//             alert('Recipe created successfully!');
//             // Optionally, clear the form or redirect to another page
//             recipeForm.reset();
//         })
//         .catch(error => console.error('Error creating recipe:', error));
//     });
// });

document.getElementById('registracija').addEventListener('gumbek_submit', function (event) {
    event.preventDefault();

    const ime = document.getElementById('name').value;
    const priimek = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const geslo = document.getElementById('password').value;

    const uporabnik = {
        ime: ime,
        priimek: priimek,
        email: email,
        username: username,
        geslo: geslo,
        //admin: false // Predpostavljam, da je admin status nastavljen na backendu ali po drugih kriterijih
    };

    fetch('http://localhost:8080/api/uporabniki/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(uporabnik)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.text().then(text => { throw new Error(text); });
            }
        })
        .then(data => {
            document.getElementById('result').innerHTML = `<p style="color: green;">Uporabnik ${data.username} uspešno registriran!</p>`;
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<p style="color: red;">Napaka: ${error.message}</p>`;
        });
});
/*
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const ime = document.getElementById('name').value;
    const priimek = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const geslo = document.getElementById('password').value;

    const adminEmails = ['kaja.vidmar@gmail.com', 'sanja.mursic@gmail.com', 'tara.sedovsek@gmail.com']; 
    const admin = adminEmails.includes(email.toLowerCase());


    const uporabnik = {
        ime: ime,
        priimek: priimek,
        email: email,
        username: username,
        geslo: geslo,
        admin: admin
    };

    fetch('http://localhost:8080/api/uporabniki')
    .then(response => response.json())
    .then(data => console.log(data));

    // Pošlji zahtevo na backend
    fetch('http://localhost:8080/api/uporabniki/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(uporabnik)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.text().then(text => { throw new Error(text); });
        }
    })
    .then(data => {
        document.getElementById('result').innerHTML = `<p style="color: green;">Uporabnik ${data.username} uspešno registriran!</p>`;
    })
    .catch(error => {
        document.getElementById('result').innerHTML = `<p style="color: red;">Napaka: ${error.message}</p>`;
    });
});*/


//PRIKAZ VSEH UPORABNIKOV DELA
/*
fetch('http://localhost:8080/api/uporabniki')
    .then(response => {
        if (!response.ok) {
            throw new Error('Napaka pri pridobivanju uporabnikov');
        }
        return response.json();
    })
    .then(data => {
        console.log('Shranjeni uporabniki:', data);
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        data.forEach(user => {
            userList.innerHTML += `
                <p>Uporabnik: ${user.ime} ${user.priimek}, Email: ${user.email}, Uporabniško ime: ${user.username}</p>
            `;
        });
    })
    .catch(error => console.error('Napaka:', error));
    */

