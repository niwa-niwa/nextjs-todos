import fetch from "node-fetch";

export async function getAllPostsData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const posts = await res.json();
  const filteredPosts = posts.sort((a: any, b: any) => {
    const date_a: any = new Date(b.created_at);
    const date_b: any = new Date(a.created_at);
    return date_b - date_a;
  });
  return filteredPosts;
}

export async function getAllPostIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`)
  );
  const posts = await res.json();
  return posts.map((post: any) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
}

export async function getPostData(id: string) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`)
  );
  const post = await res.json();
  return post;
}
