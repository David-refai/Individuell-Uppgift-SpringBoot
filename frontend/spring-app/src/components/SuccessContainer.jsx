// Success.js
import React from 'react';
import styled from '@emotion/styled';

// Define a styled component using Emotion
const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SuccessMessage = styled.h1`
  color: #28a745; // Green color for success
  font-size: 2rem;
`;

const SuccessComponent = ({ message }) => {
  return (
    <SuccessContainer>
      <SuccessMessage>{message}</SuccessMessage>
    </SuccessContainer>
  );
};

export default SuccessComponent;
