const express = require("express");
const router = express.Router();
const Order = require("../model/orderModel");

// Create a new order
router.post("/create", async (req, res) => {
  try {
    const { user, items, totalAmount, totalQuantity, address } = req.body;

    const newOrder = new Order({
      user,
      items,
      totalAmount,
      totalQuantity,
      address,
    });

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error creating order", error });
  }
});

// Get all orders for a user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate(
      "user"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

module.exports = router;
