![VALIO FORM logo](https://cdn.voron-porto.com/logo4.svg)

# Valio Form v1.0.2 
### Input-Validation service created at Vite 4.4.5 and Node 16.3.0. 

## What is Valio Form? 
- **Validation** - valio is lib for validation of simple forms
- **Submit lockedge** - automatically block from sumbit until validate inputs 
- **Apearence** - valio includes premade styles for input to markup valid and invalid state
- **Messeging** - customizing error message text, positioning around input feild (**more in coming soon*)

# All instructions are not valid and not WORKS! 
## Instalation
**NPM**
1. `npm i @voronporto/valio`
1. `import Valio from '@voronporto/valio`

or <br>
**index.html**
1. Download [Valio.zip][valio-archive]
1. `<link rel="valio.css">`
1. `<script src="valio.js"></script>`

or <br>
**index.html from external resource**
1. In `<head>` `<link rel="https://cdn.voron-porto.com/valio.css">`
1. `<html>` tag close `<script src="https://cdn.voron-porto.com/valio.js"></script>`

## Usage

### Add markup 
Simple structure must contain: <br>
```sh
<form data-voron>
    <input type="name" required>
    <button>SUBMIT</button>
</form>
```

### Call valio

```
<script>
    const valio = new Valio()
</script>
```




<details>
<summary><strong>Coming soon</strong></summary>

<blockquote>
version 1.1++:

```sh
 - apearence color control
 - separate position control for each one type of input ?????
 - scope control - for now Valio watch onto the input type attribute. If user want to use fields like type="text"
 - message height control
 - testі need: behaviour with none inputable input's
 - class kill;
```

</blockquote>
</details>


[valio-archive]: https://cdn.voron-porto.com/valio.zip
