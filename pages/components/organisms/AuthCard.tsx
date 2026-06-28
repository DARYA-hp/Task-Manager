interface AuthCardProps {
  children: React.ReactNode;
}

function AuthCard({ children }: AuthCardProps) {
  return (
    <>
      <div className="w-full max-w-[600px] mt-20 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
        {children}
      </div>
    </>
  )
}
export default AuthCard