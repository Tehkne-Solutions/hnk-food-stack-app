'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function ParallaxBackground() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -200])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.05, 0])

    return (
        <motion.div
            ref={ref}
            style={{ y }}
            className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
        >
            <div className="absolute inset-0">
                <motion.div
                    style={{ opacity }}
                    className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl"
                />
                <motion.div
                    style={{ opacity }}
                    className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-br from-orange-500/15 to-transparent rounded-full blur-3xl"
                />
                <motion.div
                    style={{ opacity }}
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-b from-amber-400/10 to-transparent rounded-full blur-3xl"
                />
                <motion.div
                    style={{ opacity }}
                    className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-t from-zinc-900/30 to-transparent rounded-full blur-3xl"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-950/20 to-zinc-950/0" />
        </motion.div>
    )
}
