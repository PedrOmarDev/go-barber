import handlebars from 'handlebars'
import fs from 'fs'

import IMailTemplateProvider from '../models/IMailTemplateProvider'
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO'

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
	public async parse({
		file_template,
		variables,
	}: IParseMailTemplateDTO): Promise<string> {
		const templateFileContent = await fs.promises.readFile(file_template, {
			encoding: 'utf-8',
		})

		const parseTemplate = handlebars.compile(templateFileContent)

		return parseTemplate(variables)
	}
}

export default HandlebarsMailTemplateProvider
