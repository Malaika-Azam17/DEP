import React, { useState } from 'react'
import { AppBar, Box, Button, Tab, Toolbar, Typography, Tabs } from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store';
const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [value, setValue] = useState();
    return (
        <AppBar
            position='sticky'
            sx={{
                position: "sticky",
                backgroundColor: "green",
                padding: "0.3rem 0.3rem",
                boxShadow: "0px 0px 10px black"
            }}>
            <Toolbar>
                <Typography variant='h5' fontSize={27} sx={{ ':hover': { transform: "scale(0.9)" } }}>
                    TheFoodieDiary
                </Typography>
                {isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
                    <Tabs textColor='white'
                        value={value}
                        onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={Link} to="/blogs" label="All Blogs" value={0} />
                        <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" value={1} />
                        <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs" value={2} />
                    </Tabs>

                </Box>}
                <Box display="flex" marginLeft="auto">
                    {!isLoggedIn && <> <Button

                        LinkComponent={Link}
                        to="/auth"
                        variant="contained"
                        sx={{
                            color: "green",
                            margin: 2,
                            backgroundColor: "white",
                            fontSize: 15,
                            fontWeight: 700,
                            borderRadius: 24,
                            padding: "0.3rem 1rem ",
                            border: "2px solid white",
                            ':hover': {
                                bgcolor: "#25B525",
                                color: "white",
                                border: "2px solid white",
                                boxShadow: "0px 0px 14px black"
                            }
                        }}>
                        Login
                    </Button>
                        <Button
                            LinkComponent={Link}
                            to="/auth"
                            variant="contained"
                            sx={{
                                margin: 2,
                                color: "green",
                                backgroundColor: "white",
                                fontSize: "15px",
                                fontWeight: "700",
                                borderRadius: "24px",
                                padding: "0.3rem 1rem",
                                border: "2px solid white",
                                ':hover': {
                                    bgcolor: "#25B525",
                                    color: "white",
                                    boxShadow: "0px 0px 14px black"
                                }
                            }}>
                            SignUp
                        </Button>
                    </>}
                    {isLoggedIn && <Button
                        onClick={() => dispatch(authActions.logout())}
                        LinkComponent={Link}
                        to="/auth"
                        variant="contained"
                        sx={{
                            color: "green",
                            margin: 2,
                            backgroundColor: "white",
                            fontSize: 15,
                            fontWeight: 700,
                            borderRadius: 24,
                            padding: "0.3rem 1rem ",
                            border: "2px solid white",
                            ':hover': {
                                bgcolor: "#25B525",
                                color: "white",
                                boxShadow: "0px 0px 14px black"
                            }
                        }}>
                        LogOut
                    </Button>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header

