module.exports = {
    posts: [],

    getAll() {
        return this.posts
    },

    newPost(title, description) {
        let id = this.generateID()
        this.posts.push({id, title, description})
    },

    deletePost(id) {
        for (let index in this.posts) {
            if (this.posts[index].id == id) {
                this.posts.splice(index, 1)
                
                return true
            }
        }
    },

    generateID() {
        return Math.random().toString(36).substring(2, 9)
    }
}