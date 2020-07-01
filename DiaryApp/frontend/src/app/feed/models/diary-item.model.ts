export interface DiaryItem {
    id: number;
    recordDate: string,
    notes: string,
    email: string,
    createdAt: string,
    updatedAt: string
}

export const diaryItemMocks: DiaryItem[] = [
    {
        "id": 4,
        "recordDate": "26-05-2010",
        "notes": "New user",
        "createdAt": "2020-05-26T07:02:23.309Z",
        "email": "rahul@gmail.com",
        "updatedAt": "2020-05-26T07:02:23.309Z"
    },
    {
        "id": 1,
        "recordDate": "13-09-2019",
        "notes": "New user",
        "createdAt": "2020-05-26T07:01:12.138Z",
        "email": "rahul@gmail.com",
        "updatedAt": "2020-05-26T07:01:12.138Z"
    },
    {
        "id": 2,
        "recordDate": "26-05-2020",
        "notes": "New user",
        "createdAt": "2020-05-26T07:01:48.329Z",
        "email": "rahul@gmail.com",
        "updatedAt": "2020-05-26T07:01:48.329Z"
    }
];
