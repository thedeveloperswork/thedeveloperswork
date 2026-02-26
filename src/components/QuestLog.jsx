import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`
    max-width: 1000px;
    margin: 80px auto;
    padding: 0 20px;
`;

const ChapterTag = styled.div`
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
`;

const Title = styled.h2`
    font-family: 'Orbitron', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: white;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const MissionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
`;

const MissionCard = styled.div`
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    transition: transform 0.3s;
    
    &:hover {
        transform: scale(1.02);
        border-color: var(--teal-glow);
    }
`;

const MissionStatus = styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
    background: ${props => props.$active ? 'var(--teal-glow)' : '#FF2E63'};
    color: ${props => props.$active ? 'black' : 'white'};
    font-size: 0.7rem;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 4px;
    font-family: 'Orbitron', sans-serif;
    z-index: 10;
`;

const MissionImage = styled.div`
    height: 160px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: ${props => props.$bg || '#333'};
`;

const MissionInfo = styled.div`
    padding: 20px;
    
    h3 {
        margin: 0;
        font-family: 'Orbitron', sans-serif;
        color: white;
    }
    
    p {
        color: #888;
        margin: 5px 0 15px 0;
        font-size: 0.9rem;
    }
`;

const LaunchBtn = styled.button`
    background: transparent;
    border: 1px solid #FF2E63;
    color: #FF2E63;
    width: 100%;
    padding: 10px;
    font-family: 'Orbitron', sans-serif;
    cursor: pointer;
    transition: 0.2s;
    
    &:hover {
        background: #FF2E63;
        color: white;
    }
`;

const QuestLog = () => {
    const missions = useSelector(state => state.portfolio.missions);

    return (
        <Container>
            <ChapterTag>Chapter 3 // Quest Log</ChapterTag>
            <Title>SELECT MISSION</Title>

            <MissionGrid>
                {missions.map((mission, index) => (
                    <MissionCard key={index}>
                        <MissionStatus $active={mission.active}>{mission.status}</MissionStatus>
                        <MissionImage $bg={mission.bg}>
                            <span style={{ opacity: 0.5, color: 'white' }}>{mission.imgAlt}</span>
                        </MissionImage>
                        <MissionInfo>
                            <h3>{mission.title}</h3>
                            <p>{mission.desc}</p>
                            <LaunchBtn>{mission.btnText}</LaunchBtn>
                        </MissionInfo>
                    </MissionCard>
                ))}
            </MissionGrid>
        </Container>
    );
};

export default QuestLog;
