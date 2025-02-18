export interface BaseResponse{
	code: number;
	message: string;
	status: string;
}

export interface RequestResponse extends BaseResponse{
	data: string;
}

