function includeHtml(name) {
<<<<<<< HEAD
fetch(`/./${name}.html`)
.then(response => response.text())
.then(html => document.querySelector(name).innerHTML = html);
}
=======
    fetch(`${name}.html`) 
        .then(response => response.text())
        .then(data => {
            document.getElementById(name).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${name}:`, error));
}
>>>>>>> 29eaec6a8a5c3109a2b25e81131da867cd35a21e
