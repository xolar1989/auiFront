import axios from "axios"

export class Comment {
    static comments = new Map();
    static containerHtml = document.querySelector(".my-container");
    editButton;
    deleteButton;
    static sendButton = document.querySelector("#my-modal-edit .button-edit");
    static currentCommentEdit = null;
    constructor(id, value1, imageUrl, userId, createdOn){
        this.id = id;
        this.value = value1;
        this.imageUrl = imageUrl;
        this.userId = userId;
        this.createdOn = createdOn;
        Comment.addComment(this);
    }
    nodeString() {
        return `<div class="card m-2 my-card" id="comment-${this.id}" style="max-width: 300px" value="${this.id}">
                    <a><i class="fas fa-pen-square edit-card edit link-comment"></i></a>
                    <a><i class="fas fa-window-close delete-card del link-comment"></i></a>
                    <img src="${this.imageUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Comment of ${this.id}</h5>
                        <p class="card-text">${this.value}</p>
                    </div>
            </div>`;
    }
    static addComment(comment) {

        this.comments.set(comment.id, comment);
        this.containerHtml.insertAdjacentHTML("beforeend", comment.nodeString());
        comment.deleteButton = document.querySelector(`#comment-${comment.id} >a> i.del`);
        comment.editButton = document.querySelector(`#comment-${comment.id} >a> .edit`);
        comment.deleteButton.addEventListener("click", (event)=>{
            event.preventDefault();
            axios.delete(`http://localhost:8080/api/comments/${comment.id}`).then((data)=>{
                console.log(data);
            }).then(()=>{
                let dupa = document.getElementById(`comment-${comment.id}`);
                Comment.containerHtml.removeChild(dupa);
            }).catch((reason)=>console.log(reason)
            );
        });
        comment.editButton.addEventListener("click", (event)=>{
            event.preventDefault();
            let modalEditComment = document.getElementById("my-modal-edit");
            let inputValue = modalEditComment.querySelector(".edit-value");
            let inputImageUrl = modalEditComment.querySelector(".edit-imagePath");
            console.log(inputValue);
            inputValue.value = comment.value;
            inputImageUrl.value = comment.imageUrl;
            modalEditComment.style.display = "block";
            let closeButton = document.querySelector("#my-modal-edit .modal-header button.close");
            closeButton.addEventListener("click", ()=>{
                modalEditComment.style.display = "none";
            }, {
                once: true
            });
            if(Comment.currentCommentEdit !== null){
                Comment.sendButton.removeEventListener("click",Comment.currentCommentEdit.editComment)
            }
            Comment.currentCommentEdit = comment;
            Comment.sendButton.addEventListener("click", comment.editComment.bind(comment), {
                once: true
            });
        }, {
            once: true
        });

    }
    editComment() {
        let modalEditComment = document.getElementById("my-modal-edit");
        let inputValue = modalEditComment.querySelector(".edit-value");
        let inputImageUrl = modalEditComment.querySelector(".edit-imagePath");
        console.log(this);
        console.log()
        axios.put(`http://localhost:8080/api/comments/${this.id}`, {
            "value": inputValue.value,
            "imageUrl": inputImageUrl.value
        }).then((response)=>console.log(response)
        ).then(()=>{
            let dupa = document.getElementById(`comment-${this.id}`);
            let imagePath = dupa.querySelector(".card-img-top");
            let value = dupa.querySelector(".card-text");
            imagePath.src = inputImageUrl.value;
            value.innerHTML = inputValue.value;
            value.value = inputValue.value;
            this.value = inputValue.value;
            this.imageUrl = inputImageUrl.value;
        }).catch((err)=>console.log(err)
        );
    }
    static deleteComment(comment1) {
        return comment1;
    }
}