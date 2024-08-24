import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/auth');
  };

  return (
    <Box sx={{ padding: '2rem', backgroundColor: 'white' }}>
      {/* Welcome Section */}
      <Box sx={{ textAlign: 'center', marginBottom: '2rem', marginTop: 8 }}>
        <Typography variant="h3" marginBottom={3} sx={{ color: "green" }}>
          Welcome to TheFoodieDiary
        </Typography>
        <Typography variant="h6" paragraph sx={{ color: "green" }}>
          Discover a world of culinary delights right at your fingertips. At TheFoodieDiary, we believe that cooking should be a joyful and creative experience. Our blog is dedicated to sharing mouthwatering recipes, innovative cooking tips, and inspiring culinary stories that will make every meal an adventure.
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "green", padding: "1rem", borderRadius: "24px", fontWeight: 700, ':hover': {
              bgcolor: "#25B525",
              color: "white",
              boxShadow: "0px 0px 14px black"
            }
          }}
          onClick={handleExploreClick}
        >
          Explore Blogs
        </Button>
      </Box>

    </Box>
  );
};

export default Home;
