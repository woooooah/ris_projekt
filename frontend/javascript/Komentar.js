// Replace with the actual recipe ID
const receptId = 1; // Example: Replace with dynamic value if needed
//const commentsUrl = `/api/komentarji/recept/${receptId}`;
const commentsUrl = 'http://localhost:8080/api/komentarji/recept/' + receptId;
const postCommentUrl = 'http://localhost:8080/api/komentarji/recept/'+ receptId; // Update to match your backend's URL




// Fetch comments from the backend
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

// Display comments in the comments section
function displayComments(comments) {
    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = ""; // Clear any existing comments

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

// Handle submitting a new comment
document.getElementById("comment-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const commentContent = document.getElementById("comment-content").value.trim();
    if (!commentContent) {
        alert("Please enter a comment.");
        return;
    }

    const newComment = {
        vsebina: commentContent,
        uporabnik: { id: 1 },  // Assuming the logged-in user has an ID of 1, replace this with actual user data
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
        console.log("Comment added:", addedComment);  // Log the response to check if it's correct
        alert("Comment added successfully!");
        fetchComments();  // Update the comment list after successful submission
        document.getElementById("comment-form").reset();  // Clear the form
    } catch (error) {
        console.error("Error submitting comment:", error);
    }
    
});


// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchComments();
});
