"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ReactNode } from "react"
import { usePathname } from "next/navigation"

export function ClientLayoutWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname()

    return (
        <AnimatePresence mode="wait">
            <motion.main
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="flex-1 pt-16"
            >
                {children}
            </motion.main>
        </AnimatePresence>
    )
}
