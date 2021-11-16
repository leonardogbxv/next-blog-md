export function formatMarkdownMeta(markdown) {
  const meta = `---\n\
title: '${markdown.title}'\n\
category: '${markdown.category}'\n\
date: '${markdown.date}'\n\
description: '${markdown.description}'\n\
cover_image: '${markdown.image}'\n\
---\n\
`

  const formattedMD = meta + '\n' + markdown.markdown

  return formattedMD
}