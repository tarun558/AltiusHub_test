const express = require('express');
const router = express.Router();

const Bussiness = require('../Models/BussinessSchema');

//create bussiness 
router.post('/create', async (req, res) => {
    const bussiness = new Bussiness({
        bussinessName: req.body.bussinessName,
        bussinessEmail: req.body.bussinessEmail,
        bussinessAddress: req.body.bussinessAddress,
    });
    try {
        const newBussiness = await bussiness.save();        
        res.status(201).json(newBussiness);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//getting all bussiness
router.get('/', async (req, res) => {
    try {
        const bussiness = await Bussiness.find();
        res.status(200).json(bussiness);        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//getting bussiness by id
router.get('/:id', async (req, res) => {
    try {
        const bussiness = await Bussiness.findById(req.params.id);
        res.status(200).json(bussiness);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//updating bussiness by id
router.put('/:id', async (req, res) => {
    try {
        const updatedBussiness = await Bussiness.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedBussiness);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//deleting bussiness by id
router.delete('/:id', async (req, res) => {
    try {
        const deletedBussiness = await Bussiness.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedBussiness);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;