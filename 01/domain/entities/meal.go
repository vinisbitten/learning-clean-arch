package entity

import "time"

// Meal represents a meal to be planned
type Meal struct {
	Name string
	Time time.Time
	NutritionalInfo
}
