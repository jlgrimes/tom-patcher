import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "../ui/button"
import { RefreshCwIcon } from "lucide-react"
import { handleByeConvert } from "../utils/bye-convert"

interface ForcedLossAlertProps {
  id: string;
  name: string;
  tdfFile: string | undefined;
}
 
export function ForcedLossAlert(props: ForcedLossAlertProps) {
  return (
    <Alert>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Forced Loss Detected</AlertTitle>
      <AlertDescription className="mt-2">
        <p><b>{props.name}</b> has a forced loss. Fix?</p>
        <Button variant={'secondary'} size={'sm'} className="mt-2" onClick={() => handleByeConvert(props.tdfFile, props.id)}><RefreshCwIcon className="mr-2 h-4 w-4" /> Convert to bye</Button>
      </AlertDescription>
    </Alert>
  )
}