import { Router } from "express";
import { ArticleService } from "../services/article_service";
import { DBConnection } from "../helpers/db";

export class ArticleRoutes {
    public router: Router;
    private articleService: ArticleService;

    constructor(private db: DBConnection) {
        this.router = Router();
        this.articleService = new ArticleService(this.db);
        this.initRoutes();
    }

    initRoutes(): void {
        this.router.get('/', (req, res) => {
            this.articleService.getArticles(req.query)
                .then(articles => res.json(articles))
                .catch(e => res.status(e.status ?? 500).send(e.message))
        })

        this.router.get('/:id', (req, res) => {
            const articleId = Number(req.params.id)
            if (isNaN(articleId)) return res.status(404).send('Article not found')

            this.articleService.getArticle(articleId)
                .then(article => res.json(article.toJson()))
                .catch(e => res.status(e.status ?? 500).send(e.message))
        })
    }
}