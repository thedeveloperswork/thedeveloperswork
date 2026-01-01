import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`
    width: 100%;
    margin: 80px 0;
    padding: 0;
    overflow-x: hidden; /* Hide main container overflow */
`;

const ChapterTag = styled.div`
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
    padding: 0 50px; /* Align with general page padding */
`;

const Title = styled.h2`
    font-family: 'Orbitron', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 50px;
    color: white;
    padding: 0 50px; /* Align with general page padding */

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const ScrollWrapper = styled.div`
    width: 100%;
    max-width: 100vw;
    overflow-x: auto;
    overflow-y: hidden; /* Prevent vertical scrollbar */
    padding: 300px 50px; /* Maximum padding to prevent clipping of tall cards */
    white-space: nowrap; /* Help ensure horizontal flow */
    
    /* Scrollbar styling */
    &::-webkit-scrollbar {
        height: 6px; /* Thinner scrollbar */
    }
    &::-webkit-scrollbar-track {
        background: rgba(0, 173, 181, 0.1);
        border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--teal-glow);
        border-radius: 3px;
        box-shadow: 0 0 5px var(--teal-glow);
    }
`;

const TimelineTrack = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    min-width: max-content; /* Ensure it grows horizontally */
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    margin-top: 20px; /* Adjust based on layout */
`;

const NodeWrapper = styled.div`
    position: relative;
    width: 350px;
    margin-right: 50px;
    
    &::after {
        content: '';
        position: absolute;
        left: 20px; 
        width: 12px;
        height: 12px;
        background: var(--teal-glow);
        border-radius: 50%;
        box-shadow: 0 0 15px var(--teal-glow);
        z-index: 10;
        
        /* Position the node dot on the central line */
        top: 50%;
        transform: translateY(-50%);
    }
`;

/* 
   We use a connector line that goes UP or DOWN from the central axis 
   to the card content.
*/
const Connector = styled.div`
    position: absolute;
    left: 25px; /* Center of the dot (20px left + 6px half-width) */
    width: 2px;
    height: 80px; /* Increased length for better spacing */
    background: rgba(0, 173, 181, 0.5);
    
    /* Variable positioning based on Top/Bottom */
    top: ${props => props.$position === 'bottom' ? '50%' : 'auto'};
    bottom: ${props => props.$position === 'top' ? '50%' : 'auto'};
`;

const CardContent = styled.div`
    background: rgba(10, 25, 47, 0.8);
    border: 1px solid rgba(0, 173, 181, 0.3);
    padding: 20px;
    border-radius: 8px;
    position: absolute;
    width: 100%;
    white-space: normal; /* Allow text to wrap inside cards */
    
    /* Positioning logic */
    top: ${props => props.$position === 'bottom' ? '90px' : 'auto'};
    bottom: ${props => props.$position === 'top' ? '90px' : 'auto'};
    
    backdrop-filter: blur(5px);
    transition: transform 0.3s ease, border-color 0.3s;
    
    &:hover {
        border-color: var(--teal-glow);
        transform: scale(1.02);
        z-index: 20;
    }
`;

/* ... existing text styles ... */
const RoleTitle = styled.h3`
    font-family: 'Orbitron', sans-serif;
    color: white;
    font-size: 1.2rem;
    margin: 0 0 5px 0;
`;

const Company = styled.div`
    font-family: 'Rajdhani', sans-serif;
    color: var(--teal-glow);
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Period = styled.div`
    font-family: 'Courier New', monospace;
    font-size: 0.7rem;
    color: #666;
    margin-bottom: 10px;
`;

const Description = styled.p`
    color: #aaa;
    line-height: 1.5;
    margin-bottom: 10px;
    font-size: 0.9rem;
`;

const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const TechTag = styled.span`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ccc;
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Rajdhani', sans-serif;
`;

const ExperienceTimeline = () => {
    const experience = useSelector(state => state.portfolio.experience);

    return (
        <Container>
            <ChapterTag>Chapter 1.5 // System Logs</ChapterTag>
            <Title>CAREER HISTORY</Title>

            <ScrollWrapper>
                <TimelineTrack>
                    {experience.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const position = isEven ? 'top' : 'bottom';

                        return (
                            <NodeWrapper key={item.id}>
                                <Connector $position={position} />
                                <CardContent $position={position}>
                                    <RoleTitle>{item.role}</RoleTitle>
                                    <Company>{item.company}</Company>
                                    <Period>[TIMESTAMP: {item.period}]</Period>
                                    <Description>{item.description}</Description>
                                    <TechStack>
                                        {item.techStack.map((tech, idx) => (
                                            <TechTag key={idx}>{tech}</TechTag>
                                        ))}
                                    </TechStack>
                                </CardContent>
                            </NodeWrapper>
                        );
                    })}
                </TimelineTrack>
            </ScrollWrapper>
        </Container>
    );
};

export default ExperienceTimeline;
