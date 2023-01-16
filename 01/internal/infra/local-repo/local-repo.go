package repository

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	entity "github.com/vinisbitten/learning-clean-arch/01/internal/domain"
)

type LocalRepository struct {
	Port   string
	Posts  []entity.Meal
	Router *mux.Router
}

func (l *LocalRepository) Init() {
	l.Router = mux.NewRouter()
	l.Posts = []entity.Meal{
		{
			Name: "arroz",
			Time: time.Now().Add(30 * time.Minute),
			NutritionalInfo: entity.NutritionalInfo{
				Calories: 100,
				Protein:  10,
				Carbs:    20,
				Fat:      30,
			},
		},
	}
	l.Port = ":8080"

	l.Router.HandleFunc("/", func(resp http.ResponseWriter, req *http.Request) {
		fmt.Fprintln(resp, "Hello World")
	})
	l.Router.HandleFunc("/posts", GetPosts).Methods("GET")
	l.Router.HandleFunc("/posts", AddPost).Methods("POST")
	log.Println("Server running on port", l.Port)
	log.Fatalln(http.ListenAndServe(l.Port, l.Router))
}

func (l *LocalRepository) GetMeals() ([]entity.Meal, error) {
	f, err := os.Create("posts.txt")
	if err != nil {
		return l.Posts, err
	}
	_, err = f.Write([]byte(fmt.Sprintf("%v", l.Posts)))
	if err != nil {
		return l.Posts, err
	}
	return l.Posts, nil
}

func (l *LocalRepository) GetMeal(name string) (entity.Meal, error) {
	for _, post := range l.Posts {
		if post.Name == name {
			f, err := os.Create("get-meal.txt")
			if err != nil {
				return entity.Meal{}, err
			}
			_, err = f.Write([]byte(fmt.Sprintf("%v", l.Posts)))
			if err != nil {
				return entity.Meal{}, err
			}
			return post, nil
		}
	}
	err := errors.New("meal not found")
	return entity.Meal{}, err
}

func (l *LocalRepository) SaveMeal(meal entity.Meal) error {
	l.Posts = append(l.Posts, meal)
	return nil
}

func GetPosts(resp http.ResponseWriter, req *http.Request) {
	resp.Header().Set("Content-Type", "application/json")
	result, err := json.Marshal("posts")
	if err != nil {
		resp.WriteHeader(http.StatusInternalServerError)
		resp.Write([]byte(`{"error": "Error marshalling the posts array"}`))
		return
	}
	resp.WriteHeader(http.StatusOK)
	resp.Write(result)
}

func AddPost(resp http.ResponseWriter, req *http.Request) {
	resp.Header().Set("Content-Type", "application/json")
	var post entity.Meal
	err := json.NewDecoder(req.Body).Decode(&post)
	if err != nil {
		resp.WriteHeader(http.StatusInternalServerError)
		resp.Write([]byte(`{"error": "Error unmarshalling the request"}`))
		return
	}
	resp.WriteHeader(http.StatusOK)
	result, err := json.Marshal(post)
	if err != nil {
		resp.WriteHeader(http.StatusInternalServerError)
		resp.Write([]byte(`{"error": "Error marshalling the post"}`))
		return
	}
	resp.Write(result)
}
