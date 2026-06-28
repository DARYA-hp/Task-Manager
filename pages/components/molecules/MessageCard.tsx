interface MessageCardProps {
  title: string;
  message: string;
}

export function MessageCard({ title, message }: MessageCardProps) {
  return (
    <>
      <div className="w-full mt-20  w-[600px] mt-20 text-center bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-medium text-gray-800 mb-2">{title}</h2>
        <p>{message}</p>
      </div>
    </>
  )
}