const PetController = require('../controller/pets.controller');

module.exports = (app) => {
    app.get('/api/pets', PetController.displayAll);
    app.post('/api/pet', PetController.create);
    app.get('/api/pet/:id', PetController.getOne)
    app.put('/api/:id/edit', PetController.edit);
    app.delete('/api/pet/:id', PetController.delete);
}