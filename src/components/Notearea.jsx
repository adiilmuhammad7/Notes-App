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


    //delete
    function deleteNote(index) {
        setNotes(notes.filter(function (note, i) {
            return i !== index
        }))
    }





    return (
        <div>
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
            </div>
            {/* area of input displaying under the form */}

            <div className="grid grid-cols-3 gap-1">

                {notes.map((note,index) => {
                    return (

                        <div className="bg-amber-300 rounded-2xl p-4 mb-4 h-90 ml-10 mr-10">

                            <h2 className="font-bold text-xl mt-5 ml-6">{note.title}</h2>
                            <p className="text-lg mt-2 ml-6">{note.content}</p>

                            <button 
                            className="bg-red-600 w-20 mt-50 ml-6 rounded-2xl"
                            onClick={function () {
                                deleteNote(index)
                            }}>
                                Delete
                            </button>
                        </div>
                    )
                })}

            </div>
        </div>

    )
}
export default Notearea