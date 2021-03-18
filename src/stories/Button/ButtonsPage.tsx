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
    padding: 32,
    width: '40%'
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
                    <Button icon>Primary</Button>
                    <Button icon/>
                </Section>
                <Section>
                    <Button color="secondary">Secondary</Button>
                    <Button icon color="secondary">Secondary</Button>
                </Section>
                <Section>
                    <Button color="destructive">Destructive</Button>
                    <Button icon color="destructive">Destructive</Button>
                    <Button color="destructive" icon/>
                </Section>
                <SectionLabel>Disabled:</SectionLabel>
                <Section>
                    <Button disabled>Primary</Button>
                    <Button icon disabled>Primary</Button>
                    <Button icon disabled/>
                </Section>
                <Section>
                    <Button color="secondary" disabled>Secondary</Button>
                    <Button icon color="secondary" disabled>Secondary</Button>
                </Section>
                <Section>
                    <Button color="destructive" disabled>Destructive</Button>
                    <Button icon color="destructive" disabled>Destructive</Button>
                    <Button color="destructive" icon disabled/>
                </Section>
            </DefaultWrapper>
            <AlternateWrapper>
                <Section>
                    <Button alternate>Primary</Button>
                    <Button icon alternate>Primary</Button>
                    <Button icon alternate/>
                </Section>
                <Section>
                    <Button color="secondary" alternate>Secondary</Button>
                    <Button icon color="secondary" alternate>Secondary</Button>
                </Section>
                <Section>
                    <Button color="destructive" alternate>Destructive</Button>
                    <Button icon color="destructive" alternate>Destructive</Button>
                    <Button color="destructive" icon alternate/>
                </Section>
                <SectionLabel style={{color: 'white'}}>Disabled:</SectionLabel>
                <Section>
                    <Button alternate disabled>Primary</Button>
                    <Button icon alternate disabled>Primary</Button>
                    <Button icon alternate disabled/>
                </Section>
                <Section>
                    <Button color="secondary" alternate disabled>Secondary</Button>
                    <Button icon color="secondary" alternate disabled>Secondary</Button>
                </Section>
                <Section>
                    <Button color="destructive" alternate disabled>Destructive</Button>
                    <Button icon color="destructive" alternate disabled>Destructive</Button>
                    <Button color="destructive" icon alternate disabled/>
                </Section>
            </AlternateWrapper>
        </div>
    )
}
export default ButtonsPage;
