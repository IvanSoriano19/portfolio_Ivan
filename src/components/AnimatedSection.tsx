import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({
        threshold: 0.9, // Se activa cuando el 40% del elemento es visible
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible"); // Aparece cuando entra al viewport
        } else {
            controls.start("hidden"); // Desaparece cuando sale
        }
    }, [controls, inView]);

    return (
        <>
            <div className="mb-[50px]">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: {
                            opacity: 0,
                            y: 50,
                            transition: { duration: 0.5 },
                        },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.8 },
                        },
                    }}
                    className="h-screen flex items-center justify-center w-full"
                >
                    {children}
                </motion.div>
            </div>
        </>
    );
};

export default AnimatedSection;
