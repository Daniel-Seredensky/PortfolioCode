import React from 'react';
import './LandingPage.css';
import { motion } from 'framer-motion';
import ProjectShowcase from './ProjectShowcase'; // Import the ProjectShowcase component

function LandingPage({ onExploreClick }) {
  const researchProjects = [
    {
      title: "Mathematic Modeling Of The Spread Of Infectious Diseases",
      description:
        "Developed systems of ODEs to model the spread of Covid-19, Marburg, and Crimean Congo Hemorrhagic Fever. Then conducted stability and sensitivity analysis to determine the most effective strategies to combat the spread of these diseases. Gained experience using Python to visualize the results of the analysis.",
      tech: ["Python", "Statistical Modeling"],
    },
    {
      title: "ECOLE",
      description:
        "Supporting and utilizing systems for the evaluation of our research on the Environmental-driven Conceptual Learning (ECOLE) program funded by Defense Advanced Research Projects Agency (DARPA). This project is part of a team of researchers from GE Aerospace, LCC, USC and UCLA.",
      tech: ["Java", "Natural Language Processing"],
    },
  ];

  const personalProjects = [
    {
      title: "Monte Carlo Simulation",
      description:
        "Simulating electron orbits of a hydrogen atom at different quantum numbers and plotting the results.",
      tech: ["Physics"],
      content: { type: 'image', src: '/projectContent/Atom.png' },
    },
    {
      title: "Sinusoidal Function Approximator",
      description:
        "Visualizes the fundamental machine learning concept of gradient descent by approximating a sinusoidal function using a basic neural network.",
      tech: ["Neural Networks", "Matplotlib"],
      content: { type: 'gif', src: '/projectContent/MainLearn.gif' },
    },
    {
      title: "Terrain Generator",
      description:
        "An interactive random terrain generator created by only using parametric sin and cos functions. Then converting it into a Mesh using Delaunay triangulation to make the terrain usable in Blender. Click on the button in the About Me section to get an interactive look at a terrain",
      tech: ["Blender", "Scipy", "Applied Mathematics"],
    },
    {
      title: "Machine Learning Models",
      description:
        "Machine Learning algorithms using high-level libraries such as TensorFlow and SciPy.",
      tech: ["TensorFlow", "Machine Learning"],
      content: {
        type: 'link',
        text: "Click here see the code on GitHub",
        href: "https://github.com/Daniel-Seredensky/ClassificationNNs",
      },
    },
    {
      title: "Classification Neural Network using NumPy",
      description:
        "Classification Neural Network using no high-level libraries, demonstrating my understanding of fundamental machine learning concepts.",
      tech: ["Machine Learning"],
      content: {
        type: 'link',
        text: "Click here see the code on GitHub",
        href: "https://github.com/Daniel-Seredensky/NN_With_Numpy",
      },
    },
    {
      title: "Jewel Necklace Problem Visualization",
      description:
        "If you're curious about what this problem is check out 3Blue1Brown's video on the topic.",
      tech: ["Python", "Data Visualization"],
      content: {
        type: 'gallery',
        images: [
          '/projectContent/necklace.png',
          '/projectContent/necklaceAnswer.png',
          '/projectContent/collapse4D.gif',
        ],
      },
    },
    {
      title: "CoRecover",
      description:
        "Aided in the development of an iOS application to help co-dependent individuals by sending them positive affirmations throughout the day.",
      tech: ["Swift"],
      content: { type: 'text', text: "Coming to the App Store soon!" },
    },
    {
      title: "Personal Website",
      description: "This website!",
      tech: ["React", "JavaScript", "CSS", "Three.js", "Blender"],
      content: {
        type: 'link',
        text: "Click here see the code on GitHub",
        href: "https://github.com/Daniel-Seredensky/PortfolioWebsite",
      },
    },
  ];

  return (
    <>
      <header className="header">
        <h1 className="name-title">Daniel Seredensky</h1>
        <h2 className="job-subtitle">Computer Science and Mathematics Student At Siena College</h2>
      </header>

      <div className="landing-page-container">
        {/* Left Side: About Me and Button */}
        <div className="left-side">
          {/* About Me box */}
          <div className="about-box">
            <h3>About Me</h3>
            <p>
              I’m a student at Siena College with a passion for problem-solving and discovery, both in and out of the classroom. When I’m not exploring the exciting field of machine learning—where I plan to pursue a PhD—I enjoy sharpening my strategic thinking through chess, staying active at the gym, and soaking in the beauty of the outdoors. 
            </p>
          </div>

          <button className="journey-button" onClick={onExploreClick}>
            Join My Journey
          </button>

          {/* Filigree SVG for each corner */}
          <img src="/svgs/output2.svg" alt="Filigree Corner" className="top-left-filigree" />
          <img src="/svgs/output2.svg" alt="Filigree Corner" className="top-right-filigree" />
          <img src="/svgs/output2.svg" alt="Filigree Corner" className="bottom-left-filigree" />
          <img src="/svgs/output2.svg" alt="Filigree Corner" className="bottom-right-filigree" />
        </div>

        {/* Right Side: Scrollable Content */}
        <div className="right-side">
          <motion.div
            className="research-section"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Research Experience</h3>
            <ProjectShowcase projects={researchProjects} />
          </motion.div>

          <motion.div
            className="projects-section"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Personal Projects</h3>
            <ProjectShowcase projects={personalProjects} />
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
