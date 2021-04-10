
export default class UIObject {

    fireCustomEvent(eventName, detail) {
        const event = new CustomEvent(eventName, detail);
        document.dispatchEvent(event);
    }
}