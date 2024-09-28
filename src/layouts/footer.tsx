import { Link } from "@/i18n/routing";

import { Container, Img } from "@/components";

import { FooterLists } from "@/static";

import { MdCall, MdEmail } from "react-icons/md";

export const Footer = () => {
  const footerLists = FooterLists();
  return (
    <footer className="bg-primary">
      <Container className="flex justify-between gap-8 py-8 text-light">
        <div className="flex-1 space-y-4">
          <Link href="/" className="space-y-1">
            <Img className="size-10 sm:size-12 md:size-14" src="/logo-company.png" alt="logo PT Trijaya Berkah Mandiri" />
            <h1 className="text-sm sm:text-base md:text-xl">PT Trijaya Berkah Mandiri</h1>
          </Link>
          <h4 className="text-2xl font-semibold">Get Ahead of Your Competitors with Our Innovative Business Agency Solutions!</h4>
          <p className="text-sm">Jl. Bhayangkara No.136B, Kota Serang-Banten 42118</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-full bg-light">
                <MdCall className="fill-primary" />
              </span>
              <span>0254 - 7932385</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-full bg-light">
                <MdEmail className="fill-primary" />
              </span>
              <span>tbm.srg@gmail.com</span>
            </div>
          </div>
          <h5 className="text-sm">© Copyright PT Trijaya Berkah Mandiri</h5>
        </div>
        <div className="hidden sm:grid justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 flex-1 gap-8 mt-4">
          {footerLists.map((footer, i) => (
            <div key={i} className="space-y-2 min-w-48">
              <h5 className="font-semibold">{footer.title}</h5>
              <menu className="space-y-2">
                {footer.fields.map((field, j) => (
                  <p key={j} className="text-sm">
                    {field}
                  </p>
                ))}
              </menu>
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
};
