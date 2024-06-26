import React from 'react';
import {
    Button,
    Container,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    styled
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const StyledSection = styled('section')(({ theme }) => ({
    minHeight: '100vh',
    width: '100%',
    padding: theme.spacing(12, 0),
    background: `linear-gradient(to right, ${theme.palette.grey[50]}, ${theme.palette.grey[100]})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(6, 0),
    },
}));

const PricingCard = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    border: `1px solid ${theme.palette.grey[300]}`,
    height: '100%',
}));

const PopularBadge = styled('div')(({ theme }) => ({
    padding: theme.spacing(0.5, 1.5),
    fontSize: '0.875rem',
    color: 'white',
    background: `linear-gradient(to right, ${"#9c27b0"}, ${"#673ab7"})`,
    borderRadius: '9999px',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translate(-50%, -50%)',
}));

const PricingButton = styled(Button)(({ theme, color }) => ({
    width: '100%',
    ...(color === 'secondary' && {
        background: `linear-gradient(to right, ${"#9c27b0"}, ${"#673ab7"})`,
        color: 'white',
        '&:hover': {
            background: `linear-gradient(to right, ${"#9c27b0"}, ${"#673ab7"})`,
        },
    }),
}));

const StyledCheckIcon = styled(CheckIcon)(({ theme }) => ({
    fontSize: '0.75rem',
    backgroundColor: theme.palette.success.main,
    color: 'white',
    borderRadius: '50%',
    padding: '2px',
    marginRight: theme.spacing(1),
}));

const PricingPage: React.FC = () => {
    return (
        <StyledSection>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <PricingCard>
                            <div>
                                <Typography variant="h4" align="center" gutterBottom>
                                    Basic
                                </Typography>
                                <Typography variant="h3" align="center" gutterBottom>
                                    $29<Typography variant="subtitle1" component="span"> / month</Typography>
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyledCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="720p Video Rendering" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyledCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="2GB Cloud Storage" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyledCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Basic Video Templates" />
                                    </ListItem>
                                </List>
                            </div>
                            <PricingButton variant="contained">Get Started</PricingButton>
                        </PricingCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PricingCard style={{ position: 'relative', borderColor: '#9c27b0' }}>
                            <PopularBadge>Popular</PopularBadge>
                            <div>
                                <Typography variant="h4" align="center" gutterBottom>
                                    Pro
                                </Typography>
                                <Typography variant="h3" align="center" gutterBottom>
                                    $59<Typography variant="subtitle1" component="span"> / month</Typography>
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyledCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="1080p Video Rendering" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyledCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="10GB Cloud Storage" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyledCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Premium Video Templates" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyledCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Collaboration Tools" />
                                    </ListItem>
                                </List>
                            </div>
                            <PricingButton color="primary" variant="contained">Get Started</PricingButton>
                        </PricingCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PricingCard>
                            <div>
                                <Typography variant="h4" align="center" gutterBottom>
                                    Enterprise
                                </Typography>
                                <Typography variant="h3" align="center" gutterBottom>
                                    $99<Typography variant="subtitle1" component="span"> / month</Typography>
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyledCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="4K Video Rendering" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyledCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Unlimited Cloud Storage" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyledCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Custom Video Templates" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyledCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Advanced Collaboration Tools" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <StyledCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Dedicated Support" />
                                    </ListItem>
                                </List>
                            </div>
                            <PricingButton variant="contained">Get Started</PricingButton>
                        </PricingCard>
                    </Grid>
                </Grid>
            </Container>
        </StyledSection>
    );
};

export default PricingPage;