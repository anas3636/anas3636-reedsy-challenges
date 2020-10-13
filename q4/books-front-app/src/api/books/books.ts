import axios from "@/axios";

class Books {
  getAll(limit: Number, page: Number, key: String) {
    return axios.get(`/books?limit=${limit}&page=${page}&key=${key}`);
  };
  getBook(slug: String) {
    return axios.get(`/books/${slug}`);
  };

}

export default new Books();