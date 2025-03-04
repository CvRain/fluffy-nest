export interface TreeDirectoryResponse {
    children: TreeDirectoryResponse[],
    name: string,
    type: string
}