import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { toggleChaos } from './redux/portfolioSlice';
import HUD from './components/HUD';
import OriginCard from './components/OriginCard';
import UniversalTimeline from './components/UniversalTimeline';
import Inventory from './components/Inventory';
import QuestLog from './components/QuestLog';
import Footer from './components/Footer';

// Define the float animation
const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  50% { transform: translateY(0) rotate(-5deg); }
  75% { transform: translateY(20px) rotate(2deg); }
`;

// Define a wrapper that can apply the Zero-G effect
const ZeroGWrapper = styled.div`
  ${props => props.$active && css`
    & > * {
      animation: ${float} 6s ease-in-out infinite;
      transition: all 1s ease;
    }
    
    /* Randomize delays for children to make it look chaotic but smooth */
    & > *:nth-child(odd) { animation-duration: 7s; animation-delay: 0.5s; }
    & > *:nth-child(even) { animation-duration: 5s; animation-delay: 1.2s; }
  `}
`;

function App() {
  const { chaosMode, experience, education } = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();

  const handleToggleChaos = () => {
    dispatch(toggleChaos());
  };

  return (
    <>
      <GlobalStyles />
      <HUD />
      <ZeroGWrapper $active={chaosMode}>
        <OriginCard />
        <UniversalTimeline
          title="CAREER HISTORY"
          chapter="Chapter 1.5 // System Logs"
          data={experience}
        />
        <UniversalTimeline
          title="ACADEMIC DATABASE"
          chapter="Chapter 1.8 // Knowledge Base"
          data={education}
        />
        <Inventory />
        <QuestLog />
        <Footer onChaos={handleToggleChaos} />
      </ZeroGWrapper>
    </>
  );
}

export default App;
