const Pet = require('../models/pets.models');

module.exports ={
    displayAll: (req, res) => {
        Pet.find({})
        .sort({petType : "ascending"})
            .then((allPets) => {
                console.log(allPets);
                res.json(allPets)
            })
            .catch((err) => {
                console.log("error found in display all")
                console.log("error : " + err);
                res.json(err);
            })
    },

    create: (req, res) => {
        Pet.create(req.body)
            .then((newPet) => {
                console.log(newPet);
                res.json(newPet);
            })
            .catch((err) => {
                console.log("error found in create")
                console.log(err)
                res.json(err);
            })
    },

    getOne : (req, res) => {
        Pet.findById(req.params.id)
        .then((onePet) => {
            res.json(onePet)
        })
        .catch((err) => {
            res.json(err)
        })
    },

    edit: (req, res) => {
        Pet.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators : true, new: true })
            .then(updatedPet => res.json(updatedPet))
            .catch(err => res.json(err))
    },

    delete: (req, res) => {
        Pet.deleteOne({ _id: req.params.id })
            .then(deleteConfirmation => {
                console.log(deleteConfirmation);
                res.json(deleteConfirmation);
            })
            .catch((err) => {
                console.log('error found in delete')
                console.log(err);
                res.json(err)
            })
    }
}