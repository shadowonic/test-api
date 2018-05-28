package main

import (
	"os"
)

// RootPath - defining root for current project
var RootPath = os.Getenv("POST_PATH")

// PublicPath - defining path for public dir
var PublicPath = RootPath + "/public"

// ImagesPath - defining path for images
var ImagesPath = PublicPath + "/images"

// ImagesURL - defining url for images
var ImagesURL = "/images"

func main() {
	os.MkdirAll(ImagesPath, os.ModePerm)

	defer setupDB().Close()
	r := SetupRouter()

	r.Run(":8081")
}
