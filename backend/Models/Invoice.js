//schema for invoice as mentioned in sheet 
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
    unique: true
  },
  invoiceItems: [
    {
      productId: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        validate: {
          validator: (value) => value > 0
        }
      },
      price: {
        type: Number,
        required: true,
        validate: {
          validator: (value) => value > 0
        }
      },
      amount: {
        type: Number,
        required: true,
        validate: {
          validator: (value) => value === this.price * this.quantity && value > 0
        }
      }
    }
  ],
  invoiceBillSundryAmount: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value >= 0
    }
  },
  totalAmount: {
    type: Number,
    required: true,
    validate: {
      validator: function() {
        const total = this.invoiceItems.reduce((acc, item) => acc + item.amount, 0) + this.invoiceBillSundryAmount;
        return total === this.totalAmount;
      }
    }
  }
});

module.exports = mongoose.model('Invoice', invoiceSchema);