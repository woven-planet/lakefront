import { createOption } from '../multiSelectUtil';

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
