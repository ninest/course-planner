"use client";
import { Section } from "@/.data/types";

export interface SectionsListProps {
  sections: Section[];
}

export const SectionsList = ({sections}: SectionsListProps) => {
  return <>
  {sections.map(section =>{return })}</>
}