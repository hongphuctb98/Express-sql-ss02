import React, { useEffect, useState } from "react";
import axios from "axios";
import NavCom from "./NavCom";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [editUserId, setEditUserId] = useState("");
  const [blog, setBlog] = useState({
    user_id: "",
    title: "",
    body: "",
  });
  const [editAct, setEditAct] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:4444/api/v1/blogs")
      .then((res) => setBlogs(res.data.blogs))
      .catch((err) => console.log(err));
  }, []);
  const handleDel = (id) => {
    axios
      .delete(`http://localhost:4444/api/v1/blogs/${id}`)
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios
      .post(`http://localhost:4444/api/v1/blogs`, blog)
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
    setBlog({ user_id: "", title: "", body: "" });
  };

  const handleEdit = (id) => {
    setEditUserId(id);
    setEditAct(true);
    axios
      .get(`http://localhost:4444/api/v1/blogs/${id}`)
      .then((res) => {
        setBlog(res.data.blogs[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpload = () => {
    axios
      .put(`http://localhost:4444/api/v1/blogs/${editUserId}`, blog)
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });

    setEditUserId("");
    setEditAct(false);
    setBlog({ user_id: "", title: "", body: "" });
  };
  const { user_id, title, body } = blog;
  return (
    <>
      <NavCom />{" "}
      <>
        <button
          type="button"
          className="btn btn-primary mt-3"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => setEditAct(false)}
        >
          Create blog
        </button>
        <table className="table mt-4  table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">userId</th>
              <th scope="col">title</th>
              <th scope="col">body</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.blog_id}>
                <th scope="row">{blog.blog_id}</th>
                <td>{blog.user_id}</td>
                <td>{blog.title}</td>
                <td>{blog.body}</td>

                <td style={{ width: "130px" }}>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDel(blog.blog_id)}
                  >
                    Del
                  </button>
                  <button
                    className="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => handleEdit(blog.blog_id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {editAct ? "Edit user" : "Create user"}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      User id
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="user_id"
                      value={user_id}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="title"
                      value={title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Body
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="body"
                      value={body}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {editAct ? (
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-bs-dismiss="modal"
                    onClick={() => handleUpload()}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={() => handleSubmit()}
                  >
                    Create
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">«</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default BlogPage;
