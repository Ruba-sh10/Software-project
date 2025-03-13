document.addEventListener("DOMContentLoaded", function() {
    const mealTable = document.querySelector(".meal-table");
    const mealDetails = document.getElementById("meal-details");
    const closeDetailsBtn = document.getElementById("close-details");
    const selectMealBtn = document.getElementById("select-meal-btn"); // ✅ Select Button

    const mealName = document.getElementById("meal-name");
    const mealImage = document.getElementById("meal-image");
    const mealCalories = document.getElementById("meal-calories");
    const mealProtein = document.getElementById("meal-protein");
    const mealCarbs = document.getElementById("meal-carbs");
    const mealIngredients = document.getElementById("meal-ingredients");

    
    const mealsData = {
        "Grilled Chicken": {
            image: "grilledchicken.jpg",
            calories: "350 kcal",
            protein: "40g",
            carbs: "15g",
            ingredients: "Chicken breast, olive oil, garlic, black pepper"
        },
        "Vegetable Salad": {
            image: "vegetablesalad.jpg",
            calories: "200 kcal",
            protein: "10g",
            carbs: "25g",
            ingredients: "Lettuce, cucumber, tomato, olive oil, cheese"
        },
        "Oatmeal": {
            image: "oatmeal.jpg",
            calories: "250 kcal",
            protein: "12g",
            carbs: "40g",
            ingredients: "Oats, milk, honey, nuts, banana"
        }
    };

    
    mealTable.addEventListener("click", function(event) {
        if (event.target.classList.contains("select-meal")) {
            const selectedMealRow = event.target.closest("tr");
            const selectedMeal = selectedMealRow.getAttribute("data-meal");

            if (mealsData[selectedMeal]) {
                mealName.textContent = selectedMeal;
                mealImage.src = `images/${mealsData[selectedMeal].image}`;
                mealImage.alt = selectedMeal;

                mealCalories.textContent = mealsData[selectedMeal].calories;
                mealProtein.textContent = mealsData[selectedMeal].protein;
                mealCarbs.textContent = mealsData[selectedMeal].carbs;
                mealIngredients.textContent = mealsData[selectedMeal].ingredients;

                mealDetails.classList.remove("hidden");

                
                selectMealBtn.setAttribute("data-selected-meal", selectedMeal);
            }
        }
    });

    
    closeDetailsBtn.addEventListener("click", function() {
        mealDetails.classList.add("hidden");
    });

    
    selectMealBtn.addEventListener("click", function() {
        const selectedMeal = this.getAttribute("data-selected-meal");
        if (selectedMeal) {
            localStorage.setItem("selectedMeal", selectedMeal);
            alert(`You have selected: ${selectedMeal}`);

            
            window.location.href = "dashboard.html";
        }
    });
});
