import type { NextPage } from "next";
import styled, { css } from "styled-components";
import { ProjectPreviewCard } from "../components/ProjectPreviewCard";
import data from "../data/projects.json";
import { Hero } from "../components/Hero";
import { Contact } from "../components/Contact";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Timeline } from "../components/Timeline";
import { ZebraPattern } from "../components/ZebraPattern";

export enum ProjectType {
  FullTime = "Full-Time Workplace",
  Contract = "Contract",
  Personal = "Personal Project",
  School = "School",
}

export function handleScroll(scrollTo: string) {
  const elem = document.getElementById(scrollTo);
  if (elem) {
    elem.scrollIntoView({
      behavior: "smooth",
    });
  }
}

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath.split("#")[1] === "projects") {
      handleScroll("projects");
    }
    if (router.asPath.split("#")[1] === "experience") {
      handleScroll("experience");
    }
    if (router.asPath.split("#")[1] === "contact") {
      handleScroll("contact");
    }
  }, [router]);

  return (
    <>
      <Hero />

      <SectionWrapper id="projects" $first>
        <HeaderWrapper>
          <Header>PROJECTS</Header>
          <ZebraPattern />
        </HeaderWrapper>

        <ProjectsWrapper>
          {data.projects.map((x, i) => {
            return (
              <ProjectPreviewCard
                type={x.type as ProjectType}
                client={x.client}
                description={x.description}
                name={x.name}
                tools={x.tools}
                slug={x.slug}
                liveURL={x.liveURL}
                key={i}
              />
            );
          })}
        </ProjectsWrapper>
      </SectionWrapper>

      <SectionWrapper id="experience">
        <HeaderWrapper>
          <Header>EXPERIENCE</Header>
          <ZebraPattern />
        </HeaderWrapper>

        <Timeline />
      </SectionWrapper>
      <SectionWrapper id="contact" $last>
        <Contact />
      </SectionWrapper>
    </>
  );
};

export default Home;

const SectionWrapper = styled.div<{ $first?: boolean; $last?: boolean }>`
  margin-top: 5rem;
  margin-bottom: 9rem;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;

  ${(props) =>
    props.$first &&
    css`
      margin-top: 12rem;
    `}

  ${(props) =>
    props.$last &&
    css`
      margin-bottom: 3rem;
    `}
`;

export const Header = styled.h2`
  letter-spacing: 3px;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
  align-content: center;
  position: absolute;
  z-index: 1;
  height: inherit;
  width: 472px;
  text-align: center;
  margin: 0;
`;

export const HeaderWrapper = styled.div<{ $noBottomRadius?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 3rem;
  width: 100%;
  height: 74px;
  margin-bottom: 3rem;
`;

export const ProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0 1.5rem;
`;
