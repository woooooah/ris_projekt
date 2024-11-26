document.addEventListener("DOMContentLoaded", function () {
    // Get the recipe ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (!recipeId) {
        alert("No recipe ID provided in URL!");
        return;
    }

    // Fetch recipe details
    fetch(`http://localhost:8080/api/recepti/${recipeId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching recipe: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Update the DOM with recipe details
            document.getElementById('recipe-title').textContent = data.naslov;
            document.getElementById('recipe-times').textContent = 
                `Prep: ${Math.floor(data.cas_priprave / 60)}h ${data.cas_priprave % 60}min, ` +
                `Total: ${Math.floor(data.skupni_cas / 60)}h ${data.skupni_cas % 60}min`;

            const ingredientsList = document.getElementById('ingredients-list');
            data.sestavine.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = `${ingredient.kolicina} ${ingredient.enota || ''} ${ingredient.naziv}`;
                ingredientsList.appendChild(li);
            });

            const stepsList = document.getElementById('steps-list');
            

            data.koraki.forEach(step => {
                const p = document.createElement('p');
                p.textContent = `${step.zaporedno_st}. ${step.opis}`;
                stepsList.appendChild(p);
            });

        
        })
        .catch(error => {
            console.error("Error loading recipe:", error);
            alert("Failed to load recipe details.");
        });
});

