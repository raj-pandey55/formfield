// src/components/CreateEvent.jsx
import React, { useState } from 'react';
import { createEvent } from '../api/api'; // Import your API function
import { TextField, Button, Checkbox, Grid2, Box, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    storeId: '',
    category: '',
    address: '',
    priceOriginal: '',
    priceDiscount: '',
    priceTax: 8, // Default tax percentage
    location: 'New Jersey', // Default location
    offers: '',
    tags: '',
    rating: 0,
    noOfLikes: 0,
    noOfReviews: 0,
    orderCount: 0,
    bestSelling: false,
    availablity: '',
    highlights: '',
    policy: '',
    highlightDocument: '',
    policyDocument: '',
    details: '',
    images: '',
    documents: '',
    slotsAvailable: '',
    startDate: '',
    endDate: '',
    durationInMinutes: '',
    minAge: '',
    detailedImages: ''
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
      await createEvent(formData, token);
      navigate('/event')
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ mt: 3, ml: 3, flexGrow: 1 }}>
        <Typography variant="h4">Create New Event</Typography>
        <form onSubmit={handleSubmit}>
          <Stack container spacing={2}>
            {/* Name */}
            <Grid2 item xs={12}>
              <TextField
                label="Event Name"
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
                select
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

            {/* Address */}
            <Grid2 item xs={12}>
              <TextField
                label="Address ID"
                name="address"
                fullWidth
                required
                value={formData.address}
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

            {/* Location */}
            <Grid2 item xs={12}>
              <TextField
                label="Location"
                name="location"
                fullWidth
                value={formData.location}
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

            {/* Highlights */}
            <Grid2 item xs={12}>
              <TextField
                label="Highlights"
                name="highlights"
                fullWidth
                multiline
                rows={3}
                value={formData.highlights}
                onChange={handleChange}
              />
            </Grid2>

            {/* Policy */}
            <Grid2 item xs={12}>
              <TextField
                label="Policy"
                name="policy"
                fullWidth
                multiline
                rows={3}
                value={formData.policy}
                onChange={handleChange}
              />
            </Grid2>

            {/* Highlight Document */}
            <Grid2 item xs={12}>
              <TextField
                label="Highlight Document URL"
                name="highlightDocument"
                fullWidth
                value={formData.highlightDocument}
                onChange={handleChange}
              />
            </Grid2>

            {/* Policy Document */}
            <Grid2 item xs={12}>
              <TextField
                label="Policy Document URL"
                name="policyDocument"
                fullWidth
                value={formData.policyDocument}
                onChange={handleChange}
              />
            </Grid2>

            {/* Details */}
            <Grid2 item xs={12}>
              <TextField
                label="Details (JSON)"
                name="details"
                fullWidth
                multiline
                rows={3}
                value={formData.details}
                onChange={handleChange}
              />
            </Grid2>

            {/* Images */}
            <Grid2 item xs={12}>
              <TextField
                label="Image URLs (Comma Separated)"
                name="images"
                fullWidth
                value={formData.images}
                onChange={handleChange}
              />
            </Grid2>

            {/* Documents */}
            <Grid2 item xs={12}>
              <TextField
                label="Document URLs (Comma Separated)"
                name="documents"
                fullWidth
                value={formData.documents}
                onChange={handleChange}
              />
            </Grid2>

            {/* Slots Available */}
            <Grid2 item xs={12}>
              <TextField
                label="Slots Available (JSON)"
                name="slotsAvailable"
                fullWidth
                multiline
                rows={3}
                value={formData.slotsAvailable}
                onChange={handleChange}
              />
            </Grid2>

            {/* Start Date */}
            <Grid2 item xs={6}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.startDate}
                onChange={handleChange}
              />
            </Grid2>

            {/* End Date */}
            <Grid2 item xs={6}>
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.endDate}
                onChange={handleChange}
              />
            </Grid2>

            {/* Duration */}
            <Grid2 item xs={6}>
              <TextField
                label="Duration (Minutes)"
                name="durationInMinutes"
                type="number"
                fullWidth
                value={formData.durationInMinutes}
                onChange={handleChange}
              />
            </Grid2>

            {/* Minimum Age */}
            <Grid2 item xs={6}>
              <TextField
                label="Minimum Age"
                name="minAge"
                type="number"
                fullWidth
                value={formData.minAge}
                onChange={handleChange}
              />
            </Grid2>

            {/* Detailed Images */}
            <Grid2 item xs={12}>
              <TextField
                label="Detailed Images (Comma Separated)"
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
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default CreateEvent;
