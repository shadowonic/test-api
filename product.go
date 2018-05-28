package main

import (
	"net/http"
	"path/filepath"

	"github.com/fatih/structs"
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2/bson"
)

// Product - struct returning to user
type Product struct {
	ID         bson.ObjectId `bson:"_id" json:"_id"`
	Title      string        `bson:"title" json:"title" structs:"title"`
	ImageURL   string        `bson:"imageURL" json:"imageURL" structs:"imageURL"`
	ImagePath  string        `bson:"imagePath" json:"-" structs:"imagePath"`
	Text       string        `bson:"text" json:"text" structs:"text"`
	VotesCount int           `bson:"votesCount" json:"votesCount" structs:"votesCount"`
	Rate       float64       `bson:"rate" json:"rate" structs:"rate"`
}

// SetRate - set rate to product
func (p Product) SetRate(rate int, oldRate Rate) {
	var newCount int
	var newRate float64
	isNew := !bson.IsObjectIdHex(oldRate.ID.Hex())
	if isNew {
		newCount = p.VotesCount + 1
		newRate = (float64(p.VotesCount)*p.Rate + float64(rate)) / float64(newCount)
	} else {
		newCount = p.VotesCount
		newRate = (float64(p.VotesCount)*p.Rate - float64(oldRate.Rate) + float64(rate)) / float64(newCount)
	}

	product := structs.Map(p)
	product["votesCount"] = newCount
	product["rate"] = newRate
	db.product.UpdateId(p.ID, product)
}

// PostProduct - create new product whith POST method
func PostProduct(c *gin.Context) {
	image, imgErr := c.FormFile("image")
	title := c.PostForm("title")
	text := c.PostForm("text")

	productID := bson.NewObjectId()

	product := bson.M{
		"_id":   productID,
		"title": title,
		"text":  text,
	}

	imageName := ""
	imagePath := ""
	imageURL := ""

	if imgErr == nil {
		ext := filepath.Ext(image.Filename)
		imageName = productID.Hex() + ext
		imagePath = ImagesPath + "/" + imageName
		imageURL = ImagesURL + "/" + imageName
		product["imageURL"] = imageURL
		product["imagePath"] = imagePath
	}

	if err := db.product.Insert(product); err == nil {
		if imagePath != "" {
			c.SaveUploadedFile(image, imagePath)
		}
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

// GetProductByID - get product by it's id
func GetProductByID(c *gin.Context) {
	id := bson.ObjectIdHex(c.Params.ByName("id"))
	product := Product{}
	if err := db.product.FindId(id).One(&product); err == nil {
		c.JSON(http.StatusOK, gin.H{"product": product})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

}

// GetProductList - get list of products
func GetProductList(c *gin.Context) {
	var products []Product
	if err := db.product.Find(nil).All(&products); err == nil {
		c.JSON(http.StatusOK, gin.H{"products": products})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}
