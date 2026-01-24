import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`
    max-width: 800px;
    margin: 40px auto;
    padding: 0 20px;
`;

const ChapterTag = styled.div`
    text-align: center;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
`;

const Title = styled.h2`
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 30px;
    font-family: 'Orbitron', sans-serif;
    color: white;
    
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const SkillGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
`;

const SkillOrb = styled.div`
    background: rgba(0, 173, 181, 0.1);
    border: 1px solid var(--teal-glow);
    color: var(--teal-glow);
    padding: 12px 24px;
    border-radius: 50px;
    font-family: 'Rajdhani', sans-serif;
    font-weight: bold;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 173, 181, 0.1);
    
    &:hover {
        background: var(--teal-glow);
        color: #000;
        transform: translateY(-3px);
        box-shadow: 0 0 20px var(--teal-glow);
    }
`;

const Inventory = () => {
    const skills = useSelector(state => state.portfolio.skills);

    return (
        <Container>
            <ChapterTag>Chapter 2 // Inventory</ChapterTag>
            <Title>ACTIVE POWER-UPS</Title>

            <SkillGrid>
                {skills.map((skill, index) => (
                    <SkillOrb key={index}>{skill}</SkillOrb>
                ))}
            </SkillGrid>
        </Container>
    );
};

export default Inventory;
