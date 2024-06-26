import React, {useState} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TextField,
    IconButton,
    styled,
    Paper,
    Box
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {LineChart} from '@mui/x-charts';
import SpeedIcon from '@mui/icons-material/Speed';
import Link from "@mui/material/Link";
import {ThemeProvider, createTheme} from "@mui/material/styles";


const DashboardPageV2: React.FC = () => {
    const [themeState, setThemeState] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setThemeState(themeState === 'light' ? 'dark' : 'light');
    };

    const theme = createTheme({
        typography: {
            fontFamily: '"Inter", sans-serif',
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: '#f3f4f6',
                    },
                },
            },
        },
    });

    return <ThemeProvider theme={theme}>
        <Navbar themeState={themeState} toggleTheme={toggleTheme}/>
        <Container sx={{py: 3}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <SalesChart/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ChartControls/>
                </Grid>
            </Grid>
        </Container>
        <Footer/>
    </ThemeProvider>;
};

export default DashboardPageV2;

const GradientAppBar = styled(AppBar)({
    background: 'linear-gradient(90deg, rgba(1,109,213,1) 0%, rgba(1,61,143,1) 100%)',
});

const Navbar: React.FC = (themeState: "light" | "dark", toggleTheme: () => void) => {
    return <GradientAppBar position="static">
        <Toolbar sx={{py: 1, px: 3, display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h5" fontWeight={600}>
                Dashboard
            </Typography>
            <IconButton color="inherit" onClick={toggleTheme}>
                {themeState === 'light' ? <Brightness4Icon/> : <Brightness7Icon/>}
            </IconButton>
        </Toolbar>
    </GradientAppBar>;
};

const SalesChart: React.FC = () => {
    return <Paper sx={{p: 2, borderRadius: 2, boxShadow: 1}}>
        <Typography variant="h6" fontWeight={600} mb={2}>
            Sales Chart
        </Typography>
        <LineChart
            xAxis={[{data: [1, 2, 3, 5, 8, 10]}]}
            series={[
                {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
            ]}
            width={400}
            height={300}
            sx={{bgcolor: "red"}}
        />
    </Paper>;
};


const ChartControls: React.FC = () => {
    return <Paper sx={{p: 2, borderRadius: 2, boxShadow: 1}}>
        <Typography variant="h6" fontWeight={600} mb={2}>
            Chart Controls
        </Typography>
        <Box sx={{'& > *': {mt: 2}}}>
            <TextField
                select
                fullWidth
                label="Metric"
                defaultValue="Revenue"
                size="small"
            >
                <MenuItem value="Revenue">Revenue</MenuItem>
                <MenuItem value="Profit">Profit</MenuItem>
            </TextField>
            <TextField
                select
                fullWidth
                label="Timeframe"
                defaultValue="Monthly"
                size="small"
            >
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Quarterly">Quarterly</MenuItem>
            </TextField>
            <TextField
                select
                fullWidth
                label="Chart Type"
                defaultValue="Line"
                size="small"
            >
                <MenuItem value="Line">Line</MenuItem>
                <MenuItem value="Bar">Bar</MenuItem>
            </TextField>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        type="date"
                        fullWidth
                        label="Date Range"
                        defaultValue="2023-01-01"
                        size="small"
                        InputLabelProps={{shrink: true}}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="date"
                        fullWidth
                        defaultValue="2023-12-31"
                        size="small"
                        InputLabelProps={{shrink: true}}
                    />
                </Grid>
            </Grid>
        </Box>
    </Paper>;
};

const GradientFooter = styled(Box)({
    background: 'linear-gradient(90deg, rgba(1,109,213,1) 0%, rgba(1,61,143,1) 100%)',
    color: 'white',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const Footer: React.FC = () => {
    return <GradientFooter>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <SpeedIcon sx={{mr: 1}}/> Speed
        </Box>
        <Typography>Acme Inc. All rights reserved.</Typography>
        <Box>
            <Link href="#" color="inherit" sx={{mr: 2, '&:hover': {textDecoration: 'underline'}}}>
                Terms of Service
            </Link>
            <Link href="#" color="inherit" sx={{'&:hover': {textDecoration: 'underline'}}}>
                Privacy Policy
            </Link>
        </Box>
    </GradientFooter>;
};