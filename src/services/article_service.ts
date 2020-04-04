import { DBConnection } from "../helpers/db";
import { Article } from "../models/article";
import { APIException } from "../models/api_exception";

export class ArticleService {
    constructor(private db: DBConnection) { }

    async getArticles(params: any) {
        const limit = Number(params.limit || 50);
        const offset = Number(params.offset || 0);

        const query = await this.db.query(
            `
                SELECT
                articles.article_id,
                articles.author,
                articles.title,
                articles.description,
                articles.created_at,
                articles.image,
                COUNT(article_views.view_id) AS views
                FROM articles LEFT JOIN article_views USING (article_id)
                GROUP BY articles.article_id
                ORDER BY articles.article_id DESC LIMIT $1 OFFSET $2;
            `,
            [limit, offset]
        );

        const articles = Article.fromQuery(query)
        return articles;
    }

    async getArticle(id: number): Promise<Article> {
        const query = await this.db.query(
            `
                SELECT articles.*, COUNT(article_views.view_id) AS views FROM
                articles LEFT JOIN article_views USING (article_id)
                WHERE article_id = $1
                GROUP BY articles.article_id;
            `,
            [id]
        );

        if (query.rowCount == 0) throw new APIException('Article not found', 404)

        return Article.fromQuery(query)[0]
        // article.tags = await this.tagsModel.getArticleTags(id);
    }
}