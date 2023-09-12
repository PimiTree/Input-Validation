import '../sass/style.scss';

import VoronInputValidation from  './modules/VoronInputValidation.js';


window.addEventListener('DOMContentLoaded', () =>{
    let passwordValidation = new VoronInputValidation({
        errors: {
            tooShort: {
                name: {
                    length: 1,
                }
            }
        },
        position: 'left',

    });  
});
