export default class VoronInputValidation {
    constructor(options = {}) {
        // Default parameters
        const defaultProps = {
            form: '[data-voron]',
            debounceDelay: 500,
            regex: {  
                text: /^[a-zA-Zа-яёїА-ЯЇЁ\s\d\-_:.,\s]+$/,
                name: /^[a-zA-Zа-яёїА-ЯЇЁ\s\d\-_\s]{3,20}$/,
                email: /^[a-zA-Z_\-\0-9.]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/,
                tel: /^\+*\d{7,}$/,
                password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$^.*+?\/{}\[\]()|@:,;\-_=<>%#~&!])[a-zA-Z\d$^.*+?\/{}\[\]()|@:,;-_=<>%#~&!]{5,}$/,
                url: /^(http:\/\/|https:\/\/)?([a-zA-Z_\-0-9]{2,}\.){1,}[a-zA-Z]{2,}[\/?[a-zA-Z\d?=%\+_\-&]*\/?]*$/,
            },
            errors: {
                wrongSymbol: 'Allowed a-z, 0-9, spaces, -_:,.',
                notEmail:  'Is not email',
                minConditions:  'one lower and uppercase, one number and one special char ($^.*+?/{}[]()|@:,;-_=<>%#~&!)',
                passNotEquals: 'passwords must be the same',
                wrongLink:  'It is not link',
                tooLong:  {
                    mes: 'Max 20 symbols',
                    length: 20,
                },
                tooShort: {
                    mes: 'Min 2 symbols',
                    length: 2,
                },
            },
            dataAttrMode: 'disable',  // ?can be enable check README?
            
        };

        const props = { ...defaultProps, ...options };
    
        this.form = document.querySelector(props.form);
        this.debounceDelay = props.debounceDelay;
        this.regex = props.regex;
        this.errors = props.errors;

        this.#init();
    };
    
    #state = {
        inputs: [],  // already filed up
        inputsValidBundle: [],
    }
    
    //service Foo START
    #preventDefault(e) {
        e.preventDefault();
    }
    #disableFormSubmit() {
        this.form.addEventListener('submit', this.#preventDefault); 
    }
    #enableFormSubmit() {
        this.form.removeEventListener('submit', this.#preventDefault);  
    }
    #setInitalState() {
        this.#state.inputs = [...this.form.querySelectorAll('input')];
    }
    #init() {
        this.#disableFormSubmit();
        this.#setInitalState();
    }
    //service Foo END    
}