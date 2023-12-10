import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEventHandler } from "react"
 
export function InputFile({ onUpload }: { onUpload: ChangeEventHandler<HTMLInputElement>}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="tdf-upload">Upload .tdf file</Label>
      <Input id="tdf-upload" type="file" onChange={onUpload} />
    </div>
  )
}