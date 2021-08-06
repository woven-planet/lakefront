import { createOption, createUniqueOptions } from '../multiSelectUtil';

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
