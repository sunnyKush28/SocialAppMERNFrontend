import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalState } from '../../store/GlobalStore';

const CreatePost = () => {
    const state = useContext(GlobalState);
    const { fetchallPostdata } = state;
    const [createPost, setCreatePost] = useState({
        title: "",
        content: "",
        postImg: "",
        category: ""
    })
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post('/api/v1/post/createpost', { ...createPost }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            alert(res.data.message)
            const modal = document.getElementById('exampleModal');
            const modalInstance = window.bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            fetchallPostdata()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    const inputHandle = (e) => {

        const { name, value, files } = e.target
        setCreatePost((pevPostData) => ({
            ...pevPostData,
            [name]: files ? files[0] : value
        }
        ))


    }
    const categories = [
        "Personal",
        "News",
        "Entertainment",
        "Travel",
        "Food",
        "Health & Fitness",
        "Technology",
        "Education",
        "Fashion & Beauty",
        "Sports",
        "Hobbies & Interests",
        "Lifestyle",
        "Relationships",
        "Events",
        "Business & Career",
        "Art & Creativity",
        "Science",
        "Politics",
        "Finance",
        "Community"
    ];
    return (
        <div className='row p-2 border-bottom mx-1 shadow-lg justify-content-center align-items-center'>
            <div className='col-auto'>
                <button type="button " className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    + Add Post
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bgColor">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Create Post</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                    <div className='row d-flex flex-column justify-content-center align-items-center'>
                                        <div>
                                            <input
                                                type='text'
                                                className="form-control rounded-0 my-2"
                                                placeholder='Post Title'
                                                onChange={inputHandle}
                                                name="title"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                type='text'
                                                className="form-control rounded-0 my-2"
                                                placeholder='Post Content...'
                                                onChange={inputHandle}
                                                name="content"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className='form-label' htmlFor='avatar'>Post Image</label>
                                            <input
                                                type='file'
                                                className="form-control rounded-0"
                                                onChange={inputHandle}
                                                name="postImg"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <select htmlFor="category"
                                                className='form-select rounded-0 my-2 bgColor'
                                                name="category"
                                                onChange={inputHandle}
                                                defaultValue=""
                                                required
                                            >
                                                <option value="" disabled >Select Category</option>
                                                {categories.map((value) => (
                                                    <option className="text-white" key={value} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className='row mt-3'>
                                            <button type='submit' className='btn btn-success rounded-5' disabled={loading}>
                                                {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Submit"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='modal-footer justify-content-start'>
                                <button type="button " className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
