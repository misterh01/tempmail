const Footer = () => {
  return (
    <footer className="bottom-0 bg-stone-950 p-4 w-full mt-2">
      <h3 className="text-center text-lg text-white">
        Copyright &#169; {new Date().getFullYear()} <a href="https://misterh.dev/" target="_blank" className="hover:text-violet-600 hover:underline">misterh</a>
      </h3>
    </footer>
  )
}

export default Footer