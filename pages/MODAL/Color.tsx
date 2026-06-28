import { useState, useEffect } from "react"

export default function Color() {
    const [selectedColor, setSelectedColor] = useState(() => {
        return localStorage.getItem('userSelectedColor') || '#7D828C';
    })
    useEffect(() => {
        localStorage.setItem('userSelectedColor', selectedColor);
    }, [selectedColor])

    const colors = [
        '#4C6EF5', '#228BE6', '#15AABF', '#12B886', '#208D8E', 
        '#40C057', '#82C91E', '#FAB005', '#FD7E14', '#FA5252', 
        '#E64980', '#BE4BDB', '#7950F2'
    ]

    return (
        <div>
            <div className="flex gap-4 px-6 pt-4 items-center cursor-pointer">
                {colors.map((color) => (
                    <div 
                        key={color}
                        onClick={() => setSelectedColor(color)} 
                        className={`rounded-full w-4 h-4 transition-transform ${selectedColor === color ? 'scale-125 ring-2 ring-offset-1 ring-gray-400' : 'hover:scale-110'}`}
                        style={{ backgroundColor: color }}
                    ></div>
                ))}
            </div>
        </div>
    )
}