document.addEventListener('DOMContentLoaded', () => {
    updatePosts()
})

function updatePosts() {
    fetch("http://localhost:3000/api/all").then(res => {
        return res.json()
    }).then(json => {

        let postElements = ''

        let posts = JSON.parse(json)
        posts.forEach((post) => {
            let postElement = `<div id='${post.id}' class="card">
                                    <div class="card--title">
                                        <h2>${post.title}</h2>
                                        <button onclick="deletePost('${post.id}')"><i class="fas fa-trash"></i></button>
                                    </div>
                                    <div class="card--description">
                                        <div>${post.description}</div>
                                    </div>
                                </div>`

                                

            postElements += postElement
        });

        document.querySelector('#posts').innerHTML = postElements
    })
}

function newPost() {
    let title = document.querySelector('#title').value
    let description = document.querySelector('#desc').value

    if (title != '' && description != '') {
        let post = {title, description}

        const options = {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(post)
        }
    
        fetch('http://localhost:3000/api/new', options).then(res => {
            res.text().then(msg => {
                console.log(msg)
            })
            updatePosts();
            document.querySelector('#title').value = ''
            document.querySelector('#desc').value = ''
        })
    } else {
        alert('Preencha todos campos!')
    }

}

function deletePost(id) {
    if (id) {
        let idObject = { id }

        const options = {
            method: 'DELETE',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(idObject)
        }

        fetch('http://localhost:3000/api/delete', options).then(res => {
            res.text().then(msg => {
                console.log(msg)
            })
            updatePosts();
        })

    } else {
        alert('Ocorreu um erro inesperado')
    }
}