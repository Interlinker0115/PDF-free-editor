import React, { useEffect, useState } from 'react';

const Compliance = ({ form, sectionTitles}) => {

    const check = (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
            <path fill="#2775db" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
            <path fill="#fff" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
        </svg>
    );

    // Section check
    const sections = {
        'Ensayo': ['conclusiones', 'bibliografía', 'anexos'],
        'Doc. Académico': ['bibliografía', 'anexos'],
        'Art. Científico': ['resumen', 'introducción', 'metodología', 'resultados', 'conclusiones', 'bibliografía', 'anexos'],
    };

    return (
        <div className="flex justify-around mt-10 leading-8 text-xl">
            <div className="w-7/12">
                <div className="my-2 border border-blue-500 p-3 relative">
                    <div className="flex justify-between px-5">
                        <div className="absolute text-2xl -top-3 -left-1 bg-white px-2">
                            Formulario
                        </div>
                        <div>
                            <div>Seleccionar curso</div>
                            <div>Imagen de encabezado</div>
                            <div>Sinopsis</div>
                            <div>Palabras clave</div>
                            <div>Términos de publicación</div>
                        </div>
                        <div className="form-check">
                            {form.course ? check : <div className="text-red-600">Pendiente</div>}
                            {form.coverimage ? check : <div className="text-red-600">Pendiente</div>}
                            {form.description ? check : <div className="text-red-600">Pendiente</div>}
                            {form.tags ? check : <div className="text-red-600">Pendiente</div>}
                            {form.agreedterms ? check : <div className="text-red-600">Pendiente</div>}
                        </div>
                    </div>
                </div>
                <div className="my-2 border border-blue-500 mt-10 p-3 relative">
                    <div className="absolute text-2xl -top-3 -left-1 bg-white px-2">
                        Documento
                    </div>
                    <div className="flex justify-between px-5">
                        <div>
                            <div>Longitud del título</div>
                            <div>Lenguaje apropiado</div>
                            <div>Coherencia</div>
                        </div>
                        <div>
                            <div className="text-orange-400">Revisar</div>
                            <div className="text-red-600">Revisar</div>
                            <div className="text-red-600">Revisar</div>
                        </div>
                    </div>
                    <div className="flex p-5 justify-between">
                        <div>
                            <div>Secciones requeridas</div>
                            <div className="ps-5">
                                {sections[form.type]?.map((section, index) => (
                                    <div key={index}>{section.toUpperCase()}</div>
                                ))}
                            </div>
                        </div>
                        <div className="text-end">
                            <div className="text-sky-500">
                                {form.type ? form.type : <div className="text-red-600">Tipo de publicacion</div>}
                            </div>
                            {sections[form.type]?.map((section, index) => (
                                sectionTitles.includes(section) ? (
                                    <div key={index} className='ps-6'>{check}</div>
                                ) : (
                                    <div key={index} className="text-red-600">Pendiente</div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-4/12">
                <div className="my-2 border border-blue-500 p-3 relative">
                    <div className="flex">
                        <div className="absolute text-2xl -top-3 -left-1 bg-white px-2">
                            Numeración
                        </div>
                        <div>
                            <div>Tablas</div>
                            <div>Figuras</div>
                            <div>Anexos</div>
                        </div>
                        <div className="ps-3">
                            <div className="text-red-600 ps-5">Pendiente</div>
                            <div className="text-red-600 ps-5">Pendiente</div>
                            <div className="text-red-600 ps-5">Pendiente</div>
                        </div>
                    </div>
                </div>
                <div className="my-2 border border-blue-500 mt-10 p-3 relative">
                    <div className="absolute text-xl -top-3 -left-1 bg-white px-2">
                        Notas de Tabla o Figura
                    </div>
                    <div className="flex">
                        <div>
                            <div>Tablas</div>
                            <div>Figuras</div>
                        </div>
                        <div className="ps-3">
                            <div className="text-orange-400 ps-5">Revisar</div>
                            <div className="text-red-600 ps-5">Pendiente</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Compliance;