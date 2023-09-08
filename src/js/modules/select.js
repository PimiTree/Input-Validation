const select = (selector, context = document) => {
    let elements;
    switch (true) {
    case typeof selector === 'string':
        elements = [...context.querySelectorAll(selector)];
        break;
    case selector instanceof Node:
        elements = [selector];
        break;
    case selector instanceof NodeList:
        elements = [...selector];
        break;
    case HTMLCollection.prototype.isPrototypeOf(selector):
        elements = [...selector.children];
        break;
    default:
        elements = selector;
        break;
    }
    return elements;
};

export default select;
