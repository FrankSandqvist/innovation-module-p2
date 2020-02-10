export default class LocalDatabase {
  constructor() {
    this.posts = JSON.parse(localStorage.getItem("posts")) || [];
  }

  makeID() {
    return Math.random()
      .toString(16)
      .substring(2);
  }

  createPost(postData) {
    let id = this.makeID();
    this.posts = [
      { ...postData, id, createdAt: new Date().getTime() },
      ...this.posts
    ];
    localStorage.setItem("posts", JSON.stringify(this.posts));
    return id;
  }

  updatePost(id, postData) {
    let index = this.posts.findIndex(p => p.id === id);
    this.posts[index] = postData;
    localStorage.setItem("posts", JSON.stringify(this.posts));
  }

  deletePost(id) {
    this.posts = this.posts.filter(p => p.id !== id);
    localStorage.setItem("posts", JSON.stringify(this.posts));
  }

  getAllPosts() {
    return this.posts;
  }
}
