import React, { useMemo } from 'react'
import styled from 'styled-components'

import ReactImage from '../assets/react.png'
import NodeImage from '../assets/node.png'
import MongoDbImage from '../assets/mongodb.png'
import FlutterImage from '../assets/flutter.png'
import FirebaseImage from '../assets/firebase.png'
import PostmanImage from '../assets/postman.png'
import PythonImage from '../assets/Python.png'
import GithubImage from '../assets/github.png'
import CPlusImage from '../assets/C++.png'
import FigmaImage from '../assets/figma.png'
import WixImage from '../assets/Wix.png'
import WordPressImage from '../assets/wordpress.png'
import HtmlImage from '../assets/html.png'
import CssImage from '../assets/css.png'
import JavaScriptImage from '../assets/javascript.png'
import DartImage from '../assets/dart.png'
import MySqlImage from '../assets/mysql.png'
import PostgresImage from '../assets/postgresql.png'

const techStack = [
  ReactImage,
  NodeImage,
  MongoDbImage,
  FlutterImage,
  FirebaseImage,
  PostmanImage,
  PythonImage,
  MySqlImage,
  PostgresImage,
  GithubImage,
  CPlusImage,
  FigmaImage,
  WixImage,
  WordPressImage,
  HtmlImage,
  CssImage,
  JavaScriptImage,
  DartImage,
]

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
  backface-visibility: hidden;
  transform-style: preserve-3d;
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

const TechScrollContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 1rem 0;
  contain: layout style paint;
`

const TechLogos = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 3rem 4rem;
  padding: 20px;

  img {
    height: 4.5rem;
    width: auto;
    transition: transform 0.3s ease, filter 0.3s ease, opacity 0.3s ease;
    filter: grayscale(30%);
    opacity: 0.8;
    backface-visibility: hidden;
    transform: translateZ(0);

    &:hover {
      filter: grayscale(0);
      opacity: 1;
      transform: scale(1.05);
    }

    @media (max-width: 800px) {
      height: 3rem;
    }

    @media (max-width: 500px) {
      height: 1.5rem;
    }

    @media (max-width: 370px) {
      height: 1.2rem;
    }
  }

  @media (max-width: 800px) {
    gap: 2rem 3rem;
  }

  @media (max-width: 500px) {
    gap: 1.5rem 2rem;
  }

  @media (max-width: 370px) {
    gap: 1.2rem 2rem;
  }
`

const TechStacks = () => {
  const memoizedTechStack = useMemo(() => techStack, [])

  return (
    <Container id="tech">
      <ProjectCard>
        <Title>Technologies</Title>
        <TechScrollContainer>
          <TechLogos>
            {memoizedTechStack.map((src, index) => (
              <img
                src={src}
                alt={`Technology logo ${index + 1}`}
                key={`tech-${index}`}
                draggable="false"
                loading="lazy"
                decoding="async"
              />
            ))}
          </TechLogos>
        </TechScrollContainer>
      </ProjectCard>
    </Container>
  )
}

export default React.memo(TechStacks)
