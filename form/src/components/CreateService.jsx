// src/components/ServiceForm.jsx
import React, { useState } from "react";
import { createService } from "../api/api";
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

const CreateService = () => {
  const [formData, setFormData] = useState({
    name: "",
    storeId: "",
    offers: [""],
    tags: "",
    category: "",
    isHomeAvailable: false,
    providerAddress: [""],
    price: {
      original: "",
      discount: "",
      taxInPercentage: 8,
    },
    rating: 0,
    noOfLikes: 0,
    noOfReviews: 0,
    sellingInfo: {
      orderCount: 0,
      bestSelling: false,
    },
    locationsAvailable: [
      {
        option: "",
        price: "",
        discount: 0,
      },
    ],
    slotsAvailable: [
      {
        startTime: "",
        endTime: "",
      },
    ],
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
    additionalServices: [""],
    availablity: "",
    detailedImages: [""],
  });

  const navigate = useNavigate();

  const handleNestedArrayChangeVariant = (field, index, subfield, value) => {
    setFormData((prevState) => {
      const updatedVariants = [...prevState[field]];
      updatedVariants[index][subfield] = value;
      return { ...prevState, [field]: updatedVariants };
    });
  };

  const handleVariantValueChange = (variantIndex, valueIndex, newValue) => {
    setFormData((prevState) => {
      const updatedVariants = [...prevState.variants];
      updatedVariants[variantIndex].values[valueIndex] = newValue;
      return { ...prevState, variants: updatedVariants };
    });
  };

  // Add Value Field for a Variant
  const handleVariantValueAdd = (variantIndex) => {
    setFormData((prevState) => {
      const updatedVariants = [...prevState.variants];
      updatedVariants[variantIndex].values.push("");
      return { ...prevState, variants: updatedVariants };
    });
  };

  // Remove Value Field for a Variant
  const handleVariantValueRemove = (variantIndex, valueIndex) => {
    setFormData((prevState) => {
      const updatedVariants = [...prevState.variants];
      updatedVariants[variantIndex].values.splice(valueIndex, 1);
      return { ...prevState, variants: updatedVariants };
    });
  };

  // Add a New Variant
  const handleAddVariant = () => {
    setFormData((prevState) => ({
      ...prevState,
      variants: [
        ...prevState.variants,
        { attribute: "", values: [], type: "", additional: "" },
      ],
    }));
  };

  // Remove a Variant
  const handleRemoveVariant = (index) => {
    setFormData((prevState) => {
      const updatedVariants = [...prevState.variants];
      updatedVariants.splice(index, 1);
      return { ...prevState, variants: updatedVariants };
    });
  };

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
      console.error("Error creating service:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ mt: 3, flex: 1 }}>
        <Typography variant="h4">Create New Service</Typography>
        <form onSubmit={handleSubmit}>
          <Stack container spacing={2}>
            <p>Name</p>
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

            <p>Store ID</p>
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

            <p>Category</p>
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

            <p>Is Home Available?</p>
            <Grid2 item xs={12}>
              <Checkbox
                name="isHomeAvailable"
                checked={formData.isHomeAvailable}
                onChange={handleChange}
              />
              Is Home Available
            </Grid2>

            <p>Provider Address</p>
            {formData.providerAddress.map((provider, index) => (
              <Grid2 key={index} container spacing={2}>
                <Grid2 items size="grow">
                  <TextField
                    label={`Provider Address ${index + 1}`}
                    value={provider}
                    fullWidth
                    onChange={(e) =>
                      handleArrayChange(
                        "providerAddress",
                        index,
                        e.target.value
                      )
                    }
                  />
                </Grid2>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleArrayRemove("providerAddress", index)}
                >
                  Remove Provider Address
                </Button>
              </Grid2>
            ))}
            <Button
              variant="outlined"
              onClick={() => handleArrayAdd("providerAddress")}
            >
              Add Provider Address
            </Button>

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
                  required
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

            <p>Rating</p>
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
            <p>No Of Likes</p>
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
            <p>No Of Reviews</p>
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

            <p>Locations Available</p>
            {formData.locationsAvailable.map((location, index) => (
              <Grid2 container spacing={2} key={index}>
                <Grid2 item size="grow">
                  <TextField
                    label="option"
                    name={`locationsAvailable[${index}].option`}
                    fullWidth
                    required
                    value={location.option}
                    onChange={(e) =>
                      handleArrayChange("locationsAvailable", index, {
                        ...location,
                        option: e.target.value,
                      })
                    }
                  />
                </Grid2>
                <Grid2 item size="grow">
                  <TextField
                    label="price"
                    name={`locationsAvailable[${index}].price`}
                    fullWidth
                    required
                    value={location.price}
                    onChange={(e) =>
                      handleArrayChange("locationsAvailable", index, {
                        ...location,
                        price: e.target.value,
                      })
                    }
                  />
                </Grid2>
                <Grid2 item size="grow">
                  <TextField
                    label="discount"
                    name={`locationsAvailable[${index}].discount`}
                    fullWidth
                    required
                    type="number"
                    value={location.discount}
                    onChange={(e) =>
                      handleArrayChange("locationsAvailable", index, {
                        ...location,
                        discount: e.target.value,
                      })
                    }
                  />
                </Grid2>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleArrayRemove("locationsAvailable", index)}
                >
                  Remove
                </Button>
              </Grid2>
            ))}
            <Button
              variant="outlined"
              onClick={() => handleArrayAdd("locationsAvailable")}
            >
              Add Location
            </Button>

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
                        required
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

            <p>Detailed Images</p>
            {formData.additionalServices.map((additionalService, index) => (
              <Grid2 key={index} container spacing={2}>
                <Grid2 items size="grow">
                  <TextField
                    label={`Additional Service ${index + 1}`}
                    value={additionalService}
                    fullWidth
                    onChange={(e) =>
                      handleArrayChange(
                        "additionalServices",
                        index,
                        e.target.value
                      )
                    }
                  />
                </Grid2>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleArrayRemove("additionalServices", index)}
                >
                  Remove Additional Service
                </Button>
              </Grid2>
            ))}
            <Button
              variant="outlined"
              onClick={() => handleArrayAdd("additionalServices")}
            >
              Add Additional Service
            </Button>

            <p>Availability</p>
            <Grid2 item xs={12}>
              <TextField
                label="Availability"
                name="availablity"
                fullWidth
                value={formData.availablity}
                onChange={handleChange}
              />
            </Grid2>

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

export default CreateService;
