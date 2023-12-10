'use-client';

import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "../ui/button"
import { CheckCircle2Icon, RefreshCwIcon } from "lucide-react"
import { handleByeConvert } from "../utils/bye-convert"
import { useState } from "react"

interface ForcedLossAlertProps {
  id: string;
  name: string;
  tdfFile: string | undefined;
  setTdfFile: Function;
}
 
export function ForcedLossAlert(props: ForcedLossAlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <Alert>
        <CheckCircle2Icon className="h-4 w-4" />
        <AlertTitle>{props.name} now has a bye</AlertTitle>
      </Alert>
    )
  }

  return (
    <Alert>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Forced Loss Detected</AlertTitle>
      <AlertDescription className="mt-2">
        <p><b>{props.name}</b> has a forced loss. Fix?</p>
        <Button variant={'secondary'} size={'sm'} className="mt-2" onClick={() => {
          const newTdf = handleByeConvert(props.tdfFile, props.id);
          props.setTdfFile(newTdf);
          setDismissed(true);
        }}><RefreshCwIcon className="mr-2 h-4 w-4" /> Convert to bye</Button>
      </AlertDescription>
    </Alert>
  )
}