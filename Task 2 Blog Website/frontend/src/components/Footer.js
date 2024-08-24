import React from 'react';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{

                bgcolor: "green",
                color: '#fff',
                padding: '2rem 1rem',
                marginTop: 3,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" component="h3" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="body2">
                        We are passionate about food and sharing the best recipes with our readers. Our blog provides
                        insights, tips, and delicious recipes to help you create amazing meals. Join us on our culinary
                        journey and discover the joy of cooking!
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" component="h3" gutterBottom>
                        Contact Info
                    </Typography>
                    <Box>
                        <IconButton
                            href="mailto:info@thefoodiediary.com"
                            color="inherit"
                            aria-label="email"
                        >
                            <MailOutlineIcon />
                        </IconButton>
                        <Typography variant="body2" component="span">
                            <a href="mailto:info@thefoodiediary.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                                info@thefoodiediary.com
                            </a>
                        </Typography>
                        <br />
                        <IconButton
                            href="tel:+12345678901"
                            color="inherit"
                            aria-label="phone"
                        >
                            <PhoneIcon />
                        </IconButton>
                        <Typography variant="body2" component="span">
                            <a href="tel:+12345678901" style={{ color: 'inherit', textDecoration: 'none' }}>
                                +1 234 567 8901
                            </a>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" component="h3" gutterBottom>
                        Follow Us
                    </Typography>
                    <Box>
                        <IconButton
                            href="https://www.instagram.com"
                            color="inherit"
                            aria-label="Instagram"
                        >
                            <InstagramIcon />
                        </IconButton>
                        <IconButton
                            href="https://www.facebook.com"
                            color="inherit"
                            aria-label="Facebook"
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            href="https://www.twitter.com"
                            color="inherit"
                            aria-label="Twitter"
                        >
                            <TwitterIcon />
                        </IconButton>
                        <IconButton
                            href="https://www.linkedin.com"
                            color="inherit"
                            aria-label="LinkedIn"
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
            <Typography variant="body2" sx={{ marginTop: '2rem' }}>
                &copy; 2024 TheFoodieDiary. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
