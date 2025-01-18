import pluralize from 'pluralize'
import { Project, QuoteKind, ts, VariableDeclarationKind } from 'ts-morph'

import { AUTO_GENERATED_NOTE, BASE_FOLDER_PATH } from '@/cli/constants'
import type { Collection } from '@/types'

export const generateIndexDts = async (collections: Collection[]) => {
  const project = new Project({
    manipulationSettings: {
      quoteKind: QuoteKind.Single
    }
  })

  const sourceFile = project.createSourceFile(`${BASE_FOLDER_PATH}/index.d.ts`, undefined, {
    overwrite: true
  })

  sourceFile.addImportDeclaration({
    namedImports: [...collections.map((collection) => collection.name), 'DocumentTypes'],
    moduleSpecifier: './types',
    leadingTrivia: AUTO_GENERATED_NOTE
  })

  sourceFile.addExportDeclaration({
    moduleSpecifier: './types'
  })

  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      ...collections.map((collection) => ({
        name: `all${pluralize(collection.name)}`,
        type: `${collection.name}[]`
      })),
      {
        name: 'allDocuments',
        type: 'DocumentTypes[]'
      }
    ],
    hasDeclareKeyword: true,
    isExported: true
  })

  sourceFile.formatText({
    ensureNewLineAtEndOfFile: true,
    semicolons: ts.SemicolonPreference.Remove
  })

  await sourceFile.save()
}
