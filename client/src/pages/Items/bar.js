import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core/'
import MenuIcon from '@material-ui/core/Menu'



import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'



const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },

};


const Bar = (props) => {
    const { classes } = props
    return (
        <AppBar position="static">
            <Toolbar>


                <Typography variant="headline" color="secondary">
                    News
                </Typography>

                <Button color="inherit">Login</Button>


                <Tabs
                    value={0}

                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                >
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                    <Tab label="Item Three" />
                </Tabs>
            </Toolbar>

        </AppBar>
    )
}


export default Bar
