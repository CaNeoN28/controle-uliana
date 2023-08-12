export default interface APIGetResponse{
	data: any[],
	page: number,
	limit: number,
	total_page: number,
	total_documents: number
}