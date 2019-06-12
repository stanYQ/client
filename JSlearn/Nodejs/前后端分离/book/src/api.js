import axios from "axios";

export const getAllBook = () => {
    return axios.get('http://localhost:3000/books');
}

export const addBook = (book) => {
    return axios.post('http://localhost:3000/books/book', book);
}

export const getBookById = (id) => {
    return axios.get('http://localhost:3000/books/book/' + id);
}

export const editBook = (book) => {
    return axios.put('http://localhost:3000/books/book', book);
}

export const remove = (id) => {
    return axios.delete('http://localhost:3000/books/book/' + id);
}