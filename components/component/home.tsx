'use client'

import { TabsContent, Tabs } from "@/components/ui/tabs"
import { CardTitle, CardHeader, CardContent, CardFooter, Card, CardDescription } from "@/components/ui/card"
import { ChangeEvent, useRef, useState } from "react"
import { InputFile } from "./input-file"
import { ForcedLossAlert } from "./ForcedLossAlert"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { DownloadIcon } from "lucide-react"

const getTournamentName = (tdf: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(tdf, "text/xml");

  return xmlDoc.getElementsByTagName("name")?.[0]?.childNodes[0]?.nodeValue;
}

const getTournamentDate = (tdf: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(tdf, "text/xml");

  return xmlDoc.getElementsByTagName("startdate")?.[0]?.childNodes[0]?.nodeValue;
}

const getPlayersWithForcedLosses = (tdf?: string) => {
  if (!tdf) return [];

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(tdf, "text/xml");

  const playerNodes = Array.from(xmlDoc.getElementsByTagName("forcedloss") ?? [])?.map((forcedLossTag) => forcedLossTag.parentElement?.parentElement);

  return playerNodes.filter((node) => node).map((playerNode) => playerNode && ({
    id: playerNode.getAttribute('userid'),
    name: playerNode.getElementsByTagName('firstname')?.[0].firstChild?.textContent + ' ' + playerNode.getElementsByTagName('lastname')?.[0].firstChild?.textContent
  }))
}

export function Home() {
  const [tdfFile, setTdfFile] = useState<string>();
  const playersWithForcedLosses = useRef<any[]>([]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    let input = event.target;
    if (!input?.files || !input?.files[0]) {
        alert('Please select a file.');
        return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        setTdfFile(e.target?.result as string);
        playersWithForcedLosses.current = getPlayersWithForcedLosses(e.target?.result as string)
    };

    reader.readAsText(file); // Read the file as text
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <Tabs className="max-w-lg mx-auto mt-8" defaultValue="home">
        {/* <TabsList className="flex justify-start space-x-4">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList> */}
        <TabsContent value="home">
          <Card>
            <CardHeader>
              <CardTitle>TOM Patcher</CardTitle>
              <CardDescription>Useful tools to patch up your tournaments. Upload your .tdf file to get started.</CardDescription>
            </CardHeader>
            <CardContent>
            {!tdfFile && (
              <InputFile onUpload={handleUpload} />
            )}
              {tdfFile && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">{getTournamentName(tdfFile)}</h2>
                  <h3>{getTournamentDate(tdfFile)}</h3>
                  {playersWithForcedLosses.current.map((player) => (
                    <ForcedLossAlert name={player?.name ?? ''} id={player?.id ?? ''} tdfFile={tdfFile} setTdfFile={setTdfFile} />
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button disabled={!tdfFile} size={'sm'} className="mt-2"><DownloadIcon className="mr-2 h-4 w-4" /> Download updated .tdf</Button>
            </CardFooter>

            {/* {tdfFile && tdfFile} */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
