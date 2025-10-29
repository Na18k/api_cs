const BASE_URL = "http://localhost:5000";

// Registrar Usuário
async function registerUser() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
        Username: username,
        Email: email,
        PasswordHash: password
    };

    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert("Usuário registrado com sucesso!");
        console.log(result);
    } catch (error) {
        alert("Erro ao registrar usuário: " + error.message);
    }
}

// Listar Usuários
async function listUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        const users = await response.json();
        const list = document.getElementById("userList");
        list.innerHTML = "";
        users.forEach(u => {
            const li = document.createElement("li");
            li.textContent = `${u.id} - ${u.username}`;
            list.appendChild(li);
        });
    } catch (error) {
        alert("Erro ao listar usuários: " + error.message);
    }
}

// Criar Post
async function createPost() {
    const userId = document.getElementById("userIdPost").value;
    const content = document.getElementById("contentPost").value;

    const data = {
        UserId: parseInt(userId),
        Content: content
    };

    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert("Post criado com sucesso!");
        console.log(result);
    } catch (error) {
        alert("Erro ao criar post: " + error.message);
    }
}

// Listar Posts
async function listPosts() {
    try {
        const response = await fetch(`${BASE_URL}/posts`);
        const posts = await response.json();
        const container = document.getElementById("postList");
        container.innerHTML = "";
        posts.forEach(p => {
            const div = document.createElement("div");
            div.className = "box";
            div.innerHTML = `
                <p><strong>${p.user.username}</strong>: ${p.content}</p>
                <small>Post ID: ${p.id} | ${p.comments.length} comentários</small>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        alert("Erro ao listar posts: " + error.message);
    }
}

// Criar Comentário
async function createComment() {
    const postId = document.getElementById("postIdComment").value;
    const userId = document.getElementById("userIdComment").value;
    const text = document.getElementById("contentComment").value;

    const data = {
        PostId: parseInt(postId),
        UserId: parseInt(userId),
        Text: text
    };

    try {
        const response = await fetch(`${BASE_URL}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert("Comentário criado com sucesso!");
        console.log(result);
    } catch (error) {
        alert("Erro ao criar comentário: " + error.message);
    }
}

// Listar Comentários
async function listComments() {
    try {
        const response = await fetch(`${BASE_URL}/comments`);
        const comments = await response.json();
        const container = document.getElementById("commentList");
        container.innerHTML = "";
        comments.forEach(c => {
            const div = document.createElement("div");
            div.className = "box";
            div.innerHTML = `
                <p><strong>${c.user.username}</strong> comentou no Post ${c.postId}:</p>
                <p>${c.text}</p>
                <small>Comentário ID: ${c.id}</small>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        alert("Erro ao listar comentários: " + error.message);
    }
}
