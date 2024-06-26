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
    MenuItem,
    TextField,
    IconButton,
    styled,
    Box
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {LineChart} from '@mui/x-charts';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import Link from "@mui/material/Link";
import {GitHub} from "@mui/icons-material";
import Button from "@mui/material/Button";


const DashboardPageV2: React.FC = () => {
    return <>
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Navbar/>
            <Container sx={{py: 3, flexGrow: 1}}>
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
        </Box>
    </>;
};

export default DashboardPageV2;

const GradientAppBar = styled(AppBar)({
    background: 'linear-gradient(90deg, rgba(1,109,213,1) 0%, rgba(1,61,143,1) 100%)',
});

const Navbar: React.FC = () => {
    return <GradientAppBar position="static">
        <Toolbar sx={{py: 1, px: 3, display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h5" fontWeight={600}>
                Superchart
            </Typography>
            <Button
                variant="outlined"
                endIcon={<GitHub/>}
                href="https://github.com"
                size="large"
                color="inherit"
                target="_blank"
            >
                Source code
            </Button>
        </Toolbar>
    </GradientAppBar>;
};

const SalesChart: React.FC = () => {
    return <Card sx={{p: 2, borderRadius: 6, boxShadow: 3}}>
        <CardHeader title="Sales Chart"/>
        <CardContent>
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
        </CardContent>
    </Card>;
};

const ChartControls: React.FC = () => {
    return <Card sx={{p: 2, borderRadius: 6, boxShadow: 3}}>
        <CardHeader title="Chart Controls"/>
        <CardContent sx={{'& > *': {mt: 2}}}>
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
        </CardContent>
    </Card>;
};

const GradientBox = styled(Box)({
    background: 'linear-gradient(90deg, rgba(1,109,213,1) 0%, rgba(1,61,143,1) 100%)',
    color: 'white',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const Footer: React.FC = () => {
    return <GradientBox>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            Powered by <CloudQueueIcon sx={{ml: 1}}/>
        </Box>
    </GradientBox>;
};