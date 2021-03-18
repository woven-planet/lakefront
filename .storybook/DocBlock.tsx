import React, { FC } from 'react';
import { ArgsTable, Description, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";

const DocBlock = () => {
    return (
        <>
            <Title />
            <Subtitle />
            <Description />
            <Stories includePrimary />
            <ArgsTable />
        </>
    )
};

export default DocBlock;