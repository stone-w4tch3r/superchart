import Card from "@mui/material/Card";
import React from "react";

export interface IStyledCardProps {
    children: React.ReactNode,
    height: string | number,
    paddingBottom?: number
}

export const StyledCard: React.FC<IStyledCardProps> = ({children, height, paddingBottom = 12}) =>
    <Card sx={{borderRadius: 6, boxShadow: 3, height: height, pb: paddingBottom, px: 4, pt: 2}}>
        {children}
    </Card>;
