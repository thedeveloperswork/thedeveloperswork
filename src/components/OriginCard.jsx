import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Card = styled.div`
    width: 100%;
    max-width: 800px;
    background: var(--glass-panel);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border-glass);
    border-radius: 20px;
    padding: 60px;
    position: relative;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    margin: 20px;
    
    @media (max-width: 768px) {
        padding: 40px;
        width: 90%;
    }
`;

const Screw = styled.div`
    width: 10px;
    height: 10px;
    background: #333;
    border-radius: 50%;
    position: absolute;
    box-shadow: inset 1px 1px 2px black;
    
    &.tl { top: 15px; left: 15px; }
    &.tr { top: 15px; right: 15px; }
    &.bl { bottom: 15px; left: 15px; }
    &.br { bottom: 15px; right: 15px; }
`;

const ChapterTag = styled.div`
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
`;

const Title = styled.h1`
    font-family: 'Orbitron', sans-serif;
    font-size: 4.5rem;
    margin: 0;
    line-height: 0.9;
    text-transform: uppercase;
    background: linear-gradient(to right, #fff, #bbb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 768px) {
        font-size: 3rem;
    }
`;

const SubTitle = styled.h2`
    font-size: 1.5rem;
    color: var(--teal-glow);
    margin-top: 10px;
    font-weight: 600;
`;

const Quote = styled.p`
    font-style: italic;
    color: #888;
    margin-top: 30px;
    font-size: 1.1rem;
    border-left: 2px solid var(--teal-glow);
    padding-left: 15px;
`;

const Badge = styled.div`
    position: absolute;
    top: -20px;
    right: 40px;
    background: var(--teal-glow);
    color: #000;
    padding: 10px 20px;
    font-weight: bold;
    font-family: 'Orbitron', sans-serif;
    transform: rotate(5deg);
    box-shadow: 0 0 20px rgba(0, 173, 181, 0.6);
    
    @media (max-width: 768px) {
         right: 20px;
         font-size: 0.8rem;
    }
`;

const OriginCard = () => {
    const { content } = useSelector(state => state.portfolio);

    return (
        <Card>
            <Screw className="tl" />
            <Screw className="tr" />
            <Screw className="bl" />
            <Screw className="br" />

            <Badge>MVP NOMINEE</Badge>

            <ChapterTag>Chapter 1 // The Developer</ChapterTag>

            <Title>Vijaya<br />Gopinadh</Title>
            <SubTitle>Specialist Programmer @ Infosys</SubTitle>

            <Quote>"{content.hero.quote}"</Quote>

            <div style={{ marginTop: '40px', color: '#aaa' }}>
                <p><strong>Current Objective:</strong> {content.hero.objective}</p>
            </div>
        </Card>
    );
};

export default OriginCard;
