// Replace with the actual recipe ID
const receptId = 1; // Example: Replace with dynamic value if needed
//const commentsUrl = `/api/komentarji/recept/${receptId}`;
const commentsUrl = 'http://localhost:8080/api/komentarji/recept/' + receptId;


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

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchComments();
});
