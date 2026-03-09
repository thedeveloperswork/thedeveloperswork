"use client";

import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

export default function ChaosEngine() {
    const [started, setStarted] = useState(false);
    const activeRef = useRef(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const initiateChaos = () => {
        if (activeRef.current) return;
        activeRef.current = true;
        setStarted(true);

        const { Engine, Runner, Bodies, World, Body } = Matter;

        // Create low-gravity engine
        const engine = Engine.create({ gravity: { x: 0, y: 0.05, scale: 0.001 } });

        // Target all premium glass panels in the DOM
        const elements = Array.from(document.querySelectorAll('.glass-panel, footer'));
        if (elements.length === 0) return;

        const bodies: { body: Matter.Body, el: HTMLElement, origin: { x: number, y: number } }[] = [];

        // Freeze scrolling so walls align correctly with the viewport
        document.body.style.overflow = "hidden";

        elements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const rect = htmlEl.getBoundingClientRect();

            // Skip tiny un-renderable boxes
            if (rect.width < 10 || rect.height < 10) return;

            // Center coords relative to the current viewport
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const body = Bodies.rectangle(cx, cy, rect.width, rect.height, {
                restitution: 0.9,     // Highly bouncy
                frictionAir: 0.005,   // Floats easily
                friction: 0.1,
                density: 0.01
            });

            // Powerful random explosion blast outwards and upwards
            Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 30,
                y: -(Math.random() * 25 + 10)
            });
            Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15);

            bodies.push({ body, el: htmlEl, origin: { x: cx, y: cy } });
            World.add(engine.world, body);
        });

        // Invisible walls to keep elements inside the screen bounds
        const width = window.innerWidth;
        const height = window.innerHeight;
        const wallOpts = { isStatic: true, restitution: 1.0, friction: 0 };

        World.add(engine.world, [
            Bodies.rectangle(width / 2, -500, width * 3, 50, wallOpts), // High ceiling
            Bodies.rectangle(width / 2, height + 50, width * 3, 50, wallOpts), // Floor
            Bodies.rectangle(-50, height / 2, 50, height * 3, wallOpts), // Left wall
            Bodies.rectangle(width + 50, height / 2, 50, height * 3, wallOpts) // Right wall
        ]);

        const runner = Runner.create();
        Runner.run(runner, engine);

        // Sync Matter.js body positions physical coordinates to the React CSS transforms
        const updateDOM = () => {
            if (!activeRef.current) return;
            bodies.forEach(({ body, el, origin }) => {
                const dx = body.position.x - origin.x;
                const dy = body.position.y - origin.y;
                el.style.transform = `translate(${dx}px, ${dy}px) rotate(${body.angle}rad)`;
                // Override CSS hover transitions to prevent stuttering
                el.style.transition = 'none';
                el.style.zIndex = '9999';
            });
            requestAnimationFrame(updateDOM);
        };
        requestAnimationFrame(updateDOM);
    };

    if (!mounted) return null;

    return (
        <button
            onClick={initiateChaos}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 font-mono font-bold text-sm tracking-widest border-2 transition-all duration-700 z-[9999] backdrop-blur-md rounded-lg shadow-2xl
                ${started
                    ? 'opacity-0 scale-50 pointer-events-none translate-y-20'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:bg-rose-500 hover:text-white hover:shadow-[0_0_40px_rgba(244,63,94,0.8)] hover:scale-105'
                }`}
        >
            ⚠️ INITIATE ZERO-G
        </button>
    );
}
