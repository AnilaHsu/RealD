import LatestNews from "../../components/latestNews/LatestNews";
import "./home.scss";

export function Home(): JSX.Element {
  return (
    <main className="main">
      <LatestNews />
    </main>
  );
}

export default Home;
