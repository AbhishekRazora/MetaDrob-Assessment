import { useState } from 'react'
// import './App.css'
import Component2D from './components/Component2D'
import Component3D from './components/Component3D'

function App() {
const [is3D,setIs3D]=useState(true)
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
    <div className="fixed top-4 left-4 flex space-x-4 z-10">
      <button
        onClick={() => setIs3D(true)}
        className={`px-4 py-2 rounded ${is3D ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
      >
        3D View
      </button>
      <button
        onClick={() => setIs3D(false)}
        className={`px-4 py-2 rounded ${!is3D ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
      >
        2D View
      </button>
    </div>
    <div className="flex-grow w-full">{is3D ? <Component3D /> : <Component2D />}</div>
  </div>
  )
}

export default App
