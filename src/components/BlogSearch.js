import React, { useState } from 'react';
import BlogCard from './BlogCard'; // Updated import

const BlogSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs/search`, { // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ blogName: searchQuery }) // Updated search parameter
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for blogs:', error); // Updated error message
    }
  };

  return (
    <div>
      <h2>Blog Search</h2> {/* Updated title */}
      <div className="form-group">
        <label htmlFor="blogName">Blog Name:</label> {/* Updated label */}
        <input
          type="text"
          id="blogName" // Updated ID
          className="form-control"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
      <h3>Search Results:</h3>
      <ul>
        {searchResults.map(blog => ( // Updated map callback
          <BlogCard blogProp={blog} key={blog._id} /> // Updated component and prop
        ))}
      </ul>
    </div>
  );
};

export default BlogSearch;
