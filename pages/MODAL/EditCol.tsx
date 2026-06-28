export default function EditCol() {
    const Colors = [
        '#208D8E', '#40C057', '#82C91E', '#FAB005', '#FD7E14', '#7950F2',
        '#4C6EF5', '#228BE6', '#15AABF', '#12B886', '#FA5252', '#E64980', '#BE4BDB'
    ]
    return (
        <>
            <div>
                <div className=" flex flex-wrap gap-2">
                    {Colors.map((color) => (
                        <div key={color}>
                            <div style={{ background: color }} className=" w-5 h-5 rounded-lg cursor-pointer"></div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}