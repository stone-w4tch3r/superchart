import React from 'react';
import {CircularProgress} from '@mui/material';

const Loader: React.FC = () => {
    const classes = {
        loaderContainer: 'loader-container',
    };
    return (
        <div className={classes.loaderContainer}>
            <CircularProgress/>
        </div>
    );
};

export default Loader;
