import './../assets/scss/main.scss';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";

const  SafeBoxDial = ( props ) => {
    const {  appSettings } = useContext(GlobalContext);
    const [initialRotation, setInitialRotation] = useState(0); // Ángulo inicial del lock
    const [isMouseDown, setIsMouseDown] = useState(false); // Estado para saber si el mouse está presionado
    const [startAngle, setStartAngle] = useState(0); // Ángulo inicial del ratón
    const [rotationDirection, setRotationDirection] = useState(""); // Dirección de rotación


    const handleMouseMove = (event) => {
        if (!isMouseDown || props.checking || props.isReseting) return ; // Solo ejecuta si el mouse está presionado    
        let audio  = document.getElementById("audio_wheel");
        let rounded = calculateAngle(event); // Calcula el ángulo 
       // Calcula la diferencia de ángulos de forma cíclica
        const angleDifference = normalizeAngleDifference(rounded - startAngle);
       // Calcula la rotación acumulada y normalízala
        const newRotation = normalizeAngle(initialRotation + angleDifference);
        const rotationDir = getRotationDirection(props.rotationAngle/6, newRotation/6);
        //Si se intenta girar en sentido contrario a la rotacion actual, no se hace nada
        if(rotationDirection === ''){
          setRotationDirection(rotationDir);
        }else if(rotationDirection !== rotationDir){
          return;}
        if(props.rotationAngle === newRotation)return; // No actualiza si el ángulo no ha cambiado
        props.setRotationAngle(newRotation);     // Actualiza el ángulo de rotación
        audio.play();
    };

    const handleMouseUp = () => {
        if (props.checking || props.isReseting ) return ;
        setIsMouseDown(false); // Indica que el mouse ya no está presionado
        //reset(); // Reinicia la rotación //Poniendolo aqui, hace efecto de teelfono de dial
        //Para poder poner -55 si va contrarreloj o 30 si va a favor
        props.setSolutionArray((sol) => [...sol, (rotationDirection === "clockwise" ? String(props.rotationAngle/6) : String('-'+props.rotationAngle/6))]);
        setRotationDirection(''); //Reinicia la direccion de rotacion
    };

    const handleMouseDown = (event) => {
        if (props.checking || props.isReseting) return ;
        setIsMouseDown(true); // Indica que el mouse está presionado    
        let rounded = calculateAngle(event); // Calcula el ángulo inicial
        setStartAngle(rounded);     // Guarda el ángulo inicial y el ángulo actual del lock
        setInitialRotation(props.rotationAngle); // Guarda el ángulo actual del lock    
      };

    const calculateAngle = (event) => {
        const lockElement = document.getElementById("lock");
        const rect = lockElement.getBoundingClientRect();  
        // Calcula el centro del div
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;  
        // Calcula el ángulo inicial en radianes y lo convierte a grados
        const radians = Math.atan2(event.clientY - centerY, event.clientX - centerX);
        let angle = radians * (180 / Math.PI);  
        // Normaliza el ángulo para que esté entre 0° y 360°
        if (angle < 0) {
          angle += 360;}
        return Math.round(angle / 6) * 6;
      }

    function getRotationDirection(prev, curr) {
        const diff = (curr - prev + 60) % 60;
        if (diff === 0) return '';
        return diff < 30 ? 'clockwise' : 'counter-clockwise';
    }

    const normalizeAngleDifference = (angle) => {
        return ((angle + 180) % 360) - 180;
    };    
    const normalizeAngle = (angle) => {
        return ((angle % 360) + 360) % 360; // Asegura que el ángulo esté entre 0 y 360
    };

    const reset = () => {
        setStartAngle(0);
        setRotationDirection("");
    }

    useEffect(() => {    
        if (props.isReseting) { 
            reset(); // Reinicia el lock
        }}, [props.isReseting]); // Se ejecuta cuando isReseting cambia

    return(
        <div className='lockContainer' style={{  
           // backgroundImage: 'url("' + appSettings.backgroundLock + '")',
            width: props.boxWidth,//Math.min(props.boxWidth, props.boxHeight) * 0.7, 
            height: props.boxHeight, //Math.min(props.boxWidth, props.boxHeight) * 0.7,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", // Necesario para el posicionamiento absoluto del dial
            zIndex:1,
          zIndex: 0
        }}
        
            onDragStart={(event) => event.preventDefault()} 
            onMouseUp={handleMouseUp} 
            onMouseDown={handleMouseDown} 
            onMouseMove={handleMouseMove}>
          
            <div id="lock" style={{ 
              backgroundImage: 'url("' + appSettings.backgroundDial + '")',
              height:props.boxHeight*0.53,
              width: props.boxWidth*0.53,
              //zIndex: 5,//props.styles.dial_text_zIndex,
              //width: Math.min(props.boxWidth, props.boxHeight) * props.styles.dial_size, // Usa el menor valor para asegurar que sea cuadrado
              //height: Math.min(props.boxWidth, props.boxHeight) * props.styles.dial_size, // Usa el menor valor para asegurar que sea cuadrado
              //marginLeft: props.boxWidth / 2 * 0.225,
              transform: `rotate(${props.rotationAngle}deg)`, // Rotación dinámica.
              transition: props.isReseting ? "transform 2.5s ease" : "none", // Transición suave solo durante el reset
            }}></div>
           {/*<p id="rotationNum" className='rotationNum' onDragStart={(event) => event.preventDefault()} 
              style={{color: props.styles.dial_text_color, fontSize: props.styles.dial_text_size, zIndex:5}}
              >{props.rotationAngle/6}</p>      */}
              <audio id="audio_wheel" src={appSettings.soundDial} autostart="false" preload="auto" />    
        </div>
    );
}

export default SafeBoxDial;