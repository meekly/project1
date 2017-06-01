package main

import (
	"bufio"
	"encoding/json"
	"net/http"
	"os"
)

type News struct {
	Title   string `json:"title"`
	Body    string `json:"body"`
	Likes   int    `json:"likes"`
	Picture string `json:"picture"`
}

func main() {
	port := ":3000"
	http.HandleFunc("/news", news)
	http.HandleFunc("/forum", forum)
	http.HandleFunc("/how-many-games-are-supported", question)
	http.ListenAndServe(port, nil)
}

func news(w http.ResponseWriter, r *http.Request) {
	news := allNews()
	jsn, err := json.Marshal(news)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(jsn)
}

func allNews() []News {
	return []News{
		{Title: "First post!",
			Body:    "We are glad to introduce you a one more post",
			Likes:   14,
			Picture: "https://broeder10.files.wordpress.com/2013/10/picture_post_-_16_september_1942_-_front_cover_-_air_transport_auxilliary_ata_first_officer_maureen_dunlop.jpg",
		},
		{Title: "New tourneer",
			Body:    "New event is going to appear next week: Checkers tour! Come and win show the best of you, make it burn and wait for your prize!",
			Likes:   144,
			Picture: "http://yesofcorsa.com/wp-content/uploads/2017/04/Checkers-Wallpaper-1024x742.jpg",
		},
		{Title: "You can order T-shirst!",
			Body:    "We open our shop this weekend so you can order new T-shirst with checkers! Come and get it!",
			Likes:   505,
			Picture: "https://image.spreadshirtmedia.com/image-server/v1/products/1012130689/views/1,width=800,height=800,appearanceId=1,backgroundColor=E8E8E8,version=1485256808/for-checkers-t-shirts-men-s-t-shirt.jpg",
		},
		{Title: "Lorem ipsum",
			Body:    "The 'string' option signals that a field is stored as JSON inside a JSON-encoded string. It applies only to fields of string, floating point, integer, or boolean types. This extra level of encoding is sometimes used when communicating with JavaScript programs",
			Likes:   1421,
			Picture: "http://www.slightly-out-of-focus.com/Capa_file/Capa%20images/this%20is%20war/CAPA%20picture%20post%20imo.jpg",
		}}
}

func forum(w http.ResponseWriter, r *http.Request) {
	file, err := os.Open("../data/forum.json")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var data string
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		data += scanner.Text()
	}
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(data))
	file.Close()
}

func question(w http.ResponseWriter, r *http.Request) {
	file, err := os.Open("../data/comment.json")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var data string
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		data += scanner.Text()
	}
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Add("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(data))
	file.Close()
}
