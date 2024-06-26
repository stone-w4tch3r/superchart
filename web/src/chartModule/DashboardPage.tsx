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
    styled
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {LineChart} from '@mui/x-charts';

const StyledAppBar = styled(AppBar)(({theme}) => ({
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
}));

const StyledMain = styled('main')(({theme}) => ({
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    position: 'relative',
    overflow: 'hidden',
}));

const GradientOverlay = styled('div')(({theme}) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
    opacity: 0.5,
    animation: 'pulse 2s infinite',
    pointerEvents: 'none',
}));

const StyledCard = styled(Card)(({theme}) => ({
    background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
}));

const StyledFooter = styled('footer')(({theme}) => ({
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const DashboardPage: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <StyledAppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>Dashboard</Typography>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {theme === 'light' ? <Brightness4Icon/> : <Brightness7Icon/>}
                    </IconButton>
                </Toolbar>
            </StyledAppBar>

            <StyledMain>
                <GradientOverlay/>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <StyledCard>
                                <CardHeader title="Sales Chart"/>
                                <CardContent>
                                    <LineChart
                                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                        series={[
                                            {
                                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                                            },
                                        ]}
                                        width={500}
                                        height={300}
                                    />
                                </CardContent>
                            </StyledCard>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StyledCard>
                                <CardHeader title="Chart Controls"/>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Metric</InputLabel>
                                                <Select defaultValue="revenue">
                                                    <MenuItem value="revenue">Revenue</MenuItem>
                                                    <MenuItem value="orders">Orders</MenuItem>
                                                    <MenuItem value="customers">Customers</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Timeframe</InputLabel>
                                                <Select defaultValue="monthly">
                                                    <MenuItem value="daily">Daily</MenuItem>
                                                    <MenuItem value="weekly">Weekly</MenuItem>
                                                    <MenuItem value="monthly">Monthly</MenuItem>
                                                    <MenuItem value="yearly">Yearly</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Chart Type</InputLabel>
                                                <Select defaultValue="line">
                                                    <MenuItem value="line">Line</MenuItem>
                                                    <MenuItem value="bar">Bar</MenuItem>
                                                    <MenuItem value="area">Area</MenuItem>
                                                    <MenuItem value="pie">Pie</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Date Range"
                                                type="date"
                                                defaultValue="2023-01-01"
                                                InputLabelProps={{shrink: true}}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    </Grid>
                </Container>
            </StyledMain>

            <StyledFooter>
                <Typography>&copy; 2024 Acme Inc. All rights reserved.</Typography>
                <div>
                    <Typography component="a" href="#" style={{marginRight: 16}}>Terms of Service</Typography>
                    <Typography component="a" href="#">Privacy Policy</Typography>
                </div>
            </StyledFooter>
        </div>
    );
};

export default DashboardPage;