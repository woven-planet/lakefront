
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import ItemGridComponent, { ItemGridProps } from 'src/components/ItemGrid';
import DocBlock from '.storybook/DocBlock';
import { ArgsTable } from '@storybook/components';

export default {
    title: 'Lakefront/ItemGrid',
    component: ItemGridComponent,
    parameters: {
        docs: {
            page: DocBlock
        }
    }
} as Meta;

const Template: Story<ItemGridProps & ComponentPropsWithoutRef<'div'>> = (args) => {
    const showColumns = columns => {
        let content = [];
        for (let i = 0; i < columns; i++) {
            content.push(<div key={i}>Column {i + 1}</div>);
        }
        return content;
    };
    return (
        <ItemGridComponent
            maxColumns={args.maxColumns}
            gridGap={args.gridGap}
            columnWidthMin={args.columnWidthMin}
            shouldRecalculateSize={args.shouldRecalculateSize}
            innerWidth={args.innerWidth}>
            {showColumns(args.maxColumns)}
        </ItemGridComponent>
    );
};

export const ItemGrid = Template.bind({});
ItemGrid.args = {
    shouldRecalculateSize: false,
    maxColumns: 5,
    gridGap: { rowGap: 17, columnGap: 12 },
    columnWidthMin: "100px"
};
