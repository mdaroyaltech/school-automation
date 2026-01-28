import { motion } from "framer-motion";

const RoleCard = ({ role, icon, active, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`
        cursor-pointer rounded-2xl p-4 border
        flex flex-col items-center gap-2 text-center
        transition-all
        ${
          active
            ? "bg-card border-accent shadow-card"
            : "bg-page border-borderDefault hover:border-accent/60"
        }
      `}
    >
      <div
        className={`
          h-12 w-12 rounded-xl flex items-center justify-center text-xl
          ${
            active
              ? "bg-accent text-white"
              : "bg-navbar text-textSecondary"
          }
        `}
      >
        {icon}
      </div>

      <p
        className={`text-sm font-semibold ${
          active ? "text-textPrimary" : "text-textSecondary"
        }`}
      >
        {role}
      </p>
    </motion.div>
  );
};

export default RoleCard;
