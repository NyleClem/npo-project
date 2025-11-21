export default function PageContainer({ children }) {
  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div className="
        w-full 
        max-w-3xl 
        bg-[#f7f7f8] 
        border border-[#e0e0e0] 
        rounded-xl 
        shadow-sm 
        p-8
      ">
        {children}
      </div>
    </div>
  );
}