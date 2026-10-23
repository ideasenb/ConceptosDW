import React from 'react'
import { Canvas } from '@react-three/fiber'
import SceneContent from './SceneContent'
import './HeroHeader.css'

export default function HeroHeader() {
    return (
        <header className="hero-header">
            <div className="hero-canvas-container">
                <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
                    <SceneContent />
                </Canvas>
            </div>

            <div className="hero-overlay">
                <nav className="hero-nav">
                    <div className="hero-logo">
                        PORTAFOLIO <span className="hero-logo-accent">2026</span>
                    </div>
                    <div className="hero-nav-links">
                        <a href="#proyectos" className="hero-nav-link">Proyects</a>
                        <a href="#sobre-mi" className="hero-nav-link">About me</a>
                        <a href="#contacto" className="hero-nav-link">Contact</a>
                    </div>
                </nav>

                <div className="hero-content">
                    <h1 className="hero-title">
                        Hi, my name is <span className="hero-gradient-text">[Carlos Cortés]</span>
                    </h1>
                    <p className="hero-description">
                        I am a student of multimedia and electronic engineering. I like to be a creative person with strong technical skills.
                    </p>
                    <div className="hero-buttons">
                        <a
                            href="#proyectos"
                            className="hero-btn hero-btn-primary"
                        >
                            See proyects
                        </a>
                        <a
                            href="#contacto"
                            className="hero-btn hero-btn-secondary"
                        >
                            Contact me
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}