import React from "react";
import { useState } from "react";
import { Headdata,Coredata,Voldata,responsive } from "./data";


export const DevP = ({ isDarkMode, setIsDarkMode }) =>{

    return(
        <div>
            <div >
                <div class="pt-16 pb-4 pl-4 pr-4 mx-auto ml-auto mr-auto bg-top bg-cover max-w-7xl md:px-24 lg:px-12 lg:pt-20">
                <div class="mb-10 ml-auto mr-auto bg-top bg-cover max-w-7xl md:mx-auto sm:text-center lg:max-w-2xl md:mb-16">
                    <div class="flex justify-center items-center mb-6 ml-auto mr-auto tracking-tight text-gray-900 bg-top  bg-cover  max-w-7xl md:mx-auto">
                        <p class={`inline max-w-lg text-3xl font-bold leading-none tracking-tight sm:text-5xl md:mx-auto ${isDarkMode?'text-white':'text-black'}`}>Meet The Team</p>
                    </div>
                    <p class="text-darkgray-700 md:text-xl text-center">Our Team has put in a lot of effort into making this website a tribute worthy of the legacy that our seniors leave for us. Here are the members who made it happen:</p>
                </div>
                </div>
        
                <div >
                    <div class="flex flex-col justify-center items-center pb-12 mb-16">
                        <h1 className="flex justify-center items-center text-3xl mb-6 font-bold">HEAD</h1>
                        <div class="flex flex-row flex-wrap justify-center items-center">
                        {Headdata.map((val)=>{
                            return(
                            <div class="scale-125 relative w-[300px] overflow-hidden rounded-3xl shadow-lg group bg-white m-8">
                                
                                {/* <img class="object-cover w-full h-72 xl:h-80" src={val.image}  alt="Team Member Name"/> */}

                                <img class="object-cover w-full h-72 xl:h-80" src={val.image} ></img>
                                
                                <div class="absolute inset-0 px-6 py-4 text-center duration-300 opacity-0 group-hover:opacity-100">
                                <div class="absolute inset-0 w-full h-full bg-gradient-to-br from-white opacity-60 to-gray-700 rounded-md"></div>
                                <div class="relative flex flex-col items-center justify-center w-full h-full ">
                                    <p class="mb-1 text-xl font-bold text-black">{val.name}</p>
                                    <p class="mb-4 text-lg text-black">{val.role}</p>
                                    <div class="flex items-center justify-center space-x-3 bg-top bg-cover">
                                    <a href={val.github_id} target="_blank" class="transition-colors duration-300 bg-top bg-cover cursor-pointer hover:text-white text-blue-50">
                                    <svg color="black" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                                    </svg>
                                    </a>
 
                                    </div>
                                </div>
                                </div>
                            </div>                            
                        )
                    })}
                    </div>

                    </div>
                    <div class="flex flex-col justify-center items-center pb-12 mb-16">
                        <h1 className="flex justify-center items-center text-3xl mb-6 font-bold">Core Team</h1>
                        <div class="flex flex-row flex-wrap justify-center items-center">
                        {Coredata.map((val)=>{
                            return(
                            <div class="scale-110 relative w-[300px] overflow-hidden rounded-3xl shadow-lg group bg-white m-8">
                                <img class="object-cover w-full h-72 xl:h-80" src={val.image} alt="Team Member Name"/>
                                <div class="absolute inset-0 px-6 py-4 text-center duration-300 opacity-0 group-hover:opacity-100">
                                <div class="absolute inset-0 w-full h-full bg-gradient-to-br from-white opacity-60 to-gray-700"></div>
                                <div class="relative flex flex-col items-center justify-center w-full h-full">
                                    <p class="mb-1 text-xl font-bold text-black">{val.name}</p>
                                    <p class="mb-4 text-lg text-black">{val.role}</p>
                                    <div class="flex items-center justify-center space-x-3 bg-top bg-cover">
                                    <a href={val.github_id} target="_blank" class="transition-colors duration-300 bg-top bg-cover cursor-pointer hover:text-white text-blue-50">
                                    <svg color="black" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                                    </svg>
                                    </a>

                                    </div>
                                </div>
                                </div>
                            </div>                            
                        )
                    })}
                    </div>

                    </div>
                    <div class="flex flex-col justify-center items-center pb-12">
                        <h1 className="flex justify-center items-center text-3xl mb-6 font-bold">Volunteers</h1>
                        <div class="flex flex-row flex-wrap justify-center items-center">
                        {Voldata.map((val)=>{
                            return(
                            <div class="scale-95 relative w-[300px] overflow-hidden rounded-3xl shadow-lg group bg-white m-8">
                                <img class="object-cover w-full h-72 xl:h-80" src={val.image} alt="Team Member Name"/>
                                <div class="absolute inset-0 px-6 py-4 text-center duration-300 opacity-0 group-hover:opacity-100">
                                <div class="absolute inset-0 w-full h-full bg-gradient-to-br from-white opacity-60 to-gray-700"></div>
                                <div class="relative flex flex-col items-center justify-center w-full h-full">
                                    <p class="mb-1 text-xl font-bold text-black">{val.name}</p>
                                    <p class="mb-4 text-lg text-black">{val.role}</p>
                                    <div class="flex items-center justify-center space-x-3 bg-top bg-cover">
                                    <a href={val.github_id} target="_blank" class="transition-colors duration-300 bg-top bg-cover cursor-pointer hover:text-white text-blue-50">
                                    <svg color="black" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                                    </svg>
                                    </a>

                                    </div>
                                </div>
                                </div>
                            </div>                            
                        )
                    })}
                    </div>

                    </div>
                </div>
                
        </div>
        </div>
    )
}

export default DevP;
