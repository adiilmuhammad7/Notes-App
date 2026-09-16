import { useState } from "react"

function Notearea() {

    // area of input taking 
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")



    //to save the notes
    const [notes, setNotes] = useState([])

    //color session
    const [color, setColor] = useState("")

    //sorting
    const [sortBy, setSortBy] = useState("newest")



    //


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
            //for sort newest/oldest
            id: Date.now(),
            title: title,
            content: content,
            color: color
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


    //sorting conditions 
    const sortedNotes = [...notes].sort(function (a, b) {

    

    if (sortBy === "newest") {
        return b.id - a.id;
    }

    if (sortBy === "oldest") {
        return a.id - b.id;
    }

    if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
    }

    if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
    }

    return 0;
});





    return (


        <div>
            <div className="border border-gray-700 w-150  mx-auto my-8 h-100 bg-blue-300">
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

                        className="w-full h-48 px-2 border border-gray-400 mt-8"
                        type="text"
                        placeholder="Enter the content"
                    />



                    {/* Color picker */}
                    <div className="flex gap-2 mt-4">

                        {/* Yellow */}
                        <button
                            type="button"
                            onClick={() => setColor("bg-amber-100")}
                            className={`w-8 h-8 rounded-full bg-amber-100 ${color === "bg-amber-100"
                                ? "ring-2 ring-black"
                                : ""
                                }`}
                        ></button>

                        {/* Blue */}
                        <button
                            type="button"
                            onClick={() => setColor("bg-sky-100")}
                            className={`w-8 h-8 rounded-full bg-sky-100 ${color === "bg-sky-100"
                                ? "ring-2 ring-black"
                                : ""
                                }`}
                        ></button>

                        {/* Green */}
                        <button
                            type="button"
                            onClick={() => setColor("bg-emerald-100")}
                            className={`w-8 h-8 rounded-full bg-emerald-100 ${color === "bg-emerald-100"
                                ? "ring-2 ring-black"
                                : ""
                                }`}
                        ></button>

                        {/* Pink */}
                        <button
                            type="button"
                            onClick={() => setColor("bg-rose-100")}
                            className={`w-8 h-8 rounded-full bg-rose-100 ${color === "bg-rose-100"
                                ? "ring-2 ring-black"
                                : ""
                                }`}
                        ></button>
                        <button
                            type="button"
                            onClick={() => setColor("bg-orange-300")}
                            className={`w-8 h-8 rounded-full bg-orange-300 ${color === "bg-orange-100"
                                    ? "ring-2 ring-black"
                                    : ""
                                }`}
                        ></button>
                    </div>







                    <button
                        onClick={addNote}
                        className="mx-40 bg-amber-700 rounded w-45 h-8 ">
                        Add Note
                    </button>
                </div>
                <div className="mx-auto">

                </div>
            </div>
            
            <div>
                 <select
                    value={sortBy}
                    onChange={(event) =>
                        setSortBy(event.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="newest">
                        Newest First
                    </option>

                    <option value="oldest">
                        Oldest First
                    </option>

                    <option value="title-asc">
                        Title A-Z
                    </option>

                    <option value="title-desc">
                        Title Z-A
                    </option>
                </select>

            </div>
            
            
            
            {/* area of input displaying under the form */}

            <div className="grid grid-cols-3 gap-1">

                {sortedNotes.map((note, index) => {
                    return (

                        <div className={`${note.color} rounded-2xl p-4 mb-4 h-90 ml-10 mr-10`}>

                            <h2 className="font-bold text-xl mt-5 ml-6">{note.title}</h2>
                            <p className="text-lg mt-2 ml-6">{note.content}</p>


                            {/* delete button */}
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