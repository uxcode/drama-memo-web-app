export default class Configuration {
    static apiHost = 'localHost';
    static apiPort = '8080'

    static async init(): Promise<JSON> {
        return fetch('../configure.json')
        .then(response => response.json())
        .catch(error => console.debug('No config, so set config as default'))
    }
    
    public static getApiHost() {
        return "http://" + Configuration.apiHost + ":" + Configuration.apiPort;
    }
}