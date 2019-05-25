import Configuration from '../share/Congifuration'
import {LabelData, Mapper} from '../share/Models'

export default class LabelService {
    private static getBaseURL() {
        return Configuration.getApiHost() + '/labels';
    }

    static async getLables(): Promise<Array<LabelData>> {
        const url = LabelService.getBaseURL();
        return fetch(url)
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
        const url = LabelService.getBaseURL();
        return fetch(url, 
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
        const url = LabelService.getBaseURL() + '/' + id;
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
        const url = LabelService.getBaseURL() + '/' + id;
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
        const url = LabelService.getBaseURL() + '/' + labelId + '/memos';
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
        const url = LabelService.getBaseURL() + '/' + labelId + '/memos';
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