import { cacheTag } from 'next/cache'

export default function MyPostsPage() {
    'use cache'

    cacheTag('my-posts');


    return (
        <div className="space-y-6 p-6">This is the my posts page</div>
    );
}
