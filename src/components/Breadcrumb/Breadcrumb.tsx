import React from 'react';
import { Link } from 'react-router-dom';

import { BreadCrumbStyle, Current, Divider } from './breadcrumbStyles';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';

export interface RouteProp {
    /**
     * This is to set the name of the breadcrumb to be displayed.
     */
    name: string;
    /**
     * This is to set the link of the breadcrumb.
     */
    url: string;
}

export interface BreadcrumbProps {
    /**
     * This is to set the routes which includes the name of the breadcrumb that needs to be displayed.
     *  You can also set the url for the breadcrumb to navigate to the appropriate link.
     */
    routes: RouteProp[];
}

/**
 *  The Breadcrumb Component is used to render the breadcrumb. The Name of the Breadcrumb is displayed.
 *  The url can be used to link to the appropriate link.
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({ routes }) => {

    return (
        <ThemeProvider theme={theme}>
            <BreadCrumbStyle>
                <nav>
                    {routes.map((route, index) => {
                        // just render text if it's the last item
                        if (index + 1 === routes.length) {
                            return (
                                <Current key={route.url}>
                                    {route.name}
                                </Current>
                            );
                        }

                        return (
                            <div key={route.url}>
                                <Link to={route.url}>{route.name}</Link>
                                <Divider> / </Divider>
                            </div>
                        );
                    })}
                </nav>
            </BreadCrumbStyle>
        </ThemeProvider>
    );
};

export default Breadcrumb;
