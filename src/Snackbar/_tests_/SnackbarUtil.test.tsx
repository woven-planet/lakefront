import {generateAnchorOrigin, SnackbarOrigin} from '../Snackbar.util';

const anchorOriginMock: SnackbarOrigin = {
    vertical: 'bottom',
    horizontal: 'left'
};

const portalMock = {
    style: {left: '', bottom: ''},
};

beforeEach(() => {
    anchorOriginMock.vertical = 'bottom';
    anchorOriginMock.horizontal = 'left';
    portalMock.style.left = '';
    portalMock.style.bottom = '';
});

describe('generateAnchorOrigin', () => {
    it('sets left property to 0% when user sets horizontal left', () => {
        anchorOriginMock.horizontal = 'left';
        generateAnchorOrigin(anchorOriginMock, portalMock);
        expect(portalMock.style.left).toEqual('0%');
    });

    it('sets left property to 40% when user sets horizontal center', () => {
        anchorOriginMock.horizontal = 'center';

        generateAnchorOrigin(anchorOriginMock, portalMock);
        expect(portalMock.style.left).toEqual('40%');
    });

    it('sets left property to 85% when user sets horizontal right', () => {
        anchorOriginMock.horizontal = 'right';

        generateAnchorOrigin(anchorOriginMock, portalMock);
        expect(portalMock.style.left).toEqual('85%');
    });

    it('sets bottom property to 0% when user sets vertical bottom', () => {
        anchorOriginMock.vertical = 'bottom';

        generateAnchorOrigin(anchorOriginMock, portalMock);
        expect(portalMock.style.bottom).toEqual('0%');
    });

    it('sets bottom property to 90% when user sets vertical top', () => {
        anchorOriginMock.vertical = 'top';

        generateAnchorOrigin(anchorOriginMock, portalMock);
        expect(portalMock.style.bottom).toEqual('90%');
    }); 
});
