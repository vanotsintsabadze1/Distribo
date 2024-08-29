import { motion } from "framer-motion";

const mobileBurgerMenuAnimations = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
};

export default function MobileBurgerMenu() {
  return (
    <motion.div
      variants={mobileBurgerMenuAnimations}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-[100dvh] w-[15rem] bg-secondary md:hidden"
    ></motion.div>
  );
}
