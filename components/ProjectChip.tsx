import { ProjectType } from '@/util/projects';

/**
 * The thumbnail inside a carousel card. Projects with a chipVideoURL render a
 * looping muted video; everything else falls back to a still image.
 */
export default function ProjectChip({ project }: { project: ProjectType }) {
  if (project.chipVideoURL) {
    return (
      <video
        src={project.chipVideoURL}
        poster={project.chipPosterURL}
        // muted + playsInline are both required for autoplay on iOS Safari
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={project.client}
        className="min-w-full min-h-full object-cover"
      />
    );
  }

  return (
    <img
      src={project.chipImgURL ? project.chipImgURL : project.bgImgURL}
      alt={project.client}
      className="min-w-full min-h-full object-cover"
    />
  );
}
