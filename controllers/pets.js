// controllers/pets.js

const Pet = require('../models/pet.js');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
      const foundPets = await Pet.find();
      res.status(200).json(foundPets);
    } catch (error) {
      res.status(500).json({ error: error.message }); // 500 Internal Server Error
    }
  });
  

// CREATE - POST - /pets
router.post('/', async (req, res) => {
    try {
      const createdPet = await Pet.create(req.body);
      res.status(201).json(createdPet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // controllers/pets.js

// READ - GET - /pets/:petId
router.get('/:petId', async (req, res) => {
    try {
      const foundPet = await Pet.findById(req.params.petId);
      if (!foundPet) {
        res.status(404);
        throw new Error('Pet not found.');
      }
      res.status(200).json(foundPet);
    } catch (error) {
      if (res.statusCode === 404) {
        res.json({ error: error.message });
      } else {
        // Add else statement to handle all other errors
        res.status(500).json({ error: error.message });
      }
    }
  });

  router.delete('/:petId', async (req, res) => {
    try {
      const deletedPet = await Pet.findByIdAndDelete(req.params.petId); // Corrected typo
      if (!deletedPet) {
        res.status(404); // Corrected status code setting
        throw new Error('Pet not found');
      }
      res.status(200).json(deletedPet);
    } catch (error) {
      if (res.statusCode === 404) {
        res.json({ error: error.message });
      } else {
        // Add else statement to handle all other errors
        res.status(500).json({ error: error.message });
      }
    }
  });

  router.put('/:petId', async (req, res) => {

    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body); // Corrected typo
        if (!updatedPet) {
          res.status(404); // Corrected status code setting
          throw new Error('Pet not found');
        }
        res.status(200).json(updatedPet);
      } catch (error) {
        if (res.statusCode === 404) {
          res.json({ error: error.message });
        } else {
          // Add else statement to handle all other errors
          res.status(500).json({ error: error.message });
        }
      }
  });


  
  module.exports = router;

  
