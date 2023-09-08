export default class VoronInputValidation {
    
    constructor(regex, form = '[data-voron]') {
        this.form = document.querySelector(form);
        this.inputs = [...this.form.querySelectorAll('input')];
        this.inputTypes = {
            text: /^[a-zA-Zа-яёЇА-ЯёЇ\s\d]+$/,
            date: /a/,
            color: /a/,
            url: /a/,
            name: /^[a-zA-Zа-яёЇА-ЯёЇ\s\d]{3, 20}$/,
            email: /^[a-zA-Z_\-\.]+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/,
            tel: /^\+*\d{7,25}$/,
            password: /a/,
            search: /a/,
        }
        this._isFormValid = false;
        this.#formSubmitDisable();
        this.inputType = this.inputs[0].getAttribute('type');
        this.regex = regex || this.inputTypes[`${this.inputType}`];
        this.inputs[0].addEventListener('input', (e) => {
            const value = e.target.value;
            const validationStatus = this.regex.test(value);
            if (validationStatus) {
                console.log(`String ${value} pass the test`);
            } else {
                console.log(`String ${value} not pass the test`);
            }
        })
    }
    #preventDefault (e) {
        e.preventDefault();
    }

    #formSubmitDisable() {
        this.form.addEventListener('submit', this.#preventDefault); 
    }

    #formSubmitEnable () {
        if (this._isFormValid) {
            this.form.removeEventListener('submit', this.#preventDefault);
        }
    }
    log() {
      
    }


    
}


console.log(/^[a-zA-Zа-яёЇА-ЯёЇ\s\d]+$/g.test('dd'));