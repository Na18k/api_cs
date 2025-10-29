const baseUrl = "http://localhost:5000";

function highlightJSON(json) {
    if (typeof json !== 'string') {
        json = JSON.stringify(json, null, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\b\d+(\.\d+)?\b)/g, match => {
        let cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) cls = 'key';
            else cls = 'string';
        } else if (/true|false/.test(match)) cls = 'boolean';
        else if (/null/.test(match)) cls = 'null';
        return `<span class="${cls}">${match}</span>`;
    });
}

async function fetchAPI(endpoint, options = {}) {
    try {
        const res = await fetch(baseUrl + endpoint, options);
        const text = await res.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch {
            data = { raw_response: text };
        }

        return highlightJSON(data);
    } catch (err) {
        return highlightJSON({ error: "Falha ao conectar com a API", detalhes: err.message });
    }
}

/* ================= USERS ================= */
async function listUsers() {
    document.getElementById("users").innerHTML = await fetchAPI("/users");
}

async function registerUser() {
    const user = {
        Username: document.getElementById("regUsername").value,
        Email: document.getElementById("regEmail").value,
        PasswordHash: document.getElementById("regPassword").value
    };
    document.getElementById("register").innerHTML = await fetchAPI("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
}

/* ================= POSTS ================= */
async function listPosts() {
    document.getElementById("posts_list").innerHTML = await fetchAPI("/posts");
}

async function createPost() {
    const post = {
        UserId: parseInt(document.getElementById("postUserId").value),
        Content: document.getElementById("postContent").value
    };
    document.getElementById("posts_create").innerHTML = await fetchAPI("/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    });
}

/* ================= COMMENTS ================= */
async function listComments() {
    document.getElementById("comments_list").innerHTML = await fetchAPI("/comments");
}

async function createComment() {
    const comment = {
        PostId: parseInt(document.getElementById("commentPostId").value),
        UserId: parseInt(document.getElementById("commentUserId").value),
        Content: document.getElementById("commentContent").value
    };
    document.getElementById("comments_create").innerHTML = await fetchAPI("/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    });
}
