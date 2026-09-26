import { getPostById } from '@/lib/content';
import { notFound } from 'next/navigation';
import PostForm from '@/components/admin/PostForm';

type Props = { params: Promise<{ id: string }> };

export default async function EditPost({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-6">Edit: {post.title}</h1>
      <PostForm initialData={post as unknown as Record<string, unknown>} postId={Number(id)} />
    </div>
  );
}
