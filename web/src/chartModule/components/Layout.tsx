import React from 'react';
import {AppBar, responsiveFontSizes, Toolbar, Typography} from '@mui/material';
import Stack from "@mui/material/Stack";
import {createTheme, ThemeProvider} from "@mui/material/styles";

//todo remove?
interface LayoutProps {
    children: React.ReactNode;
}

//todo: move to ChartPage?
const Layout: React.FC<LayoutProps> = ({children}) => {

    return <>
        <AppBar position="static"
                // sx={{
                //     height: {xl: "10vh"}
                // }}
        >
            <Toolbar sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: "flex-start",
                justifyContent: "center",
                // height: "100vh",
            }}>
                <Typography variant="h3">
                    Route Visualization
                </Typography>
            </Toolbar>
        </AppBar>
        <Stack alignItems={"center"}
               spacing={2}
               paddingX={5}
               paddingTop={2}
               height={'100vh'}
        >
            {children}
        </Stack>
    </>;
};

export default Layout;
