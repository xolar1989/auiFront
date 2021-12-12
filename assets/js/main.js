import {Comment} from "./Comment";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";

const MAIN_ADDRESS = "http://localhost:8080";
const button = document.getElementById("add-comment-modal-button");
const comments = [];
const containerComments = document.querySelector(".my-container");
const addCommentHtml = (comment) => {
};
axios.get(`${MAIN_ADDRESS}/api/comments`)
    .then(response => response.data.comments)
    .then(data => {
        data
            .map((comment) => new Comment
            (comment.id, comment.value, comment.imageUrl, comment.userId, comment.createdOn));
    })
    .catch((error) => {
        }
    );
const modalAddComment = document.getElementById("my-modal");

button.addEventListener("click", () => {
    modalAddComment.style.display = "block";
    let closeButton = document.querySelector("#my-modal  .close");
    let inputValue = modalAddComment.querySelector(".inputValue");
    let inputImageUrl = modalAddComment.querySelector(".inputImageUrl");
    closeButton.addEventListener("click", () => {
        modalAddComment.style.display = "none";
    }, {
        once: true
    });
});

let sendButton = document.querySelector("#my-modal  .send-button");

sendButton.addEventListener("click", () => {
    let inputValue = modalAddComment.querySelector(".inputValue");
    let inputImageUrl = modalAddComment.querySelector(".inputImageUrl");
    axios.post(`${MAIN_ADDRESS}/api/comments`, {
        "value": inputValue.value,
        "imageUrl": inputImageUrl.value,
        "idOfUser": 1
    })
        .then(t => {console.log(t) ; return t})

        .then((response) => response.data
    ).then((data) => new Comment(data.id, data.value, data.imageUrl, data.userId, data.createdOn));
    modalAddComment.style.display = "none";
});
console.log(button);