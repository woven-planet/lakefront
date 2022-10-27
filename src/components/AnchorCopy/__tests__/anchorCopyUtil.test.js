import { generateScrollToUrl } from '../anchorCopyUtil';

describe('generateScrollToUrl', () => {
    it('returns the correct url with hash', () => {
        const windowSpy = jest.spyOn(window, 'window', 'get');
        windowSpy.mockImplementation(() => ({
            location: {
                origin: 'https://example.com',
                pathname: '/dashboard'
            }
        }));

        expect(generateScrollToUrl('here')).toEqual('https://example.com/dashboard#here');
    });
});
