import React from "react";
import {Box, styled} from "@mui/material";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

const GradientBox = styled(Box)({
    background: 'linear-gradient(90deg, rgba(1,109,213,1) 0%, rgba(1,61,143,1) 100%)',
    color: 'white',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

export const Footer: React.FC = () => {
    return <GradientBox>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            Powered by <CloudQueueIcon sx={{ml: 1}}/>
        </Box>
    </GradientBox>;
};