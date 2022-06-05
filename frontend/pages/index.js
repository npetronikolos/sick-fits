import { NextSeo } from "next-seo";
import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      <p>Hello!</p>
      <code>var</code>
      <div>
        <NextSeo
          title="Page Meta Title"
          description="This will be the page meta description"
          canonical="https://www.canonicalurl.ie/"
          openGraph={{
            url: "https://www.canonicalurl.ie/",
            title: "Open Graph Title",
            description: "Open Graph Description",
            images: [
              {
                url: "https://www.example.ie/og-image-01.jpg",
                width: 800,
                height: 600,
                alt: "Og Image Alt",
              },
              {
                url: "https://www.example.ie/og-image-02.jpg",
                width: 900,
                height: 800,
                alt: "Og Image Alt Second",
              },
              { url: "https://www.example.ie/og-image-03.jpg" },
              { url: "https://www.example.ie/og-image-04.jpg" },
            ],
          }}
        />
        <h1>SEO Added to Page</h1>
        <p>Take a look at the head to see what has been added.</p>
        <p>
          Or checkout how{" "}
          <Link href="/jsonld">
            <a>JSON-LD</a>
          </Link>{" "}
          (Structured Data) is added
        </p>
      </div>
    </>
  );
}

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: ALL_POSTS_QUERY,
//     variables: allPostsQueryVars,
//   });

//   return addApolloState(apolloClient, {
//     props: {},
//     revalidate: 1,
//   });
// }
