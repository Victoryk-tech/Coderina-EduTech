"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";

import axios from "axios";
import Image from "next/image";

const MediaBody = () => {
  const [mediaOption, setMediaOption] = useState("gallery");
  const [mediaItems, setMediaItems] = useState([]); // State for media data
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/media");
      console.log("Media API Response:", response.data);

      // Extract unique categories from all media items
      const uniqueCategories = [
        ...new Set(response.data.data.flatMap((item) => item.categories)),
      ];

      setCategories(uniqueCategories); // Update categories state
    } catch (error) {
      console.error("Failed to fetch categories:", error.message);
    }
  };
  // Fetch Media Items
  const fetchMedia = async (category) => {
    setLoading(true);
    try {
      // Fetch data from the API with the selected category
      const response = await axios.get(`/api/media`, {
        params: { category: category.toLowerCase().replace(" ", "") },
      });
      console.log(response);
      setMediaItems(response.data.data);

      // Extract all categories from media items
      const allCategories = Array.from(
        new Set(items.flatMap((item) => item.categories))
      );

      // Update state for media items and categories
      setMediaItems(items);
      setCategories(allCategories);
      // Update state with fetched media
    } catch (error) {
      console.error("Failed to fetch media:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on initial load
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch media on initial load or when category changes
  useEffect(() => {
    fetchMedia(mediaOption);
  }, [mediaOption]);

  return (
    <Box mt={6} className="media__container">
      <Stack justifyContent={["center", "space-between"]}>
        <Typography variant="h4">Media</Typography>
        <Stack direction="row" spacing={2} mt={2}>
          {categories.length > 0 ? (
            categories.map((btn, i) => (
              <Button
                key={i}
                variant={mediaOption === btn ? "contained" : "outlined"}
                sx={{
                  fontSize: { xs: "12px", md: "14px" },
                }}
                onClick={() => setMediaOption(btn)}
              >
                {btn}
              </Button>
            ))
          ) : (
            <Typography>Loading categories...</Typography>
          )}
        </Stack>
      </Stack>

      {/* Display Media Items */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={3} mt={4}>
          {mediaItems.length > 0 ? (
            mediaItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <div>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={300}
                    height={200}
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {item.description}
                  </Typography>
                  <Typography variant="caption" display="block" mt={1}>
                    Categories: {item.categories.join(", ")}
                  </Typography>
                </div>
              </Grid>
            ))
          ) : (
            <Typography>No media items found for this category.</Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default MediaBody;
