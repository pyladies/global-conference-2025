export const getMenuItems = (t: (key: string) => string) => [
  {
    title: t("About"),
    children: [
      { title: t("The event"), path: "/#event" },
      { title: t("Keynotes"), path: "/#keynotes" },
      { title: t("FAQ"), path: "/#faq" },
      { title: t("The organizers"), path: "/#organization" },
      { title: t("Our Sponsors"), path: "/#sponsors" },
    ],
  },
  {
   title: t("Blog"),
   path: "",
   url: "https://conference.pyladies.com/blog/",
  },
  {
    title: t("Conference"),
    children: [
      { title: t("Schedule"), path: "/schedule" },
      { title: t("Sessions"), path: "/sessions" },
      { title: t("Speakers"), path: "/speakers" },
      { title: t("Sprints"), path: "/sprints" },
      { title: t("How to Join"), path: "/attending" },
    ],
  },
  {
    title: t("Sponsors"),
    children: [
      { title: t("Sponsorship Plans"), path: "/sponsors" },
      { title: t("Jobs Board"), path: "/jobs" },
    ],
  },
  {
    title: t("Code of Conduct"),
    children: [
      { title: t("Read the CoC"), path: "/coc" },
      { title: t("Reporting process"), path: "/coc-reporting" },
      { title: t("Enforcement process"), path: "/coc-enforcing" },
    ],
  },
  {
    title: t("Donate"),
    path: "/donate",
  },
];
