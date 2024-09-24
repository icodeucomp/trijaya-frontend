import { NavbarTypes } from "@/types";

export const navbarList: NavbarTypes[] = [
  { title: "Home", pathUrl: "/" },
  {
    title: "Profile",
    pathUrl: "/profile",
    content: [
      { title: "About Us", pathUrl: "/", description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed diam" },
      { title: "Vision & Missions", pathUrl: "/", description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed diam" },
      {
        title: "Legality & Certifications",
        pathUrl: "/certification",
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed diam",
      },
    ],
  },
  {
    title: "Business",
    pathUrl: "/business",
    content: [
      { title: "Services", pathUrl: "/", description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed diam" },
      { title: "Products", pathUrl: "/", description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed diam" },
      { title: "Experiences", pathUrl: "/", description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed diam" },
      { title: "Business Sector", pathUrl: "/sector", description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed diam" },
    ],
  },
  {
    title: "Media",
    pathUrl: "/media",
    content: [
      { title: "Company Activities", pathUrl: "/", description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed diam" },
      { title: "Articles", pathUrl: "/", description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed diam" },
    ],
  },
  { title: "Contact Us", pathUrl: "/contact-us" },
  {
    title: "Career",
    pathUrl: "/career",
    content: [
      { title: "Staff Professional", pathUrl: "/", description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed diam" },
      { title: "Internship Program", pathUrl: "/", description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed diam" },
    ],
  },
];
