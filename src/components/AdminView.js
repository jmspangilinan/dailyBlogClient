import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

import EditBlog from './EditBlog';
import ArchiveBlog from './ArchiveBlog';

export default function AdminView({ blogsData, fetchData }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const blogsArray = blogsData.map(blog => (
      <tr key={blog._id}>
        <td className="text-center">{blog._id}</td>
        <td className="text-center">{blog.title}</td>
        <td className="text-center">{blog.content}</td>
        <td className="text-center">{blog.author}</td>
        <td className="text-center">
          <span className={blog.isActive ? 'text-success' : 'text-danger'}>
            {blog.isActive ? 'Published' : 'Unpublished'}
          </span>
        </td>
        <td className="text-center d-flex">
          <EditBlog blog={blog} fetchData={fetchData} />
        </td>
        <td className="text-center">
          <ArchiveBlog blogId={blog._id} isActive={blog.isActive} fetchData={fetchData} />
        </td>
      </tr>
    ));

    setBlogs(blogsArray);
  }, [blogsData]);

  return (
    <div>
      <h2 className="text-center my-4">Admin Dashboard</h2>
      <Table striped bordered hover responsive>
        <thead className="text-center">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Status</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs}
        </tbody>
      </Table>
    </div>
  );
}
