"use client"
export default function ErrorPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-red-100 text-red-800">
      <h1 className="text-xl font-bold">Failed to connect to the server.</h1>
    </div>
  );
}