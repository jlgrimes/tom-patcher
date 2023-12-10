'use client'

import { TabsContent, Tabs } from "@/components/ui/tabs"
import { CardTitle, CardHeader, CardContent, CardFooter, Card, CardDescription } from "@/components/ui/card"
import { ChangeEvent, useState } from "react"
import { InputFile } from "./input-file"
import { ForcedLossAlert } from "./ForcedLossAlert"
import { Badge } from "../ui/badge"

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
              <CardDescription>Useful tools to patch up your tournaments.</CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              {tdfFile && (
                <div className="flex flex-col gap-2">
                  <div>
                    <Badge variant='secondary'>Loaded tournament</Badge>
                  </div>
                  <h2 className="text-xl font-semibold">{getTournamentName(tdfFile)}</h2>
                  <h3>{getTournamentDate(tdfFile)}</h3>
                  {getPlayersWithForcedLosses(tdfFile).map((player) => (
                    <ForcedLossAlert name={player?.name ?? ''} />
                  ))}
                </div>
              )}
            </CardContent>
            {!tdfFile && (
              <CardFooter className="flex justify-center">
                <InputFile onUpload={handleUpload} />
              </CardFooter>
            )}

            {tdfFile && tdfFile}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
