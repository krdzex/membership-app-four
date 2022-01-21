import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, Modal, Radio, RadioGroup, Typography } from '@material-ui/core';
import Computer from "@material-ui/icons/Computer"
import Login from "@material-ui/icons/Airplay"
import Add from "@material-ui/icons/AddCircleOutline"
import socket from './Socket';
import authHelper from "../auth/auth-helper"
import { useHistory } from "react-router-dom";
const GameChoice = () => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };



    const history = useHistory();
    const [allRooms, setAllRooms] = useState([])
    const [openJoinModule, setOpenJoinModule] = useState(false)
    const [openError, setOpenError] = useState(false)
    const handleClose = () => setOpenError(false);
    const [moduleRadio, setModuleRadio] = useState("");
    const handleChange = (event) => {
        setModuleRadio(event.target.value);
    };
    useEffect(() => {
        socket.emit("join_dashboard", authHelper.isAuthenticated().user.name)
        socket.off("allRooms").on('allRooms', data => {
            setAllRooms(data)
        })
        socket.off("otherPlayerJoined").on('otherPlayerJoined', data => {
            setOpen(false)
            history.push("/game/multiPlayer", { roomId: data.roomId })
        })
        socket.off("roomIsFull").on('roomIsFull', data => {
            console.log(data)
            setOpenError(true)
        })
    }, [socket])

    useEffect(() => {
        socket.off("roomIsMade").on('roomIsMade', data => {
            setAllRooms(data)
        })
    }, [socket])

    const [open, setOpen] = useState(false);

    const onCreateMultiplayer = () => {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var roomId = ""
        for (let i = 0; i < 4; i++) {
            const rand = Math.floor(Math.random() * ((chars.length - 1) - 0 + 1) + 0)
            roomId = roomId + chars[rand]
        }
        if (allRooms.includes(roomId)) {
            onCreateMultiplayer()

        } else {
            socket.emit("make_room", { roomId, playerOne: authHelper.isAuthenticated().user.name })
            setOpen(true)
        }
    }

    const onJoinMultiplayerGame = () => {
        setOpenJoinModule(true)
    }


    const onJoin = () => {
        socket.emit("join_game", { roomId: moduleRadio, playerTwo: authHelper.isAuthenticated().user.name })
        history.push("/game/multiPlayer", { roomId: moduleRadio })
    }

    const onSinglePlayer = () => {
        history.push("/game/singlePlayer");
    }
    return (
        <div>
            <Container maxWidth="lg" component="main" >
                <Typography variant='h2' mb={3} align='center'>Pick game mode: </Typography>
                <Grid container spacing={5} alignItems="flex-end">
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                    >
                        <Card>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                        mb: 2,
                                        flexFlow: "column",
                                        alignItems: "center"
                                    }}
                                >


                                    <Computer style={{ fontSize: "250px" }} />
                                    <Typography component="h4" variant="h4" align='center'>
                                        Play with computer
                                    </Typography>

                                    <Button variant="contained" color="default" style={{ padding: "5px 30px", marginTop: "15px" }} onClick={onSinglePlayer}>
                                        Play
                                    </Button>
                                </Box>

                            </CardContent>

                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                    >
                        <Card>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                        mb: 2,
                                        flexFlow: "column",
                                        alignItems: "center"
                                    }}
                                >

                                    <Add style={{ fontSize: "250px" }} />
                                    <Typography component="h4" variant="h5" align='center'>
                                        Generate new game code and share with a friend
                                    </Typography>

                                    <Button variant="contained" color="default" style={{ padding: "5px 30px", marginTop: "15px" }} onClick={onCreateMultiplayer}>
                                        Play
                                    </Button>
                                </Box>

                            </CardContent>

                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                    >
                        <Card>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                        mb: 2,
                                        flexFlow: "column",
                                        alignItems: "center"
                                    }}
                                >


                                    <Login style={{ fontSize: "250px" }} />
                                    <Typography component="h4" variant="h5" align='center'>
                                        Already have a code? Join existing game here...
                                    </Typography>

                                    <Button variant="contained" color="default" style={{ padding: "5px 30px", marginTop: "15px" }} onClick={onJoinMultiplayerGame}>
                                        Play
                                    </Button>
                                </Box>

                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>
                <Dialog open={openJoinModule}>
                    <DialogTitle>All rooms:</DialogTitle>
                    <DialogContent>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={moduleRadio}
                                onChange={handleChange}
                            >{allRooms.map((room, id) => {
                                return <FormControlLabel value={room.roomId} key={id} control={<Radio />} label={room.roomId} />
                            })}
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => { setOpenJoinModule(false) }}>
                            Close
                        </Button>
                        <Button color="primary" autoFocus="autoFocus" variant="contained" onClick={onJoin}>
                            Join
                        </Button>
                    </DialogActions>
                </Dialog>

                <Modal
                    keepMounted
                    open={open}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                            You are currently waiting for your opponet.
                        </Typography>
                        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>

                        </Typography>
                    </Box>
                </Modal>

                <Modal
                    keepMounted
                    open={openError}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                            This room is full
                        </Typography>
                        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>

                        </Typography>
                    </Box>
                </Modal>

            </Container>
        </div>
    )

};

export default GameChoice;