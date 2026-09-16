import { useState } from "react"


function Notearea(){


const [title,setTitle] = useState("")
const [content,setContent] = useState("")




    function addNote() {
    console.log(title)
    console.log(content)
}


    return(
        <div className="border border-gray-700 w-150  mx-auto my-8 h-100 bg-blue-100">
            <div className="mt-10- px-10 py-5">
              <input 
                value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                className="w-full h-15 px-5 border border-gray-400"
                type="text" 
                placeholder="Title"/>
              <input
              value={content}
                    onChange={(event) =>
                        setContent(event.target.value)
                    }
                
                className="w-full h-48 px-2 border border-gray-400 mt-8 "
                type="text"
                placeholder="Enter the content"
              />
              <button 
                    onClick={addNote}
                    className="mx-40 bg-amber-700 rounded w-45 h-8 mt-8">
                    Add Note
                </button>
            </div>
            <div className="mx-auto">
                
            </div>

        </div>
    )
}
export default Notearea