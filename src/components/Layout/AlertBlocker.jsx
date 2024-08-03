"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";

const AlertBlocker = ({
  onSuccess,
  warningTitle,
  warningText,
  children,
  btnText,
  confirmToastText,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{btnText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-6">
          <DialogTitle className="mb-4">{warningTitle}</DialogTitle>
          <DialogDescription>{warningText}</DialogDescription>
        </DialogHeader>

        <div className="my-4">{children}</div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onSuccess();
              setOpen(false);
              toast.success(confirmToastText);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertBlocker;
