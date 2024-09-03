import React, { useEffect } from 'react';
import styles from "./Compliance.module.css"

const Compliance = ({
    form,
    check,
    sections,
    sectionCheckBadge,
    numerationCheckBadge,
    noteCheckBadge,
    coherenceCheckBadge,
    titleLengthCheckBadge,
    wordCheckBadge
}) => {

    // useEffect(() => {
    //     let W = window.innerWidth;
    //     let H = window.innerHeight;
    //     const canvas = document.getElementById("selebration");
    //     const context = canvas.getContext("2d");
    //     const maxConfettis = 150;
    //     const particles = [];

    //     const possibleColors = [
    //         "DodgerBlue",
    //         "OliveDrab",
    //         "Gold",
    //         "Pink",
    //         "SlateBlue",
    //         "LightBlue",
    //         "Gold",
    //         "Violet",
    //         "PaleGreen",
    //         "SteelBlue",
    //         "SandyBrown",
    //         "Chocolate",
    //         "Crimson"
    //     ];

    //     function randomFromTo(from, to) {
    //         return Math.floor(Math.random() * (to - from + 1) + from);
    //     }
    //     function confettiParticle() {
    //         this.x = Math.random() * W; // x
    //         this.y = Math.random() * H - H; // y
    //         this.r = randomFromTo(11, 33); // radius
    //         this.d = Math.random() * maxConfettis + 11;
    //         this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    //         this.tilt = Math.floor(Math.random() * 33) - 11;
    //         this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    //         this.tiltAngle = 0;

    //         this.draw = function () {
    //             context.beginPath();
    //             context.lineWidth = this.r / 2;
    //             context.strokeStyle = this.color;
    //             context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    //             context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    //             return context.stroke();
    //         };
    //     }
    //     function Draw() {
    //         const results = [];

    //         // Magical recursive functional love
    //         requestAnimationFrame(Draw);

    //         context.clearRect(0, 0, W, window.innerHeight);

    //         for (var i = 0; i < maxConfettis; i++) {
    //             results.push(particles[i].draw());
    //         }

    //         let particle = {};
    //         let remainingFlakes = 0;
    //         for (var i = 0; i < maxConfettis; i++) {
    //             particle = particles[i];

    //             particle.tiltAngle += particle.tiltAngleIncremental;
    //             particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    //             particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    //             if (particle.y <= H) remainingFlakes++;

    //             if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
    //                 particle.x = Math.random() * W;
    //                 particle.y = -30;
    //                 particle.tilt = Math.floor(Math.random() * 10) - 20;
    //             }
    //         }

    //         return results;
    //     }

    //     window.addEventListener(
    //         "resize",
    //         function () {
    //             W = window.innerWidth;
    //             H = window.innerHeight;
    //             canvas.width = window.innerWidth;
    //             canvas.height = window.innerHeight;
    //         },
    //         false
    //     );

    //     for (var i = 0; i < maxConfettis; i++) {
    //         particles.push(new confettiParticle());
    //     }

    //     canvas.width = W;
    //     canvas.height = H;
    //     Draw();
    // }, [allpass]);
    return (
        <div className='styles.complianceContainer'>
            <div className='text-red-500 text-left mt-2 ml-[7px] text-md'>- Revisa los cuadros rojos en el texto.</div>
            <div className="text-red-500 text-left mt-2 ml-[7px] text-md">
                - La coherencia se revisará nuevamente antes de publicar
            </div>
            {/* <Animation /> */}
            <div id='compliance' className="flex justify-around mt-3 leading-6 text-[14px] 2xl:text-xl 2xl:leading-8">
                <div className="w-7/12">
                    <div className="my-2 border border-blue-500 py-2 relative">
                        <div className="flex justify-between px-5">
                            <div className="absolute text-xl -top-3 -left-1 bg-white px-2">
                                Formulario
                            </div>
                            <div className='w-full'>
                                <div className='flex justify-between w-full items-center'>
                                    <div>Seleccionar curso</div>
                                    {form.course ? check : <div className="text-red-600">Pendiente</div>}
                                </div>
                                <div className='flex justify-between w-full items-center'>
                                    <div>Imagen de encabezado</div>
                                    {form.coverimage ? check : <div className="text-red-600">Pendiente</div>}
                                </div>
                                <div className='flex justify-between w-full items-center'>
                                    <div>Sinopsis</div>
                                    {form.description ? check : <div className="text-red-600">Pendiente</div>}
                                </div>
                                <div className='flex justify-between w-full items-center'>
                                    <div>Palabras clave</div>
                                    {form.tags ? check : <div className="text-red-600">Pendiente</div>}
                                </div>
                                <div className='flex justify-between w-full items-center'>
                                    <div>Términos de publicación</div>
                                    {form.agreedterms ? check : <div className="text-red-600">Pendiente</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-2 border border-blue-500 mt-6 p-2 relative">
                        <div className="absolute text-xl -top-3 -left-1 bg-white px-2">
                            Documento
                        </div>
                        <div className="flex flex-col px-2">
                            <div className='flex justify-between w-full items-center'>
                                <div>Longitud del título</div>
                                <div className="text-orange-400">{titleLengthCheckBadge}</div>
                            </div>
                            <div className='flex justify-between w-full items-center'>
                                <div>Lenguaje apropiado</div>
                                <div className="text-orange-400">{wordCheckBadge}</div>
                            </div>
                            <div className='flex justify-between w-full items-center'>
                                <div>Coherencia</div>
                                <div className="text-orange-400">{coherenceCheckBadge}</div>
                            </div>
                        </div>
                        <div className="flex py-1 px-2 justify-between">
                            <div>
                                <div>Secciones requeridas</div>
                                <div className="">
                                    {sections[form.post_type]?.map((section, index) => (
                                        <div key={index}>{section.toUpperCase()}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-sky-500">
                                    {form.post_type ? form.post_type : <div className="text-red-600">Tipo de publicación</div>}
                                </div>
                                {sectionCheckBadge[form.post_type]?.map((state, index) => (
                                    <div key={index} className='2xl:h-8'>{state}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="my-2 border border-blue-500 p-3 relative">
                        <div className="flex">
                            <div className="absolute text-xl -top-3 -left-1 bg-white px-2">
                                Numeración
                            </div>
                            <div>
                                <div>Tablas</div>
                                <div>Figuras</div>
                                <div>Anexos</div>
                            </div>
                            <div className="ps-10">
                                {Object.values(numerationCheckBadge)?.map((state, index) => {
                                    return (
                                        <div key={index} className='2xl:h-8'>
                                            {state}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="border border-blue-500 mt-10 p-3 relative">
                        <div className="absolute text-[12px] 2xl:text-xl -top-3  -left-1 bg-white px-2">
                            Notas de Tabla o Figura
                        </div>
                        <div className="flex pt-3">
                            <div>
                                <div>Tablas</div>
                                <div>Figuras</div>
                            </div>
                            <div className="ps-10">
                                {Object.values(noteCheckBadge)?.map((state, index) => (
                                    <div key={index} className='2xl:h-8'>
                                        {state}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <canvas id="selebration"></canvas> */}
        </div>
    );
};

export default Compliance;
