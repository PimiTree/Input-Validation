Input-Validation version 0.3.2 actual
Tips for me 
Every module is ready: 
    git add . 
    git commit -m "Changelog"
    git push -u origin main

Voron Input-Validation service created at Vite 4.4.5 and dev version tested on Node 16.3.0. 

Input-Validation service is class for validate the inputs use regex and other JS stuff. 
Plz not use versions less then 1.0

 - 09.09.2023 - slight refactor, error messaging, object parametring
// Version 0.2 released.

 - 10.09.2023 - need to refactor all the code - reason is now refactor inpossible through the big intersections and conjustions of code.

version 0.2:
 - error messaging +
 - add object parametring to Class {} +
 - bug fix: ok image rerender +

version 0.2.1: 
 - new password control system +
------------------------------------
# Refactoring initiatiation. 
Due to the invalidity of suport, extend and complexity growth even 200 rows of code. So lets get ROCK! 
 - 12.09.2023 - Refactor end. 
                oldVoronInputValidation.js - deleted
                add apearence for Button
                error message refactor to more sumple sturture
------------------------------------

version 0.2.2: 
 - add apearence and apearence control for Button +
 - error message - refactor to more sumple sturture +
 - custom regex for any field +      

#bug report - props need advansed merge, now is subsitude 

version 0.2.3: 
 - error message - min and max length control system +
 - error message customization - partly+
 - regex length control system - joints with errors length condition +
 - minor chenges - #regexLimiter work + from delarative to iterative
bug fix - option and defaultProps merge properly 
bug fix - password regex was not propely work - ignore some special symbols - aA1!a 

version 0.2.4:
 - minor: change styles +
 - enable/disable features (messaging, styles)
 -- fields validation enable / disable according to required attribute +


------------------------------------

# Comimg soon

version 0.3: 
 - parametric appearence control - styles, containaring, error position else
  - message positioning +
  - messaging control + 
  - input containering + 
 
version 0.3.1:
 - bug report: requirement control not let from to be valid + fixed
 - bug report: when containering: false, messageng: true - try to insert message  + fixed
 - bug report: not works wrong symbol message + fixed
 - bug report: email input eat  v.o.r....o.n.e.mnkotg@gmail.com + fixed 
 - inputApearence +
 - buttonApearence +
 - urlHTTPSAutocomplete +

version 0.3.2:
 - container source +
 - bug fix: label moveout from container +
 - separate position control for of - valid/invalid message +
 - bugfix: bottomCentered message wrong styles +
 - recude reasign this properties

version 0.4: 
 - apearence color control
 - separate position control for each one type of input ?????
 - scope input type ot [data-voron] - when scope is input type class behaviour depended on input type attribut value or is scope worck with [data-voron] atribute which take email, text, password, and others template of regex. Reset form types: name, email, tel,  password, url and get types from data-atribute or ?class must flexible react to data-voron attr at inputs?
 - message height control 

version 0.5:
 - test behaviour with none inputable input's
 - test customizing all the fields

other versions:

 - class kill;


Side task: 
 - format README and start to prepare docs
 - need update vite.config.js to force it worck wit svg  - solved via import okImgUrl from '../../img/ok.svg'; - I not think is a good 



