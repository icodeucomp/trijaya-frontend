import { Container, Sidebar } from "@/components";

export default function ProductLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="overflow-x-hidden">
      <Container className="flex justify-between">
        <Sidebar />
        <div className="w-full pt-16 pb-20 overflow-hidden lg:pl-8 lg:max-h-custom-header">{children}</div>
      </Container>
    </section>
  );
}
