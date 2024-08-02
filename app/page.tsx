import GlassCard from "@/components/GlassCard";
import { Carousel } from "@/components/InfiniteCarousel";
import projects from "@/util/projects";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Carousel>
        {projects.map((project, index) => (
          <GlassCard href={project.slug} key={index} title={project.client}>
            <img src={project.bgImgURL} alt={project.col1} className="min-w-full min-h-full object-cover" />
          </GlassCard>
        ))}
      </Carousel>
    </main>
  );
}
