export default class VoronInputValidation {
    constructor(options) {
        this.form = document.querySelector(options?.form) || document.querySelector('[data-voron]');
        this.debounceDelay = options?.debounceDelay || 100;
        this.inputTypes = {  // default regex templates
            text: /^[a-zA-Zа-яёїА-ЯЇЁ\s\d\-_:.,\s]+$/,
            name: /^[a-zA-Zа-яёїА-ЯЇЁ\s\d\-_\s]{3,20}$/,
            email: /^[a-zA-Z_\-\0-9.]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/,
            tel: /^\+*\d{7,25}$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$^.*+?\/{}\[\]()|@:,;\-_=<>%#~&!])[a-zA-Z\d$^.*+?\/{}\[\]()|@:,;-_=<>%#~&!]{5,}$/,
            url: /^(http:\/\/|https:\/\/)?([a-zA-Z_\-0-9]{2,}\.){1,}[a-zA-Z]{2,}[\/?[a-zA-Z\d?=%\+_\-&]*\/?]*$/,
        }
        this.errors = {
                        text: {
                            wrongSymbol: options?.errors.text.wrongSymbol || 'Allowed a-z, 0-9, spaces, -_:,.',
                        },
                        name: {
                            wrongSymbol: options?.errors.name.wrongSymbol || 'Allowed a-z, 0-9, spaces, -_',
                            tooLong: options?.errors.name.tooLong || 'Max 20 symbols',
                            tooShort: options?.errors.tname.tooShort || 'Must be longer then 2 symbol',
                        },
                        email: {
                            tooShort: options?.errors.email.tooShort ||  'Must be longer then 7 symbol',
                            notEmail: options?.errors.email.notEmail ||  'Is not email',
                        },
                        tel: {
                            wrongSymbol: options?.errorstel.wrongSymbol || 'Allowed + and 0-9',
                            tooLong: options?.errorstel.tooLong || 'Max 25 symbols',
                            tooShort: options?.errorstel.tooLong || 'Must be longer then 7 symbol',
                        },
                        password: {
                            tooShort: options?.errors.password.tooShort || 'Must be longer then 5 symbols',
                            minConditions: options?.errors.password.minConditions || 'one lower and uppercase, one number and one special char ($^.*+?/{}[]()|@:,;-_=<>%#~&!)',
                        },
                        url: {
                            wrongLink: options?.errors.url.wrongLink || 'It is not link'
                        },
        };
        
        this.regex = [];  /// toprivat scope

        const inputs = [...this.form.querySelectorAll('input')];
        console.log()
        let inputsValidBundle = [];
        let inputType = [];

        this.#disableFormSubmit();
        this.#setInitalState(inputs, inputType, inputsValidBundle);
        this.#setMessageContainer();
        this.#observeInputChanges(inputs, inputsValidBundle, inputType);

      
        // validation sector END
    }

