import { CodeBlock } from '@tszhong0411/ui'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { type BundledLanguage, bundledLanguages } from 'shiki'

import { highlighterAtom } from '@/store/highlighter'

type CommentCodeBlockProps = {
  children: {
    props: {
      children: string
      className?: string
      title?: string
    }
  }
}

const CommentCodeBlock = (props: CommentCodeBlockProps) => {
  const {
    children: {
      props: { children: code, className, title }
    }
  } = props
  const lang = className?.replace('lang-', '') ?? 'plaintext'
  const highlighter = useAtomValue(highlighterAtom)
  const [highlightedHtml, setHighlightedHtml] = useState('')
  const [isHighlighted, setIsHighlighted] = useState(false)

  useEffect(() => {
    if (!highlighter) return

    const generateHighlightedHtml = async () => {
      const loadedLanguages = highlighter.getLoadedLanguages()
      const hasLoadedLanguage = loadedLanguages.includes(lang)
      const bundledLang = bundledLanguages[lang as BundledLanguage]

      if (!hasLoadedLanguage) {
        await highlighter.loadLanguage(bundledLang)
      }

      return highlighter.codeToHtml(code, {
        lang: lang in bundledLanguages ? lang : 'plaintext',
        themes: {
          light: 'github-light-default',
          dark: 'github-dark-default'
        },
        defaultColor: false
      })
    }

    generateHighlightedHtml().then((newHtml) => {
      setHighlightedHtml(newHtml)
      setIsHighlighted(true)
    })
  }, [code, highlighter, lang])

  return (
    <CodeBlock data-lang={lang} title={title} className='shiki' figureClassName='my-2'>
      {isHighlighted ? (
        <code
          dangerouslySetInnerHTML={{
            __html: /<code\b[^>]*>([\s\S]*?)<\/code>/.exec(highlightedHtml)?.[1] ?? code
          }}
        />
      ) : (
        <code>{code}</code>
      )}
    </CodeBlock>
  )
}

export default CommentCodeBlock
