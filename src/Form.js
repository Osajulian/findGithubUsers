import axios from 'axios'

const API_URL = 'https://api.github.com/users'

class Form {
    constructor(addCard, clearCards) {
this.API_URL = ""
this.searchTerm = ""
this.addCard = addCard
this.clearCards = clearCards

        this.searchInput = document.querySelector('input[name="search"]')
        this.searchInput.addEventListener('keyup', ()=>this.handleKeyUp(event))

        this.submitButton = document.querySelector('button[type="submit"]')
        this.submitButton.disabled = !this.searchTerm

        this.form = document.querySelector('form')
        this.form.addEventListener('submit', ()=>this.handleSubmit(event))

        this.clearButton = document.querySelector('button[type="button"]')
        this.clearButton.addEventListener('click', () => this.clearCards())
    }

    handleKeyUp(event) {
        this.searchTerm = event.target.value
        this.API_URL = `${API_URL}/${this.searchTerm.trim()}`

        this.submitButton.disabled = !this.searchTerm
    }

    handleSubmit(event) {
        event.preventDefault()
        axios
        .get(this.API_URL)
        .then(({data}) => this.addCard(data))
        .catch(err => this.formatError('Promise rejected', err))
        
        this.form.reset()
        this.searchTerm = ""
        this.submitButton.disabled = !this.searchTerm
    }

    formatError(err) {
        console.error(err)
        const errorText = document.createElement('p')
        errorText.innerText = 'No user found'
        errorText.style.color = 'red'
        errorText.style.fontSize = '1.5em'
        errorText.style.fontSize = 'bold'
        this.form.appendChild(errorText)
        
        setTimeout(()=>this.form.removeChild(errorText), 5000)

    }
}

export default Form