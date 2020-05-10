const Order = require('../models/orders')

exports.get_all_orders = (req,res,next)=>{
    Order.find()
        .exec()
        .then(result=>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        })
}

exports.create_orders = (req,res,next)=>{
    Product.findById(req.body.productId)
        .exec()
        .then(product=>{
            if(!product){
                return res.status(404).json({
                    message:"Product not found!"
                })
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .then(result=>{
            console.log(result);
            res.status(200).json({
                message:"Order created",
                order:result
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
}

exports.find_order_by_id = (req,res,next)=>{
    Order.findById(req.params.orderId).exec()
    .then(result=>{
        if(result!=null){
             console.log(result);
             return res.status(200).json({
                     order:result
                  });
         }
         return res.status(404).json({
             message:"Order not found!"
         })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
 
 }

 exports.delete_order = (req,res,next)=>{
    Order.remove({_id:req.params.orderId}).exec()
    .then(result=>{
        res.status(200).json({
            message:"order deleted!"
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
}