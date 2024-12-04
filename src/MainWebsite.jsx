import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import './App.css';


const TextOverlay = ({ animationTime }) => {
  const CYCLE_LENGTH = 18.666;
  const cyclicTime = animationTime % CYCLE_LENGTH;
  
  const messages = [
    { 
      range: [0, 0.6], 
      title: "Welcome To My Journey",
      subtitle: "Hello, my name is Daniel Seredensky. I am a CS and Math major at Siena college with a passion for the subject."
    },
    { range: [1.3, 3], title: <a 
      href="https://github.com/Daniel-Seredensky" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        color: '#ffffff',
        textDecoration: 'underline',
        cursor: 'pointer'
      }}
    >
      Personal Projects (click me)
    </a> ,
                         subtitle: "I started my journey with personal projects like the random terrain generator you're on right now!\n I have also made machine learning models with and without high level packages,\n as well as other applied mathematics projects such as a visualization for a proof of the jewel necklace problem by using the Borsuk-Ulam theorem." },
    { range: [4, 5.8], text: "Then I gained research experience with some fantastic professors at Siena College." },
    { range: [6.2, 8], title: "Research Experience",
                       subtitle: "Some of my research experience includes creating ODE based models to simulate the spread of COVID-19, Marburg, and Crimean-Congo hemorrhagic fever viruses.\n As well as assisting in the evaluation of the Environmental driven conceptual learning program funded by the Defense Advanced Research Projects Agency (DARPA)." },
    { range: [8.6, 10.6], title: "Future Plans",
                         subtitle: "I have always been fascinated by artificial intelligence and machine learning.\n After undergraduate studies I plan to pursue a PhD in a related field." },
    { range: [11.6, 13.2], title:"Connect With Me",
      subtitle: <a 
      href="https://www.linkedin.com/in/daniel-seredensky-87a4b8335" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        color: '#ffffff',
        textDecoration: 'underline',
        cursor: 'pointer'
      }}
    >
      Want to connect with me? Find me here on LinkedIn!
    </a> },
    { range: [15, 16.6], 
      title: "Thank You For Visiting",
      subtitle: "I hope you enjoyed the journey. If you have any questions or feedback, please don't hesitate to reach out."
    },
  ];

  const currentMessage = messages.find(
    msg => cyclicTime >= msg.range[0] && cyclicTime <= msg.range[1]
  );
  
  if (!currentMessage) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: '5%',
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'white',
      zIndex: 1000,
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
      width: '80%',
      background: 'rgba(0, 100, 0, 0.3)', // Light green with transparency
      padding: '20px',
      borderRadius: '10px',
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      {currentMessage.title ? (
        <>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            {currentMessage.title}
          </h1>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.5',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {currentMessage.subtitle}
          </p>
        </>
      ) : (
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {currentMessage.text}
        </div>
      )}
    </div>
  );
};




const Terrain = ({ setBoat, setAnimationMixer, setLookTarget }) => {
  const terrainRef = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      '/glbs/FinaleFinale.glb',
      (gltf) => {
        if (terrainRef.current) {
          terrainRef.current.add(gltf.scene);

          const boat = gltf.scene.getObjectByName('Boat_geom');
          const whereToLook = gltf.scene.getObjectByName('whereToLook');
          
          if (boat) {
            console.log('Boat found:', boat);
            setBoat(boat);
          }
          
          if (whereToLook) {
            console.log('Look target found:', whereToLook);
            setLookTarget(whereToLook);
          }

          const mixer = new THREE.AnimationMixer(gltf.scene);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });
          setAnimationMixer(mixer);
        }
      },
      undefined,
      (error) => {
        console.error('Error loading GLB file:', error);
      }
    );
  }, [setBoat, setAnimationMixer, setLookTarget]);

  return <group ref={terrainRef} />;
};

const CameraFollowBoat = ({ boat, lookTarget }) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const lookAtPosition = useRef(new THREE.Vector3());

  useFrame(() => {
    if (boat && lookTarget) {
      boat.getWorldPosition(targetPosition.current);
      
      // Camera position
      camera.position.lerp(
        new THREE.Vector3(
          targetPosition.current.x ,
          targetPosition.current.y + 1.5,
          targetPosition.current.z 
        ),
        1
      );
      
      // Get whereToLook position
      lookTarget.getWorldPosition(lookAtPosition.current);
      camera.lookAt(lookAtPosition.current);
    }
  });

  return null;
};

const BackgroundSphere = () => {
  const { scene } = useThree();
  
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/websiteBackgrounds/PN5.jpg'); //PN2.jpg
    // Increase segments for higher resolution
    const geometry = new THREE.SphereGeometry(750, 32, 16);
    geometry.scale(-1, 1, 1);
    
    const material = new THREE.MeshBasicMaterial({
      map: texture
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    // Move the sphere down
    sphere.position.y = -10;
    scene.add(sphere);
    
    return () => {
      geometry.dispose();
      material.dispose();
      texture.dispose();
      scene.remove(sphere);
    };
  }, [scene]);
  
  return null;
};


const MainWebsite = () => {
  const [boat, setBoat] = React.useState(null);
  const [lookTarget, setLookTarget] = React.useState(null);
  const [animationMixer, setAnimationMixer] = React.useState(null);
  const [currentTime, setCurrentTime] = React.useState(0); // Add this state
  const animationTimeRef = useRef(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (animationMixer) {
        const speed = 0.05; // Adjust this value to control animation speed
        
        if (event.key.toLowerCase() === 'w') {
          animationTimeRef.current += speed;
          setCurrentTime(animationTimeRef.current); // Update the state
          animationMixer.update(speed);
        }
        if (event.key.toLowerCase() === 's') {
          animationTimeRef.current -= speed;
          setCurrentTime(animationTimeRef.current); // Update the state
          animationMixer.update(-speed);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [animationMixer]);

  return (
    <div className="background-container">
      <TextOverlay animationTime={currentTime} />
      <div id="vector-display" style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        color: 'white',
        padding: '10px',
        fontFamily: 'monospace',
        zIndex: 1000
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontSize: '16px',
        textAlign: 'center',
        zIndex: 1000,
        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '8px 15px',
        borderRadius: '5px'
      }}>
        Hold W to move forward • Hold S to move backward
      </div>
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <BackgroundSphere />
        <ambientLight intensity={.7} />
        <directionalLight position={[55, 35, 0]} intensity={1.6} />
        <Terrain 
          setBoat={setBoat} 
          setAnimationMixer={setAnimationMixer}
          setLookTarget={setLookTarget}
        />
        {boat && lookTarget && <CameraFollowBoat boat={boat} lookTarget={lookTarget} />}
      </Canvas>
    </div>
  );
};

export default MainWebsite;

