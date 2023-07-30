import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="searchable"

export default class extends Controller {
    static values = { url: String }
    static targets = ["query"]

    initialize() {
        this.queryString = this.queryTarget.value
    }

    search(e) {
        if (e.key === 'Escape') {
            this.queryString = ""
        }

        if (e.key === 'Backspace') {
            this.queryString = this.queryString.slice(0, -1)
        }

        if (this.queryString.length >= 3) {
            this.element.children.search_result.classList.remove('hidden')
            Turbo.visit(this.urlValue + `?q=${this.queryString}`, { frame: 'search_result'})
        }

        if (!e.key.match(/^\w$/)) {
            return
        }

        this.queryString += e.key;
    }

    clear() {
        this.queryString = ""
        this.queryTarget.value = ""
        Turbo.visit(this.urlValue, { frame: 'search_result' })
        this.element.children.search_result.classList.add('hidden')
    }
}
