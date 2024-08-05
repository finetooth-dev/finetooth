import projects from '@/util/projects';
import DetailOverlay from '../../components/project/DetailOverlay';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function Detail({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <DetailOverlay project={project} />
      </div>
    </main>
  );
}
