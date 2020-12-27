const slugify = require('slugify')

const Sub = require('../models/sub')


exports.create = (req, res) => {
    const {name} = req.body
    new Sub({name, slug: slugify(name)})
        .save()
        .then(sub=>res.json(sub))
        .catch(err=>res.status(400).send("Creation failed"))
}

exports.read = (req, res) => {
    Sub.findOne({slug: req.params.slug})
        .exec()
        .then(data=>res.json(data))
}

exports.list = (req, res) => {
    Sub.find({}).sort({createdAt: -1})
        .exec()
        .then(data=>res.json(data))
}

exports.update = (req, res) => {
    const {name} = req.body
    Sub.findOneAndUpdate(
        {slug: req.params.slug}, 
        {name, slug: slugify(name)},
        {new: true})
        .then(sub=>res.json(sub))
        .catch(err=>res.status(400).send("Update failed"))
}

exports.remove = (req, res) => {
    Sub.findOneAndDelete({slug: req.params.slug})
        .then(()=>res.status(202).send())
        .catch(err=>res.status(400).send("Creation failed"))
}