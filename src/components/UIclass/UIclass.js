export default class UI {
  static renderElement(parent, tagName, innerHtml = null, ...attributes) {
    const element = document.createElement(tagName);

    if (attributes.length) {
      attributes.forEach(([attribute, value]) => {
        element.setAttribute(attribute, value);
      });
    }

    if (innerHtml) {
      element.innerHTML = innerHtml;
    }

    parent.append(element);

    return element;
  }
}
