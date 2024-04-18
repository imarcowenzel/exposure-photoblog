import { Contrast } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const footerData = [
    {
      section: "COMPANY",
      items: ["About EXPOSURE", "Products", "Plans", "Careers", "Newsroom"],
    },
    {
      section: "FEATURES",
      items: [
        "What's New",
        "Photo Editor",
        "Mobile App",
        "Photo Filters",
        "Creative Community",
        "EXPOSURE for Work",
      ],
    },
    {
      section: "COMMUNITY",
      items: [
        "Photographer Stories",
        "Learn",
        "Guidelines",
        "Safety",
        "Support",
        "Forum",
      ],
    },
    {
      section: "GUIDES",
      items: [
        "Photography Basics",
        "Photography Tips and Techniques",
        "Photography Guides",
        "Curated Photo Collections",
        "Photography Business",
      ],
    },
  ];

  return (
    <footer className="bg-primary text-primary flex w-full flex-col gap-10 px-10 pb-8 pt-20">
      <section className="flex w-full flex-col items-start gap-12 lg:flex-col-reverse">
        <div className="flex w-full flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <Link
            href="/"
            className="flex w-full items-center justify-start gap-x-2"
          >
            <Contrast className="h-10 w-10" />
            <span className="text-base font-semibold uppercase">Exposure</span>
          </Link>

          <div className="text-primary flex w-full flex-col gap-5 lg:flex-row lg:items-center lg:justify-end lg:text-sm">
            <button className="rounded-3xl border border-white px-4 py-2 text-left font-medium uppercase hover:bg-white/10">
              Try for free
            </button>
            <button className="rounded-3xl border border-white px-4 py-2 text-left font-medium uppercase hover:bg-white/10">
              Download now
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:w-full lg:flex-row lg:justify-between xl:gap-0">
          <div className="hidden h-full max-w-[230px] items-center justify-center xl:flex">
            <h1 className="text-justify text-6xl font-medium uppercase">
              so you can make it
            </h1>
          </div>
          {footerData.map((data) => (
            <div key={data.section} className="xl:flex-2 flex flex-col gap-5">
              <h3 className="font-semibold">{data.section}</h3>
              <ul className="flex flex-col gap-2.5 text-sm">
                {data.items.map((item) => (
                  <li key={item} className="hover:underline">
                    <Link href="#">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="text-secondary flex w-full flex-col justify-between gap-y-10 px-1 text-xs md:flex-row">
        <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-10 md:gap-y-0">
          <Link href={"/"}>Terms of Use</Link>
          <Link href={"/"}>Privacy Policy</Link>
          <Link href={"/"}>Cookie Notice</Link>
          <Link href={"/"}>Cookie Settings</Link>
        </div>
        <p>
          2023 &copy; Developed by{" "}
          <Link
            href={"https://github.com/imarcowenzel"}
            target="_blank"
            aria-label="Visit imarcowenzel's GitHub profile"
            className="text-xs text-blue-600 underline"
          >
            imarcowenzel
          </Link>{" "}
          with non-commercial porpuose.
        </p>
      </section>
    </footer>
  );
};
