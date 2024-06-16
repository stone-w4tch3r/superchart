import React from 'react';
import {AppBar, Toolbar, Typography} from '@mui/material';
import Stack from "@mui/material/Stack";

//todo remove?
interface LayoutProps {
    children: React.ReactNode;
}

//todo: move to ChartPage?
const Layout: React.FC<LayoutProps> = ({children}) => {
    return <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">Route Visualization</Typography>
            </Toolbar>
        </AppBar>
        <Stack alignItems={"center"}
               spacing={2}
               paddingX={5}
               paddingTop={2}>
            {children}
        </Stack>
    </>;
};

export default Layout;
