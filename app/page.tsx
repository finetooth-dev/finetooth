import GlassCard from '@/components/GlassCard';
import { Carousel } from '@/components/InfiniteCarousel';
import projects from '@/util/projects';
import Image from 'next/image';

const repeatedProjects = [...projects, ...projects, ...projects];

export default function Home() {
  return (
    <main className="flex-1 flex flex-col z-10">
      <Carousel>
        {repeatedProjects.map((project, index) => (
          <GlassCard href={project.slug} key={index} title={project.client}>
            <Image
              src={project.chipImgURL ? project.chipImgURL : project.bgImgURL}
              alt={project.col1}
              className="min-w-full min-h-full object-cover"
              priority
            />
          </GlassCard>
        ))}
      </Carousel>
    </main>
  );
}
