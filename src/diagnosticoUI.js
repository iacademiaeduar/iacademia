// Átomos de UI del flujo de inscripción — separado de Diagnostico.js (ver diagnosticoData.js).
import React from 'react';
import { PASOS } from './diagnosticoData';

export const Barra = ({paso}) => (
  <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5">
    <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
      style={{width:Math.round((paso/(PASOS.length-1))*100)+'%'}}/>
  </div>
);

export const Btn = ({onClick,children,outline,disabled,small}) => (
  <button onClick={onClick} disabled={disabled}
    className={`w-full rounded-xl font-semibold transition-all text-sm ${small?'py-2':'py-3'} ${
      disabled?'bg-gray-200 text-gray-400 cursor-not-allowed'
      :outline?'border-2 border-purple-400 text-purple-700 hover:bg-purple-50'
      :'bg-purple-600 text-white hover:bg-purple-700 shadow-md'}`}>
    {children}
  </button>
);

export const Inp = ({label,placeholder,value,onChange,type='text',required}) => (
  <div>
    {label && <label className="text-xs font-semibold text-gray-500 mb-1 block">
      {label}{required&&<span className="text-red-400 ml-0.5">*</span>}
    </label>}
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-400 bg-white transition-colors"/>
  </div>
);

export const Sel = ({label,value,onChange,children,required}) => (
  <div>
    {label&&<label className="text-xs font-semibold text-gray-500 mb-1 block">
      {label}{required&&<span className="text-red-400 ml-0.5">*</span>}
    </label>}
    <select value={value} onChange={onChange}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-400 bg-white">
      {children}
    </select>
  </div>
);

export const Check = ({label,checked,onClick,sub}) => (
  <button onClick={onClick}
    className={`flex items-start gap-3 p-3 border rounded-xl text-left w-full transition-all
      ${checked?'border-purple-400 bg-purple-50':'border-gray-200 hover:border-gray-300'}`}>
    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5
      ${checked?'border-purple-500 bg-purple-500':'border-gray-300'}`}>
      {checked&&<span className="text-white text-xs font-bold">✓</span>}
    </div>
    <div>
      <div className={`text-sm ${checked?'text-purple-700 font-medium':'text-gray-600'}`}>{label}</div>
      {sub&&<div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  </button>
);

export const wrap = (children, extra) => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4 relative">
    {children}
    {extra}
  </div>
);

export const card = (children,wide) => (
  <div className={`bg-white rounded-2xl border border-gray-100 p-7 w-full ${wide?'max-w-3xl':'max-w-lg'} shadow-xl`}>
    {children}
  </div>
);
