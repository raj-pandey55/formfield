// src/components/ServiceForm.jsx
import React, { useState } from 'react';
import { createService } from '../api/api'; 
import { TextField, Button, Checkbox, Grid2, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const CreateService = () => {
  const [formData, setFormData] = useState({
    name: '',
    storeId: '',
    category: '',
    offers: '',
    tags: '',
    isHomeAvailable: false,
    providerAddress: '',
    priceOriginal: '',
    priceDiscount: '',
    priceTax: 8,
    rating: 0,
    noOfLikes: 0,
    noOfReviews: 0,
    orderCount: 0,
    bestSelling: false,
    availablity: '',
  });

  const navigate  = useNavigate();

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
      await createService(formData.storeId, formData, token);
      navigate('/');
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  return (
    <Box sx={{display: "flex"}}>
    <Sidebar/>
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4">Create New Service</Typography>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={2}>
          {/* Name */}
          <Grid2 item xs={12}>
            <TextField
              label="Service Name"
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

          {/* Is Home Available */}
          <Grid2 item xs={12}>
            <Checkbox
              name="isHomeAvailable"
              checked={formData.isHomeAvailable}
              onChange={handleChange}
              />
            Is Home Available
          </Grid2>

          {/* Provider Address */}
          <Grid2 item xs={12}>
            <TextField
              label="Provider Address"
              name="providerAddress"
              fullWidth
              value={formData.providerAddress}
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

          {/* Availability */}
          <Grid2 item xs={12}>
            <TextField
              label="Availability"
              name="availablity"
              fullWidth
              value={formData.availablity}
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

export default CreateService;
