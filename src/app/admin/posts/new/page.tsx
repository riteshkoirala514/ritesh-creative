import PostForm from '@/components/admin/PostForm';

export default function NewPost() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-6">New Post</h1>
      <PostForm />
    </div>
  );
}
