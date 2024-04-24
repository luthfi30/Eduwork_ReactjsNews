// src/components/NewsPortal.js
import React, { Component } from "react";
import axios from "axios";
import "./NewsPortal.css"; // import file CSS untuk styling

class NewsPortal extends Component {
  state = {
    articles: [],
    searchQuery: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2024-03-24&sortBy=publishedAt&apiKey=1f9008ba7451410f912a783548978fbf`);
      this.setState({ articles: response.data.articles });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = () => {
    this.fetchData();
  };

  render() {
    const { articles, searchQuery } = this.state;
    const filteredArticles = articles.filter((article) => article.title && article.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return (
      <div>
        <nav className="navbar">
          <span className="navbar-title">React Portal Berita</span>
        </nav>
        <div className="search-container">
          <input type="text" placeholder="Search news..." value={searchQuery} onChange={this.handleSearchChange} />
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <div className="articles-container">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <div key={index} className="article">
                <img src={article.urlToImage} alt={article.title} />
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url}>Read more</a>
              </div>
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      </div>
    );
  }
}

export default NewsPortal;
