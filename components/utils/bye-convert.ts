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
      if (matchTag)
      matchTag.setAttribute('outcome', '5');
    }
  })

  console.log(new XMLSerializer().serializeToString(xmlDoc))
}