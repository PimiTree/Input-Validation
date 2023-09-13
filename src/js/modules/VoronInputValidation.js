import okImgUrl from '../../img/ok.svg';


export default class VoronInputValidation {
    
    constructor(options = {}) {
        // Default parameters
        const defaultProps = {
            form: '[data-voron]',
            debounceDelay: 100,
            source: 'type', // paramater not works
            position: 'right',
            containering: true,
            messaging: true,
            limitedFileds: ['text', 'tel', 'name','password'],
            regex: {  
                text: '^[a-zA-Zа-яёїА-ЯЇЁ\\s\\d\\-_:.,\\s]$',
                name: '^[a-zA-Zа-яёїА-ЯЇЁ\\s\\d\\-_\\s]$',
                email: '^([a-zA-Z_\\-0-9]{2,}\\.)*[a-zA-Z_\\-0-9]{2,}@[a-zA-Z]{2,}\\.[a-zA-Z]{2,}$',
                tel: '^\\+*\\d$',
                password: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$^.*+?/{}\\[\\]()|@:,;\\-_=<>%#~&!])[a-zA-Z\\d$^.*+?/{}\\[\\]()|@:,;-_=<>%#~&!]$',                          
                url: '^(http:\\/\\/|https:\\/\\/)?([a-zA-Z_\\-0-9]{2,}\\.){1,}[a-zA-Z]{2,}[\\/?[a-zA-Z\\d?=%\\+_\\-&]*\\/?]*$',
            },
            errors: {
                wrongSymbol: 'Allowed a-z, 0-9, spaces, -_:,.',
                notEmail:  'Is not email',
                minConditions:  'one lower and uppercase, one number and one special char ($^.*+?/{}[]()|@:,;-_=<>%#~&!)',
                passNotEquals: 'passwords must be the same',
                wrongLink:  'It is not link',
                tooShort: {
                    text: {
                        mes: {
                            begining: 'Min', 
                            ending: 'symbols'
                        },
                        length: 2,
                   },
                   name: {
                        mes: {
                            begining: 'Min', 
                            ending: 'symbols'
                        },
                        length: 3,
                   },
                   tel: {
                        mes: {
                            begining: 'Min', 
                            ending: 'symbols'
                        },
                        length: 10,
                   },
                   password: {
                        mes: {
                            begining: 'Min', 
                            ending: 'symbols'
                        },
                        length: 5,
                   },
                },
                tooLong:  {
                    text: {
                        mes: {
                            begining: 'Max', 
                            ending: 'symbols'
                        },
                        length: 50,
                    },
                    name: {
                        mes: {
                            begining: 'Max', 
                            ending: 'symbols'
                        },
                        length: 20,
                    },
                    tel: {
                        mes: {
                            begining: 'Max', 
                            ending: 'symbols'
                        },
                        length: 20,
                    },
                    password: {
                        mes: {
                            begining: 'Max', 
                            ending: 'symbols'
                        },
                        length: 10,
                    },
                },
            },            
        };

        const props = this.#mergeProps(defaultProps, options); // merge default and user params

        // class parameters for use in class Body Start
        this.form = document.querySelector(props.form);
        this.formInnerElements = [...this.form.querySelectorAll('*')];
        this.debounceDelay = props.debounceDelay;
        this.containering = props.containering;
        this.messaging = props.messaging;
        this.position = props.position;
        this.errors = props.errors;
        this.regex = props.regex;
        this.limitedFileds = props.limitedFileds;
        this.#regexLimiter();
        this.inputApearence = true;        // this not worck for now
        this.buttonApearence = true;         // this not worck for now
        this.urlHTTPSAutocomplete = false;   // this not worck for now
        // class parameters for use in class Body END

        this.#init();  // start the logic
    
    };
    
