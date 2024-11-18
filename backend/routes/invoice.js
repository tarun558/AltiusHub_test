//apis for invoice all methods
const express = require('express');
const router = express.Router();

const Invoice = require('../Models/Invoice');

//Create a new invoice. 
router.post('/create', async (req, res) => {
    const invoice = new Invoice({
        invoiceId: req.body.invoiceId,
        invoiceItems: req.body.invoiceItems,
        invoiceBillSundryAmount: req.body.invoiceBillSundryAmount,
        totalAmount: req.body.totalAmount,
    });
    try {
        const newInvoice = await invoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//getting all invoices 
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update an existing invoice. 
router.put('/:id', async (req, res) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete an invoice. 
router.delete('/:id', async (req, res) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Retrieve a specific invoice by its ID. 
router.get('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        res.status(200).json(invoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//List all invoices, with support for pagination and filtering. 
router.get('/search', async (req, res) => {
    try {
        const invoices = await Invoice.find(req.query);
        res.status(200).json(invoices);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Implement an endpoint to handle the bulk creation of invoices. 
router.post('/bulk-create', async (req, res) => {
    try {
        const newInvoices = await Invoice.insertMany(req.body);
        res.status(201).json(newInvoices);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;