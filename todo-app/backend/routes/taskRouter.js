var express = require('express');
var Item = require('../model/task');
var Router = express.Router();

Router.route("/")
    .get(function(req,res,next){
        try{
            Item.find({})
            .then((x)=>{
                res.statusCode = 200;
                res.json({status:true,tasks:x});
            })
        }
        catch(error){
            res.statusCode = 500;
            res.json({status:false,tasks:[]})
        }
    })
    .post(function(req,res,next){
        try{
            Item.create(req.body)
            .then((x)=>{
                res.statusCode = 200;
                res.json({status:true});
            })
        }
        catch(error){
            res.statusCode = 500;
            res.json({status:false})
        }
    })
    .delete(function(req,res,next){
        try{
            Item.find({}).then((data)=>{
                if(data.length>0){
                    Item.deleteMany({}).then((x)=>{
                        res.statusCode = 200;
                       res.json({status:true});
                    })
                }else{
                    res.statusCode = 200;
                    res.json({status:false});
                }
            })
        }catch(error){
            res.statusCode = 500;
            res.json({status:false})
        }
    })
Router.route("/:id")
    .get(function(req,res,next){
        try{
            Item.findById(req.params.id)
            .then((x)=>{
                res.statusCode = 200;
                if(x!=null){
                    res.json({status:true,task:x})
                }else{
                    res.json({status:false})
                }
            })
            .catch((err)=>{
                res.statusCode = 200;
                res.json({status:false});  
            })
        }
        catch(error){
            res.statusCode = 500;
            res.json({status:false})
        }
    })
    .delete(function(req,res,next){
        try{
            Item.findByIdAndDelete(req.params.id).then((x)=>{
                res.statusCode = 200;
                res.json({status:true});
            })
            .catch((err)=>{
                res.statusCode = 200;
                res.json({status:false});
            })
        }
        catch(error){
            res.statusCode = 500;
            res.json({status:false})
        }
    });
Router.put('/:id', (req, res) => {
        try{
            const { id } = req.params;
            const updateFields = req.body;

            Item.findById(id).then((y)=>{
                if(y.completed==false){
                    try{
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
                    }
                    catch(error){
                        res.statusCode = 500;
                        res.json({status:false, completed:false})
                    }
                }else{
                    res.statusCode = 200;
                    res.json({status:false});
                }
            })
        }catch(error){
            res.statusCode = 500;
            res.json({status:false})
        }
      });
module.exports = Router;