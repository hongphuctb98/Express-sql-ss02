import React, { useEffect, useState } from "react";
import axios from "axios";
import NavCom from "./NavCom";
import debounce from "lodash.debounce";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState("");
  const [page, setPage] = useState(1);
  const [nameSearch, setNameSearch] = useState("");
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });
  const [editAct, setEditAct] = useState(false);
  const loadData = () => {
    axios
      .get(
        `http://localhost:4444/api/v1/users/?keysearch=${nameSearch}&page=${page}`
      )
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // const delaySearch = debounce(loadData, 500);
    // delaySearch();
    // return delaySearch.cancel();
    loadData();
  }, [nameSearch]);

  const handleDel = (id) => {
    axios
      .delete(`http://localhost:4444/api/v1/users/${id}`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios
      .post(`http://localhost:4444/api/v1/users`, user)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
    setUser({ name: "", username: "", email: "", phone: "", website: "" });
  };

  const handleEdit = (id) => {
    setEditUserId(id);
    setEditAct(true);
    axios
      .get(`http://localhost:4444/api/v1/users/${id}`)
      .then((res) => {
        setUser(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpload = () => {
    axios
      .put(`http://localhost:4444/api/v1/users/${editUserId}`, user)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });

    setEditUserId("");
    setEditAct(false);
  };

  // Pagiantion
  const handlePrePage = () => {
    if (page - 1 > 0) {
      axios
        .get(`http://localhost:4444/api/v1/users/?page=${page - 1}`)
        .then((res) => {
          setUsers(res.data.users);
        })
        .catch((err) => {
          console.log(err);
        });
      setPage(page - 1);
    }
  };
  const handleNextPage = async () => {
    if (page <= users.length / 5) {
      await axios
        .get(`http://localhost:4444/api/v1/users/?page=${page + 1}`)
        .then((res) => {
          setUsers(res.data.users);
        })
        .catch((err) => {
          console.log(err);
        });
      setPage(page + 1);
    }
  };

  const { name, username, email, phone, website } = user;
  return (
    <>
      <NavCom />
      {/* Button trigger modal */}
      <div className="d-flex justify-content-between mt-4">
        <button
          type="button"
          className="btn btn-primary mt-3"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => setEditAct(false)}
        >
          Create user
        </button>
        <input
          placeholder="Tìm kiêm "
          type="search"
          className="form-control"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          style={{ width: "300px" }}
        />
      </div>
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() => handlePrePage()}
            >
              <span aria-hidden="true">«</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link">{page} </a>
          </li>

          <li className="page-item">
            <a
              className="page-link"
              aria-label="Next"
              onClick={() => handleNextPage()}
            >
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </nav>
      <table className="table mt-4  table-striped">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">username</th>
            <th scope="col">email</th>
            <th scope="col">phone</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.user_id}>
              <th scope="row">{user.user_id}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>

              <td>{user.phone}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDel(user.user_id)}
                >
                  Del
                </button>
                <button
                  className="btn btn-info "
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => handleEdit(user.user_id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <>
        {/* Modal */}
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
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="name"
                      value={name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      User name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="username"
                      value={username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Website
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="website"
                      value={website}
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
    </>
  );
}

export default UserPage;
