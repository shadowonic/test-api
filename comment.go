package main

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"gopkg.in/mgo.v2/bson"
)

// Comment - comment model
type Comment struct {
	ID        bson.ObjectId `json:"_id" bson:"_id"`
	ProductID bson.ObjectId `form:"productID" json:"productID" bson:"productID" binding:"required"`
	UserID    bson.ObjectId `json:"userID" bson:"userID"`
	Body      string        `form:"body" json:"body" bson:"body" binding:"required"`
	Timestamp int           `json:"timestamp" bson:"timestamp"`
}

// PostComment - create new comment whith POST method
func PostComment(c *gin.Context) {
	var json Comment
	var user, _ = c.Get(AuthUserKey)

	if err := c.ShouldBindWith(&json, binding.JSON); err == nil {
		if err := db.comment.Insert(bson.M{
			"userID":    user.(User).ID,
			"productID": json.ProductID,
			"body":      json.Body,
			"timestamp": time.Now().Unix(),
		}); err == nil {
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

}

// GetCommentByID - get product by it's id
func GetCommentByID(c *gin.Context) {
	id := bson.ObjectIdHex(c.Params.ByName("id"))
	comment := Comment{}
	if err := db.comment.FindId(id).One(&comment); err == nil {
		c.JSON(http.StatusOK, gin.H{"comment": comment})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

}

// GetCommentList - get list of products
func GetCommentList(c *gin.Context) {
	var comments []Comment
	productID := c.GetHeader("X-productID")
	page, _ := strconv.Atoi(c.GetHeader("X-page"))
	perPage, _ := strconv.Atoi(c.GetHeader("X-perPage"))
	if page == 0 {
		page = 1
	}
	if perPage == 0 {
		perPage = 10
	}
	filter := bson.M{}
	if productID != "" {
		filter["productID"] = bson.ObjectIdHex(productID)
	}
	q := db.comment.Find(filter)
	q.Limit(perPage)
	q.Skip((page - 1) * perPage)
	if err := q.All(&comments); err == nil {
		c.JSON(http.StatusOK, gin.H{"comments": comments})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}
