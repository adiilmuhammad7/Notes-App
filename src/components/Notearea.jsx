import { useState, useEffect } from "react"

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



    //editing option
    const [editingIndex, setEditingIndex] = useState(null)


    //search
    const [search, setSearch] = useState("")



    //error
    const [error, setError] = useState("")


    //archived
    const [showArchived, setShowArchived] = useState(false)

    async function addNote() {


        if (editingIndex !== null) {

            const updatedNotes = notes.map(function (note) {

                if (note.id === editingIndex) {
                    return {
                        ...note,
                        title: title,
                        content: content,
                        color: color,

                    }

                }

                return note
            })


            // for database json
            await fetch(`http://localhost:3000/notes/${editingIndex}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    color: color,
                    archived: notes.find(function (note) {
                        return note.id === editingIndex
                    }).archived
                })
            })

            setNotes(updatedNotes)
            setTitle("")
            setContent("")
            setEditingIndex(null)

            return
        }








        // already exist
        const alreadyExists = notes.some(function (note) {
            return note.title === title && note.content === content
        })

        if (alreadyExists) {
            setError("content already exist")
            return
        }
        if (title.trim() === "" && content.trim() === "") {
            return
        }
        if (title.length > 25) {
            setError("Title must be 25 characters or less");
            return;
        }
        // Content required
        if (title.trim() === "") {
            setError("Title is required")
            return;
        }
        if (content.trim() === "") {
            setError("Content is required");
            return;
        }

        const newNote = {
            //for sort newest/oldest
            id: Date.now(),
            title: title,
            content: content,
            createdAt: Date.now(),
            color: color,
            archived: false
        }
        const response = await fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        })
        await getNotes()



        setTitle("")
        setContent("")
        setError("")
    }


    //delete
    async function deleteNote(id) {
        await fetch(`http://localhost:3000/notes/${id}`, {
            method: "DELETE"
        })

        await getNotes()
    }


    //search
    const filteredNotes = notes.filter(function (note) {

        return (
            note.archived === showArchived &&
            (
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.content.toLowerCase().includes(search.toLowerCase())
            )
        )
    })


    //sorting conditions 
    const sortedNotes = [...filteredNotes].sort(function (a, b) {



        if (sortBy === "newest") {
            return b.createdAt - a.createdAt;
        }

        if (sortBy === "oldest") {
            return a.createdAt - b.createdAt;
        }

        if (sortBy === "title-asc") {
            return a.title.localeCompare(b.title);
        }

        if (sortBy === "title-desc") {
            return b.title.localeCompare(a.title);
        }

        return 0;
    });

    //edit function
    function editNote(id) {
        const note = notes.find(function (note) {
            return note.id === id
        })

        setTitle(note.title)
        setContent(note.content)
        setColor(note.color)
        setEditingIndex(id)
    }






    //archive note
    async function archiveNote(id) {

        await fetch(`http://localhost:3000/notes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                archived: true
            })
        })

        await getNotes()
    }

    async function unarchiveNote(id) {

        await fetch(`http://localhost:3000/notes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                archived: false
            })
        })

        await getNotes()
    }





    // from database
    useEffect(function () {
        getNotes()
    }, [])




    // from the database(json server)
    async function getNotes() {
        const response = await fetch("http://localhost:3000/notes");

        const data = await response.json();

        setNotes(data);
    }






    return (


        <div>
            <div className="border border-gray-700 w-150  mx-auto my-8 h-auto bg-blue-300">
                <div className="mt-10- px-10 py-5">
                    <input
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        className="w-full h-15 px-5 border border-gray-400"
                        type="text"
                        placeholder="Title" />
                    <p>
                        {title.length} / 25
                    </p>
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
                        className="mx-40 bg-amber-700 rounded w-45 h-8 mt-5">
                        Add Note
                    </button>






                </div>
                <div>
                    {error && (
                        <p className="text-red-600 mt-2">
                            {error}
                        </p>
                    )}
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
            <div>
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded-lg"
                />
                <button
                    className="border ml-5 rounded-2xl h-10 w-30 bg-blue-400"
                    onClick={() => setShowArchived(!showArchived)}>
                    {showArchived ? "Show Notes" : "Show Archived"}
                </button>


            </div>



            {/* area of input displaying under the form */}

            <div className="grid grid-cols-3 gap-1 mt-5">

                {sortedNotes.map((note) => {
                    return (

                        <div
                            key={note.id}
                            className={`${note.color} rounded-2xl p-4 mb-4 h-90 ml-10 mr-10`}>

                            <h2 className="font-bold text-xl mt-5 ml-6">{note.title}</h2>
                            <p className="text-lg mt-2 ml-6">{note.content}</p>



                            <button
                                className="bg-yellow-400 w-20 mt-50 ml-6 rounded-2xl"
                                onClick={function () {
                                    editNote(note.id)
                                }}
                            >
                                Edit
                            </button>


                            {/* delete button */}
                            <button
                                className="bg-red-600 w-20 mt-50 ml-6 rounded-2xl"
                                onClick={function () {
                                    deleteNote(note.id)
                                }}>
                                Delete
                            </button>
                            <button
                                className="bg-green-600 text-white w-20 mt-50 ml-6 rounded-2xl"
                                onClick={function () {
                                    if (showArchived) {
                                        unarchiveNote(note.id)
                                    } else {
                                        archiveNote(note.id)
                                    }
                                }}
                            >
                                {showArchived ? "Unarchive" : "Archive"}
                            </button>
                        </div>
                    )
                })}

            </div>
        </div>

    )
}
export default Notearea