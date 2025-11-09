import { useEffect, useState } from 'react';
import { fetchLatestXPosts, XPost } from '../../services/x';

export default function XFeed() {
  const [posts, setPosts] = useState<XPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetchLatestXPosts();
        if (!mounted) return;
        setPosts(res.posts || []);
        setNote(res.note);
      } catch (e: any) {
        setError(e.message || 'Failed to load posts');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="mb-6">Loading latest posts...</div>;
  if (error) return <div className="mb-6 text-red-600">{error}</div>;

  // Show fallback when fetch failed or when there are no posts
  if ((!posts || posts.length === 0) && note === 'fetch_failed') {
    return (
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Latest from X</h2>
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded">
          Latest posts are temporarily unavailable. We're trying alternate sources — please check back soon.
        </div>
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Latest from X</h2>
        <div className="p-4 text-gray-600">No recent posts available.</div>
      </section>
    );
  }

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Latest from X</h2>
      <div className="space-y-3">
        {posts.map((p) => (
          <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer" className="block p-3 bg-white rounded shadow hover:bg-gray-50">
            <p className="text-sm text-gray-800">{p.content}</p>
            <p className="text-xs text-gray-500 mt-1">{p.published ? new Date(p.published).toLocaleString() : ''}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
