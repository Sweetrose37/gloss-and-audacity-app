import { useEffect, useRef } from 'react'

interface ConfirmDialogProps { open: boolean; title: string; body: string; onConfirm: () => void; onCancel: () => void }

export function ConfirmDialog({ open, title, body, onConfirm, onCancel }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => { const dialog = dialogRef.current; if (!dialog) return; if (open && !dialog.open) dialog.showModal(); if (!open && dialog.open) dialog.close() }, [open])
  return (
    <dialog ref={dialogRef} className="workspace-dialog" onCancel={onCancel} aria-labelledby="confirm-title">
      <p className="panel-label">Please Confirm</p><h2 id="confirm-title">{title}</h2><p>{body}</p>
      <div><button className="outline-button" onClick={onCancel}>Cancel</button><button className="danger-button" autoFocus onClick={onConfirm}>Delete</button></div>
    </dialog>
  )
}
