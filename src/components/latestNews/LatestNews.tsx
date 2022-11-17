import { useAppDispatch, useAppSelector } from "../../app/hook";
import Filter from "../../components/filter/Filter";
import { article } from "../../type";
import "./latestNews.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { getNewsData, IncreasePage, setLoadMore } from "../../app/newsSlice";
import loadingAnimation from "../../assets/loading.gif";

export function LatestNews(): JSX.Element {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.news.newsData);
  const category = useAppSelector((state) => state.news.category);
  const countryName = useAppSelector((state) => state.news.countryName);
  const countryCode = useAppSelector((state) => state.news.countryCode);
  const page = useAppSelector((state) => state.news.page);
  const loadMore = useAppSelector((state) => state.news.loadMore);
  const totalResults = useAppSelector((state) => state.news.totalResults);
  const loadState = useAppSelector((state) => state.news.loading);

  const fetchMoreData = () => {
    if (data.length < totalResults) {
      dispatch(IncreasePage());
      let currentPage = page;
      currentPage += 1;

      dispatch(
        getNewsData({ category, country: countryCode, page: currentPage })
      );
    } else {
      dispatch(setLoadMore(false));
    }
  };

  const article: JSX.Element[] = data.map((article: article, index: number) => {
    return (
      <div className="article-item" key={index}>
        <a className="article-link" href={article.url ? article.url : ""}>
          {article.urlToImage ? (
            <img className="article-img" src={article.urlToImage}></img>
          ) : (
            ""
          )}

          <div className="article-content">
            <div className="article-info">
              {article.source.name ? (
                <span className="article-source">{article.source.name}</span>
              ) : (
                ""
              )}
              {article.author ? (
                <span className="article-author">{article.author}</span>
              ) : (
                ""
              )}
              {article.publishedAt ? (
                <span className="article-time">
                  {article.publishedAt.split(/T/)[0]}
                </span>
              ) : (
                ""
              )}
            </div>
            <h3 className="article-title">{article.title}</h3>
            <p className="article-description">{article.description}</p>
          </div>
        </a>
      </div>
    );
  });
  const articleList = (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMoreData}
      hasMore={loadMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p className="finish-load" style={{ textAlign: "center" }}>
          <b>It looks like you&apos;ve seen all the Top news !</b>
        </p>
      }
    >
      {article}
    </InfiniteScroll>
  );

  const noNewsDataContent = (
    <div className="no-news-data">
      It looks like we don&apos;t have any top news
      {category ? ` about ${category}` : ""}
      {countryName ? ` from ${countryName}` : ""}.
    </div>
  );
  const loadingContent = (
    <div className="loading-data">
      <img src={loadingAnimation} alt="loading animation" />
    </div>
  );
  return (
    <section className="news-section">
      <div className="news-top">
        <h2 className="section-title">
          Top News <span className="sub-title">| {countryName} </span>
        </h2>

        <Filter />
      </div>
      <div>
        {loadState === "pending"
          ? loadingContent
          : data.length === 0
          ? noNewsDataContent
          : articleList}
      </div>
    </section>
  );
}

export default LatestNews;
