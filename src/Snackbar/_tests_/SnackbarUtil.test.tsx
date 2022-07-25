import { generateAnchorOrigin, SnackbarOrigin, MESSAGE_TYPES, getIcon, createDefaultAction } from '../Snackbar.util';

const anchorOriginMock: SnackbarOrigin = {
    vertical: 'bottom',
    horizontal: 'left'
};

const portalMock = {
    style: {left: '', bottom: '', right: '', top: ''}
};

beforeEach(() => {
    anchorOriginMock.vertical = 'bottom';
    anchorOriginMock.horizontal = 'left';
    portalMock.style.left = '';
    portalMock.style.bottom = '';
    portalMock.style.right = '';
    portalMock.style.top = '';
});

describe('generateAnchorOrigin', () => {
    it('sets left property to 24px when user sets horizontal left', () => {
        anchorOriginMock.horizontal = 'left';
        generateAnchorOrigin(anchorOriginMock, portalMock);
        expect(portalMock.style.left).toEqual('24px');
    });

    it('sets left property to 40% when user sets horizontal center', () => {
        anchorOriginMock.horizontal = 'center';

        generateAnchorOrigin(anchorOriginMock, portalMock);
        expect(portalMock.style.left).toEqual('40%');
    });

    it('sets right property to 24px when user sets horizontal right', () => {
        anchorOriginMock.horizontal = 'right';

        generateAnchorOrigin(anchorOriginMock, portalMock);
        expect(portalMock.style.right).toEqual('24px');
    });

    it('sets bottom property to 24px when user sets vertical bottom', () => {
        anchorOriginMock.vertical = 'bottom';

        generateAnchorOrigin(anchorOriginMock, portalMock);
        expect(portalMock.style.bottom).toEqual('24px');
    });

    it('sets top property to 24px when user sets vertical top', () => {
        anchorOriginMock.vertical = 'top';

        generateAnchorOrigin(anchorOriginMock, portalMock);
        expect(portalMock.style.top).toEqual('24px');
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

        expect(getIcon(typeMock.SUCCESS)).toStrictEqual(<svg style={{ fill: '#378fee' }} />);
        expect(getIcon(typeMock.ERROR)).toStrictEqual(<svg style={{ fill: '#ef5042' }} />);
        expect(getIcon(typeMock.INFO)).toStrictEqual(<svg style={{ fill: '#ffffff' }} />);
    });

    describe('createDefaultAction', () => {
        it('calls createDefaultAction with timeout value', () => {
            const onClose = () => 'timeout';
            
            expect(createDefaultAction(onClose)).toBeDefined();
        });
    });
});
