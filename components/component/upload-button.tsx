/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/bTkVhfI7L96
 */
import { Button } from "@/components/ui/button"

export function UploadButton() {
  return (
    <Button className="rounded-full p-4 bg-blue-500 text-white" variant="outline">
      <UploadIcon className="w-4 h-4 mr-2" />
      Upload .tdf file
    </Button>
  )
}


function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}