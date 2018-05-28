package main

import (
	"net/http"
	"time"

	"gopkg.in/mgo.v2"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"gopkg.in/mgo.v2/bson"
)

// Rate - rate struct
type Rate struct {
	ID        bson.ObjectId `json:"_id" bson:"_id"`
	UserID    bson.ObjectId `json:"userID" bson:"userID"`
	Timestamp int           `json:"timestamp" bson:"timestamp"`
	ProductID bson.ObjectId `form:"productID" json:"productID" bson:"productID" binding:"required"`
	Rate      int           `form:"rate" json:"rate" bson:"rate" binding:"required,max=5,min=1"`
}

// PostRate - apply rate to product
func PostRate(c *gin.Context) {
	var json Rate
	var user, _ = c.Get(AuthUserKey)
	var rate = Rate{}
	if err := c.ShouldBindWith(&json, binding.JSON); err == nil {
		if err := db.rate.Find(bson.M{
			"userID":    user.(User).ID,
			"productID": json.ProductID,
		}).One(&rate); err != nil && err != mgo.ErrNotFound {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			c.Abort()
		}

		if _, err := db.rate.Upsert(
			bson.M{
				"userID":    user.(User).ID,
				"productID": json.ProductID,
			},
			bson.M{
				"userID":    user.(User).ID,
				"timestamp": time.Now().Unix(),
				"productID": json.ProductID,
				"rate":      json.Rate,
			},
		); err == nil {
			product := Product{}
			if err := db.product.FindId(json.ProductID).One(&product); err == nil {
				product.SetRate(json.Rate, rate)
			}
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		}

	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}
