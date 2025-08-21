import React, { useEffect, useRef, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

import Certimate from '../assets/brands/certimate.png';
import Wams from '../assets/brands/WAMS.png';
import IIITDMK from '../assets/brands/iiitdm_logo.png';

const brands = [IIITDMK, Certimate, Wams];

const Container = styled.div`
  display: flex;
  padding: 0vw 10vw;
  height: 100%;
  gap: 2vw;
  align-items: stretch;
  justify-content: center;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const ContentColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  max-width: 100%;
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0467d5;
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 120%;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #0467d5;
    border-radius: 2px;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.75;
  text-align: justify;
  margin-bottom: 1.5rem;

  @media (max-width: 470px) {
    font-size: 0.8rem;
  }
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const TechTag = styled.span`
  background: #0467d5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 470px) {
    font-size: 0.7rem;
  }
`;

const TechScrollContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 1rem 0;
  mask: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
`;

const scroll = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-300%, 0, 0);
  }
`;

const TechScroll = styled.div`
  display: flex;
  align-items: center;
  animation: ${scroll} 20s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const LogoImage = styled.img`
  height: 4.5rem;
  width: auto;
  margin-right: 3rem;
  transition: transform 0.3s ease, filter 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;

const Myself = () => {
  const animationRef = useRef(null);

  const techTags = useMemo(() => [
    'React + Vite',
    'Node.js',
    'Express.js',
    'PostgreSQL',
    'Sequelize ORM',
    'JWT Auth',
    'RBAC',
    'Admin Panel',
  ], []);

  const duplicatedBrands = useMemo(() => [...brands, ...brands, ...brands, ...brands, ...brands, ...brands, ...brands, ...brands, ...brands], []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && animationRef.current) {
      animationRef.current.style.animation = 'none';
    }
  }, []);

  return (
    <Container id="recent">
      <ContentColumn>
        <ProjectCard>
          <Title>Hostel Management System</Title>
          <Description>
            Currently building a full-stack hostel portal for my own college — something the admin staff can actually use to manage everything from student room allotments to fee records, buildings, and wardens.
            <br /><br />
            The system is being built from the ground up with a React + Vite dashboard, backed by a Node.js server and PostgreSQL database using Sequelize. I've already designed and integrated 10+ relational tables (and counting), covering key hostel workflows.
            <br /><br />
            It includes secure role-based access, so different users, from wardens to the Super Admin, can log in and manage only what they're supposed to. It's one of the biggest real-world apps I've worked on so far, and it's teaching me a lot about structuring large-scale backend logic and database relationships.
          </Description>
          <TechTags>
            {techTags.map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </TechTags>
        </ProjectCard>

        <ProjectCard>
          <Title>Experiences</Title>
          <TechScrollContainer>
            <TechScroll ref={animationRef}>
              {duplicatedBrands.map((src, index) => (
                <LogoImage
                  src={src}
                  alt={`Company logo ${index % brands.length + 1}`}
                  key={`${src}-${index}`}
                />
              ))}
            </TechScroll>
          </TechScrollContainer>
        </ProjectCard>
      </ContentColumn>
    </Container>
  );
};

export default React.memo(Myself);