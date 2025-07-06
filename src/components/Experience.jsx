import React, { useMemo } from 'react'
import styled from 'styled-components'
import { experience } from '../utils/data'

const Container = styled.div`
  display: flex;
  padding: 2vw 10vw;
  height: 100%;
  gap: 2vw;
  align-items: stretch;
  justify-content: center;
`

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  flex: 1;
`

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
    left: 0px;
    width: 60px;
    height: 3px;
    background-color: #0467d5;
  }
`

const ExperienceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, rgba(4, 103, 213, 0.05), transparent);
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::before {
    width: 100%;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`

const LogoWrapper = styled.div`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 1000px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 410px) {
    width: 80px;
    height: 80px;
  }
`

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h4 {
    font-size: 1.2rem;
    color: #0a2540;
    margin: 0 0 0.3rem 0;
    font-weight: 600;
    line-height: 1.3;

    @media (max-width: 1000px) {
      font-size: 1.6rem;
    }

    @media (max-width: 560px) {
      font-size: 1.2rem;
    }

    @media (max-width: 410px) {
      font-size: 0.9rem;
    }
  }

  p {
    font-size: 1rem;
    color: #0467d5;
    margin: 0 0 0.3rem 0;
    font-weight: 500;
    line-height: 1.4;

    @media (max-width: 1000px) {
      font-size: 1.1rem;
    }

    @media (max-width: 560px) {
      font-size: 0.9rem;
    }

    @media (max-width: 410px) {
      font-size: 0.7rem;
    }
  }

  span {
    font-size: 0.95rem;
    color: #6b7c93;
    width: 90%;
    text-align: justify;
    line-height: 1.5;

    @media (max-width: 560px) {
      font-size: 0.8rem;
    }

    @media (max-width: 410px) {
      font-size: 0.6rem;
    }
  }
`

const DateSection = styled.div`
  flex-shrink: 0;
  font-weight: bold;
  font-size: 0.95rem;
  color: #6b7c93;
  text-align: right;
  min-width: 100px;
`

const RightContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  @media (max-width: 1000px) {
    align-items: flex-start;
  }
`

const Type = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 0.9rem;
  color: #6b7c93;

  b {
    color: #0a2540;
    font-weight: 600;
  }

  @media (max-width: 560px) {
    font-size: 0.8rem;
  }

  @media (max-width: 410px) {
    font-size: 0.7rem;
  }
`

const Experience = () => {
  const memoizedExperience = useMemo(() => [...experience].reverse(), [])

  return (
    <Container id="experience">
      <ProjectCard>
        <Title>Experience</Title>
        {memoizedExperience.map((item) => (
          <ExperienceItem key={`exp-${item.id}`}>
            <LogoWrapper>
              <img 
                src={item.logo} 
                alt={`${item.company} logo`} 
                draggable="false"
                loading="lazy"
                decoding="async"
              />
            </LogoWrapper>
            <InfoSection>
              <h4>{item.title}</h4>
              <p>{item.role}</p>
              <span>{item.description}</span>
            </InfoSection>
            <RightContainer>
              <DateSection>{item.date}</DateSection>
              <Type><b>Job Type:</b> {item.type}</Type>
            </RightContainer>
          </ExperienceItem>
        ))}
      </ProjectCard>
    </Container>
  )
}

export default React.memo(Experience)
