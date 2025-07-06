import React, { useMemo } from 'react';
import Hero from '../components/Hero';
import styled, { keyframes } from 'styled-components';
import Myself from '../components/Myself';
import ProjectGlimps from '../components/ProjectGlimps';
import TechStacks from '../components/TechStacks';
import Footer from '../components/Footer';
import Experience from '../components/Experience';
import Testimony from '../components/Testimony';
import Contact from '../components/Contact';
import Achievement from '../components/Achievement';
import Navbar from '../components/Navbar';

const Container = styled.div`
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
`;

const FloatingBubblesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.3; }
  50% { transform: translateY(-20px) translateX(10px) rotate(180deg); opacity: 0.15; }
  100% { transform: translateY(0) translateX(0) rotate(360deg); opacity: 0.3; }
`;

const FloatingBubble = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${(props) => props.gradient};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  opacity: 0.2;
  animation: ${floatAnimation} ${(props) => props.duration}s ease-in-out infinite;
  filter: blur(1px);
  border: 1px solid rgba(4, 103, 213, 0.1);

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    filter: blur(2px);
  }

  &::before {
    top: 15%;
    left: 15%;
    width: 30%;
    height: 30%;
  }

  &::after {
    bottom: 20%;
    right: 20%;
    width: 15%;
    height: 15%;
    background: rgba(255, 255, 255, 0.5);
    filter: blur(1px);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const Home = () => {
  const bubbles = useMemo(() => {
    const configs = [];
    const addBubbles = (count, sizeRange, durationRange, gradientColor) => {
      for (let i = 0; i < count; i++) {
        const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
        configs.push({
          id: `bubble-${i}`,
          size,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          duration: Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0],
          gradient: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, ${gradientColor})`,
        });
      }
    };

    addBubbles(5, [100, 180], [25, 35], 'rgba(4, 103, 213, 0.15), rgba(4, 103, 213, 0.05)');
    addBubbles(7, [60, 100], [18, 28], 'rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.02)');
    addBubbles(10, [20, 50], [15, 20], 'rgba(14, 165, 233, 0.1), rgba(14, 165, 233, 0.01)');
    return configs;
  }, []);

  return (
    <Container>
      <FloatingBubblesContainer>
        {bubbles.map((bubble) => (
          <FloatingBubble
            key={bubble.id}
            size={bubble.size}
            top={bubble.top}
            left={bubble.left}
            duration={bubble.duration}
            gradient={bubble.gradient}
          />
        ))}
      </FloatingBubblesContainer>

      <ContentWrapper>
        <Navbar />
        <Hero />
        <Myself />
        <ProjectGlimps />
        <TechStacks />
        <Experience />
        <Achievement />
        <Testimony />
        <Contact />
        <Footer />
      </ContentWrapper>
    </Container>
  );
};

export default Home;
