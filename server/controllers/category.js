const slugify = require('slugify')

const Category = require('../models/category')


exports.create = (req, res) => {
    const {name} = req.body
    new Category({name, slug: slugify(name)})
        .save()
        .then(category=>res.json(category))
        .catch(err=>res.status(400).send("Creation failed"))
}

exports.read = (req, res) => {
    Category.findOne({slug: req.params.slug})
        .exec()
        .then(data=>res.json(data))
}

exports.list = (req, res) => {
    Category.find({}).sort({createdAt: -1})
        .exec()
        .then(data=>res.json(data))
}

exports.update = (req, res) => {
    const {name} = req.body
    Category.findOneAndUpdate(
        {slug: req.params.slug}, 
        {name, slug: slugify(name)},
        {new: true})
        .then(category=>res.json(category))
        .catch(err=>res.status(400).send("Update failed"))
}

exports.remove = (req, res) => {
    Category.findOneAndDelete({slug: req.params.slug})
        .then(()=>res.status(202).send())
        .catch(err=>res.status(400).send("Creation failed"))
}