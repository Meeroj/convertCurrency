class Currency {
    #code
    #rate
    constructor(code, rate) {
        this.#code = code
        this.#rate = rate
    }
    get code() {
        return this.#code
    }

    get rate() {
        return this.#rate
    }

    display(container) {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${this.#code}</td>
            <td>${this.#rate}</td>
        `
        container.appendChild(tr)
    }
}

class App {
    #list
    #currencies

    constructor() {
        this.#init()
    }

    async #init() {
        this.#list = document.getElementById('table-body')
        console.log(this.#list)
        const response = await fetch('https://api.frankfurter.app/latest?from=USD')
        const result = await response.json()
        this.#tranceformResult(result)
        this.#renderCurrenceis()
    }

    #tranceformResult(result) {
        const { base, amount, rates } = result

        const baseCurrency = new Currency(base, amount)
        console.log(baseCurrency)
        const otherCurrenceis = Object.entries(rates).map(([code, rate]) => new Currency(code, rate))
        this.#currencies = [baseCurrency, ...otherCurrenceis]

    }
    #renderCurrenceis() {
        this.#currencies.forEach(currency => currency.display(this.#list))
    }
}

new App()