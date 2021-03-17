import React, { FC } from 'react';
import Button from 'src/Button/Button';
import styled from "@emotion/styled";
import theme from "src/styles/theme";

const DefaultWrapper = styled.div({
    backgroundColor: theme.colors.white,
    fontFamily: '"Source Sans Pro", sans-serif',
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const AlternateWrapper = styled(DefaultWrapper)({
   backgroundColor: theme.colors.gunpowder
});

const Section = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%'
});

const SectionLabel = styled.p({
    margin: 32
});

const ButtonsPage: FC = () => {
    return (
        <div>
            <DefaultWrapper>
                <Section>
                    <Button>Primary</Button>
                    <Button color="secondary">Secondary</Button>
                    <Button color="destructive">Destructive</Button>
                    <Button icon />
                    <Button color="destructive" icon />
                </Section>
                <SectionLabel>Disabled:</SectionLabel>
                <Section>
                    <Button disabled>Primary</Button>
                    <Button icon disabled>Primary</Button>
                    <Button color="secondary" disabled>Secondary</Button>
                    <Button icon color="secondary" disabled>Secondary</Button>
                    <Button color="destructive" disabled>Destructive</Button>
                    <Button icon color="destructive" disabled>Destructive</Button>
                    <Button icon disabled />
                    <Button color="destructive" icon disabled />
                </Section>
            </DefaultWrapper>
            <AlternateWrapper>
                <Section>
                    <Button alternate>Primary</Button>
                    <Button icon alternate>Primary</Button>
                    <Button color="secondary" alternate>Secondary</Button>
                    <Button icon color="secondary" alternate>Secondary</Button>
                    <Button color="destructive" alternate>Destructive</Button>
                    <Button icon color="destructive" alternate>Destructive</Button>
                    <Button icon alternate />
                    <Button color="destructive" icon alternate />
                </Section>
                <SectionLabel style={{color: 'white'}}>Disabled:</SectionLabel>
                <Section>
                    <Button alternate disabled>Primary</Button>
                    <Button icon alternate disabled>Primary</Button>
                    <Button color="secondary" alternate disabled>Secondary</Button>
                    <Button icon color="secondary" alternate disabled>Secondary</Button>
                    <Button color="destructive" alternate disabled>Destructive</Button>
                    <Button icon color="destructive" alternate disabled>Destructive</Button>
                    <Button icon alternate disabled />
                    <Button color="destructive" icon alternate disabled />
                </Section>
            </AlternateWrapper>
        </div>
    )
}
export default ButtonsPage;
