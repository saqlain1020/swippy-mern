import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    root:{
    
    }
}))

const Test = () => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            Test Page
        </div>
    )
}

export default Test;