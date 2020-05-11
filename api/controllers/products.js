const Product = require('../models/products');

// query string can be passed. 
// query params name should be same as fields in db collections
exports.get_all_products = (req,res,next)=>{
    
    var query = req.query;
    Product.find(query)
    .then(docs=>{
        const response = {
            count: docs.length,
            products:docs
        }
        res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
    
}

exports.get_products_by_category = (req,res,next)=>{
    const category =req.query.category;
    const subCategory = req.query.subCategory;
    const query = {
        "category":category,
        "subCategory":subCategory
    }
    console.log('hello'+category, subCategory);
    Product.find(query)
    .then(docs=>{
        const response = {
            count: docs.length,
            products:docs
        }
        res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
}

exports.add_product = (req,res,next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        subCategory: req.body.subCategory
    });
    product.save()
    .then(result => {
        res.status(200).json({
            message: "Product added successfully.",
            createdProduct:product
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.find_product_by_id = (req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .then(doc=>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

// req body should be iterable and passed like this
// [
// 	{
// 	 "propName":"title",
// 	 "value": "wand vibrator"
// 	}
// ]
exports.update_product = (req,res,next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id:id},
        {$set:updateOps})
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
        });
}

exports.remove_product = (req,res,next)=>{
    const id = req.params.productId;
    Product.remove({_id:id})
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
    });
}