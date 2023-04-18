import { Course, Section } from "@/.data/types";
import { SectionsList } from "./sections-list";

export const SectionDemo = () => {
  const cs2500: Course = {
    subject: "CS",
    number: "2500",
    title: "Fundamentals of Computer Science 1",
    scheduleType: "Lecture",
    credits: 4,
    nuPath: ["FQ", "ND"],
    sections: [
      { term: "202340", crn: "40433" },
      { term: "202330", crn: "35971" },
      { term: "202330", crn: "31555" },
      { term: "202330", crn: "31990" },
      { term: "202310", crn: "19158" },
      { term: "202310", crn: "10355" },
      { term: "202310", crn: "10943" },
      { term: "202310", crn: "11478" },
      { term: "202310", crn: "11724" },
      { term: "202310", crn: "11725" },
      { term: "202310", crn: "11726" },
      { term: "202310", crn: "15346" },
      { term: "202310", crn: "20338" },
      { term: "202310", crn: "20339" },
      { term: "202310", crn: "20436" },
      { term: "202310", crn: "20466" },
      { term: "202240", crn: "40459" },
    ],
    description:
      "Introduces the fundamental ideas of computing and the principles of programming. Discusses a systematic approach to word problems, including analytic reading, synthesis, goal setting, planning, plan execution, and testing. Presents several models of computing, starting from nothing more than expression evaluation in the spirit of high school algebra. No prior programming experience is assumed; therefore, suitable for freshman students, majors and nonmajors alike who wish to explore the intellectual ideas in the discipline.",
    coreqs: [{ subject: "CS", number: "2501" }],
    prereqs: [],
  };
  const cs2500sections: Section[] = [
    {
      term: "202310",
      crn: "19158",
      faculty: [{ name: "Guha, Arjun" }],
      building: {
        code: "INV",
        description: "International Village",
        room: "019",
      },
      campus: { code: "BOS", description: "Boston" },
      startTime: "1145",
      endTime: "1325",
      online: false,
      days: ["monday", "thursday"],
      seats: {
        total: 97,
        available: 44,
        waitlist: { capacity: 0, available: 0 },
      },
    },
    {
      term: "202310",
      crn: "10355",
      faculty: [{ name: "Derbinsky, Nathaniel" }],
      building: {
        code: "WVH",
        description: "West Village H",
        room: "210A",
      },
      campus: { code: "BOS", description: "Boston" },
      startTime: "0915",
      endTime: "1020",
      online: false,
      days: ["monday", "wednesday", "thursday"],
      seats: {
        total: 36,
        available: 2,
        waitlist: { capacity: 0, available: 0 },
      },
    },
    {
      term: "202310",
      crn: "10943",
      faculty: [{ name: "Patterson, Daniel" }],
      building: { code: "RI", description: "Richards Hall", room: "458" },
      campus: { code: "BOS", description: "Boston" },
      startTime: "0915",
      endTime: "1020",
      online: false,
      days: ["monday", "wednesday", "thursday"],
      seats: {
        total: 113,
        available: 1,
        waitlist: { capacity: 0, available: 0 },
      },
    },
    {
      term: "202310",
      crn: "11478",
      faculty: [{ name: "Patterson, Daniel" }],
      building: { code: "RI", description: "Richards Hall", room: "458" },
      campus: { code: "BOS", description: "Boston" },
      startTime: "1030",
      endTime: "1135",
      online: false,
      days: ["monday", "wednesday", "thursday"],
      seats: {
        total: 113,
        available: 4,
        waitlist: { capacity: 0, available: 0 },
      },
    },
    {
      term: "202310",
      crn: "11724",
      faculty: [{ name: "Razzaq, Leena" }],
      building: {
        code: "SN",
        description: "Snell Engineering Center",
        room: "168",
      },
      campus: { code: "BOS", description: "Boston" },
      startTime: "1030",
      endTime: "1135",
      online: false,
      days: ["monday", "wednesday", "thursday"],
      seats: {
        total: 135,
        available: 20,
        waitlist: { capacity: 0, available: 0 },
      },
    },
    {
      term: "202310",
      crn: "11725",
      faculty: [{ name: "Derbinsky, Nathaniel" }],
      building: {
        code: "WVH",
        description: "West Village H",
        room: "210A",
      },
      campus: { code: "BOS", description: "Boston" },
      startTime: "1030",
      endTime: "1135",
      online: false,
      days: ["monday", "wednesday", "thursday"],
      seats: {
        total: 36,
        available: 3,
        waitlist: { capacity: 0, available: 0 },
      },
    },
    {
      term: "202310",
      crn: "11726",
      faculty: [{ name: "Park, John" }],
      building: { code: "CH", description: "Churchill Hall", room: "103" },
      campus: { code: "BOS", description: "Boston" },
      startTime: "1335",
      endTime: "1440",
      online: false,
      days: ["monday", "wednesday", "thursday"],
      seats: {
        total: 113,
        available: 7,
        waitlist: { capacity: 0, available: 0 },
      },
    },
    {
      term: "202310",
      crn: "15346",
      faculty: [{ name: "Shivers III, Olin" }],
      building: { code: "RI", description: "Richards Hall", room: "458" },
      campus: { code: "BOS", description: "Boston" },
      startTime: "1635",
      endTime: "1740",
      online: false,
      days: ["monday", "wednesday", "thursday"],
      seats: {
        total: 113,
        available: 2,
        waitlist: { capacity: 0, available: 0 },
      },
    },
    {
      term: "202310",
      crn: "20338",
      faculty: [{ name: "Derbinsky, Nathaniel" }],
      building: { code: "null", description: "null", room: "null" },
      campus: { code: "null", description: "null" },
      startTime: "1415",
      endTime: "1520",
      online: true,
      days: ["monday", "wednesday", "thursday"],
      seats: {
        total: 65,
        available: 6,
        waitlist: { capacity: 0, available: 0 },
      },
    },
    {
      term: "202310",
      crn: "20339",
      faculty: [{ name: "Derbinsky, Nathaniel" }],
      building: { code: "null", description: "null", room: "null" },
      campus: { code: "null", description: "null" },
      startTime: "1530",
      endTime: "1635",
      online: true,
      days: ["monday", "wednesday", "thursday"],
      seats: {
        total: 65,
        available: 0,
        waitlist: { capacity: 0, available: 0 },
      },
    },
    {
      term: "202310",
      crn: "20436",
      faculty: [{ name: "Spertus, Ellen" }],
      building: {
        code: "M20",
        description: "Graduate School of Business",
        room: "118",
      },
      campus: { code: "OAK", description: "Oakland, CA" },
      startTime: "1730",
      endTime: "1835",
      online: false,
      days: ["monday", "wednesday", "thursday"],
      seats: {
        total: 60,
        available: 13,
        waitlist: { capacity: 0, available: 0 },
      },
    },
    {
      term: "202310",
      crn: "20466",
      faculty: [{ name: "Spertus, Ellen" }],
      building: {
        code: "M20",
        description: "Graduate School of Business",
        room: "101",
      },
      campus: { code: "OAK", description: "Oakland, CA" },
      startTime: "1035",
      endTime: "1140",
      online: false,
      days: ["monday", "wednesday", "thursday"],
      seats: {
        total: 60,
        available: 7,
        waitlist: { capacity: 0, available: 0 },
      },
    },
  ];
  const courseSections = cs2500sections.map((section) => ({
    course: cs2500,
    section,
  }));
  return (
    <></>
    // <SectionsList
    //   termCode="202310"
    //   isLoading={false}
    //   courseSections={courseSections}
    // />
  );
};