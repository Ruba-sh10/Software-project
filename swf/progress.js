document.addEventListener("DOMContentLoaded", function () {
    const weightDisplay = document.getElementById("current-weight");
    const bmiDisplay = document.getElementById("bmi");
    const caloriesDisplay = document.getElementById("total-calories");
    const weightInput = document.getElementById("weight-input");
    const updateWeightBtn = document.getElementById("update-weight-btn");

   
    let weightData = JSON.parse(localStorage.getItem("weightData")) || [];
    let totalCalories = parseInt(localStorage.getItem("totalCalories")) || 0;
    let totalWorkouts = parseInt(localStorage.getItem("totalWorkouts")) || 0;
    let height = 1.75; 

    
    if (weightData.length > 0) {
        weightDisplay.textContent = `${weightData[weightData.length - 1]} kg`;
        bmiDisplay.textContent = (weightData[weightData.length - 1] / (height * height)).toFixed(2);
    } else {
        weightDisplay.textContent = "No Data";
        bmiDisplay.textContent = "N/A";
    }

    caloriesDisplay.textContent = `${totalCalories} kcal`;

   
    let ctx = document.getElementById("progressChart").getContext("2d");
    let progressChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: weightData.map((_, i) => `Week ${i + 1}`),
            datasets: [{
                label: "Weight (kg)",
                data: weightData,
                borderColor: "#3f7e88",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: false }
            }
        }
    });

    
    updateWeightBtn.addEventListener("click", function () {
        let newWeight = parseFloat(weightInput.value);
        if (newWeight > 0) {
            weightData.push(newWeight);
            localStorage.setItem("weightData", JSON.stringify(weightData));

            
            weightDisplay.textContent = `${newWeight} kg`;
            bmiDisplay.textContent = (newWeight / (height * height)).toFixed(2);

           
            progressChart.data.labels.push(`Week ${weightData.length}`);
            progressChart.data.datasets[0].data = weightData;
            progressChart.update();
        } else {
            alert("Please enter a valid weight.");
        }
    });

    
    window.addEventListener("pageshow", function (event) {
        if (event.persisted) {
            location.reload();
        }
    });
});
