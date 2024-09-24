export class CustomImageUpload {
  loader: any;
  title: string;
  xhr?: XMLHttpRequest;

  constructor(loader: any, title: string) {
    // The file loader instance to use during the upload.
    this.loader = loader;
    this.title = title;
  }

  // Starts the upload process.
  upload(): Promise<{ default: string }> {
    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          this._initRequest(file);
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  private _initRequest(file: File) {
    this.xhr = new XMLHttpRequest();
    const xhr = this.xhr;
    xhr.open("POST", `https://localhost:8000/blog/upload?title=${this.title}`, true);
    xhr.responseType = "json";
  }

  // Initializes XMLHttpRequest listeners.
  private _initListeners(resolve: (value: { default: string }) => void, reject: (reason?: any) => void, file: File) {
    const xhr = this.xhr!;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;

      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }

      resolve({
        default: response.url,
      });
    });

    // Upload progress when it is supported.
    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt: ProgressEvent) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  private _sendRequest(file: File) {
    // Prepare the form data.
    const data = new FormData();
    data.append("upload", file);

    // Send the request.
    this.xhr!.send(data);
  }
}
