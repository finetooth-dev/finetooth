"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import "./WorkWithUs.css";

function WorkWithUs() {
    const [isOpen, setIsOpen] = useState(false);

    const handleTap = () => {
        setIsOpen(!isOpen);
    };

    const handleHover = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const itemVariants: Variants = {
        open: {
            y: 0,
            transition: { type: "spring", stiffness: 200, damping: 50 },
        },
        closed: {
            y: 24.5,
        },
    };

    return (
        <div className="flex justify-center fixed bottom-0 w-full z-20">
            <motion.div
                className="self-center py-2 px-10 backdrop-blur-md overflow-hidden"
                id="work-with-us"
                initial={false}
                animate={isOpen ? "open" : "closed"}
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
                onClick={handleTap}
                variants={itemVariants}
                style={{
                    background: "rgba(253, 253, 253, 0.52)",
                    borderRadius: "8px 8px 0 0",
                    boxShadow: "0px -3px 14.4px 0px rgba(0, 0, 0, 0.10)",
                }}
            >
                <div className="flex flex-col gap-2 items-center justify-center">
                    <motion.div
                        variants={{
                            open: { opacity: 1 },
                            closed: { opacity: 0 },
                        }}
                        className="absolute top-0 w-full h-full z-0"
                        style={{
                            background:
                                "linear-gradient(0deg, rgba(217, 217, 217, 0.00)0%, rgba(106, 104, 89, 0.3)100%)",
                        }}
                    ></motion.div>
                    <motion.div
                        variants={{
                            open: {
                                scale: 0.8,
                                transition: {
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20,
                                },
                            },
                            closed: {
                                scale: 1,
                                transition: {
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 20,
                                },
                            },
                        }}
                    >
                        [ work with us ]
                    </motion.div>
                    <div className="flex flex-row gap-4 z-10">
                        <a
                            className="hover:underline"
                            href="https://www.instagram.com/finetooth.dev/"
                        >
                            @finetooth.dev
                        </a>
                        <div>∂</div>
                        <a
                            href="mailto:info@finetooth.dev"
                            className="hover:underline"
                        >
                            info@finetooth.dev
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default WorkWithUs;
