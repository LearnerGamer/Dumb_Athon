import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <Link href="/sign-in" className="text-white bg-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-500 transition-colors">
        Go to Sign In
      </Link>
    </div>
  );
}
