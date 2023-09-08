export default class VoronInputValidation {
    constructor( formInner =  [...document.querySelectorAll('form *')], form = '[data-voron]', debounceDelay = 500,) {
        this.form = document.querySelector(form);
        this.inputs = [...this.form.querySelectorAll('input')];
        this._isFormValid = false;
        this._inputsValidBundle = [];
        this._debounceDelay = debounceDelay;
        this.#disableFormSubmit();
        // validation sector START
        this.inputTypes = {
            text: /^[a-zA-Zа-яёЇА-ЯёЇ\s\d]+$/,
            url: /^(http:\/\/|https:\/\/)?([a-zA-Z_\-0-9]{2,}\.){1,}[a-zA-Z]{2,}(\/[a-zA-Z\d\?=%\+_\-&]+)*$/,
            name: /^[a-zA-Zа-яёїА-ЯёЇ\s\d]{3,20}$/,
            email: /^[a-zA-Z_\-\0-9.]+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/,
            tel: /^\+*\d{7,25}$/,
            password: /[a-zA-Z\d$^.*+?\/{}\[\]()|@:,'";-_=<>%#~`&!]{5,}/,
        }
        this.inputType = [];
        this.regex = [];
        this.#setMessageContainer(formInner);
        this.#observeInputChanges();
        // validation sector END
    }
    #preventDefault(e) {
        e.preventDefault();
    }

    #disableFormSubmit() {
        this.form.addEventListener('submit', this.#preventDefault); 
    }
    #enableFormSubmit() {
        this.form.removeEventListener('submit', this.#preventDefault);  
    }
  
    #isFormValid() {
        let index = 0;
        this._inputsValidBundle.forEach(status => {
            if (status === false) {
                index += 1;
                if (index !== 0) {
                    return;
                }
            }
        })
        if (index === 0) {
            this.#enableFormSubmit();
        } else {
            this.#disableFormSubmit();
        }
    
    }

    // vue functions 
    #setValidApearence(elem)  {
        elem.classList.remove('is_focused');
        elem.classList.remove('is_invalid');   
        elem.classList.add('is_valid');
    }
    #setInvalidApearence(elem, value) {
        elem.classList.remove('is_focused');
        elem.classList.remove('is_valid');
        elem.classList.add('is_invalid');
        if (value.length === 0) {
            elem.classList.remove('is_invalid'); 
            elem.classList.add('is_focused');
        }
    }
    #setMessageContainer (formInner) {
        formInner.forEach((elem, i)=> {
            if (elem.tagName === 'INPUT') {
                const inputWrapper = document.createElement('div');
                inputWrapper.classList.add('voron_field');
                inputWrapper.append(elem);
                this.form.append(inputWrapper);
            } else {
                this.form.append(elem);
            }            
        })
    }

    #observeInputChanges() {
        this.inputs.forEach((input, i)=> {
            this.inputType.push(input.getAttribute('type'));
            this.regex.push(this.inputTypes[`${this.inputType[i]}`]); // create class regex pool
            this._inputsValidBundle[i] = false;
            input.classList.add('is_focused');// add firsts vue components to page
            let timer;
            input.addEventListener('input', (e) => {
                clearTimeout(timer);  // debouncing for form
                const value = e.target.value;
                const validationStatus = this.regex[i].test(value);
                timer = setTimeout(() => {
                    if (validationStatus) {
                        console.log(`String ${value} pass the test`);
                        this.#setValidApearence(input);
                        this._inputsValidBundle[i] = true;
                        this.#isFormValid();
                    } else {
                        console.log(`String ${value} not pass the test`);
                        this.#setInvalidApearence(input, value)
                        this._inputsValidBundle[i] = false;
                        this.#isFormValid();
                        console.log(this._inputsValidBundle);
                        console.log(this._isFormValid);
                    }
                }, this._debounceDelay);                  
            })
        }) 
    }  
    
    
}

