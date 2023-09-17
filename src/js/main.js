import '../sass/style.scss';

import VoronInputValidation from  './modules/VoronInputValidation.js';

window.addEventListener('DOMContentLoaded', () =>{

    let passwordValidation = new VoronInputValidation({
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
        positionValid: 'leftInside',
        positionInvalid: 'leftInside',
        inputApearence: true,
        buttonApearence: true,
        urlHTTPSAutocomplete: true,
        
    });  

    // const a = document.querySelectorAll('[data-voron] *');
    // console.log(a)

});
