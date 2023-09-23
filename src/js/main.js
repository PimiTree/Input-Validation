import '../sass/style.scss';

import Valio from '@voronporto/valio';
import '@voronporto/valio/valio.css';


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
        messaging: true,
        positionValid: 'leftInside',
        positionInvalid: 'bottom',
        inputApearence: true,
        buttonApearence: true,
        urlHTTPSAutocomplete: true,       
    });  

    // const a = document.querySelectorAll('[data-voron] *');
    // console.log(a)

    // const a = document.querySelector('header');
    // console.log(a.getAttribute('class').includes('otherclass'));
});
