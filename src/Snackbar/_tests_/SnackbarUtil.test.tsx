import { generateAnchorOrigin, SnackbarOrigin, MESSAGE_TYPES, getIcon } from '../Snackbar.util';

const anchorOriginMock: SnackbarOrigin = {
    vertical: 'bottom',
    horizontal: 'left'
};

const portalMock = {
    style: { left: '', bottom: '' }
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

describe('getIcon', () => {
    it('has correct MESSAGE_TYPES ERROR message', () => {
        const errorMessage = MESSAGE_TYPES.ERROR;

        getIcon(errorMessage);
        expect(errorMessage).toEqual('error');
    });

    it('has correct MESSAGE_TYPES SUCCESS message', () => {
        const successMessage = MESSAGE_TYPES.SUCCESS;

        getIcon(successMessage);
        expect(successMessage).toEqual('success');
    });

    it('has correct MESSAGE_TYPES INFO message', () => {
        const infoMessage = MESSAGE_TYPES.INFO;

        getIcon(infoMessage);
        expect(infoMessage).toEqual('info');
    });

    it('has correct styling for each MESSAGE_TYPES', () => {
        const typeMock = MESSAGE_TYPES;

        expect(getIcon(typeMock.SUCCESS)).toStrictEqual(<svg style={{ fill: '#45d686' }} />);
        expect(getIcon(typeMock.ERROR)).toStrictEqual(<svg style={{ fill: '#ef5042' }} />);
        expect(getIcon(typeMock.INFO)).toStrictEqual(<svg style={{ fill: '#ffffff' }} />);
    });
});
