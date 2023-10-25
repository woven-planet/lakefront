import { FC } from 'react';
import styled from '@emotion/styled';

// Define your Emotion styled components
const Panel = styled.div`
  width: 20%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #222222;
  box-shadow: 2px 0 10px -5px rgba(0, 0, 0, 0.5), -2px 0 10px -5px rgba(0, 0, 0, 0.5);
`;

const Card = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  width: 80%;
  text-align: center;
`;

const GridContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const LeftPanel = styled(Panel)`
  background-color: white;
`;

const RightPanel = styled(Panel)`
  background-color: white;
`;

const ButtonColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const SampleData = [
    { id: 1, text: 'Card 1' },
    { id: 2, text: 'Card 2' },
    { id: 3, text: 'Card 3' },
    { id: 4, text: 'Card 4' },
];

const TransferList: FC = () => {
    return (
        <GridContainer>
            <LeftPanel>
                {SampleData.map((item) => (
                    <Card key={item.id}>{item.text}</Card>
                ))}
            </LeftPanel>
            <ButtonColumnContainer>
                <Button>Button 1</Button>
                <Button>Button 2</Button>
                <Button>Button 3</Button>
                <Button>Button 4</Button>
            </ButtonColumnContainer>
            <RightPanel>
                {SampleData.map((item) => (
                    <Card key={item.id}>{item.text}</Card>
                ))}
            </RightPanel>
        </GridContainer>
    );
};

export default TransferList;
