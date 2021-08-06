import { createOption, createUniqueOptions, parseItems } from '../multiSelectUtil';

describe('createOption', () => {
    it('returns an object with the correct label and value.', () => {
        const label = 'label';

        expect(createOption(label)).toMatchObject({
            label,
            value: label
        });

        expect(createOption()).toMatchObject({
            label: undefined,
            value: undefined
        });
    });
});

describe('createUniqueOptions', () => {
    it('returns an array of unique created options.', () => {
        const one = 'one';
        const two = 'two';
        const createdOptions = createUniqueOptions([one, one, two, two]);

        expect(createdOptions).toMatchObject([
            {
                label: one,
                value: one
            },
            {
                label: two,
                value: two
            }
        ]);

        expect(createdOptions).toHaveLength(2);
    });
});

describe('parseItems', () => {
    const newLineItems = 'a\nb\nc';
    const delimiter = '\n';

    it('returns array of single item if parseMultiValue is undefined', () => {
        expect(parseItems(newLineItems)).toMatchObject([newLineItems]);
    });

    it('returns array of single item if parseMultiValue.enabled is falsy', () => {
        expect(parseItems(newLineItems, { delimiter })).toMatchObject([newLineItems]);
        expect(parseItems(newLineItems, { enabled: false, delimiter })).toMatchObject([newLineItems]);
    });

    it('returns array of single item if item does not include delimiter', () => {
        const newCommaItems = 'a,b,c';
        expect(parseItems(newCommaItems, { enabled: true, delimiter })).toMatchObject([newCommaItems]);
    });

    it('returns list of items parsed by specified delimiter', () => {
        expect(parseItems(newLineItems, { enabled: true, delimiter })).toMatchObject(newLineItems.split(delimiter));
    });

    it('removes items from parsed length that are only whitespace', () => {
        const itemsWithEmptyEntries = 'a\nb\n \n   \n\n\nc';

        expect(parseItems(itemsWithEmptyEntries, { enabled: true, delimiter })).toMatchObject(['a', 'b', 'c']);
        expect(parseItems(itemsWithEmptyEntries, { enabled: true, delimiter })).toHaveLength(3);
    });
});
