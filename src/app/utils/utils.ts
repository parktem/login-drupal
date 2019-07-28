export default class Utils {
    /**
     * 
     */
    static formatTitle = (title: string) => {
        let element = document.createElement('div');
        element.innerHTML = title;
        return element.textContent || element.innerText || '';
    }

    static formatBody = (body: string) => {
        let element = document.createElement('div');
        element.innerHTML = body;
        return element.textContent || element.innerText || '';
    }
}
