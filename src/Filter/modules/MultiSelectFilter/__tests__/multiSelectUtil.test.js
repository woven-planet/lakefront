import { createOption, getUrlFromList } from '../multiSelectUtil';

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

describe('getUrlFromList', () => {
    it('appends each list item to the url with correct name', () => {
        expect(getUrlFromList('item', ['red', 'blue'], 3)).toBe('&item=red&item=blue')
    });

    describe('when list is an array', () => {
        it('returns an empty string if list size matches count.', () => {
            expect(getUrlFromList('item', ['red', 'blue'], 2)).toBe('')
        });

        it('returns an empty string if list size is 0.', () => {
            expect(getUrlFromList('item', [], 2)).toBe('')
        });
    });

    describe('when list is a set', () => {
        it('returns an empty string if list size matches count.', () => {
            expect(getUrlFromList('item', new Set(['red', 'blue']), 2)).toBe('')
        });

        it('returns an empty string if list size is 0.', () => {
            expect(getUrlFromList('item', new Set(), 2)).toBe('')
        });
    })
});
