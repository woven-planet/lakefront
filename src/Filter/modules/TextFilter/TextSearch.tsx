import { FC, FocusEvent, KeyboardEvent, useEffect, useState } from 'react';
import { StyledInput } from './textSearchStyles';

interface TextSearchProps {
    onChange(text: string): void;
    type?: 'text' | 'number';
    value: string;
}

const TextSearch: FC<TextSearchProps> = ({ onChange, type = 'text', value }) => {
    const [text, setText] = useState('');

    useEffect(() => {
        setText(value);
    }, [value]);

    const submitSearch = (text: string) => {
        onChange(text);
    };

    const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
        submitSearch(event.target.value);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
        if (event.key === 'Enter') {
            submitSearch(event.target?.value || '');
        }
    };

    return (
        <StyledInput
            id="keyword"
            type={type}
            onBlur={handleOnBlur}
            onKeyPress={handleKeyPress}
            onChange={(e) => {
                setText(e.target.value);
            }}
            value={text}
        />
    );
};

export default TextSearch;
