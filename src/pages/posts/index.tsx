import Head from "next/head";
import { createClient } from "../../services/prismic";
import styles from "./styles.module.scss";
import { RichText } from "prismic-dom";
import Link from "next/link";
interface Post {
	slug: string;
	title: string;
	excerpt: string;
	updatedAt: string;
}
interface PostsProps {
	posts: Post[];
}
export default function Posts({ posts }: PostsProps) {
	return (
		<>
			<Head>
				<title>Posts | Ignew</title>
			</Head>
			<main className={styles.container}>
				<div className={styles.posts}>
					{posts.map((post, key) => (
						<Link href={`/posts/${post.slug}`} key={key}>
							<a>
								<time>{post.updatedAt}</time>
								<strong>{post.title}</strong>
								<p>{post.excerpt}</p>
							</a>
						</Link>
					))}
				</div>
			</main>
		</>
	);
}

export async function getServerSideProps() {
	const prismic = createClient();
	const response = await prismic
		.getAllByType("post")
		.then((res: any[]) => {
			return res;
		})
		.catch((err) => {
			return null;
		});
	const posts = response.map((post) => {
		return {
			slug: post.uid,
			title: RichText.asText(post.data.title),
			excerpt: post.data.content.find((content) => content.type === "paragraph")?.text ?? "",
			updatedAt: new Date(post.last_publication_date).toLocaleDateString("pt-BR", {
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
		};
	});
	return {
		props: { posts },
	};
}
