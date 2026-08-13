import { useEffect, useRef, useState } from 'react'

interface TextDialogProps { open: boolean; title: string; label: string; initialValue: string; onSave: (value: string) => void; onCancel: () => void }

export function TextDialog({ open, title, label, initialValue, onSave, onCancel }: TextDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [value, setValue] = useState(initialValue)
  useEffect(() => { const dialog = dialogRef.current; if (!dialog) return; if (open && !dialog.open) { setValue(initialValue); dialog.showModal() } if (!open && dialog.open) dialog.close() }, [open, initialValue])
  return (
    <dialog ref={dialogRef} className="workspace-dialog" onCancel={onCancel} aria-labelledby="text-dialog-title">
      <p className="panel-label">Edit Saved Prompt</p><h2 id="text-dialog-title">{title}</h2>
      <label className="dialog-field"><span>{label}</span><input autoFocus value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && value.trim()) onSave(value.trim()) }} /></label>
      <div><button className="outline-button" onClick={onCancel}>Cancel</button><button className="primary-button" disabled={!value.trim()} onClick={() => onSave(value.trim())}>Save</button></div>
    </dialog>
  )
}
