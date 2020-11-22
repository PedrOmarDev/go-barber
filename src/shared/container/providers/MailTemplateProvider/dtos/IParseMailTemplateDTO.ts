interface ITemplateVariables {
	[key: string]: string | number
}

export default interface IParseMailTemplateDTO {
	file_template: string
	variables: ITemplateVariables
}
