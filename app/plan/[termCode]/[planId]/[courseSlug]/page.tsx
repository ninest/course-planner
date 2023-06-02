"use client";

import { Course, Section } from "@/.data/types";
import { ButtonProps } from "@/components/button";
import { CourseInfo } from "@/components/course/course-info";
import { SectionList } from "@/components/course/sections/sections-list";
import { Loading } from "@/components/loading";
import { SubPageBackButton } from "@/components/sub-page-back-button";
import { Title } from "@/components/title";
import { courseToSlug2, slugToCourse2 } from "@/course";
import { useCourse } from "@/hooks/fetching/use-course";
import { useMultipleSections } from "@/hooks/fetching/use-sections";
import { useWeekView } from "@/hooks/use-week-view";
import { planById, sectionInPlan } from "@/plan";
import { usePlan } from "@/plan/hooks";
import { sectionCourseToCalendarEvents } from "@/plan/plan-transformers";
import { usePathname, useSearchParams } from "next/navigation";
import { ComponentProps } from "react";
import { CgSpinner } from "react-icons/cg";

interface PlanCoursePageProps {
  params: { termCode: string; planId: string; courseSlug: string };
}

export default function PlanCoursePage({ params }: PlanCoursePageProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!pathname) return <div className="p-3">Loading ...</div>;

  // Get course from URL
  const courseSlug = pathname.split("/").at(-1)!;
  const minimizedCourse = slugToCourse2(courseSlug);

  const { isCourseLoading, course } = useCourse(minimizedCourse);

  const sections =
    course?.sections
      .filter((section) => section.term === params.termCode)
      // Temp fix
      .map((section) => ({ ...section, termCode: section.term })) ?? [];

  const { results, fetchedSections, allLoaded, numSectionsWithSeats } = useMultipleSections(sections);

  const { addPreviewEvents, setPreviewEvents, clearPreviewEvents } = useWeekView();

  const { addEventToPlan, removeEventFromPlan, eventInPlan, plans } = usePlan();

  const onSectionHover = (section: Section, course: Course) => {
    // Add section to preview if section not in plan
    const plan = planById(plans, params.planId);
    if (plan && sectionInPlan(plan, section.crn)) {
      return;
    }
    const previewEvents = sectionCourseToCalendarEvents(section, course);
    setPreviewEvents(previewEvents);
  };

  const onSectionUnhover = () => clearPreviewEvents();

  const sectionButtons: ComponentProps<typeof SectionList>["sectionButtons"] = (section, course) => {
    const buttons: ButtonProps[] = [];
    if (eventInPlan({ id: params.planId, eventId: section.crn }))
      buttons.push({
        children: "Remove",
        variant: "secondary-danger",
        onClick: () => {
          removeEventFromPlan({ id: params.planId, eventId: section.crn });
        },
      });
    else
      buttons.push({
        children: "Add",
        variant: "secondary-success",
        onClick: () => {
          addEventToPlan({
            id: params.planId,
            event: { id: section.crn, type: "course", crn: section.crn, minimizedCourse: course },
          });
          clearPreviewEvents();
        },
      });
    return buttons;
  };

  return (
    <div className="p-3">
      <SubPageBackButton href={`/plan/${params.termCode}/${params.planId}?${searchParams}`} />

      {isCourseLoading || !course ? (
        <Loading heights={[4, 1, { type: "spacer", height: 2 }, 2, { type: "spacer", height: 2 }]} />
      ) : (
        <div>
          <Title level={2} className="text-xl tabular-nums">
            {course.subject} {course.number}: {course.title}
          </Title>
          <CourseInfo
            course={course}
            courseHrefFn={(course) =>
              `/plan/${params.termCode}/${params.planId}/${courseToSlug2(course)}?${searchParams}`
            }
          />
          <div className="mt-6 flex items-center justify-between">
            <Title level={3}>Sections</Title>

            <div>
              {!allLoaded && (
                <div className="text-gray-400 animate-spin">
                  <CgSpinner />
                </div>
              )}
            </div>
          </div>
          <div className="text-sm">
            {sections.length} sections, {!allLoaded && "at least"} {numSectionsWithSeats} with seats
          </div>
          <SectionList
            termCode={params.termCode}
            course={course}
            onSectionHover={onSectionHover}
            onSectionUnhover={onSectionUnhover}
            sectionButtons={sectionButtons}
            className="mt-2"
          />
        </div>
      )}
    </div>
  );
}
