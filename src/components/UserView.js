import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard'; // Update to BlogCard
import BlogSearch from './BlogSearch'; // Update to BlogSearch

export default function UserView({ blogsData }) { // Update prop to blogsData
    const [blogList, setBlogList] = useState([]); // Update state to blogList

    useEffect(() => {
        setBlogList(blogsData.map(blog => ( // Update to map blog data
            <BlogCard key={blog._id} blogProp={blog} /> // Update to BlogCard and blogProp
        )));
    }, [blogsData]);

    return (
        <div>
            <h1>Blog Posts</h1> {/* Add a title for clarity */}

            <BlogSearch /> {/* Update to BlogSearch */}
            <div className="blog-cards">{blogList}</div> {/* Update class name to blog-cards */}
        </div>
    );
}
