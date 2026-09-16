import { useState } from "react"

function Notearea() {

    // area of input taking 
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")



    //to save the notes
    const [notes, setNotes] = useState([])


    function addNote() {


        
// already exist
        const alreadyExists = notes.some(function (note) {
            return note.title === title && note.content === content
        })

        if (alreadyExists) {
            return
        }
        if (title.trim() === "" && content.trim() === "") {
            return
        }
        const newNote = {
            title: title,
            content: content
        }

        setNotes([...notes, newNote])

        setTitle("")
        setContent("")
    }





    return (
        <div className="border border-gray-700 w-150  mx-auto my-8 h-100 bg-blue-100">
            <div className="mt-10- px-10 py-5">
                <input
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    className="w-full h-15 px-5 border border-gray-400"
                    type="text"
                    placeholder="Title" />
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



            {/* area of input displaying under the form */}

            <div className="">
                {notes.map((note) => {
                    return (
                        <div>
                            <h2>{note.title}</h2>
                            <p>{note.content}</p>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
export default Notearea