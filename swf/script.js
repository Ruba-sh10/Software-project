document.addEventListener("DOMContentLoaded", function () {
    const exercises = document.querySelectorAll(".exercise");
    const filterInput = document.getElementById("exercise-filter");
    const doneBtn = document.getElementById("done-btn");
    const days = document.querySelectorAll(".week-schedule span");
    const fitnessGoals = document.querySelectorAll(".fitness-goal-bar span"); 
let selectedGoal = localStorage.getItem("selectedGoal") || ""; 


fitnessGoals.forEach(goal => {
    if (goal.textContent === selectedGoal) {
        goal.classList.add("selected-goal"); 
    }

    
    goal.addEventListener("click", function () {
        fitnessGoals.forEach(g => g.classList.remove("selected-goal")); 
        this.classList.add("selected-goal"); 
        localStorage.setItem("selectedGoal", this.textContent); 
    });
});

    const selectedExerciseList = document.getElementById("selected-exercise-list");

    let selectedExercises = JSON.parse(localStorage.getItem("selectedExercises")) || [];

    
    exercises.forEach(exercise => {
        exercise.addEventListener("click", function () {
            this.classList.toggle("selected");
            const exerciseName = this.getAttribute("data-name");

            if (this.classList.contains("selected")) {
                if (!selectedExercises.includes(exerciseName)) {
                    selectedExercises.push(exerciseName);
                }
            } else {
                selectedExercises = selectedExercises.filter(item => item !== exerciseName);
            }
            console.log("Selected Exercises:", selectedExercises);
        });
    });

    
    if (filterInput) {
        filterInput.addEventListener("keyup", function () {
            const searchText = this.value.toLowerCase();
            exercises.forEach(exercise => {
                const name = exercise.getAttribute("data-name").toLowerCase();
                exercise.style.display = name.includes(searchText) ? "block" : "none";
            });
        });
    }

  
    days.forEach(day => {
        day.addEventListener("click", function () {
            days.forEach(d => d.style.background = ""); 
            this.style.background = "#285a5f";
        });
    });

    
    if (doneBtn) {
        doneBtn.addEventListener("click", function () {
            if (selectedExercises.length === 0) {
                alert("Please select at least one exercise.");
                return;
            }
            localStorage.setItem("selectedExercises", JSON.stringify(selectedExercises));
            window.location.href = "selected-exercises.html";
        });
    }

    
    if (selectedExerciseList) {
        selectedExerciseList.innerHTML = "";

        if (selectedExercises.length === 0) {
            selectedExerciseList.innerHTML = "<p>No exercises selected.</p>";
        } else {
            
            const exerciseData = {
                "Push-ups": { image: "pushups.jpg", calories: 100, reps: "3x" },
                "Squats": { image: "squats.jpg", calories: 120, reps: "4x" },
                "Jumping Jacks": { image: "jumpingjacks.jpg", calories: 90, reps: "2x" },
                "Plank": { image: "plank.jpg", calories: 80, reps: "30 sec" }
            };

            selectedExercises.forEach(exercise => {
                const data = exerciseData[exercise] || { image: "default.jpg", calories: "Unknown", reps: "Unknown" };
                const imagePath = `images/${data.image}`;

                const div = document.createElement("div");
                div.classList.add("selected-exercise");
                div.innerHTML = `
                    <img src="${imagePath}" alt="${exercise}" onerror="this.src='images/default.jpg'">
                    <p><strong>${exercise}</strong></p>
                    <p>Calories Burned: ${data.calories}</p>
                    <p>Reps: ${data.reps}</p>
                `;
                selectedExerciseList.appendChild(div);
            });
        }
    }

    
    document.getElementById("done-workout-btn")?.addEventListener("click", function () {
        let totalCalories = parseInt(localStorage.getItem("totalCalories")) || 0;
        let totalWorkouts = parseInt(localStorage.getItem("totalWorkouts")) || 0;

        
        const caloriesPerExercise = {
            "Push-ups": 50,
            "Squats": 60,
            "Jumping Jacks": 40,
            "Plank": 30
        };

       
        selectedExercises.forEach(exercise => {
            totalCalories += caloriesPerExercise[exercise] || 30; 
        });

       
        localStorage.setItem("totalWorkouts", totalWorkouts + 1);
        localStorage.setItem("totalCalories", totalCalories);

        
        window.location.href = "dashboard.html";
    });

    
    document.getElementById("back-btn")?.addEventListener("click", function () {
        window.location.href = "workouts.html";
    });
});
