import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        posttitle: '',
        postcat: '',
        thumbnail: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.put(`https://6433dde41c5ed06c9588c186.mockapi.io/curdposts/${id}`, formData);
            navigate('/read');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://6433dde41c5ed06c9588c186.mockapi.io/curdposts/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            <form className="form d-flex flex-column m-5" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="posttitle" id="title" value={formData.posttitle} onChange={handleChange} />
                <label htmlFor="category">Category</label>
                <input type="text" name="postcat" id="category" value={formData.postcat} onChange={handleChange} />
                <label htmlFor="thumbnail">Thumbnail URL</label>
                <input type="url" name="thumbnail" id="thumbnail" value={formData.thumbnail} onChange={handleChange} />

                <div className='d-flex justify-content-around'>
                    <input
                        className="btn btn-success my-4"
                        type="submit"
                        value={isLoading ? 'Updating...' : 'Update'}
                        disabled={isLoading}
                    />
                    <button className='btn btn-primary my-4' onClick={() => navigate('/read')}>
                        Show Data
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Update;
