import GlassCard from '@/components/GlassCard';
import { Carousel } from '@/components/InfiniteCarousel';
import projects from '@/util/projects';

const repeatedProjects = [...projects, ...projects, ...projects];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col z-10">
      <Carousel>
        {repeatedProjects.map((project, index) => (
          <GlassCard href={project.slug} key={index} title={project.client}>
            <img
              src={project.bgImgURL}
              alt={project.col1}
              className="min-w-full min-h-full object-cover"
            />
          </GlassCard>
        ))}
      </Carousel>
    </main>
  );
}
