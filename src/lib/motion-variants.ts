/**
 * @name Framer Motion Variants
 * @description Presets de animações reutilizáveis em toda a app
 * @version 1.0
 * 
 * Variants disponíveis:
 * - fadeIn: Entrada com opacidade
 * - slideInUp: Slide de baixo para cima
 * - slideInLeft/Right: Slide lateral
 * - scaleIn: Zoom de entrada
 * - rotateIn: Rotação de entrada
 * - bounceIn: Entrada com bounce
 * 
 * @example
 * import { fadeIn, slideInUp } from '@/lib/motion-variants'
 * 
 * <motion.div variants={fadeIn}>...</motion.div>
 * <motion.div variants={slideInUp}>...</motion.div>
 */

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
}

export const slideInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.4, ease: 'easeOut' },
}

export const slideInDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: 'easeOut' },
}

export const slideInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.4, ease: 'easeOut' },
}

export const slideInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: { duration: 0.4, ease: 'easeOut' },
}

export const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 },
}

export const scaleInCenter = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
    transition: { duration: 0.3, delay: 0.1 },
}

export const rotateIn = {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: -10 },
    transition: { duration: 0.4 },
}

export const bounceIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: {
        duration: 0.5,
        bounce: 0.5,
    },
}

// Container para animar múltiplos filhos
export const containerVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
    exit: { opacity: 0 },
}

// Item para uso com container
export const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
}

// Hover effect - scale
export const hoverScale = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
}

// Hover effect - glow
export const hoverGlow = {
    initial: { boxShadow: 'none' },
    whileHover: { boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)' },
}

// Pulse animation
export const pulse = {
    animate: { opacity: [1, 0.7, 1] },
    transition: { duration: 2, repeat: Infinity },
}

// Bounce animation
export const bounce = {
    animate: { y: [0, -5, 0] },
    transition: { duration: 1, repeat: Infinity },
}

// Shimmer/loading effect
export const shimmer = {
    animate: {
        backgroundPosition: ['200% center', '-200% center'],
    },
    transition: {
        duration: 2,
        repeat: Infinity,
    },
}
