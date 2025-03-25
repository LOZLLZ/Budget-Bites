// Mock user database
let users = JSON.parse(localStorage.getItem("users")) || [];

function signup() {
    let username = document.getElementById("new-username").value;
    let password = document.getElementById("new-password").value;

    if (users.find(user => user.username === username)) {
        alert("Username already exists!");
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! You can now log in.");
    window.location.href = "login.html";
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert("Login successful!");
        window.location.href = "meals.html";
    } else {
        alert("Invalid credentials!");
    }
}

function getMeals() {
    let budget = document.getElementById("budget-input").value;
    
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let filteredMeals = data.meals.filter(meal => meal.price <= budget);
            let resultsDiv = document.getElementById("meal-results");
            resultsDiv.innerHTML = ""; // Clear previous results

            if (filteredMeals.length === 0) {
                resultsDiv.innerHTML = "<p>No meals found within this budget.</p>";
                return;
            }

            filteredMeals.forEach(meal => {
                let mealCard = document.createElement("div");
                mealCard.classList.add("meal-card");
                mealCard.innerHTML = `
                    <h3>${meal.name} - ₱${meal.price}</h3>
                    <p><strong>Calories:</strong> ${meal.calories} kcal</p>
                    <p><strong>Protein:</strong> ${meal.protein}g | <strong>Carbs:</strong> ${meal.carbs}g | <strong>Fats:</strong> ${meal.fats}g</p>
                    <p><strong>Ingredients:</strong> ${meal.ingredients.join(", ")}</p>
                `;
                resultsDiv.appendChild(mealCard);
            });
        })
        .catch(error => console.error("Error fetching meals:", error));
}
