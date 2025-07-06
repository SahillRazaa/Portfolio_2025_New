import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { projectDisplay } from '../utils/data'

const Container = styled.div`
  padding: 2vw 10vw;
  padding-bottom: 2rem;
  position: relative;

  @media (max-width: 900px) {
    margin-top: 20px;
  }
`

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: 470px) {
    margin-bottom: 2rem;
  }
`

const SectionTitle = styled.h2`
  font-size: clamp(1.2rem, 5vw, 3rem);
  color: #0a2540;
  margin: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 4rem;
    height: 4px;
    background: #0467d5;
    border-radius: 2px;
  }
`

const SeeMoreButton = styled.button`
  background-color: #0467d5;
  color: white;
  border: none;
  padding: clamp(0.6rem, 2vw, 1rem) clamp(1.3rem, 4vw, 3rem);
  text-decoration: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: clamp(0.6rem, 2vw, 1.1rem);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: #0a2540;
    transform: translateY(-2px);

    svg {
      transform: translateX(3px);
    }
  }

  &:active {
    transform: translateY(0px);
  }
`

const ProjectCard = styled.div`
  background: white;
  border-radius: 32px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  }
`

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
`

const ProjectTitle = styled.h3`
  font-size: clamp(1.1rem, 3vw, 2rem);
  color: #0a2540;
  margin: 0 0 0.5rem 0;
`

const ProjectDate = styled.p`
  font-size: clamp(0.6rem, 2vw, 1rem);
  color: #6b7c93;
  margin: 0;
  font-weight: 500;
`

const ViewButton = styled.button`
  padding: clamp(0.6rem, 2vw, 0.75rem) clamp(1.3rem, 3vw, 1.5rem);
  font-size: clamp(0.8rem, 2vw, 1rem);
  background-color: #0467d5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: #0a2540;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

const ImagePlaceholder = styled.img`
  width: 100%;
  height: 50vh;
  border-radius: 24px;
  object-fit: cover;
  margin-top: 1.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`

const ArrowIcon = styled.svg`
  width: 18px;
  height: 18px;
`

const ProjectGlimps = () => {
  const recentProjects = useMemo(() => {
    if (!projectDisplay || projectDisplay.length === 0) return []
    const startIndex = Math.max(0, projectDisplay.length - 3)
    const endIndex = projectDisplay.length - 1
    return projectDisplay.slice(startIndex, endIndex).reverse()
  }, [])

  return (
    <Container id='projects'>
      <Header>
        <SectionTitle>Recent Work</SectionTitle>
        <Link to='/projects' style={{ textDecoration: 'none' }}>
          <SeeMoreButton>
            See More
            <ArrowIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </ArrowIcon>
          </SeeMoreButton>
        </Link>
      </Header>

      <ProjectContainer>
        {recentProjects.map((project) => (
          <ProjectCard key={project.id}>
            <TopSection>
              <InfoSection>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDate>{project.duration}</ProjectDate>
              </InfoSection>
              <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                <ViewButton>View</ViewButton>
              </Link>
            </TopSection>
            <ImagePlaceholder
              src={project.image}
              alt={`${project.title} preview`}
              loading="lazy"
            />
          </ProjectCard>
        ))}
      </ProjectContainer>
    </Container>
  )
}

export default React.memo(ProjectGlimps)
