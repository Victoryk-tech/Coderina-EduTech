"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import SolutionCards from "../../Home/SolutionCards";

import axios from "axios";

const MediaBody = () => {
  const [mediaOption, setMediaOption] = useState("News Articles");
  const [mediaItems, setMediaItems] = useState([]); // State for media data
  const [loading, setLoading] = useState(false);

  const mediaBtn = ["News Articles", "Publications", "Gallery"];

  // Fetch Media Items
  const fetchMedia = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/media"); // Call GET route
      setMediaItems(response.data.data); // Populate state with fetched media
    } catch (error) {
      console.error("Failed to fetch media:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Post a New Media Item
  const addMediaItem = async () => {
    const newMedia = {
      title: "Sample Title",
      description: "Sample description for new media",
      imageUrl: "https://example.com/sample-image.jpg",
      categories: [mediaOption.toLowerCase().replace(" ", "")], // Dynamically set the category
    };
    try {
      const response = await axios.post("/api/media", newMedia); // Call POST route
      setMediaItems((prev) => [...prev, response.data.data]); // Update state with new item
    } catch (error) {
      console.error("Failed to add media:", error.message);
    }
  };

  // Delete Media Item
  const deleteMediaItem = async (id) => {
    try {
      await axios.delete(`/api/media/${id}`); // Call DELETE route
      setMediaItems((prev) => prev.filter((item) => item._id !== id)); // Remove item from state
    } catch (error) {
      console.error("Failed to delete media:", error.message);
    }
  };

  useEffect(() => {
    fetchMedia(); // Fetch media items on component mount
  }, []);

  return (
    <Box mt={6} className="media__container">
      <Stack justifyContent={["center", "space-between"]}>
        <Typography variant="h4">Media</Typography>
        <Stack>
          {mediaBtn.map((btn, i) => (
            <Button
              key={i}
              variant={mediaOption === btn ? "contained" : ""}
              sx={{
                bgcolor: mediaOption === btn ? "white" : "",
                fontSize: { xs: "12px", md: "14px" },
              }}
              onClick={() => setMediaOption(btn)}
            >
              {btn}
            </Button>
          ))}
        </Stack>
      </Stack>

      {/* Display Media Items */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container className="news__cards">
          {mediaItems
            .filter((item) =>
              item.categories.includes(
                mediaOption.toLowerCase().replace(" ", "")
              )
            )
            .map((mediaItem) => (
              <SolutionCards
                key={mediaItem._id}
                {...mediaItem}
                children1={mediaItem.title}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteMediaItem(mediaItem._id)}
                >
                  Delete
                </Button>
              </SolutionCards>
            ))}
        </Grid>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={addMediaItem}
        sx={{ mt: 4 }}
      >
        Add Media Item
      </Button>
    </Box>
  );
};

export default MediaBody;
