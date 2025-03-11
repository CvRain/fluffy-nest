export interface TreeDirectoryResponse {
    code: number,
    data: TreeDirectoryResponseData | null,
    message: string,
    result: string
}

export interface TreeDirectoryResponseData {
    children: TreeDirectoryResponseData[],
    name: string,
    type: string
}


export interface UserInfo{
    id: string,
    name: string,
    email: string,
    icon: string,
    role: number,
    signature: string,
    create_time: string,
    update_time: string
}

export interface UserInfoResponse{
    code: number,
    data: UserInfo | null,
    message: string,
    result: string
}