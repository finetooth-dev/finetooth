import GlassCard from "@/components/GlassCard";
import { Carousel } from "@/components/InfiniteCarousel";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Carousel>
        {Array(14)
          .fill(0)
          .map((_, index) => (
            <GlassCard href="/" key={index}>
              Item {index + 1}
            </GlassCard>
          ))}
      </Carousel>
    </main>
  );
}
