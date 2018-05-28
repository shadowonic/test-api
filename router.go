package main

import (
	"fmt"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	cors "github.com/itsjamie/gin-cors"
	"gopkg.in/mgo.v2/bson"
)

// DB some description
var DB = make(map[string]string)
var salt = []byte("1I44CkeCZ7mFrQEOkTEhbKadRIjAoDFf")

// AuthUserKey - key for user in context
var AuthUserKey = "user"

// JWTTokenClaims - type for jwt token claims
type JWTTokenClaims struct {
	UserName string        `json:"UserName"`
	ID       bson.ObjectId `json:"id" bson:"_id"`
	jwt.StandardClaims
}

// SetupRouter - make router setup
func SetupRouter() *gin.Engine {

	r := gin.Default()
	r.Use(cors.Middleware(cors.Config{
		Origins:         "http://localhost:4200, http://test.clubdev.ru",
		Methods:         "GET, PUT, POST, DELETE",
		RequestHeaders:  "Origin, Authorization, Content-Type, X-productID, X-perPage, X-page",
		ExposedHeaders:  "",
		MaxAge:          50 * time.Second,
		Credentials:     true,
		ValidateHeaders: false,
	}))

	r.Use(static.Serve("/", static.LocalFile(PublicPath, false)))

	authorized := r.Group("/", func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		token, _ := jwt.ParseWithClaims(tokenString, &JWTTokenClaims{}, func(token *jwt.Token) (interface{}, error) {
			return salt, nil
		})

		if claims, ok := token.Claims.(*JWTTokenClaims); ok && token.Valid {
			fmt.Printf("%v %v", claims.UserName, claims.StandardClaims.ExpiresAt)
			user := User{}
			if err := db.user.FindId(claims.ID).One(&user); err == nil {
				c.Set(AuthUserKey, user)
			} else {
				c.AbortWithStatus(http.StatusUnauthorized)
			}
		} else {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

	})

	// user routes
	r.POST("/register", PostRegister)
	r.POST("/login", PostLogin)

	// product routes
	authorized.POST("/product", PostProduct)
	r.GET("product/:id", GetProductByID)
	r.GET("product", GetProductList)

	// comment routes
	authorized.POST("/comment", PostComment)
	r.GET("comment/:id", GetCommentByID)
	r.GET("comment", GetCommentList)

	// rate routes
	authorized.POST("/rate", PostRate)
	return r
}
