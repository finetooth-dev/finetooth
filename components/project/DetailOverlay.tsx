"use client";

import React, {
    useState,
    useRef,
    useEffect,
    MouseEvent,
    KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./DetailOverlay.css";

interface Project {
    bgImgURL: string;
    client: string;
    year: string;
    category: string;
    role: string;
    col1: string;
    col2: string;
    imageList?: string[];
}

interface DetailOverlayProps {
    project: Project;
}

const DetailOverlay: React.FC<DetailOverlayProps> = ({ project }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const featuredImagesRef = useRef<HTMLDivElement>(null);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    useEffect(() => {
        const modalBackground = document.getElementById("modalBackground");
        const modalItself = document.getElementById("modalItself");

        if (project.imageList && featuredImagesRef.current) {
            for (let image of project.imageList) {
                const imgElement = document.createElement("img");
                imgElement.src = image;
                imgElement.classList.add("rounded");
                featuredImagesRef.current.appendChild(imgElement);
            }
        }

        if (modalBackground && modalItself) {
            const handleMouseMove = (e) => {
                const rect = modalItself.getBoundingClientRect();

                const mouseX = e.clientX - rect.left,
                    mouseY = e.clientY - rect.top;

                const maxX = modalItself.offsetWidth,
                    maxY = modalItself.offsetHeight;

                const xDecimal = mouseX / maxX,
                    yDecimal = mouseY / maxY;

                const panX = Math.max(
                        -10,
                        Math.min(10, maxX * xDecimal - 0.5 * maxX)
                    ),
                    panY = Math.max(
                        -10,
                        Math.min(10, maxY * yDecimal - 0.5 * maxY)
                    );

                const rotateX = (yDecimal - 0.5) * 2;
                const rotateY = (xDecimal - 0.5) * 2;

                modalBackground.animate(
                    {
                        transform: `translate(${panX}px, ${panY}px)`,
                    },
                    {
                        duration: 4000,
                        fill: "forwards",
                        easing: "ease",
                    }
                );
                modalItself.animate(
                    {
                        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) `,
                    },
                    {
                        duration: 4000,
                        fill: "forwards",
                        easing: "ease",
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
                        fill: "forwards",
                        easing: "ease",
                    }
                );
                modalItself.animate(
                    {
                        transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) `,
                    },
                    {
                        duration: 2000,
                        fill: "forwards",
                        easing: "ease",
                    }
                );
            };

            const handleKeyDown = (e) => {
                if (e.key === "Escape") {
                    setIsModalVisible(false);
                }
            };

            modalItself.addEventListener("mousemove", handleMouseMove);
            modalItself.addEventListener("mouseleave", handleMouseLeave);
            window.addEventListener("keydown", handleKeyDown);

            return () => {
                modalItself.removeEventListener("mousemove", handleMouseMove);
                modalItself.removeEventListener("mouseleave", handleMouseLeave);
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isModalVisible, project.imageList]);

    return (
        <div>
            <button onClick={toggleModal}>project info</button>
            <AnimatePresence>
                {isModalVisible && (
                    <motion.div
                        key="modal"
                        className="modal-overlay overflow-hidden fixed inset-0 w-full h-full flex items-center justify-start block rounded p-[2px] pt-[2px] w-80 max-w-screen flex flex-col gap-[2px] bg-gradient-to-b from-gray-100/40 to-gray-200/40 shadow-xl border border-gray-200 hd:border-[0.5px] ring-gray-600 focus:outline-none focus-visible:ring backdrop-blur"
                        style={{
                            width: "auto",
                            height: "auto",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        id="modalItself"
                    >
                        <div className="p-1 nav-bar w-full flex justify-between text-sm text-color-blue">
                            <div
                                className="cursor-pointer"
                                onClick={toggleModal}
                            >
                                [ close ]
                            </div>
                            <div className="nav-buttons flex flex-row gap-4 color-[#676C6D]">
                                <div data-name="prev-button">previous ]</div>
                                <div data-name="next-button">[ next</div>
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
                                    borderRadius: "inherit",
                                }}
                            >
                                <div
                                    className="content-column flex flex-col p-3 backdrop-blur-xl gap-4 overflow-hidden"
                                    style={{
                                        borderRadius: "inherit",
                                    }}
                                >
                                    <span className="w-full flex flex-row justify-between">
                                        <div>{project.client}</div>
                                        <div>{project.year}</div>
                                    </span>
                                    <div
                                        id="featured-imgs"
                                        className="flex flex-col gap-4"
                                        ref={featuredImagesRef}
                                    ></div>
                                </div>
                                <div
                                    className="content-column flex flex-col p-3 backdrop-blur-md gap-4 overflow-hidden"
                                    style={{
                                        borderRadius: "inherit",
                                    }}
                                >
                                    <div>{project.category}</div>

                                    <div style={{ whiteSpace: "pre-line" }}>
                                        {project.col1}
                                    </div>
                                </div>
                                <div
                                    className="content-column flex flex-col p-3 backdrop-blur-lg gap-4 overflow-hidden"
                                    style={{
                                        borderRadius: "inherit",
                                    }}
                                >
                                    <div>{project.role}</div>
                                    <div style={{ whiteSpace: "pre-line" }}>
                                        {project.col2}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DetailOverlay;
