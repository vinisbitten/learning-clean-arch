package usecase

import (
	"time"

	entity "github.com/vinisbitten/learning-clean-arch/01/internal/domain"
)

// MealService defines the methods for meal planning
type MealService struct {
	Repository entity.MealRepository
}

// PlanMeal plans a new meal with nutritional information
func (s *MealService) PlanMeal(name string, t time.Time, info entity.NutritionalInfo) error {
	meal := entity.Meal{Name: name, Time: t, NutritionalInfo: info}
	return s.Repository.SaveMeal(meal)
}

// GetMeal gets an existing meal by name
func (s *MealService) GetMeal(name string) (entity.Meal, error) {
	return s.Repository.GetMeal(name)
}

// GetMeals gets all planned meals
func (s *MealService) GetMeals() ([]entity.Meal, error) {
	return s.Repository.GetMeals()
}
