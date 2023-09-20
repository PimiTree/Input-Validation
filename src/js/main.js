import '../sass/style.scss';

import {Valio} from  './modules/valio.js';

window.addEventListener('DOMContentLoaded', () =>{

    let val = new Valio ({
        errors: {
            tooShort: {
                name: {
                    length: 7,
                }
            }
        },
        containering: true,
        containerSource: {
            user: true,
            source: ".other-container",
        },
        messaging: true,
        positionValid: 'bottomCentered',
        positionInvalid: 'bottomCentered',
        inputApearence: true,
        buttonApearence: true,
        urlHTTPSAutocomplete: true,
        
    });  

    // const a = document.querySelectorAll('[data-voron] *');
    // console.log(a)

});
