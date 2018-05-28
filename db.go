package main

import (
	mgo "gopkg.in/mgo.v2"
)

// Tdb - database
type Tdb struct {
	user, comment, product, rate *mgo.Collection
}

var db Tdb

func setupDB() *mgo.Session {
	session, err := mgo.Dial("mongodb://mongo:27017")
	if err != nil {
		panic(err)
	}
	// defer session.Close()

	// Optional. Switch the session to a monotonic behavior.
	session.SetMode(mgo.Monotonic, true)

	dbConnection := session.DB("test-api")

	db.user = dbConnection.C("user")
	db.comment = dbConnection.C("comment")
	db.product = dbConnection.C("product")
	db.rate = dbConnection.C("rate")

	return session
}
