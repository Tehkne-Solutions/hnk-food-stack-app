export default function SistemaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#050505] min-h-screen">
      {children}
    </div>
  )
}