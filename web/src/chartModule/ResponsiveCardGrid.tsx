import React from 'react';
import {AppBar, Toolbar, Typography, Container, Grid, Card, CardContent} from '@mui/material';

interface CardData {
    id: number;
    title: string;
    content: string;
}

const cardData: CardData[] = [
    {id: 1, title: 'Card 1', content: 'Content for card 1'},
    {id: 2, title: 'Card 2', content: 'Content for card 2'},
    {id: 3, title: 'Card 3', content: 'Content for card 3'},
    {id: 4, title: 'Card 4', content: 'Content for card 4'},
    {id: 5, title: 'Card 5', content: 'Content for card 5'},
    {id: 6, title: 'Card 6', content: 'Content for card 6'},
    {id: 7, title: 'Card 7', content: 'Content for card 7'},
    {id: 8, title: 'Card 8', content: 'Content for card 8'},
    {id: 9, title: 'Card 9', content: 'Content for card 9'},
    // Add more cards as needed
];

const ResponsiveCardGrid: React.FC = () => {
    return <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">My App</Typography>
            </Toolbar>
        </AppBar>
        <Container maxWidth="lg" style={{marginTop: '2rem'}}>
            <Grid container spacing={3}>
                {cardData.map((card) => <Grid item xs={12} sm={6} md={4} key={card.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{card.title}</Typography>
                                <Typography>{card.content}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>)}
            </Grid>
        </Container>
    </>;
};

export default ResponsiveCardGrid;