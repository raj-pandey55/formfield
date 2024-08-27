// src/components/CreateProduct.jsx
import React, { useState } from 'react';
import { createProduct } from '../api/api'; 
import { TextField, Button, Checkbox, Grid2, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    storeId: '',
    stock: 5,
    isCustomOrder: false,
    offers: '',
    tags: '',
    category: '',
    department: '',
    priceOriginal: '',
    priceDiscount: '',
    priceTax: 8,
    rating: 0,
    noOfLikes: 0,
    noOfReviews: 0,
    orderCount: 0,
    bestSelling: false,
    specificationsSingleOptions: '',
    specificationsMultipleOptions: '',
    highlights: '',
    policy: '',
    detailedImages: '',
    infoHighlightDocument: '',
    infoPolicyDocument: '',
    details: '',
    urlImages: '',
    urlDocuments: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await createProduct(formData.storeId, formData, token);
      navigate('/product'); // Navigate to product list or another appropriate page
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ mt: 3, flex: 1 }}>
        <Typography variant="h4">Create New Product</Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            {/* Name */}
            <Grid2 item xs={12}>
              <TextField
                label="Product Name"
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Grid2>

            {/* Store ID */}
            <Grid2 item xs={12}>
              <TextField
                label="Store ID"
                name="storeId"
                fullWidth
                required
                value={formData.storeId}
                onChange={handleChange}
              />
            </Grid2>

            {/* Category */}
            <Grid2 item xs={12}>
              <TextField
                label="Category"
                name="category"
                fullWidth
                required
                value={formData.category}
                onChange={handleChange}
              />
            </Grid2>

            {/* Department */}
            <Grid2 item xs={12}>
              <TextField
                label="Department"
                name="department"
                fullWidth
                required
                value={formData.department}
                onChange={handleChange}
              />
            </Grid2>

            {/* Stock */}
            <Grid2 item xs={12}>
              <TextField
                label="Stock"
                name="stock"
                type="number"
                fullWidth
                value={formData.stock}
                onChange={handleChange}
              />
            </Grid2>

            {/* Custom Order */}
            <Grid2 item xs={12}>
              <Checkbox
                name="isCustomOrder"
                checked={formData.isCustomOrder}
                onChange={handleChange}
              />
              Custom Order Available
            </Grid2>

            {/* Offers */}
            <Grid2 item xs={12}>
              <TextField
                label="Offers"
                name="offers"
                fullWidth
                value={formData.offers}
                onChange={handleChange}
              />
            </Grid2>

            {/* Tags */}
            <Grid2 item xs={12}>
              <TextField
                label="Tags"
                name="tags"
                fullWidth
                value={formData.tags}
                onChange={handleChange}
              />
            </Grid2>

            {/* Price (Original, Discount, Tax) */}
            <Grid2 item xs={4}>
              <TextField
                label="Original Price"
                name="priceOriginal"
                type="number"
                fullWidth
                required
                value={formData.priceOriginal}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={4}>
              <TextField
                label="Discount Price"
                name="priceDiscount"
                type="number"
                fullWidth
                required
                value={formData.priceDiscount}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={4}>
              <TextField
                label="Tax (%)"
                name="priceTax"
                type="number"
                fullWidth
                value={formData.priceTax}
                onChange={handleChange}
              />
            </Grid2>

            {/* Rating, Likes, Reviews */}
            <Grid2 item xs={4}>
              <TextField
                label="Rating"
                name="rating"
                type="number"
                fullWidth
                value={formData.rating}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={4}>
              <TextField
                label="Number of Likes"
                name="noOfLikes"
                type="number"
                fullWidth
                value={formData.noOfLikes}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={4}>
              <TextField
                label="Number of Reviews"
                name="noOfReviews"
                type="number"
                fullWidth
                value={formData.noOfReviews}
                onChange={handleChange}
              />
            </Grid2>

            {/* Selling Info */}
            <Grid2 item xs={6}>
              <TextField
                label="Order Count"
                name="orderCount"
                type="number"
                fullWidth
                value={formData.orderCount}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={6}>
              <Checkbox
                name="bestSelling"
                checked={formData.bestSelling}
                onChange={handleChange}
              />
              Best Selling
            </Grid2>

            {/* Specifications */}
            <Grid2 item xs={6}>
              <TextField
                label="Specifications (Single Options)"
                name="specificationsSingleOptions"
                fullWidth
                value={formData.specificationsSingleOptions}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={6}>
              <TextField
                label="Specifications (Multiple Options)"
                name="specificationsMultipleOptions"
                fullWidth
                value={formData.specificationsMultipleOptions}
                onChange={handleChange}
              />
            </Grid2>

            {/* Info */}
            <Grid2 item xs={6}>
              <TextField
                label="Highlights"
                name="highlights"
                fullWidth
                value={formData.highlights}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={6}>
              <TextField
                label="Policy"
                name="policy"
                fullWidth
                value={formData.policy}
                onChange={handleChange}
              />
            </Grid2>

            {/* Documents */}
            <Grid2 item xs={6}>
              <TextField
                label="Info Highlight Document"
                name="infoHighlightDocument"
                fullWidth
                value={formData.infoHighlightDocument}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={6}>
              <TextField
                label="Info Policy Document"
                name="infoPolicyDocument"
                fullWidth
                value={formData.infoPolicyDocument}
                onChange={handleChange}
              />
            </Grid2>

            {/* Details */}
            <Grid2 item xs={12}>
              <TextField
                label="Details"
                name="details"
                fullWidth
                multiline
                rows={4}
                value={formData.details}
                onChange={handleChange}
              />
            </Grid2>

            {/* URLs */}
            <Grid2 item xs={6}>
              <TextField
                label="Image URLs"
                name="urlImages"
                fullWidth
                value={formData.urlImages}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item xs={6}>
              <TextField
                label="Document URLs"
                name="urlDocuments"
                fullWidth
                value={formData.urlDocuments}
                onChange={handleChange}
              />
            </Grid2>

            {/* Detailed Images */}
            <Grid2 item xs={12}>
              <TextField
                label="Detailed Images"
                name="detailedImages"
                fullWidth
                value={formData.detailedImages}
                onChange={handleChange}
              />
            </Grid2>

            {/* Submit Button */}
            <Grid2 item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Box>
  );
};

export default CreateProduct;
