package main

import (
	"context"
	"fmt"
	"bufio"
	"io/ioutil"
	"log"
	"net/http"
	"time"
	"os"
	"mime"
	"encoding/json"
	"encoding/base64"
	"github.com/gorilla/mux"
	"github.com/minio/minio-go/v6"
)

type MinioConnection struct {
	Client *minio.Client
	Bucket string
}
type App struct {
	Router *mux.Router
	Minio  MinioConnection
}

type FetchContent struct {
	File string `json:"file"` 
}

type FetchQuery struct {
	Id string `json:"id"` 
}

func (a *App) FetchHandler(w http.ResponseWriter, r *http.Request) {
	
	var t FetchQuery

	enflated, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(enflated, &t)

	if err != nil {
        panic(err.Error())
    }

	log.Println(t.Id)

	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()
	tmpStr := "/tmp/" + string(t.Id)
	log.Println(tmpStr)
	err = a.Minio.Client.FGetObjectWithContext(ctx, a.Minio.Bucket, t.Id, tmpStr, minio.GetObjectOptions{})
	if err != nil {
		fmt.Println(err)
		return
	}

	f, _ := os.Open(tmpStr)

	reader := bufio.NewReader(f)
    content, _ := ioutil.ReadAll(reader)

    // Encode as base64.
    encoded := base64.StdEncoding.EncodeToString(content)

	data := FetchContent{File: encoded}

	err = os.Remove(tmpStr)  
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(data)
}

func (a *App) UploadHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Upload hit")
	multiErr := r.ParseMultipartForm(32 << 20)
	if multiErr != nil {
		http.Error(w, "failed to parse multipart message", http.StatusBadRequest)
	}

	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "failed to parse multipart message", http.StatusBadRequest)
		return
	}

	defer file.Close()
	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)

	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Successfully Uploaded File")

	tmpFile, err := ioutil.TempFile("", handler.Filename)
	if err != nil {
		fmt.Println(err)
	}

	if _, err := tmpFile.Write(fileBytes); err != nil {
		log.Fatal(err)
	}

	defer os.Remove(tmpFile.Name())
	fmt.Println("FileName")
	fmt.Println(tmpFile.Name())
	mediaType, _, err := mime.ParseMediaType(handler.Header.Get("Content-Type"))
	// Upload the zip file
	objectName := handler.Filename
	filePath := tmpFile.Name()
	contentType := mediaType

	// Upload the zip file with FPutObject
	n, err := a.Minio.Client.FPutObject(a.Minio.Bucket, objectName, filePath, minio.PutObjectOptions{ContentType: contentType})
	if err != nil {
		log.Fatalln(err)
	}

	log.Printf("Successfully uploaded %s of size %d\n", objectName, n)

	w.Write([]byte("Success!"))
}

func Init() MinioConnection {
	endpoint := "localhost:9001"
	accessKeyID := "minio"
	secretAccessKey := "minio123"
	useSSL := false

	// Initialize minio client object.
	minioClient, err := minio.New(endpoint, accessKeyID, secretAccessKey, useSSL)
	if err != nil {
		log.Fatalln(err)
	}

	// Make a new bucket called birdup.
	bucketName := "birdup"
	location := "local"

	err = minioClient.MakeBucket(bucketName, location)
	if err != nil {
		// Check to see if we already own this bucket (which happens if you run this twice)
		exists, errBucketExists := minioClient.BucketExists(bucketName)
		if errBucketExists == nil && exists {
			log.Printf("We already own %s\n", bucketName)
		} else {
			log.Fatalln(err)
		}
	} else {
		log.Printf("Successfully created %s\n", bucketName)
	}

	return MinioConnection{Client: minioClient, Bucket: bucketName}
}

func main() {
	//get all of these from Dockerfile config listed in compose

	var app = &App{Minio: Init(), Router: mux.NewRouter()}

	app.Router.HandleFunc("/upload", app.UploadHandler)
	app.Router.HandleFunc("/fetch", app.FetchHandler)

	// Bind to a port and pass our router in
	log.Fatal(http.ListenAndServe(":8081", app.Router))

}
