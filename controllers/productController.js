const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            data: products,
            message: 'Products fetched successfully',
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Create product
exports.createProduct = async (req, res) => {
    try {
        const { price, brand, color, category, stock } = req.body;
        const newProduct = new Product({ price, brand, color, category, stock });
        await newProduct.save();

        res.status(201).json({
            message: 'Product created successfully',
            data: newProduct,
            success: true
        });
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message, success: false });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message, success: false });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            data: deletedProduct,
            success: true
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message, success: false });
    }
};