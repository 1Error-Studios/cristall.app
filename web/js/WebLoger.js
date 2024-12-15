function TakeNote(title, message) {
    window.electronAPI.invoke('log:make-note', title, message);
}