var express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Item = require('../model/task');
var Router = express.Router();

Router.route("/")
    .get(function(req,res,next){
        Item.find({})
        .then((x)=>{
            res.statusCode = 200;
            res.json({status:true,tasks:x})
        })
    })
    .post(function(req,res,next){
        Item.create(req.body)
        .then((x)=>{
            res.statusCode = 200;
            res.json({status:true});
        })
    })
    .delete(function(req,res,next){
        Item.deleteMany({}).then((x)=>{
            res.statusCode = 200;
            res.json({status:true});
        })
    })
Router.route("/:id")
    .get(function(req,res,next){
        Item.findById(req.params.id)
        .then((x)=>{
            res.statusCode = 200;
            if(x!=null){
                res.json({status:true,task:x})
            }else{
                res.json({status:false})
            }
        })
    })
    .delete(function(req,res,next){
        Item.findByIdAndDelete(req.params.id).then((x)=>{
            res.statusCode = 200;
            res.json({status:true});
        })
    });
Router.put('/:id', (req, res) => {
        const { id } = req.params;
        const updateFields = req.body;
      
        console.log(id);
        console.log(updateFields);

        Item.findById(id).then((y)=>{
            if(y.completed==false){
                if(updateFields.completed==true){
                    Item.findByIdAndUpdate(id,{task:updateFields.task,completed:updateFields.completed, completed_time: Date.now()}).then((x)=>{
                        res.statusCode = 200;
                        res.json({status:true, completed:true});
                    })
                }else{
                    Item.findByIdAndUpdate(id,{task:updateFields.task}).then((x)=>{
                        res.statusCode = 200;
                        res.json({status:true, completed:false});
                    })
                }
            }else{
                res.statusCode = 200;
                res.json({status:false});
            }
        })
      });
module.exports = Router;