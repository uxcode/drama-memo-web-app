import Configuration from '../share/Congifuration'
import {LabelData, Mapper} from '../share/Models'

export default class LableService {
    private readonly url = Configuration.getApiHost() + '/labels';

    async getLables(): Promise<Array<LabelData>> {
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

    async createLable(title: string): Promise<LabelData> {
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

    async renameLabel(id: string, title: string): Promise<LabelData> {
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

    async deleteLabel(id: string): Promise<LabelData> {
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

    async addMemosOnTheLabel(labelId:String, memoIds:String[]) {
        const url = this.url + '/' + labelId + '/memos';
        fetch(url, 
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

    async removeMemosFromTheLabel(labelId:String, memoIds:String[]) {
        const url = this.url + '/' + labelId + '/memos';
        fetch(url, 
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