export default class Configuration {
    static apiHost = 'localHost';
    static apiPort = '8080'

    static async init(): Promise<JSON> {
        return fetch('./configure.json', {
            headers: {'Accept': 'application/json'}
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((confingJson)=>{
            Configuration.apiHost = confingJson['api-host'];
            Configuration.apiPort = confingJson['api-port'];
            return confingJson;
        })
        .catch(error => console.debug('Error whild load config.json',))
    }
    
    public static getApiHost() {
        return "http://" + Configuration.apiHost + ":" + Configuration.apiPort;
    }
}