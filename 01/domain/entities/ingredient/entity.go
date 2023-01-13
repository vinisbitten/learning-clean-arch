package ingredient

// Entity is representing the ingredient entity
type Entity struct {
	Name           string  `json:"name"`
	EnergeticValue float64 `json:"energetic_value"`
	Protein        float64 `json:"protein"`
	Carbo          float64 `json:"carbo"`
	Fat            float64 `json:"fat"`
}
