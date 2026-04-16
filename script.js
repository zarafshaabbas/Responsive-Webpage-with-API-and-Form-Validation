function changeBackground() {
    const colors = ['#e6f2ff', '#ffdddd', '#ddffdd', '#fff0b3', '#d1e0e0'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
}

function fetchGitHubProfile() {
    fetch('https://api.github.com/users/zarafshaabbas')
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('api-content');
            container.innerHTML = `
                <div class="post">
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Bio:</strong> ${data.bio}</p>
                    <p><strong>Repositories:</strong> ${data.public_repos}</p>
                    <p><strong>Followers:</strong> ${data.followers}</p>
                    <p><a href="${data.html_url}" target="_blank">View Profile</a></p>
                </div>
            `;
        })
        .catch(() => {
            document.getElementById('api-content').innerHTML =
                `<p class="error">Failed to load GitHub data</p>`;
        });
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');

    
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMessage.textContent = "";

    if (name === "") {
        nameError.textContent = "Name is required";
        valid = false;
    }
    if (email === "") {
        emailError.textContent = "Email is required";
        valid = false;
    } else if (!email.includes("@")) {
        emailError.textContent = "Enter a valid email";
        valid = false;
    }


    if (message === "") {
        messageError.textContent = "Message is required";
        valid = false;
    }


    if (valid) {
        successMessage.textContent = "Form submitted successfully!";
    }
});

// Load API on page load
window.onload = function () {
    fetchGitHubProfile();
};
