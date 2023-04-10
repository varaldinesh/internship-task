import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';

const Read = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Define a debounced version of the fetch function
    const fetchData = debounce(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                'https://6433dde41c5ed06c9588c186.mockapi.io/curdposts'
            );
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage('Error fetching data');
            setData([]);
        } finally {
            setIsLoading(false);
        }
    }, 500);

    const handleDelete = (id) => {
        setIsLoading(true);
        axios.delete(`https://6433dde41c5ed06c9588c186.mockapi.io/curdposts/${id}`)
            .then(() => {
                // Remove the deleted item from the state
                setData(data.filter((item) => item.id !== id));
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Error deleting data');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Fetch the data once when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="text-center m-5">
                <h2>Post List</h2>
            </div>
            {isLoading && <p>Loading...</p>}
            {errorMessage && <p>{errorMessage}</p>}

            <table class="table mt-2">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Thumbnail</th>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col"></th>
                        <th scope="col"><Link to="/" className="btn btn-success">Add New</Link></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((eachData) => {
                        return (
                            <tr key={eachData.id}>
                                <td>{eachData.id}</td>
                                <td>
                                    <img src={eachData.thumbnail} alt='' width={'100px'} />
                                </td>
                                <td>{eachData.posttitle}</td>
                                <td>{eachData.postcat}</td>
                                <td>
                                    <Link to={`/update/${eachData.id}`} className="btn btn-success">Update</Link>
                                </td>
                                <td>
                                    <button type='button' className='btn btn-primary' onClick={() => handleDelete(eachData.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Read;
