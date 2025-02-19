export interface BaseResponse{
	code: number;
	message: string;
	status: string;
    result: string;
}

export interface RequestResponse extends BaseResponse{
	data: string;
}

