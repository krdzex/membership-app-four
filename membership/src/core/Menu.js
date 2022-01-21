import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom"

const isActive = (history, path) =>
    history.location.pathname === path ? { color: "#ff4081" } : { color: "#ffffff" }

    
const Menu = withRouter(({ history }) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" color="inherit">
                Membership Application
            </Typography>
            <Link to="/">
                <IconButton aria-label="Home" style={isActive(history, "/")}>
                    <HomeIcon />
                </IconButton>
            </Link>
            <Link to="/users">
                <Button style={isActive(history, "/users")}>
                    Users
                </Button>
            </Link>
            {
                !auth.isAuthenticated() && (
                    <span>
                        <Link to={"/signup"}>
                            <Button style={isActive(history, "/signup")}>
                                Sign up
                            </Button>
                        </Link>
                        <Link to={"/signin"}>
                            <Button style={isActive(history, "/signin")}>
                                Sign In
                            </Button>
                        </Link>
                    </span>
                )
            }
            {
                auth.isAuthenticated() && (
                    <span>
                        <Link to={"/user/" + auth.isAuthenticated().user._id}>
                            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
                                My Profile
                            </Button>
                        </Link>
                        <Link to={"/game"}>
                            <Button style={isActive(history, "/game")}>
                                Game
                            </Button>
                        </Link>
                        <Link to={"/signin"}>
                            <Button color="inherit" onClick={() => { auth.signout(() => history.push("/")) }}>
                                Sign out
                            </Button>
                        </Link>
                    </span>
                )
            }
        </Toolbar>
    </AppBar>
))

export default Menu;