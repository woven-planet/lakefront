import { ClipboardEvent, FC } from 'react';
import { InputProps } from 'react-select';
import { MultiValueInputContainer, StyledMultiValueInput } from './multiSelectStyles';

interface MultiValueInputProps {
    handleCreate: (item: string) => void;
}

const MultiValueInput: FC<MultiValueInputProps & Omit<InputProps, 'theme'>> = ({ handleCreate, ...inputProps }) => (
    <MultiValueInputContainer>
        <StyledMultiValueInput
            {...inputProps}
            autoFocus
            onPaste={(e: ClipboardEvent<HTMLTextAreaElement>) => {
                e.preventDefault();
                handleCreate(e.clipboardData.getData('Text'));
            }}
        />
    </MultiValueInputContainer>
);

export default MultiValueInput;
