import CarouselCard from "@/components/CarouselCard";
import { Carousel } from "@/components/InfiniteCarousel";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Carousel>
        <CarouselCard href="/" className="w-64 h-64 rounded">
          Item 1
        </CarouselCard>
        <CarouselCard href="/" className="w-48 h-80 rounded">
          Item 2
        </CarouselCard>
        <CarouselCard href="/" className="w-80 h-48 rounded">
          Item 3
        </CarouselCard>
        <CarouselCard href="/" className="w-80 h-80 rounded">
          Item 4
        </CarouselCard>
        <CarouselCard href="/" className="w-64 h-64 rounded">
          Item 5
        </CarouselCard>
        <CarouselCard href="/" className="w-48 h-80 rounded">
          Item 6
        </CarouselCard>
        <CarouselCard href="/" className="w-80 h-48 rounded">
          Item 7
        </CarouselCard>
      </Carousel>
    </main>
  );
}
