import { QueryArrayResult } from "pg";

export class Article {
    id: number;
    author: string;
    title: string;
    description: string;
    created_at: Date;
    image: string;
    views: number;
    body: string;

    constructor(data: ArticleData) {
        this.id = data.article_id;
        this.author = data.author;
        this.title = data.title;
        this.description = data.description;
        this.created_at = data.created_at;
        this.image = data.image;
        this.views = data.views;
        this.body = data.body;
    }

    static fromQuery(query: QueryArrayResult): Article[] {
        return query.rows.map(res => {
            return new Article({
                article_id: Number(res['article_id']),
                author: res['author'],
                title: res['title'],
                description: res['description'],
                body: res['body'],
                created_at: new Date(res['created_at']),
                image: res['image'],
                views: Number(res['views']),
            });
        })
    }

    toJson(): ArticleData {
        return {
            article_id: this.id,
            author: this.author,
            title: this.title,
            body: this.body,
            description: this.description,
            created_at: this.created_at,
            image: this.image,
            views: this.views,
        }
    }
}

interface ArticleData {
    article_id: number;
    author: string;
    title: string;
    body?: string;
    description: string;
    created_at: Date;
    image: string;
    views: number;
}