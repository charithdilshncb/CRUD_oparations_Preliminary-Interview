const Cat = require('../models/CatModel');
const https = require('https');
const { response } = require('express');
const fs = require('fs');
const { time } = require('console');

exports.createCat = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Cat Details can not be empty" });
    }
    const cat = new Cat({ catName: req.body.catName, catAge: req.body.catAge, category: req.body.category, imageURl: req.body.imageURl });
    saveImage(cat.imageURl).then( imgPath => {
        cat.imageURl = `/${imgPath}`;
        cat.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while creating the Cat." });
            });
    })    
};


exports.findCat = (req, res) => {
    Cat.findById(req.params._id)
        .then(cat => {
            if (!cat) {
                return res.status(404).send({ message: "Cat not found with id " + req.params._id });
            }
            res.send(cat);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "Cat not found with id " + req.params._id });
            }
            return res.status(500).send({ message: "Error retrieving cat with id " + req.params._id });
        });
};


exports.findAll = (req, res) => {
    Cat.find()
        .then(cats => {
            res.send(cats);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving cats." });
        });
};


exports.updateCat = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Cat content can not be empty" });
    }

    Cat.findByIdAndUpdate(req.params._id, { catName: req.body.catName, catAge: req.body.catAge, category: req.body.category }, { new: true })
        .then(cat => {
            if (!cat) {
                return res.status(404).send({ message: "Cat not found with id " + req.params._id });
            }
            res.send(cat);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "Cat not found with id " + req.params._id });
            }
            return res.status(500).send({ message: "Error updating cat with id " + req.params._id });
        });
};


exports.deleteCat = (req, res) => {
    Cat.findByIdAndRemove(req.params._id)
        .then(cat => {
            if (!cat) {
                return res.status(404).send({ message: "Cat not found with id " + req.params._id });
            }
            res.send({ message: "Cat deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({ message: "Cat not found with id " + req.params._id });
            }
            return res.status(500).send({ message: "Could not delete Cat with id " + req.params._id });
        });
};

function saveImage (url){
    return new Promise((resolve) => {
        var fileUrl = url;
        var path = 'CatImages/' + Date.now() + ".png" ;
        var localpath = fs.createWriteStream(path);
    
        var request = https.get(fileUrl, (response) => {
            response.pipe(localpath);
            resolve(path)
        } )
    })
    
}
