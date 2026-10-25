import React from 'react'
import { Canvas } from '@react-three/fiber'
import SceneContent from './SceneContent'
import './HeroHeader.css'


export default function HeroHeader() {
    return (
        // Contenedor principal de toda la sección del Hero
        <header className="hero-header">

            {/* fondo del 3js */}
            <div className="hero-canvas-container">
                <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
                    <SceneContent />
                </Canvas>
            </div>

            <div className="hero-overlay">

                <nav className="hero-nav">

                    <div className="hero-logo">
                        PORTFOLIO <span className="hero-logo-accent">2026</span>
                    </div>

                    {/* links de navegación */}
                    <div className="hero-nav-links">
                        <a
                            href="https://www.instagram.com/carloscortesssa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-nav-link"
                        >
                            Contact
                        </a>
                    </div>
                </nav>

                <div className="hero-content">
                    <h1 className="hero-title">
                        Hi, my name is <span className="hero-gradient-text">Carlos Cortés</span>
                    </h1>

                    <p className="hero-description">
                        I am a student of multimedia and electronic engineering. I like to be a creative person with strong technical skills.
                    </p>
                    <div className="hero-buttons">
                        <a
                            href="https://ideasenb.github.io/ConceptosDW/modulos/clase3/index.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-btn hero-btn-primary"
                        >
                            See projects
                        </a>
                    </div>
                </div>

            </div>
        </header>
    )
}