import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const classes = {
        layoutContainer: 'layout-container',
    };
    return <div className={classes.layoutContainer}>
        {children}
    </div>;
};

export default Layout;
