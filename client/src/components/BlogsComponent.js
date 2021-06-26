import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./Blogs.css";
import BlogTile from "./BlogTile";

const BlogsComponent = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        async function getBlogs() {
            const response = await axios.get('http://localhost:5000/api/blogs/');
            setBlogs(response.data);
        }

        getBlogs();
    }, []);

    return (
        <>
            <div className="main-div">
                <h2>NITK-BLOGS</h2>
                <hr/>
                {blogs.length === 0 ? <p>No blogs</p> : blogs.map(blog => {
                    return <BlogTile data={blog} />
                })}
            </div>

        </>

    );
}

export default BlogsComponent;