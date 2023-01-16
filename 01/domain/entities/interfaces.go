package entity

// MealRepository defines the methods for storing and retrieving meals
type MealRepository interface {
	GetMeal(name string) (Meal, error)
	GetMeals() ([]Meal, error)
	SaveMeal(meal Meal) error
}
