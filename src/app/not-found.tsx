export default function NotFound() {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>404 | Not Found</title>
        <meta name="description" content="not found" />
      </head>
      <body>
        <main className="h-screen w-full flex flex-col justify-center items-center bg-primary text-light">
          <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
          <div className="bg-secondary px-2 text-sm rounded rotate-12 absolute">Page Not Found</div>
          <span className="text-xl mt-4">Sorry, We couldn&apos;t find what you are looking for!</span>
          <button className="mt-5">
            <a href="/" className="relative inline-block text-sm font-medium text-secondary group">
              <span className="absolute inset-0 transition-transform translate-x-1 translate-y-1 bg-secondary group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <span className="relative block px-8 py-3 bg-primary border border-secondary text-xl text-light">Go Back to Home</span>
            </a>
          </button>
        </main>
      </body>
    </html>
  );
}
