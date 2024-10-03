import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col gap-3 justify-center justify-items-center text-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <div>
        <Link className="btn" href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
}
