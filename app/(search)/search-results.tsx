"use client"

import { Course } from "@/.data/types"
import Link from 'next/link'

interface SearchResultsProps {
  // courses: Course[]
}

export function SearchResults = ({}: SearchResultsProps) => {
  return <>
    <div>
      {courses.map(course => {
        return <>
          <Link href="/">
          {course.subject}
          </Link>
        </>
      })}
    </div>
  </>
}