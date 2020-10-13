import axios from "@/axios";

class Comments {
  getComents(slug: String) {
    return axios.get(`/comments/${slug}`);
  };
  addComment(slug: String, comment: Object) {
    return axios.post(`/comments/${slug}`, comment);
  }

}

export default new Comments();