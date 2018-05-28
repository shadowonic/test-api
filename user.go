package main

import (
	"fmt"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// User - Struct for user model
type User struct {
	UserName string        `form:"userName" json:"UserName" binding:"required"`
	Password string        `form:"password" json:"password" binding:"required"`
	ID       bson.ObjectId `json:"_id" bson:"_id"`
}

// PostRegister - register user with POST method
func PostRegister(c *gin.Context) {
	var json User

	if err := c.ShouldBindWith(&json, binding.JSON); err == nil {
		user := User{}
		if err := db.user.Find(bson.M{"username": json.UserName}).One(&user); err == nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"status": "Such user already exists"})
		} else {
			if err == mgo.ErrNotFound {
				if err := db.user.Insert(bson.M{"username": json.UserName, "password": json.Password}); err == nil {
					c.JSON(http.StatusOK, gin.H{"status": "registered"})
				}
			} else {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			}
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

}

// PostLogin - sigin user with POST method
func PostLogin(c *gin.Context) {
	var json User

	if err := c.ShouldBindWith(&json, binding.JSON); err == nil {
		user := User{}
		if err := db.user.Find(nil).One(&user); err == nil {
			if json.UserName == user.UserName && json.Password == user.Password {
				token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
					"UserName": user.UserName,
					"ID":       user.ID.Hex(),
					"date":     time.Now().Unix(),
				})

				// Sign and get the complete encoded token as a string using the secret
				if tokenString, err := token.SignedString(salt); err == nil {
					c.JSON(http.StatusOK, gin.H{"token": tokenString})
				} else {
					c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				}

			} else {
				c.JSON(http.StatusUnauthorized, gin.H{"status": "unauthorized"})
			}
			fmt.Println("User:", user)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

}
