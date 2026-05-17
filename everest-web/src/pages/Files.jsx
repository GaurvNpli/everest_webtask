import { useState } from 'react'
import '../styles/Files.css'

function Files() {
  // for upload status message
  const [uploadStatus, setUploadStatus] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  function handleFileChange(e) {
    setSelectedFile(e.target.files[0])
  }

  function handleDownload() {
    // fetch the file from our backend
    fetch('http://localhost:3000/file')
      .then((res) => res.blob()) 
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'hello.txt'
        a.click()
        window.URL.revokeObjectURL(url)
      })
      .catch(() => alert('Could not download file. Is the server running?'))
  }

  function handleUpload() {
    if (!selectedFile) {
      setUploadStatus('Please select a file first!')
      return
    }

    const formData = new FormData()
    formData.append('file', selectedFile)

    setUploadStatus('Uploading...')

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUploadStatus(data.message)
        setSelectedFile(null)
      })
      .catch(() => setUploadStatus('Upload failed. Is the server running?'))
  }

  return (
    <div className="files-wrapper">

      <div className="files-card">
        <h2 className="files-title">Download</h2>
        <p className="files-desc">Download a file from the server</p>
        <button className="files-btn" onClick={handleDownload}>
          Download hello.txt
        </button>
      </div>

      <div className="files-card">
        <h2 className="files-title">Upload</h2>
        <p className="files-desc">Send a file to the server</p>

        <label className="files-input-label">
          {selectedFile ? selectedFile.name : 'Choose a file'}
          <input
            type="file"
            onChange={handleFileChange}
            className="files-input"
          />
        </label>

        <button className="files-btn" onClick={handleUpload}>
          Upload
        </button>

        {uploadStatus && (
          <p className="files-status">{uploadStatus}</p>
        )}
      </div>

    </div>
  )
}

export default Files