import Link from "next/link";
import Layout from "../../layouts/default";

const postFileNames =
  preval`
const fs = require("fs");
const path = require("path");
module.exports = fs.readdirSync("./pages/blog/").filter((file) =>
  path.extname(file).toLowerCase() === '.mdx'

  

  
);
` || [];

const posts = postFileNames.map(name => {
  const {
    default: Component,
    meta: { title }
  } = require("./" + name);

  return {
    Component,
    title,
    path: `/blog/${name.replace(".mdx", "")}`
  };
});

export default () => (
  <Layout>
    <h1>My Blog</h1>
    {posts.map(post => (
      <div key={`post-${post.title}`}>
        <Link href={post.path}>
          <a>
            <h2>{post.title}</h2>
          </a>
        </Link>
      </div>
    ))}
  </Layout>
);
