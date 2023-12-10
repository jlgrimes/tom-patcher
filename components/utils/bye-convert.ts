export const handleByeConvert = (tdfFile: string | undefined, id: string) => {
  if (!tdfFile) return;

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(tdfFile, "text/xml");

  Array.from(xmlDoc.getElementsByTagName("late") ?? [])?.forEach((lateTag) => {
    if (lateTag.parentElement?.getAttribute('userid') === id) {
      lateTag.parentNode?.removeChild(lateTag);
    }
  })

  Array.from(xmlDoc.getElementsByTagName("match") ?? [])?.forEach((matchTag) => {
    if (matchTag.getElementsByTagName('player')?.[0]?.getAttribute('userid') === id) {
      if (matchTag.getAttribute('outcome') !== '8') {
        return console.error('outcome tag should be set to 8 here. Aborting.');
      }
      matchTag.setAttribute('outcome', '5');
    }
  })

  return new XMLSerializer().serializeToString(xmlDoc);
}