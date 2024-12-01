import StarsCanvas from "./StarBackground"

function NavBar() {
  return (
    <div className="bg-black text-center py-40 flex flex-col justify-center relative">
      <StarsCanvas/>
      <h1 className="text-yellow-300 text-4xl flex flex-auto justify-center">Tech Support - Rate your Experience</h1>
      <p className="text-yellow-300 mt-4 flex flex-auto justify-center">Giving an honest feedback would help us get better</p>
      <div className="border-t border-black mx-auto" />
    </div>
  )
}

export default NavBar
