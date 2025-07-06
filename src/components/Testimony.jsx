import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Quote, Star } from 'lucide-react';

import ReactImage from '../assets/react.png';
import NodeImage from '../assets/node.png';
import MongoDbImage from '../assets/mongodb.png';
import { testimonies } from '../utils/data';

const float = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(180deg); }
  100% { transform: translateY(0) rotate(360deg); }
`;

const Container = styled.section`
  padding: 4rem 10vw;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #0a2540;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const BubbleCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-top: 4px solid #0467d5;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0.1;
  color: #0467d5;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #0467d5;
`;

const Name = styled.h4`
  margin: 0;
  font-size: 1.1rem;
`;

const Role = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
`;

const Text = styled.p`
  margin-top: 1rem;
  font-style: italic;
  color: #475569;
  font-size: 1rem;
  line-height: 1.6;
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-top: 0.5rem;
`;

const StarIcon = styled.div`
  color: #fbbf24;
`;

const FloatingShape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(4, 103, 213, 0.1);
  animation: ${float} 20s infinite linear;
  pointer-events: none;
  z-index: 0;
`;

const Testimony = () => {
  return (
    <Container id="testimonials">
      <FloatingShape style={{ width: '80px', height: '80px', top: '10%', left: '5%' }} />
      <FloatingShape style={{ width: '60px', height: '60px', top: '60%', right: '10%' }} />
      <FloatingShape style={{ width: '100px', height: '100px', top: '40%', left: '80%' }} />

      <Title>What People Say</Title>

      <Grid>
        {testimonies.map((item) => (
          <BubbleCard key={item.id}>
            <QuoteIcon><Quote size={24} /></QuoteIcon>

            <Header>
              <Avatar src={item.avatar} alt={item.name} />
              <div>
                <Name>{item.name}</Name>
                <Role>{item.role}</Role>
              </div>
            </Header>

            <Text>“{item.text}”</Text>
          </BubbleCard>
        ))}
      </Grid>
    </Container>
  );
};

export default Testimony;
