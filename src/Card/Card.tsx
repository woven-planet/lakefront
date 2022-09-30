import { FC, ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from 'src/styles/theme';
import Button from 'src/Button/Button';
import { CardContentContainer } from './CardStyles';
import { ReactComponent as MoreDetails } from './assets/moreDetails.svg';

export interface CardProps {
    /**
    * This will set the cards h1 heading.
    */
    title: string;
    /**
    * When clicked will fire a callback.
    */
    onClick?: () => void;
    /**
    * Description of the cards intent.
    */
    description: string;
    /**
    * This take in any ReactNode.
    */
    content?: ReactNode;
    /**
    * If the button should or shouldn't be disabled.
    */
    disabled?: boolean;
}

/**
 *  The Card Component is used to render a single Card, or a collection of Cards.
 */
const Card: FC<CardProps> = ({ title, onClick, description, content, disabled }) => {

    return (
        <ThemeProvider theme={theme}>
            <CardContentContainer>
                <h1>{title}</h1>
                <p>{description}</p>
                <div>
                    {content}
                </div>
                <Button
                    disabled={disabled}
                    onClick={
                        disabled
                            ? undefined
                            : onClick
                    }
                    type='button'
                    icon={<MoreDetails />}
                />

            </CardContentContainer>
        </ThemeProvider>
    );
};

export default Card;
