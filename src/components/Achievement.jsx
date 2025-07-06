import React, { useMemo } from 'react'
import styled from 'styled-components'
import { achievements } from '../utils/data'

const Container = styled.div`
  display: flex;
  padding: 2vw 10vw;
  height: 100%;
  gap: 2vw;
  align-items: stretch;
  justify-content: center;
`

const AchievementCard = styled.div`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
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
    border-radius: 2px;
  }
`

const AchievementItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.1);
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
    transition: width 0.4s ease;
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
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }

  &:hover img {
    transform: scale(1.1);
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
  position: relative;
  z-index: 1;

  h4 {
    font-size: 1.2rem;
    color: #0467d5;
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
    font-size: 0.95rem;
    color: #6b7c93;
    margin: 0 0 0.3rem 0;
    line-height: 1.5;

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
`

const DateSection = styled.div`
  flex-shrink: 0;
  font-size: 0.95rem;
  color: #6b7c93;
  text-align: right;
  min-width: 100px;
  font-weight: 500;
  position: relative;
  z-index: 1;

  @media (max-width: 1000px) {
    text-align: left;
  }
`

const Badge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #0467d5, #0284c7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(4, 103, 213, 0.3);
`

const Achievement = () => {
  const memoizedAchievements = useMemo(() => [...achievements].reverse(), [])

  return (
    <Container id="achievement">
      <AchievementCard>
        <Title>Achievements</Title>
        {memoizedAchievements.map((item, index) => (
          <AchievementItem key={`achievement-${item.id}`}>
            <LogoWrapper>
              <img 
                src={item.logo} 
                alt={`${item.title} achievement`} 
                draggable="false"
                loading="lazy"
                decoding="async"
              />
              <Badge>{index + 1}</Badge>
            </LogoWrapper>
            <InfoSection>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </InfoSection>
            <DateSection>{item.date}</DateSection>
          </AchievementItem>
        ))}
      </AchievementCard>
    </Container>
  )
}

export default React.memo(Achievement)
