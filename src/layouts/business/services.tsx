import { Button, Container, Dropdown, ImageSlider, Img, Slider } from "@/components";
import { Link } from "@/i18n/routing";

export const Services = () => {
  const images = [
    "/temp-image-3.png",
    "/temp-image-3.png",
    "/temp-image-3.png",
    "/temp-image-3.png",
    "/temp-image-3.png",
    "/temp-image-3.png",
    "/temp-image-3.png",
  ];

  return (
    <Container className="pt-24 pb-16 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-4xl font-semibold text-primary">Services</h3>
        <Link href="/">
          <Button className="btn-outline">Learn More</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2">
        <div className="space-y-4 w-full">
          <div className="overflow-hidden rounded-lg">
            <Img src="/temp-image-3.png" alt="temporary" className="w-full h-80" cover />
          </div>
          <ImageSlider
            imgClassName="aspect-video"
            images={images}
            spaceBetween={10}
            breakpoints={{ 0: { slidesPerView: 2 }, 768: { slidesPerView: 3 } }}
            slidesPerView={3}
          />
        </div>
        <div className="space-y-8 w-full pl-8">
          <Dropdown parentClassName="w-full py-4" className="top-16" />
          <Slider slidesPerView={1} title="Service Activities" className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-3xl font-semibold text-primary">Service {index + 1}</h4>
                <p className="leading-tight text-justify text-lg">
                  Our scope of work encompasses a wide range of services, including the construction and repair of industrial buildings tailored to
                  meet the unique needs of various sectors. We specialize in the installation of diverse roofing systems, such as Spandek models,
                  Bitumen models, and other advanced materials designed for durability and efficiency. Additionally, we provide comprehensive
                  partitioning solutions to optimize space and functionality. Beyond construction, our expertise extends to all aspects of fabrication
                  work, ensuring precise and high-quality outcomes for every project we undertake.
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Container>
  );
};