    // service methods
    #preventDefault(e) {
        e.preventDefault();
    }
    #disableFormSubmit() {
        this.form.addEventListener('submit', this.#preventDefault); 
    }
    #enableFormSubmit() {
        this.form.removeEventListener('submit', this.#preventDefault);  
    }
    // prepare default state 
    #setInitalState(inputs, inputType, inputsValidBundle) {
        inputs.forEach((input, i)=> {
            inputType.push(input.getAttribute('type'));
            this.regex.push(this.inputTypes[`${inputType[i]}`]); // create class regex pool
            inputsValidBundle[i] = false; // set validity to dafault false according to amount of inputs in form
        })
    }

    #isFormValid(inputsValidBundle) {  
        const isValid = !inputsValidBundle.includes(false);
        isValid ? this.#enableFormSubmit() : this.#disableFormSubmit();
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

    // Error messaging
    #setMessageContainer () { // create containers for inouts and reassebmle inner HTML
        [...this.form.querySelectorAll('*')].forEach((elem, i)=> {
            if (elem.tagName === 'INPUT') {
                const inputWrapper = document.createElement('div');
                inputWrapper.classList.add('voron_field');
                inputWrapper.append(elem);
                
                const message = document.createElement('div');     
                message.classList.add('is_message');

                this.form.append(inputWrapper);
                inputWrapper.append(message);

            } else {
                this.form.append(elem);
            }              
        })
    }
    #setMessage (input, validationStatus) {
         if (validationStatus) { // if true append okmessage
            if (!input.nextSibling.querySelector('.is_valid_img')) {
                const okImg = document.createElement('img');
                okImg.setAttribute('src', '../img/ok.svg');
                okImg.classList.add('is_valid_img');
                // if okImg img already exist not try append
                input.nextSibling.textContent = "";  
                input.nextSibling.append(okImg);     
            }    
        } else {
            try { // if we got in_valid try to remove okImg
                input.nextSibling.querySelector('.is_valid_img').remove();
            } catch (e) {};
            this.#prepareErrorMessage(input);
        }     
    }

    #prepareErrorMessage(input) {
        const inputType = input.getAttribute('type');
        const messageContainer = input.nextSibling;
        const value = input.value;

        // messageContainer.textConten = "";
        
        switch (inputType) {
            case 'text': 
            messageContainer.textContent = this.errors[inputType].wrongSymbol;
                break;
            case 'name': 
                if (value.length <= 3) {
                    messageContainer.textContent = this.errors[inputType].tooShort;
                } else if (value.length >= 20) {
                    messageContainer.textContent = this.errors[inputType].tooLong;
                } else {
                    messageContainer.textContent = this.errors[inputType].wrongSymbol;
                }
                break;
            case 'email': 
                if (value.length <= 7) {
                    messageContainer.textContent = this.errors[inputType].tooShort;
                } else if (!/@{1}/.test(value) || !/\.{1}/.test(value) || !this.inputTypes[inputType].test(value)) {
                    messageContainer.textContent = this.errors[inputType].notEmail;
                } 
                break;
            case 'tel':
                if (value.length <= 7) {
                    messageContainer.textContent = this.errors[inputType].tooShort;
                } else if (value.length >= 25) {
                    messageContainer.textContent = this.errors[inputType].tooLong;
                } else {
                    messageContainer.textContent = this.errors[inputType].wrongSymbol;
                }
                break;
            case 'password': 
                if (value.length <= 5) {
                    messageContainer.textContent = this.errors[inputType].tooShort;
                } else if (!/[a-z]{1}/.test(value) || !/[A-Z]{1}/.test(value) || !/[0-9]{1}/.test(value) || !/[$^.*+?/{}[]()|@:,;\-_=<>%#~&!]{1}/.test(value) ) {
                    messageContainer.textContent = this.errors[inputType].minConditions;
                } 
                break;
            case 'url': 
                messageContainer.textContent = this.errors[inputType].wrongLink;
                break;
        }
        // console.log(inputType);
    }

    // main script
    #observeInputChanges(inputs, inputsValidBundle, inputType) {
        inputs.forEach((input, i)=> {
                  
            input.classList.add('is_focused');// add firsts vue components to page
            let timer;
            input.addEventListener('input', (e) => {
                clearTimeout(timer);  // debouncing for form
                let value = e.target.value;
                const validationStatus = this.regex[i].test(value);
                timer = setTimeout(() => {
                    if (validationStatus) {
                        if (inputType[i] === 'url') {
                           /(http:\/\/|https:\/\/)/.test(value) ? e.target.value = value : e.target.value = 'https://' + value;
                        }
                        this.#setValidApearence(input);
                        inputsValidBundle[i] = true;
                        this.#isFormValid(inputsValidBundle);
                        this.#setMessage(input, validationStatus);
                    } else {
                        this.#setInvalidApearence(input, value)
                        inputsValidBundle[i] = false;
                        this.#isFormValid(inputsValidBundle);
                        this.#setMessage(input, validationStatus);
                    }
                }, this.debounceDelay);                  
            })
        }) 
    }  
    
    
}

