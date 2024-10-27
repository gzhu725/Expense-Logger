const express = require('express');
const router = express.Router();
// include the retrieval structure from the model
const Model = require('../model/model');

// POST Method to add a new receipt
router.post('/post', async (req, res) => {
    try {
        // Create a new document based on the request data
        const data = new Model({
            store: {
                name: req.body.store.name,
                address: req.body.store.address || "N/A",
                webpage: req.body.store.webpage || "N/A",
            },
            order: {
                name: req.body.order.name,
                password: req.body.order.password,
                username: req.body.order.username,
            },
            purchasedItems: req.body.purchasedItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                notes: item.notes || "N/A",
                currency: item.currency,
                date: item.date ? new Date(item.date) : Date.now()
            }))
        });

        // Save the document to the database
        const savedData = await data.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Data not found' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
});

// Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const updatedData = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedData) return res.status(404).json({ message: 'Data not found' });
        res.json(updatedData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedData = await Model.findByIdAndDelete(req.params.id);
        if (!deletedData) return res.status(404).json({ message: 'Data not found' });
        res.json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router