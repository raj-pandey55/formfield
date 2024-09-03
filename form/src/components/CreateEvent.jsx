import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  Grid2,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { createService } from "../api/api";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    storeId: "",
    category: "",
    address: "",
    price: {
      original: "",
      discount: "",
      taxInPercentage: 8,
    },
    location: "New Jersey",
    offers: [],
    tags: "",
    rating: 0,
    noOfLikes: 0,
    noOfReviews: 0,
    sellingInfo: {
      orderCount: 0,
      bestSelling: false,
    },
    info: {
      highlights: [""],
      policy: [""],
      highlightDocument: "",
      policyDocument: "",
    },
    details: [{ detail: "", description: "" }],
    url: {
      images: [""],
      documents: [""],
    },
    slotsAvailable: [
      {
        startTime: "",
        endTime: "",
      },
    ],
    startDate: "",
    endDate: "",
    durationInMinutes: "",
    minAge: "",
    availablity: "",
    detailedImages: [""],
  });

  const navigate = useNavigate();

  const handleNestedArrayChange = (field, index, subfield, value) => {
    setFormData((prevState) => {
      const updatedInfo = { ...prevState[field] };

      updatedInfo[subfield][index] = value;

      return { ...prevState, [field]: updatedInfo };
    });
  };

  const handleNestedArrayAdd = (field, subfield) => {
    setFormData((prevState) => {
      const updatedInfo = { ...prevState[field] };

      updatedInfo[subfield].push("");

      return { ...prevState, [field]: updatedInfo };
    });
  };

  const handleNestedArrayRemove = (field, subfield, index) => {
    setFormData((prevState) => {
      const updatedInfo = { ...prevState[field] };

      updatedInfo[subfield].splice(index, 1);

      return { ...prevState, [field]: updatedInfo };
    });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNestedChange = (name, subName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        [subName]: value,
      },
    }));
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    handleNestedChange("price", name, value);
  };

  const handleArrayChange = (name, index, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: prevData[name].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleArrayAdd = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: [...prevData[name], ""],
    }));
  };

  const handleArrayRemove = (name, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await createService(formData.storeId, formData, token);
      navigate("/");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ mt: 3, flex: 1 }}>
        <Typography variant="h4">Create New Event</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <p>Event Name</p>
            <TextField
              label="Event Name"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
            />

            <p>Store ID</p>
            <TextField
              label="Store ID"
              name="storeId"
              fullWidth
              required
              select
              value={formData.storeId}
              onChange={handleChange}
            />

            <p>Category</p>
            <TextField
              label="Category"
              name="category"
              fullWidth
              required
              value={formData.category}
              onChange={handleChange}
            />

            <p>Address</p>
            <TextField
              label="Address"
              name="address"
              fullWidth
              required
              value={formData.address}
              onChange={handleChange}
            />

            <p>Price (Original, Discount, Tax)</p>
            <Grid2 container spacing={2}>
              <Grid2 item size="grow">
                <TextField
                  label="Original Price"
                  name="original"
                  type="number"
                  fullWidth
                  required
                  value={formData.price.original}
                  onChange={handlePriceChange}
                />
              </Grid2>
              <Grid2 item size="grow">
                <TextField
                  label="Discount Price"
                  name="discount"
                  type="number"
                  fullWidth
                  value={formData.price.discount}
                  onChange={handlePriceChange}
                />
              </Grid2>
              <Grid2 item size="grow">
                <TextField
                  label="Tax (%)"
                  name="taxInPercentage"
                  type="number"
                  fullWidth
                  value={formData.price.taxInPercentage}
                  onChange={handlePriceChange}
                />
              </Grid2>
            </Grid2>

            <p>Location</p>
            <TextField
              label="Location"
              name="location"
              fullWidth
              value={formData.location}
              onChange={handleChange}
            />

            <p>Offers</p>
            {formData.offers.map((offer, index) => (
              <Grid2 key={index} container spacing={2}>
                <Grid2 items size="grow">
                  <TextField
                    label={`Offer ${index + 1}`}
                    value={offer}
                    fullWidth
                    select
                    onChange={(e) =>
                      handleArrayChange("offers", index, e.target.value)
                    }
                  />
                </Grid2>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleArrayRemove("offers", index)}
                >
                  Remove Offer
                </Button>
              </Grid2>
            ))}
            <Button variant="outlined" onClick={() => handleArrayAdd("offers")}>
              Add Offer
            </Button>

            <p>Tags</p>
            <TextField
              label="Tags"
              name="tags"
              fullWidth
              value={formData.tags}
              onChange={handleChange}
            />

            <p>Rating</p>
            <TextField
              label="Rating"
              name="rating"
              type="number"
              fullWidth
              value={formData.rating}
              onChange={handleChange}
            />

            <p>No of Likes</p>
            <TextField
              label="No Of Likes"
              name="noOfLikes"
              type="number"
              fullWidth
              value={formData.noOfLikes}
              onChange={handleChange}
            />

            <p>No of Reviews</p>
            <TextField
              label="Number of Reviews"
              name="noOfReviews"
              type="number"
              fullWidth
              value={formData.noOfReviews}
              onChange={handleChange}
            />

            <p>Selling Info</p>
            <Grid2 container spacing={2}>
              <Grid2 item size="grow">
                <TextField
                  label="Order Count"
                  name="orderCount"
                  type="number"
                  fullWidth
                  value={formData.sellingInfo.orderCount}
                  onChange={(e) =>
                    handleNestedChange(
                      "sellingInfo",
                      "orderCount",
                      e.target.value
                    )
                  }
                />
              </Grid2>
              <Grid2 item size="grow">
                <Checkbox
                  name="bestSelling"
                  checked={formData.sellingInfo.bestSelling}
                  onChange={(e) =>
                    handleNestedChange(
                      "sellingInfo",
                      "bestSelling",
                      e.target.checked
                    )
                  }
                />
                Best Selling
              </Grid2>
            </Grid2>

            <p>Info - Highlights and Policy</p>
            <Grid2 container spacing={2}>
              <Grid2 item size="grow">
                <p>Highlights</p>
                {formData.info.highlights.map((highlight, index) => (
                  <Grid2 container spacing={2} key={index}>
                    <Grid2 item size="grow">
                      <TextField
                        label={`Highlight ${index + 1}`}
                        value={highlight}
                        fullWidth
                        onChange={(e) =>
                          handleNestedArrayChange(
                            "info",
                            index,
                            "highlights",
                            e.target.value
                          )
                        }
                      />
                    </Grid2>
                    <Grid2 item>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          handleNestedArrayRemove("info", "highlights", index)
                        }
                      >
                        Remove
                      </Button>
                    </Grid2>
                  </Grid2>
                ))}
                <Button
                  variant="outlined"
                  onClick={() => handleNestedArrayAdd("info", "highlights")}
                >
                  Add Highlight
                </Button>
              </Grid2>

              <Grid2 item size="grow">
                <p>Policy</p>
                {formData.info.policy.map((policyItem, index) => (
                  <Grid2 container spacing={2} key={index}>
                    <Grid2 item size="grow">
                      <TextField
                        label={`Policy ${index + 1}`}
                        value={policyItem}
                        fullWidth
                        onChange={(e) =>
                          handleNestedArrayChange(
                            "info",
                            index,
                            "policy",
                            e.target.value
                          )
                        }
                      />
                    </Grid2>
                    <Grid2 item>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          handleNestedArrayRemove("info", "policy", index)
                        }
                      >
                        Remove
                      </Button>
                    </Grid2>
                  </Grid2>
                ))}
                <Button
                  variant="outlined"
                  onClick={() => handleNestedArrayAdd("info", "policy")}
                >
                  Add Policy
                </Button>
              </Grid2>
              <Grid2 item size="grow">
                <p>Highlight Document</p>
                <Grid2 item size="grow">
                  <TextField
                    label="Highlight Document"
                    name="info.highlightDocument"
                    fullWidth
                    value={formData.info.highlightDocument}
                    onChange={(e) =>
                      handleNestedChange(
                        "info",
                        "highlightDocument",
                        e.target.value
                      )
                    }
                  />
                </Grid2>
              </Grid2>
              <Grid2 item size="grow">
                <p>Policy Document</p>
                <Grid2 item size="grow">
                  <TextField
                    label="Policy Document"
                    name="info.policyDocument"
                    fullWidth
                    value={formData.info.policyDocument}
                    onChange={(e) =>
                      handleNestedChange(
                        "info",
                        "policyDocument",
                        e.target.value
                      )
                    }
                  />
                </Grid2>
              </Grid2>
            </Grid2>

            <p>Details</p>
            {formData.details.map((detail, index) => (
              <Grid2 container spacing={2} key={index}>
                <Grid2 item size="grow">
                  <TextField
                    label="Detail"
                    name={`details[${index}].detail`}
                    fullWidth
                    value={detail.detail}
                    onChange={(e) =>
                      handleArrayChange("details", index, {
                        ...detail,
                        detail: e.target.value,
                      })
                    }
                  />
                </Grid2>
                <Grid2 item size="grow">
                  <TextField
                    label="Description"
                    name={`details[${index}].description`}
                    fullWidth
                    value={detail.description}
                    onChange={(e) =>
                      handleArrayChange("details", index, {
                        ...detail,
                        description: e.target.value,
                      })
                    }
                  />
                </Grid2>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleArrayRemove("details", index)}
                >
                  Remove
                </Button>
              </Grid2>
            ))}
            <Button
              variant="outlined"
              onClick={() => handleArrayAdd("details")}
            >
              Add Detail
            </Button>

            <p>URLs</p>
            <Grid2 container spacing={2}>
              <Grid2 item size="grow">
                <p>Images</p>
                {formData.url.images.map((image, index) => (
                  <Grid2 container spacing={2} key={index}>
                    <Grid2 item size="grow">
                      <TextField
                        label={`Image ${index + 1}`}
                        value={image}
                        fullWidth
                        onChange={(e) =>
                          handleNestedArrayChange(
                            "url",
                            index,
                            "images",
                            e.target.value
                          )
                        }
                      />
                    </Grid2>
                    <Grid2 item>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          handleNestedArrayRemove("url", "images", index)
                        }
                      >
                        Remove
                      </Button>
                    </Grid2>
                  </Grid2>
                ))}
                <Button
                  variant="outlined"
                  onClick={() => handleNestedArrayAdd("url", "images")}
                >
                  Add Image
                </Button>
              </Grid2>
              {/* <Grid2 item size="grow">
                <p>Document</p>
                {formData.url.documents.map((document, index) => (
                  <Grid2 container spacing={2} key={index}>
                    <Grid2 item size="grow">
                      <TextField
                        label={`Document ${index + 1}`}
                        value={document}
                        fullWidth
                        onChange={(e) =>
                          handleNestedArrayChange(
                            "url",
                            index,
                            "documents",
                            e.target.value
                          )
                        }
                      />
                    </Grid2>
                    <Grid2 item>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          handleNestedArrayRemove("url", "documents", index)
                        }
                      >
                        Remove
                      </Button>
                    </Grid2>
                  </Grid2>
                ))}
                <Button
                  variant="outlined"
                  onClick={() => handleNestedArrayAdd("url", "documents")}
                >
                  Add Document
                </Button>
              </Grid2> */}
            </Grid2>

            <p>Slots Available</p>
            {formData.slotsAvailable.map((slot, index) => (
              <Grid2 container spacing={2} key={index}>
                <Grid2 item size="grow">
                  <p>Start-Time</p>
                  <TextField
                    label=""
                    name="startTime"
                    type="datetime-local"
                    value={slot.startTime}
                    onChange={(e) =>
                      handleArrayChange("slotsAvailable", index, {
                        ...slot,
                        startTime: e.target.value,
                      })
                    }
                    fullWidth
                  />
                </Grid2>
                <Grid2 item size="grow">
                  <p>End-Time</p>
                  <TextField
                    label=""
                    name="endTime"
                    type="datetime-local"
                    value={slot.endTime}
                    onChange={(e) =>
                      handleArrayChange("slotsAvailable", index, {
                        ...slot,
                        endTime: e.target.value,
                      })
                    }
                    fullWidth
                  />
                </Grid2>
                <Grid2 item xs={2}>
                  <Button
                    onClick={() => handleArrayRemove("slotsAvailable", index)}
                  >
                    Delete
                  </Button>
                </Grid2>
              </Grid2>
            ))}
            <Button onClick={() => handleArrayAdd("slotsAvailable")}>
              Add Slot
            </Button>

            <p>Start Date</p>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formData.startDate}
              onChange={handleChange}
            />

            <p>End Date</p>
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formData.endDate}
              onChange={handleChange}
            />

            <p>Duration</p>
            <TextField
              label="Duration (minutes)"
              name="durationInMinutes"
              type="number"
              fullWidth
              value={formData.durationInMinutes}
              onChange={handleChange}
            />

            <p>Minimum Age</p>
            <TextField
              label="Minimum Age"
              name="minAge"
              type="number"
              fullWidth
              value={formData.minAge}
              onChange={handleChange}
            />

            <p>Availability</p>
            <TextField
              label="Availability"
              name="availablity"
              fullWidth
              value={formData.availablity}
              onChange={handleChange}
            />

            <p>Detailed Images</p>
            {formData.detailedImages.map((detailedImage, index) => (
              <Grid2 key={index} container spacing={2}>
                <Grid2 items size="grow">
                  <TextField
                    label={`Detailed Image ${index + 1}`}
                    value={detailedImage}
                    fullWidth
                    onChange={(e) =>
                      handleArrayChange("detailedImages", index, e.target.value)
                    }
                  />
                </Grid2>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleArrayRemove("detailedImages", index)}
                >
                  Remove Detailed Image
                </Button>
              </Grid2>
            ))}
            <Button
              variant="outlined"
              onClick={() => handleArrayAdd("detailedImages")}
            >
              Add Detailed Image
            </Button>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default CreateEvent;
