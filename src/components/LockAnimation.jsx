import { motion } from "framer-motion";

const LockAnimation = ({ role, success }) => {
  const colors = {
    Admin: "bg-accent",
    Teacher: "bg-info",
    Parent: "bg-success",
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex justify-center my-6"
    >
      <div
        className={`
          ${colors[role]}
          h-14 w-14 rounded-full
          flex items-center justify-center
          text-white text-2xl shadow-card
        `}
      >
        {success ? "✅" : "🔒"}
      </div>
    </motion.div>
  );
};

export default LockAnimation;
