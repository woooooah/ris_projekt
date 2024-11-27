const urlParams = new URLSearchParams(window.location.search);
const receptId = urlParams.get('id');
//const commentsUrl = `/api/komentarji/recept/${receptId}`;
const commentsUrl = 'http://localhost:8080/api/komentarji/recept/' + receptId;
const postCommentUrl = 'http://localhost:8080/api/komentarji/nov/recept/'+ receptId;

// Ensure `receptId` is a valid number
if (!receptId || isNaN(receptId)) {
    console.error("Invalid receptId in URL.");
}


// Fetch komentarjev iz backenda
async function fetchComments() {
    try {
        const response = await fetch(commentsUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch comments.");
        }
        const comments = await response.json();
        displayComments(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
    }
}

// Prikaz komentarjev
function displayComments(comments) {
    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = ""; // Izprazni kakše komentarje od prej

    comments.forEach(comment => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `
            <strong>${comment.uporabnik.ime}:</strong> ${comment.vsebina}
            <br><small>${comment.datum}</small>
        `;
        commentsList.appendChild(listItem);
    });
}

// Dodajanje komentarjev
document.getElementById("comment-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const commentContent = document.getElementById("comment-content").value.trim();
    if (!commentContent) {
        alert("Please enter a comment.");
        return;
    }

    const newComment = {
        vsebina: commentContent,
        uporabnik: { id_uporabnik: 1 },  // Za enkrat še fiksen uporabnik
        recept: { id_recept: receptId },
        datum: new Date().toISOString()
    };

    try {
        const response = await fetch(postCommentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment)
        });
    
        if (!response.ok) {
            throw new Error("Failed to submit the comment.");
        }
    
        const addedComment = await response.json();
        console.log("Comment added:", addedComment);  // Log da vidim če je ok
        alert("Comment added successfully!");
        fetchComments();  // Updejta seznam komentarjev po POST novega
        document.getElementById("comment-form").reset();  // Izprazni obrazec
    } catch (error) {
        console.error("Error submitting comment:", error);
    }
    
});


// Inicializira ob nalaganju strani
document.addEventListener("DOMContentLoaded", () => {
    fetchComments();
});
