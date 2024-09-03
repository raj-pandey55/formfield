import React, { useState } from "react";
import { createProduct } from "../api/api";
import {
  TextField,
  Button,
  Checkbox,
  Grid2,
  Box,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    storeId: "",
    stock: 5,
    isCustomOrder: false,
    offers: [],
    likes: [],
    tags: "",
    category: "",
    department: "",
    preRegister: [],
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
    variants: [{ attribute: "", values: [], type: "", additional: "" }],
    productVariants: [],
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
    detailedImages: [""],
    specifications: {
      singleOptions: [""],
      multipleOptions: [""],
    },
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
      // Create a copy of the current `info` object
      const updatedInfo = { ...prevState[field] };

      // Update the specific highlight at the given index
      updatedInfo[subfield][index] = value;

      // Return the updated state with the modified `info` object
      return { ...prevState, [field]: updatedInfo };
    });
  };

  const handleNestedArrayAdd = (field, subfield) => {
    setFormData((prevState) => {
      // Create a copy of the current `info` object
      const updatedInfo = { ...prevState[field] };

      // Add a new empty string to the `highlights` array
      updatedInfo[subfield].push("");

      // Return the updated state with the modified `info` object
      return { ...prevState, [field]: updatedInfo };
    });
  };

  const handleNestedArrayRemove = (field, subfield, index) => {
    setFormData((prevState) => {
      // Create a copy of the current `info` object
      const updatedInfo = { ...prevState[field] };

      // Remove the element at the specified index from the `highlights` array
      updatedInfo[subfield].splice(index, 1);

      // Return the updated state with the modified `info` object
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
      await createProduct(formData.storeId, formData, token);
      navigate("/product"); // Navigate to product list or another appropriate page
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ mt: 3, flex: 1 }}>
        <Typography variant="h4">Create New Product</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <p>Product Name</p>
            <TextField
              label="Product Name"
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
              select
              required
              value={formData.storeId}
              onChange={handleChange}
            />

            <p>Stock</p>
            <TextField
              label="Stock"
              name="stock"
              type="number"
              fullWidth
              value={formData.stock}
              onChange={handleChange}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <p>Custom Order Available ?</p>
              <Checkbox
                name="isCustomOrder"
                checked={formData.isCustomOrder}
                onChange={handleChange}
              />
            </div>

            <p>Offers</p>
            {formData.offers.map((offer, index) => (
              <Grid2 key={index} container spacing={2}>
                <Grid2 items size="grow">
                  <TextField
                    label={`Offer ${index + 1}`}
                    value={offer}
                    fullWidth
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

            <p>Likes</p>
            {formData.likes.map((like, index) => (
              <Grid2 key={index} container spacing={2}>
                <Grid2 item size="grow">
                  <TextField
                    label={`Like ${index + 1}`}
                    value={like}
                    fullWidth
                    onChange={(e) =>
                      handleArrayChange("likes", index, e.target.value)
                    }
                  />
                </Grid2>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleArrayRemove("likes", index)}
                >
                  Remove Like
                </Button>
              </Grid2>
            ))}
            <Button variant="outlined" onClick={() => handleArrayAdd("likes")}>
              Add Like
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
            <TextField
              label="Category"
              name="category"
              fullWidth
              required
              value={formData.category}
              onChange={handleChange}
            />

            <p>Department</p>
            <TextField
              label="Department"
              name="department"
              fullWidth
              required
              value={formData.department}
              onChange={handleChange}
            />

            <p>Pre Register</p>
            {formData.preRegister.map((pre, index) => (
              <Grid2 key={index} spacing={2} container>
                <Grid2 item size="grow">
                  <TextField
                    label={`preRegister ${index + 1}`}
                    value={pre}
                    fullWidth
                    onChange={(e) =>
                      handleArrayChange("preRegister", index, e.target.value)
                    }
                  />
                </Grid2>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleArrayRemove("preRegister", index)}
                >
                  Remove Pre-Register
                </Button>
              </Grid2>
            ))}
            <Button
              variant="outlined"
              onClick={() => handleArrayAdd("preRegister")}
            >
              Add Pre-Register
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

            <p>Variants</p>
            {formData.variants.map((variant, index) => (
              <Grid2 container spacing={2} key={index}>
                <Grid2 item size="grow">
                  <TextField
                    label="Attribute"
                    name={`variants[${index}].attribute`}
                    fullWidth
                    value={variant.attribute}
                    onChange={(e) =>
                      handleNestedArrayChangeVariant(
                        "variants",
                        index,
                        "attribute",
                        e.target.value
                      )
                    }
                  />
                </Grid2>
                <Grid2 item size="grow">
                  {variant.values.map((value, valueIndex) => (
                    <Grid2 key={valueIndex} spacing={1} container>
                      <Grid2 item marginBottom={1} size="grow">
                        <TextField
                          label={`Value ${valueIndex + 1}`}
                          value={value}
                          onChange={(e) =>
                            handleVariantValueChange(
                              index,
                              valueIndex,
                              e.target.value
                            )
                          }
                        />
                      </Grid2>
                      <Grid2 item marginBottom={1}>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() =>
                            handleVariantValueRemove(index, valueIndex)
                          }
                        >
                          Remove Value
                        </Button>
                      </Grid2>
                    </Grid2>
                  ))}
                  <Button
                    variant="outlined"
                    onClick={() => handleVariantValueAdd(index)}
                  >
                    Add Value
                  </Button>
                </Grid2>
                <Grid2 item size="grow">
                  <TextField
                    label="Type"
                    name={`variants[${index}].type`}
                    fullWidth
                    value={variant.type}
                    onChange={(e) =>
                      handleNestedArrayChangeVariant(
                        "variants",
                        index,
                        "type",
                        e.target.value
                      )
                    }
                  />
                </Grid2>
                <Grid2 item size="grow">
                  <TextField
                    label="Additional"
                    name={`variants[${index}].additional`}
                    fullWidth
                    value={variant.additional}
                    onChange={(e) =>
                      handleNestedArrayChangeVariant(
                        "variants",
                        index,
                        "additional",
                        e.target.value
                      )
                    }
                  />
                </Grid2>
                <Grid2 item>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveVariant(index)}
                  >
                    Delete Variant
                  </Button>
                </Grid2>
              </Grid2>
            ))}
            <Button variant="outlined" onClick={handleAddVariant}>
              Add Variant
            </Button>

            <p>Product Variants</p>
            {formData.productVariants.map((product, index) => (
              <Grid2 key={index} spacing={2} container>
                <Grid2 item size="grow">
                  <TextField
                    label={`Product Variant ${index + 1}`}
                    value={product}
                    fullWidth
                    onChange={(e) =>
                      handleArrayChange(
                        "productVariants",
                        index,
                        e.target.value
                      )
                    }
                  />
                </Grid2>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleArrayRemove("productVariants", index)}
                >
                  Remove Product Variant
                </Button>
              </Grid2>
            ))}
            <Button
              variant="outlined"
              onClick={() => handleArrayAdd("productVariants")}
            >
              Add Product Variant
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
              <Grid2 item size="grow">
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
              </Grid2>
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

            <p>Specifications</p>
            <Grid2 container spacing={2}>
              <Grid2 item size="grow">
                <p>Single Options</p>
                {formData.specifications.singleOptions.map(
                  (singleOption, index) => (
                    <Grid2 container spacing={2} key={index}>
                      <Grid2 item size="grow">
                        <TextField
                          label={`Single Option ${index + 1}`}
                          value={singleOption}
                          fullWidth
                          onChange={(e) =>
                            handleNestedArrayChange(
                              "specifications",
                              index,
                              "singleOptions",
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
                            handleNestedArrayRemove(
                              "specifications",
                              "singleOptions",
                              index
                            )
                          }
                        >
                          Remove
                        </Button>
                      </Grid2>
                    </Grid2>
                  )
                )}
                <Button
                  variant="outlined"
                  onClick={() =>
                    handleNestedArrayAdd("specifications", "singleOptions")
                  }
                >
                  Add Single Option
                </Button>
              </Grid2>
              <Grid2 item size="grow">
                <p>Multiple Options</p>
                {formData.specifications.multipleOptions.map(
                  (multipleOption, index) => (
                    <Grid2 container spacing={2} key={index}>
                      <Grid2 item size="grow">
                        <TextField
                          label={`Multiple Option ${index + 1}`}
                          value={multipleOption}
                          fullWidth
                          onChange={(e) =>
                            handleNestedArrayChange(
                              "specifications",
                              index,
                              "multipleOptions",
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
                            handleNestedArrayRemove(
                              "specifications",
                              "multipleOptions",
                              index
                            )
                          }
                        >
                          Remove
                        </Button>
                      </Grid2>
                    </Grid2>
                  )
                )}
                <Button
                  variant="outlined"
                  onClick={() =>
                    handleNestedArrayAdd("specifications", "multipleOptions")
                  }
                >
                  Add Multiple Option
                </Button>
              </Grid2>
            </Grid2>

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

export default CreateProduct;
