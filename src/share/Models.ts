export interface Memo {
    id: string
    , updateAt: Date
    , createAt: Date
    , title: string
    , content: string
}

export interface Label {
    id: string
    , updateAt: Date
    , createAt: Date
    , title: string
    , memoIds: Array<string>
}

export class Mapper {
    static mappingMemo(obj:any): Memo {
        return <Memo>{
            id: obj['_id']
            , updateAt: new Date(obj['updateAt'])
            , createAt: new Date(obj['createAt'])
            , title: obj['title']
            , content: obj['content']
        };
    }

    static mappingLabel(obj:any): Label {
        return <Label>{
            id: obj['_id']
            , updateAt: new Date(obj['updateAt'])
            , createAt: new Date(obj['createAt'])
            , title: obj['title']
            , memoIds: obj['memos']
        };
    }
}