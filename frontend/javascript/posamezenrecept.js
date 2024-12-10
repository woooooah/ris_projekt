document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");

    if (!recipeId) {
        alert("No recipe ID provided in URL!");
        return;
    }

    let originalServings;
    let ingredients = [];

    fetch(`http://localhost:8080/api/recepti/${recipeId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error fetching recipe: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            document.getElementById("recipe-title").textContent = data.naslov;
            document.getElementById("recipe-times").textContent =
                `Prep: ${Math.floor(data.cas_priprave / 60)}h ${data.cas_priprave % 60}min, ` +
                `Total: ${Math.floor(data.skupni_cas / 60)}h ${data.skupni_cas % 60}min`;
            document.getElementById("servings").textContent = `For: ${data.stevilo_porcij} portions`;

            const ingredientsList = document.getElementById("ingredients-list");
            data.sestavine.forEach((ingredient) => {
                const li = document.createElement("li");
                li.textContent = `${ingredient.kolicina} ${ingredient.enota || ""} ${ingredient.naziv}`;
                ingredientsList.appendChild(li);
                ingredients.push(ingredient); // ingredient data
            });

            const stepsList = document.getElementById("steps-list");
            data.koraki.forEach((step) => {
                const p = document.createElement("p");
                p.textContent = `${step.zaporedno_st}. ${step.opis}`;
                stepsList.appendChild(p);
            });

            originalServings = data.stevilo_porcij; // originalni servingi
        })
        .catch((error) => {
            console.error("Error loading recipe:", error);
            alert("Failed to load recipe details.");
        });

    // Preračun in prikaz novih porcij
    document.getElementById("calculate-servings").addEventListener("click", () => {
        const newServings = parseFloat(document.getElementById("new-servings").value);

        if (isNaN(newServings) || newServings <= 0) {
            alert("Please enter a valid number of servings.");
            return;
        }

        const adjustedIngredients = ingredients.map((ingredient) => {
            const adjustedQuantity = (ingredient.kolicina * newServings) / originalServings;
            return `${adjustedQuantity.toFixed(2)} ${ingredient.enota || ""} ${ingredient.naziv}`;
        });

        // Now pop up window z novimi porcijami sestavin
        const popupContent = adjustedIngredients.join("<br>");
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "white";
        popup.style.padding = "20px";
        popup.style.border = "1px solid black";
        popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        popup.innerHTML = `<h4>Adjusted Ingredients</h4><p>${popupContent}</p><button id="close-popup" class="btn btn-secondary">Close</button>`;
        document.body.appendChild(popup);

        document.getElementById("close-popup").addEventListener("click", () => {
            popup.remove();
        });
    });
});
