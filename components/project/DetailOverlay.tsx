'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './DetailOverlay.css';
import projects, { ProjectType } from '@/util/projects';
import Link from 'next/link';

interface DetailOverlayProps {
  project: ProjectType;
}

const DetailOverlay: React.FC<DetailOverlayProps> = ({ project }) => {
  const featuredImagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalBackground = document.getElementById('modalBackground');
    const modalItself = document.getElementById('modalItself');

    if (modalBackground && modalItself) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = modalItself.getBoundingClientRect();

        const mouseX = e.clientX - rect.left,
          mouseY = e.clientY - rect.top;

        const maxX = modalItself.offsetWidth,
          maxY = modalItself.offsetHeight;

        const xDecimal = mouseX / maxX,
          yDecimal = mouseY / maxY;

        const panX = Math.max(-10, Math.min(10, maxX * xDecimal - 0.5 * maxX)),
          panY = Math.max(-10, Math.min(10, maxY * yDecimal - 0.5 * maxY));

        const rotateX = (yDecimal - 0.5) * 2;
        const rotateY = (xDecimal - 0.5) * 2;

        modalBackground.animate(
          {
            transform: `translate(${panX}px, ${panY}px)`,
          },
          {
            duration: 4000,
            fill: 'forwards',
            easing: 'ease',
          }
        );
        modalItself.animate(
          {
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) `,
          },
          {
            duration: 4000,
            fill: 'forwards',
            easing: 'ease',
          }
        );
      };

      const handleMouseLeave = () => {
        modalBackground.animate(
          {
            transform: `translate(0px, 0px)`,
          },
          {
            duration: 2000,
            fill: 'forwards',
            easing: 'ease',
          }
        );
        modalItself.animate(
          {
            transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) `,
          },
          {
            duration: 2000,
            fill: 'forwards',
            easing: 'ease',
          }
        );
      };

      modalItself.addEventListener('mousemove', handleMouseMove);
      modalItself.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        modalItself.removeEventListener('mousemove', handleMouseMove);
        modalItself.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [project.imageList]);

  const projectIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextIndex = (projectIndex + 1) % projects.length;
  const prevIndex = (projectIndex + projects.length - 1) % projects.length;

  return (
    <motion.div
      key="modal"
      className="modal-overlay overflow-hidden z-10 fixed inset-0 w-full h-full flex items-center justify-start block rounded p-[2px] pt-[2px] w-80 max-w-screen flex flex-col gap-[2px] bg-gradient-to-b from-gray-100/40 to-gray-200/40 shadow-xl border border-gray-200 hd:border-[0.5px] ring-gray-600 focus:outline-none focus-visible:ring backdrop-blur"
      style={{
        width: 'auto',
        height: 'auto',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="modalItself"
    >
      <div className="p-1 nav-bar w-full flex justify-between text-sm text-color-blue">
        <Link className="cursor-pointer" href="/">
          [ close ]
        </Link>
        <div className="nav-buttons flex flex-row gap-4 color-[#676C6D]">
          <Link href={projects[prevIndex].slug} data-name="prev-button">
            previous ]
          </Link>
          <Link href={projects[nextIndex].slug} data-name="next-button">
            [ next
          </Link>
        </div>
      </div>
      <div
        data-name="modal-content"
        className="w-full h-full rounded flex flex-row relative overflow-hidden"
      >
        <div
          data-name="background-vid"
          id="modalBackground"
          className=" absolute z-0 t-0 overflow-visible"
        >
          <img
            className="w-full h-full object-cover"
            src={project.bgImgURL}
            alt="Background"
          />
        </div>

        <div
          className="grid h-full z-1 overflow-hidden"
          style={{
            borderRadius: 'inherit',
          }}
        >
          <div className="content-column flex flex-col p-3 backdrop-blur-xl gap-4 overflow-hidden">
            <span className="w-full flex flex-row justify-between">
              <div>{project.client}</div>
              <div>{project.year}</div>
            </span>
            <div
              id="featured-imgs"
              className="flex flex-col gap-4"
              ref={featuredImagesRef}
            >
              {project.imageList.map((image, index) => (
                <img key={index} src={image} alt="" className="rounded" />
              ))}
            </div>
          </div>
          <div className="content-column flex flex-col p-3 backdrop-blur-md gap-4 overflow-hidden">
            <div>{project.category}</div>

            <div style={{ whiteSpace: 'pre-line' }}>{project.col1}</div>
          </div>
          <div className="content-column flex flex-col p-3 backdrop-blur-lg gap-4 overflow-hidden">
            <span className="w-full flex flex-row justify-between">
              <div>{project.role}</div>
              <div>
                {project.link ? (
                  <a href={project.link}>{project.link}</a>
                ) : null}
              </div>
            </span>
            <div style={{ whiteSpace: 'pre-line' }}>{project.col2}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailOverlay;
