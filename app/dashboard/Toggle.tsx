'use client'

type ToggleProps = {
    deletePost: () => void
    setToggle: (toggle: boolean) => void 
}

export default function Toggle({deletePost, setToggle}: ToggleProps) {
  return (
    <div onClick={(e) => {
        setToggle(false)
    }} className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
        <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-xl flex flex-col gap-6 ">
            <h2 className="text-xl ">
                r u sure to delet this ?
            </h2>
            <h3 className=" text-sm text-red-600">
                pressing the delet button will permanently delet it
            </h3>
            <button onClick={deletePost} className="bg-red-600 text-sm text-white py-2 px-4 rounded-full">
                Delete Post
            </button>
        </div>

    </div>
  )
}
