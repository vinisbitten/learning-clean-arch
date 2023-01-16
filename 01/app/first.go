package main

import (
	"fmt"
	"time"

	entity "github.com/vinisbitten/learning-clean-arch/01/internal/domain"
	"github.com/vinisbitten/learning-clean-arch/01/internal/infra/local-repo"
	usecase "github.com/vinisbitten/learning-clean-arch/01/internal/usecases"
)

func main() {
	// Create a meal repository (firebase in this case)
	repository := &repository.LocalRepository{}

	// Initialize the repository
	go repository.Init()

	// Create a meal service
	service := &usecase.MealService{Repository: repository}

	// Plan a new meal
	info := entity.NutritionalInfo{Calories: 400, Protein: 40, Carbs: 20, Fat: 10}
	err := service.PlanMeal("Low-Carb-Taco", time.Now().Add(30*time.Minute), info)
	if err != nil {
		fmt.Println("Failed to plan meal:", err)
	}

	// Get the planned meal
	meal, err := service.GetMeal("Low-Carb-Taco")
	if err != nil {
		fmt.Println("Failed to get meal:", err)
	} else {
		fmt.Printf("Meal: %s, Time: %s, Nutritional Info: %+v\n", meal.Name, meal.Time, meal.NutritionalInfo)
	}

	// Get all planned meals
	meals, err := service.GetMeals()
	if err != nil {
		fmt.Println("Failed to get meals:", err)
	} else {
		fmt.Println("Meals:")
		for _, m := range meals {
			fmt.Printf("  %s, Time: %s, Nutritional Info: %+v\n", m.Name, m.Time, m.NutritionalInfo)
		}
	}
}
