import Configuration from '../share/Congifuration'
import {LabelData, Mapper} from '../share/Models'

export default class LabelService {
    private static  readonly url = Configuration.getApiHost() + '/labels';

    static async getLables(): Promise<Array<LabelData>> {
        return fetch(this.url)
        .then(response => response.json())
        .then(json => {
            let labels = [];
            for (let label_json of json) {
                labels.push(Mapper.mappingLabel(label_json));
            }
            return labels;
        })
    }

    static async createLable(title: string): Promise<LabelData> {
        return fetch(this.url, 
            {
                body: JSON.stringify({'title':title}), 
                method:'POST', 
                headers:{'Content-Type':'application/json',
                         'Accept': 'application/json'}
            })
        .then(response => response.json())
        .then((json) => {
            return Mapper.mappingLabel(json)
        });
    }

    static async renameLabel(id: string, title: string): Promise<LabelData> {
        const url = this.url + '/' + id;
        return fetch(url, 
            {
                body: JSON.stringify({'title': title}), 
                method:'PUT', 
                headers:{'Content-Type':'application/json',
                         'Accept': 'application/json'}
            })
        .then(response => response.json())
        .then((json) => {
            return Mapper.mappingLabel(json)
        });
    }

    static async deleteLabel(id: string): Promise<LabelData> {
        const url = this.url + '/' + id;
        return fetch(url, 
            {
                method:'DELETE', 
                headers:{'Content-Type':'application/json',
                         'Accept': 'application/json'}
            })
        .then(response => response.json())
        .then((json) => {
            return Mapper.mappingLabel(json)
        });
    }

    static async addMemosOnTheLabel(labelId:String, memoIds:String[]): Promise<LabelData> {
        const url = this.url + '/' + labelId + '/memos';
        return fetch(url, 
            {
                body: JSON.stringify({'memoIds':memoIds}), 
                method:'POST', 
                headers:{'Content-Type':'application/json',
                         'Accept': 'application/json'}
            })
        .then(response => response.json())
        .then((json) => {
            return Mapper.mappingLabel(json)
        });
    }

    static async removeMemosFromTheLabel(labelId:String, memoIds:String[]): Promise<LabelData> {
        const url = this.url + '/' + labelId + '/memos';
        return fetch(url, 
            {
                body: JSON.stringify({'memoIds':memoIds}), 
                method:'DELETE', 
                headers:{'Content-Type':'application/json',
                         'Accept': 'application/json'}
            })
        .then(response => response.json())
        .then((json) => {
            return Mapper.mappingLabel(json)
        });
    }
}