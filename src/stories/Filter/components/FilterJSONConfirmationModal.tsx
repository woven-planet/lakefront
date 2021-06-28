import { FC } from 'react';
import styled from '@emotion/styled';
import { FilterJSONConfirmationModalProps } from 'src/Filter/types';
import Button from 'src/Button/Button';

const ModalContainer = styled.div<FilterJSONConfirmationModalProps>(({ modalVisible = false }) => ({
    display: modalVisible ? 'block' : 'none',
    position: 'fixed',
    zIndex: 1,
    paddingTop: '100px',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: ['rgb(0,0,0)', 'rgba(0,0,0,0.4)']
}));

const ModalContent = styled.div({
    backgroundColor: '#fefefe',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%'
});

const ButtonWrapper = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1em',
    button: {
        flex: 1
    },
    'button:first-of-type': {
        marginRight: 2
    },
    'button:last-of-type': {
        marginLeft: 2
    }
});

const FilterJSONConfirmationModal: FC<FilterJSONConfirmationModalProps> = ({
    modalVisible,
    handleModalClose,
    onConfirm
}) => {
    const handleConfirmation = () => {
        onConfirm();
        handleModalClose();
    };

    return (
        <ModalContainer modalVisible={modalVisible}>
            <ModalContent>
                <p>You have made changes to the JSON filter input, but have not yet applied these updates.</p>
                <p>Would you like to discard your changes and switch back to the Filter UI view?</p>
                <ButtonWrapper>
                    <Button color="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmation}>Switch to Filter UI</Button>
                </ButtonWrapper>
            </ModalContent>
        </ModalContainer>
    );
};

export default FilterJSONConfirmationModal;
