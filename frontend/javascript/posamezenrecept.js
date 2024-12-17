document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");

    if (!recipeId) {
        alert("No recipe ID provided in URL!");
        return;
    }

    let originalServings;
    let ingredients = [];
    let hranilneVrednosti = []; // Store the original nutrient values
    
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

            // Display original nutritional values
            hranilneVrednosti = data.hranilneVrednosti; // Store for later use
            const hranilnaVrednostList = document.getElementById("hran-vred");
            hranilneVrednosti.forEach((vrednost) => {
                const li = document.createElement("li");
                li.textContent = `${vrednost.naziv}: ${vrednost.kolicina} ${vrednost.merska_enota}`;
                hranilnaVrednostList.appendChild(li);
            });

            // Display ingredients
            const ingredientsList = document.getElementById("ingredients-list");
            data.sestavine.forEach((ingredient) => {
                const li = document.createElement("li");
                li.textContent = `${ingredient.kolicina} ${ingredient.enota || ""} ${ingredient.naziv}`;
                ingredientsList.appendChild(li);
                ingredients.push(ingredient); // Store for recalculation
            });

            const stepsList = document.getElementById("steps-list");
            data.koraki.forEach((step) => {
                const p = document.createElement("p");
                p.textContent = `${step.zaporedno_st}. ${step.opis}`;
                stepsList.appendChild(p);
            });

            originalServings = data.stevilo_porcij; // Store original servings
        })
        .catch((error) => {
            console.error("Error loading recipe:", error);
            alert("Failed to load recipe details.");
        });

    // Recalculate and display new servings and nutritional values
    document.getElementById("calculate-servings").addEventListener("click", () => {
        const newServings = parseFloat(document.getElementById("new-servings").value);

        if (isNaN(newServings) || newServings <= 0) {
            alert("Please enter a valid number of servings.");
            return;
        }

        const dailyIntake = {
            Kalorije: 2080,
            Beljakovine: 50,
            Maščobe: 70,
            Vlaknine: 30,
            "Ogljikovi hidrati": 310,
            Calories: 2080,
            Protein: 50,
            Fats: 70,
            Fiber: 30,
            Carbohydrates: 310
        }

        // Adjust ingredients
        const adjustedIngredients = ingredients.map((ingredient) => {
            const adjustedQuantity = (ingredient.kolicina * newServings) / originalServings;
            return `${adjustedQuantity.toFixed(2)} ${ingredient.enota || ""} ${ingredient.naziv}`;
        });

        // Adjust nutritional values
        const adjustedNutrients = hranilneVrednosti.map((vrednost) => {
            const adjustedQuantity = (vrednost.kolicina * newServings) / originalServings;

            let dailyPercentage = "";

            switch (vrednost.naziv) {
                case "Kalorije":
                case "Beljakovine":
                case "Maščobe":
                case "Ogljikovi hidrati":
                case "Vlaknine":
                case "Calories":
                case "Protein":
                case "Fats":
                case "Carbohydrates":
                case "Fiber":
                    const dailyValue = dailyIntake[vrednost.naziv];
                    dailyPercentage = ` (${((adjustedQuantity / dailyValue) * 100).toFixed(2)}% of daily intake)`;
                    break;
                default:
                    dailyPercentage = ""; // No percentage for unspecified nutrients
            }


            return `${vrednost.naziv}: ${adjustedQuantity.toFixed(2)} ${vrednost.merska_enota} ${dailyPercentage}`;
        });

        // Combine results for popup display
        const popupContent = `
            <h4>Adjusted Ingredients</h4>
            <p>${adjustedIngredients.join("<br>")}</p>
            <h4>Adjusted Nutritional Values</h4>
            <p>${adjustedNutrients.join("<br>")}</p>
        `;

        // Create popup window
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "white";
        popup.style.padding = "20px";
        popup.style.border = "1px solid black";
        popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        popup.innerHTML = `${popupContent}<button id="close-popup" class="btn btn-secondary">Close</button>`;
        document.body.appendChild(popup);

        // Close popup logic
        document.getElementById("close-popup").addEventListener("click", () => {
            popup.remove();
        });
    });
});