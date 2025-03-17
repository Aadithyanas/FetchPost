import React, { useEffect, useState } from 'react';
import axios from "axios";
import './fetchdata.css';

function FetchData() {
    const [postdata, setPostdata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortType, setSortType] = useState("default");
    const [searchQuery, setSearchQuery] = useState("");

    const fetchPost = async () => {
        try {
            let res = await axios.get("https://jsonplaceholder.typicode.com/posts");
            setPostdata(res.data);
            setFilteredData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);

  
    const handleSort = (type) => {
        let sortedData = [...filteredData];
        if (type === "userId") {
            sortedData.sort((a, b) => a.id - b.id);
        } else if (type === "title") {
            sortedData.sort((a, b) => a.title.localeCompare(b.title));
        }
        else if(type === "titledec"){
            sortedData.sort((a,b)=>b.title.localeCompare(a.title))
        }else if(type === "decUser"){
            sortedData.sort((a, b)=>b.id - a.id)
        }
        setFilteredData(sortedData);
        setSortType(type);
    };

    const handleFilter = (query) => {
        setSearchQuery(query);
        const filtered = postdata.filter(post =>
            post.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <>
            <div className="controls">
                <input 
                    type="text" 
                    placeholder="Search by title..." 
                    value={searchQuery} 
                    onChange={(e) => handleFilter(e.target.value)} 
                />
                <select className='select' value={sortType} onChange={(e) => handleSort(e.target.value)}>
                    <option value="default">Sort By</option>
                    <option value="userId">User-top-bottom</option>
                    <option value="decUser">User-bottom-top</option>
                    <option value="title">Title (A-Z)</option>
                    <option value="titledec">Title (Z-A)</option>
                </select>
            </div>
            <div className='container'>
            {filteredData.map((post) => (
                <div className='box' key={post.id}>
                    <h3 style={{ textAlign: "center", textDecoration: "underline" }}>
                        PostNo : {post.id} | UserId: {post.userId}
                    </h3>
                    <ul>
                        <li className='title'><b>Title :</b> {post.title}</li>
                        <li className='bodys'><b>Description : </b>{post.body}</li>
                    </ul>
                </div>
            ))}
        </div>
        </>
    );
}

export default FetchData;
