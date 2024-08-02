import GlassCard from "@/components/GlassCard";
import { Carousel } from "@/components/InfiniteCarousel";
import projects from "@/util/projects";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Carousel>
        {projects.map((project, index) => (
          <GlassCard href={project.slug} key={index}>
            {project.client}
          </GlassCard>
        ))}
      </Carousel>
    </main>
  );
}
