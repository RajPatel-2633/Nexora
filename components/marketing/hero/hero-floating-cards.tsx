import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";
import { floatingCards } from "@/features/marketing/hero-data";
import { cn } from "@/lib/utils";

const positionClasses = {
  "top-right": "absolute -right-3 -top-3 z-20 sm:-right-6 sm:-top-4",
  "bottom-left": "absolute -bottom-3 -left-3 z-20 sm:-bottom-4 sm:-left-6",
};

const icons = {
  conversion: TrendingUp,
  "active-users": Users,
};

type FloatingCardProps = {
  id: string;
  label: string;
  value: string;
  change: string;
  position: keyof typeof positionClasses;
  delay?: number;
};

function FloatingCard({
  id,
  label,
  value,
  change,
  position,
  delay = 0,
}: FloatingCardProps) {
  const Icon = icons[id as keyof typeof icons] ?? TrendingUp;

  return (
    <motion.div
      className={cn(
        positionClasses[position],
        "w-36 rounded-xl border border-black/[0.06] bg-white p-3 shadow-lg sm:w-40"
      )}
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.8 + delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{
          y: position === "top-right" ? [4, -4, 4] : [-4, 4, -4],
          rotate: position === "bottom-left" ? [0.5, -0.5, 0.5] : [-0.5, 0.5, -0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 4 + delay,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EEF2FF]">
            <Icon className="size-3.5 text-[#6366F1]" aria-hidden="true" />
          </div>
          <span className="text-[9px] font-medium text-gray-500">{label}</span>
        </div>
        <p className="mt-1.5 text-base font-bold text-gray-900">{value}</p>
        <p className="text-[9px] font-medium text-emerald-600">{change}</p>
      </motion.div>
    </motion.div>
  );
}

export function HeroFloatingCards() {
  return (
    <>
      {floatingCards.map((card, i) => (
        <FloatingCard key={card.id} {...card} delay={i * 0.5} />
      ))}
    </>
  );
}
