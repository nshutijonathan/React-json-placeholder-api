import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "./services/httpService";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  state = {
    posts: [],
  };
  async componentDidMount() {
    const { data: posts } = await http.get(config.apikey);
    this.setState({
      posts,
    });
  }
  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apikey, obj);
    console.log("post", post);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };
  handleUpdate = async (post) => {
    post.title = "Updated";
    await http.put(config.apikey + "/" + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };
  handleDelete = async (post) => {
    const originalPosts = this.state.posts;
    const posts = [...this.state.posts];
    const filtered = posts.filter((p) => p.id != post.id);
    this.setState({ posts: filtered });
    try {
      await http.delete("s", +config.apikey + "/ksksksksksk", post.id);
      throw new Error("");
    } catch (ex) {
      console.log("HANDLE DELETE CATCH BLOCK");
      if (ex.response && ex.response.status === 404) {
        alert("This post has been deleted");
      }

      this.setState({ posts: originalPosts });
    }

    // const foundPost = this.state.posts.find((post) => post.id === p);
    // const postId = foundPost["id"];
    // const index = this.state.posts.indexOf(foundPost);
    // const data = await axios.delete(config.apikey + "/" + p.id);
    // console.log("post", data);

    // let myPosts = [...this.state.posts];
    // console.log("myPosts", myPosts);
    // myPosts.splice(index, 1);
    // this.setState({ posts: myPosts });
  };
  render() {
    console.log("posts", this.state.posts);
    return (
      <div className="container">
        <h2>Posts</h2>
        <ToastContainer />
        <button className="btn btn-primary" onClick={() => this.handleAdd()}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">title</th>
              <th scope="col">userId</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr>
                <th scope="row">{post.id}</th>
                <td>{post.title}</td>
                <td>{post.userId}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
