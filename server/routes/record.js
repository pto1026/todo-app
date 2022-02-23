const express = require('express')

const recordRoutes = express.Router()
const dbo = require('../db/conn')
const ObjectId = require('mongodb').ObjectId

// List all todos
recordRoutes.route('/record').get(function (req, res) {
    let db_connect = dbo.getDb('todos')
    db_connect
        .collection('todos')
        .find({})
        .toArray(function (err, result) {
            if (err) throw err
            res.json(result)
        })
})

// Get a single todo by id
recordRoutes.route('/record/:id').get(function (req, res) {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    db_connect
        .collection('todos')
        .findOne(myquery, function (err, result) {
            if (err) throw err
            res.json(result)
        })
})

// Create new todo
recordRoutes.route('/record/add').post(function (req, response) {
    let db_connect = dbo.getDb()
    let myobj = {
        todo_title: req.body.todo_title,
        todo_details: req.body.todo_details,
        todo_status: req.body.todo_status
    }
    db_connect.collection('todos').insertOne(myobj, function (err, res) {
        if (err) throw err
        response.json(res)
    })
})

recordRoutes.route('/update/:id').post(function (req, response) {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    let newValues = {
        $set: {
            todo_title: req.body.todo_title,
            todo_details: req.body.todo_details,
            todo_status: req.body.todo_status
        }
    }
    db_connect
        .collection('todos')
        .updateOne(myquery, newValues, function (err, res) {
            if (err) throw err
            console.log('1 document updated')
            response.json(res)
        })
})

// Delete a todo
recordRoutes.route('/:id').delete((req, response) => {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) }
    db_connect.collection('todos').deleteOne(myquery, function (err, obj) {
        if (err) throw err
        console.log('1 document deleted')
        response.status(obj)
    })
})

module.exports = recordRoutes