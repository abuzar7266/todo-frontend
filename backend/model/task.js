var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Item = new Schema({
    task:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    creation_time:{
        type:Date,
        default:Date.now()
    },
    completed_time:{
        type:Date,
        default:Date.now()
    }
});
module.exports = mongoose.model('Item', Item);