    // privat fields START 
    #state = {  // service object, contain states and some elements
        inputs: [], 
        inputsValidityBundle: [],
        isFormValid: false,     
        passwordReapeat: false, 
    }
    #observableArray;  // array for proxe observer

    #styles = {  // service object for style control
        position: {
            top : `
                transform: translateY(-100%);
                top: 0;
            `,
            right: `
                transform: translateX(100%);
                top: 0;
                right: 0;
            `,
            bottom: `
                transform: translateY(100%);
                top: 0;
             `,
            left: `
                transform: translate(-100%);
                top: 0;
            `
        }
    }
    // privat fields END

    //service Foo START
    #mergeProps(props, options) {  // merge default and user params  
        for (const [key,value] of Object.entries(options)) {    
            if (typeof value === 'object' && props[key]) {
                this.#mergeProps(props[key], value);
            } else {
                props[key] = value;
            }
        }
        return props;
    }
    #preventDefault(e) {
        e.preventDefault();
    }
    #disableFormSubmit() {  // blocking form submit
        this.form.addEventListener('submit', this.#preventDefault); 
    }
    #enableFormSubmit() {   // unblocking form submit
        this.form.removeEventListener('submit', this.#preventDefault);  
    }
    #setInitalState() { // fill up two main arrays - inputs siquence and default validity of them
        this.#state.inputs = [...this.form.querySelectorAll('input')];
        this.#state.inputsValidityBundle = [].fill.call({length: this.#state.inputs.length}, false); 
    }
    #regexLimiter(regex) { // by default regex is string - function add to string {min,max} parameters and create regex
        const fields = this.limitedFileds;

        fields.forEach(field => {
            const regexHolder = this.regex[field]; // use as link to the regex container
            const minLength = this.errors.tooShort[field].length;
            const maxLength = this.errors.tooLong[field].length;

            this.regex[field] = `${regexHolder.slice(0, regexHolder.length - 1)}{${minLength},${maxLength}}${regexHolder.slice(-1)}`;
        })
    }
    #setMessageContainer() { // create containers for inputs, reassebmle inner HTML
        if (!this.containering) {
           return;
        }

        this.formInnerElements.forEach(elem=> {
            if (elem.tagName === 'INPUT') {
                const inputWrapper = document.createElement('div');
                inputWrapper.classList.add('is_container');
                inputWrapper.append(elem);
                this.form.append(inputWrapper);

                if (this.messaging) {  // create message container 
                    const message = document.createElement('div');     
                    message.classList.add('is_message');
                    message.style.cssText = this.#styles.position[this.position];
                    inputWrapper.append(message);
                }
            } else {
                this.form.append(elem);
            }              
        })
        
    }
    #setInputAutocomplete(input) { // trun on https autocomplete for input[typr='url']
        /(http:\/\/|https:\/\/)/.test(input.value) ? true : input.value = 'https://' + input.value;
    }
    #isFormNeedReapeatPassword() { // if form has two inputs passwrod will eneble paswords compare
        let passwrodInputCount = 0;
        this.#state.inputs.forEach((input, i)=> {
            const isPassword = input.getAttribute('type') === 'password';
            passwrodInputCount += isPassword ? 1 : 0;
            if (passwrodInputCount === 2 && isPassword) {
                this.#state.inputs[i-1].setAttribute("data-voron", 'password-main');
                this.#state.inputs[i].setAttribute("data-voron", 'password-repeat');
            } 
        })
        return false;
    }
    #isInputValid(input) {  // check input validity 
        const inputType = input.getAttribute('type');
        const regex = new RegExp (this.regex[inputType]);
        const inputValidity = regex.test(input.value);
        const mainPassword = this.form.querySelector('[data-voron="password-main"]');
        const repeatPassword = this.form.querySelector('[data-voron="password-repeat"]');
    
        if (input == mainPassword) {
            const repeatInputIndex = this.#state.inputs.indexOf(repeatPassword); 

            this.#state.passwordReapeat = mainPassword.value === repeatPassword.value ? true : false;
            const repeatPasswordValidity = this.#state.passwordReapeat ? regex.test(input.value) : false;

            this.#setInputState (repeatPassword, repeatInputIndex, repeatPasswordValidity);
        }
        
        if (input == repeatPassword) {
            this.#state.passwordReapeat = mainPassword.value === repeatPassword.value ? true : false;

            return this.#state.passwordReapeat ? true : false;
        }
        return inputValidity;
    }
    #setInputState (input, i, inputValidity) {  // set state, aplly apearense and inject message
        if (inputValidity) {
            this.#setValidApearence(input);
            this.#observableArray.arr[i] = true;
            this.#setMessage(input, inputValidity);
        } else {
            this.#setInvalidApearence(input);
            this.#observableArray.arr[i] = false;
            this.#setMessage(input, inputValidity);
        }
    }
    
    #isFormValid = () => {  // checing form validity
        let arr = [];
        for (let i = 0; i < this.#observableArray.arr.length; i++) {
            arr[i] = this.#observableArray.arr[i];
        }

        this.#state.isFormValid = !arr.includes(false);
        this.#state.isFormValid ? this.#enableFormSubmit() : this.#disableFormSubmit();
        this.#setButtonApearence();
    };
    //service Foo END  

    // messaging START
    #setMessage(input, inputValidity) {  // inject valid or invalid message
        if (!this.containering) {
            return;
        }

        if (!this.messaging) {
            return;
        }

        if (inputValidity) { // if true append okmessage 
            if (!input.nextSibling.querySelector('.is_valid_img')) {
                const okImg = this.#createImgForValidMessage();
                // if okImg img already exist not try append
                input.nextSibling.textContent = "";  // clear if has text message
                input.nextSibling.append(okImg);     
            }    
        } else {
            input.nextSibling.textContent = "";
            // if input value empty not insert any messege
            input.value.length === 0 ? input.nextSibling.textContent = "" : this.#chooseErrorMessage(input); 
        }    
         
    }
    #chooseErrorMessage(input) {
        // set initial variables
        const inputType = input.getAttribute('type');
        const messageContainer = input.nextSibling;
        const value = input.value;
        const tooShort = this.errors.tooShort[inputType];
        const tooLong = this.errors.tooLong[inputType];

        // set additional conition for message picking
        const isPaswordFitMinimalConditions = !/[a-z]{1}/.test(value) || !/[A-Z]{1}/.test(value) || !/[0-9]{1}/.test(value) || !/[$^.*+?\/{}\[\]()|@:,;\-_=<>%#~&!]{1}/.test(value);

        // standart template for messaging
        const erorrMesConditionTemplate = () => {
            if (value.length < tooShort.length) {
                messageContainer.textContent = this.#prepareMinMaxMessage(tooShort);
                return;
            }  
            
            if (value.length >= tooLong.length) {
                messageContainer.textContent =  this.#prepareMinMaxMessage(tooLong);
                return;
            }
            
            if (inputType === 'password') {
                if (isPaswordFitMinimalConditions) {
                    messageContainer.textContent = this.errors.minConditions;
                    return;
                }
                
                if (!this.#state.passwordReapeat) {
                    messageContainer.textContent = this.errors.passNotEquals;
                    return;
                }
            } 

            messageContainer.textContent = this.errors.wrongSymbol;
        }

        // choose message according to input type
        switch (inputType) {
            case 'text': 
            case 'name': 
            case 'tel':
            case 'password': 
                erorrMesConditionTemplate();
                break;
            case 'email': 
                messageContainer.textContent = this.errors.notEmail; 
                break;
            case 'url': 
                messageContainer.textContent = this.errors.wrongLink;
                break;
        }

        
    }
    // assemble min max message
    #prepareMinMaxMessage(location) {
        const mesBegining = location.mes.begining;
        const mesEnding = location.mes.ending;
        const mesLength = location.length;

        return `${mesBegining} ${mesLength} ${mesEnding}`;
    }
    // messaging END

    // VUE functions START
    #setFocusStyle() {  
        this.#state.inputs.forEach(input => {
            input.classList.add('is_focused');
        })
    }
    #setValidApearence(input)  {
        input.classList.remove('is_focused');
        input.classList.remove('is_invalid');   
        input.classList.add('is_valid');
    }
    #setInvalidApearence(input) {
        input.classList.remove('is_focused');
        input.classList.remove('is_valid');
        input.classList.add('is_invalid');
        if (input.value.length === 0) {
            input.classList.remove('is_invalid'); 
            input.classList.add('is_focused');
        }
    }
    #setButtonApearence() {
        const formButton = this.form.querySelector('button');

        if (this.#state.isFormValid) {
            formButton.classList.remove('is_blocked');
            formButton.classList.add('is_unblocked');
        } else {
            formButton.classList.remove('is_unblocked');
            formButton.classList.add('is_blocked');
        }
    }
    #createImgForValidMessage() {
        const img = document.createElement('img');
        img.setAttribute('src', okImgUrl);
        img.classList.add('is_valid_img');

        return img;
    }
    // VUE functions END

       // custom event listener START
    #createObservableArray = (arr) => { 
        const observers = new Set();

        const notifyObservers = () => {
            for (const observer of observers) {
            observer(arr);
            }
        };

        const arrayProxy = new Proxy(arr, {  // proxy object
            set(target, property, value) {
            target[property] = value;
            notifyObservers();
            return true;
            },
        });
        
        const addObserver = (observer) => {
            observers.add(observer);
        };
        
        const removeObserver = (observer) => {
            observers.delete(observer);
        };
        
        return {
            arr: arrayProxy,
            addObserver,
            removeObserver,
        };
    };
     // custom event listener END


    // main Event START
    #observeInputs() { 
        this.#state.inputs.forEach((input, i)=> {
            let timer;

            const isInputRequired = input.getAttribute('required') !== null;

            if (isInputRequired) { 
                input.addEventListener('input', () => {                    
                        const inputValidity =  this.#isInputValid(input); // check input validity before timeout

                        if (input.getAttribute('type') === 'url') {
                            this.#setInputAutocomplete(input); // if this input is url type need https:// autofill
                        }
                        
                        clearTimeout(timer);        // debouncing
                        timer = setTimeout(() => { // debouncing
                            this.#setInputState (input, i, inputValidity); 
                        }, this.debounceDelay);
                });
            } else this.#state.inputsValidityBundle[i] = true;   
        })
    }
    // main Event END
 
    #init() {  
        this.#disableFormSubmit();
        this.#setButtonApearence();
        this.#setInitalState();
        this.#observableArray = this.#createObservableArray(this.#state.inputsValidityBundle);
        this.#observableArray.addObserver(this.#isFormValid);
        this.#setMessageContainer();
        this.#isFormNeedReapeatPassword();
        this.#setFocusStyle();
        this.#observeInputs();
    } 
}
