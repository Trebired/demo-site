import { CmsCollection, CmsText, useCmsCollection, type CmsItemView } from "@trebired/frontend/cms";
import { POSTS, postSlugs } from "./../../shared/site_content";

function PostCard(props: { post: CmsItemView; slug: string }) {
  return (
    <>
    <a href={`/posts/${props.slug}`}><CmsText as="strong" field={props.post.field("title")} /></a>
    <CmsText as="p" field={props.post.field("summary")} />
    </>
  );
}

function LatestPosts(props: { limit: number }) {
  const slugs = postSlugs();
  return (
    <div className="tbf-column tbf-gap-sm">
    {useCmsCollection(POSTS).slice(0, props.limit).map((post) => (
          <div className="tbf-card tbf-column tbf-gap-xs" key={post.id}>
          <PostCard post={post} slug={slugs.get(post.id) ?? post.id} />
          </div>
    ))}
    </div>
  );
}

function PostCards() {
  const slugs = postSlugs();
  return (
    <CmsCollection
    className="tbf-column tbf-gap-sm"
    id={POSTS}
    itemClassName="tbf-card tbf-column tbf-gap-xs"
    render={(post) => <PostCard post={post} slug={slugs.get(post.id) ?? post.id} />}
    />
  );
}

export { LatestPosts, PostCards };
