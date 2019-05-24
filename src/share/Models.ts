export interface MemoDataRequest {
    title: string;
    content: string;
}
export interface MemoData {
    id: string;
    updatedAt: Date;
    createdAt: Date;
    title: string;
    content: string;
}

export interface LabelData {
    id: string;
    title: string;
    updatedAt?: Date;
    createdAt?: Date;
    memos?: MemoData[];
}

export const DEFAULT_LABEL: LabelData = {
    id: 'all-memos',
    title: 'All Memos'
}

export class Mapper {
    static mappingMemo(obj:any): MemoData {
        return {
            id: obj['_id']
            , title: obj['title']
            , content: obj['content']
            , updatedAt: new Date(obj['updatedAt'])
            , createdAt: new Date(obj['createdAt'])
        } as MemoData;
    }

    static mappingLabel(obj:any): LabelData {
        let memos: MemoData[] = [];
        for (let memo_json of obj['memos']) {
            memos.push(this.mappingMemo(memo_json));
        }

        return {
            id: obj['_id']
            , title: obj['title']
            , memos
            , updatedAt: new Date(obj['updatedAt'])
            , createdAt: new Date(obj['createdAt'])
        } as LabelData;
    }
}