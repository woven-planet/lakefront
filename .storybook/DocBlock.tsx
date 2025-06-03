import { FC } from 'react';
import { ArgTypes, Description, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";

const DocBlock: FC = () => {
    return (
        <>
            <Title />
            <Subtitle />
            <Description />
            <Stories includePrimary />
            <ArgTypes />
        </>
    )
};

export default DocBlock;
