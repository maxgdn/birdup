package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"
	"os"
	"mime"
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

func (a *App) FetchHandler(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	err := a.Minio.Client.FGetObjectWithContext(ctx, a.Minio.Bucket, "myobject", "/tmp/myobject", minio.GetObjectOptions{})
	if err != nil {
		fmt.Println(err)
		return
	}
}

func (a *App) UploadHandler(w http.ResponseWriter, r *http.Request) {
	multiErr := r.ParseMultipartForm(32 << 20)
	if multiErr != nil {
		http.Error(w, "failed to parse multipart message", http.StatusBadRequest)
	}

	file, handler, err := r.FormFile("bundle")
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

	tmpFile, err := ioutil.TempFile("birdup", handler.Filename)
	if err != nil {
		fmt.Println(err)
	}

	if _, err := tmpFile.Write(fileBytes); err != nil {
		log.Fatal(err)
	}

	defer os.Remove(tmpFile.Name())

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
	endpoint := ""
	accessKeyID := ""
	secretAccessKey := ""
	useSSL := true

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
	log.Fatal(http.ListenAndServe(":8000", app.Router))

}
