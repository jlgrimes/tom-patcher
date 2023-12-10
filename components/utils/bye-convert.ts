export const handleByeConvert = (tdfFile: string | undefined, id: number) => {
  if (!tdfFile) return;

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(tdfFile, "text/xml");

  const playerNodes = Array.from(xmlDoc.getElementsByTagName("forcedloss") ?? [])?.filter((forcedLossTag) => forcedLossTag.parentElement?.parentElement);
}