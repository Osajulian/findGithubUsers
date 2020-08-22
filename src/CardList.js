import { render } from './index'
import Card from './Card'

const CardList = cards => {
    const html = `
    <ul>
        ${cards.map(card => Card(card)).join('')}
    </ul>
    `

    render(html, document.querySelector('#root'))
}

export default CardList