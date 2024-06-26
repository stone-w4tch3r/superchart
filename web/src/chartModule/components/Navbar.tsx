import React from "react";
import {AppBar, styled, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {GitHub} from "@mui/icons-material";

const GradientAppBar = styled(AppBar)({
    background: 'linear-gradient(90deg, rgba(1,109,213,1) 0%, rgba(1,61,143,1) 100%)',
});

export const Navbar: React.FC = () => {
    return <GradientAppBar position="static">
        <Toolbar sx={{py: 1, px: 3, display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h5" fontWeight={600}>
                Superchart
            </Typography>
            <Button
                variant="outlined"
                endIcon={<GitHub/>}
                href="https://github.com/stone-w4tch3r/superchart"
                size="large"
                color="inherit"
                target="_blank"
            >
                Source code
            </Button>
        </Toolbar>
    </GradientAppBar>;
};