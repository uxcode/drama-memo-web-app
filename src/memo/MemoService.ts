import Configuration from '../share/Congifuration'
import {MemoDataRequest, MemoData, Mapper} from '../share/Models'

export default class MemoService {
    private static readonly url = Configuration.getApiHost() + '/memos';

    static async getMemos(): Promise<Array<MemoData>> {
        return fetch(this.url)
        .then(response => response.json())
        .then(json => {
            let memos = [];
            for (let memo_json of json) {
                memos.push(Mapper.mappingMemo(memo_json));
            }
            return memos;
        })
    }

    static async createMemo(request: MemoDataRequest): Promise<MemoData> {
        return fetch(this.url, 
            {
                body: JSON.stringify(request), 
                method:'POST', 
                headers:{'Content-Type':'application/json'}
            })
        .then(response => response.json())
        .then((memo_json) => {
            return Mapper.mappingMemo(memo_json)
        });
    }

    static async updateMemo(id: string, request: MemoDataRequest): Promise<MemoData> {
        let url: string = this.url + '/' + id;
        return fetch(url, 
            {
                body: JSON.stringify(request), 
                method:'PUT', 
                headers:{'Content-Type':'application/json','Accept': 'application/json'}
            })
        .then(response => response.json())
        .then((memo_json) => {
            return Mapper.mappingMemo(memo_json)
        });
    }

    static async deleteMemo(memo: MemoData): Promise<MemoData> {
        let url: string = this.url + '/' + memo.id;
        return fetch(url, 
            {
                method:'DELETE', 
                headers:{'Content-Type':'application/json',
                         'Accept': 'application/json'}
            })
        .then(response => response.json())
        .then((json) => {
            return Mapper.mappingMemo(json);
        });
    }
}