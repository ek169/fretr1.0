import React, { Component } from 'react';

export const newsOptions = ['news abc-news', 'news bloomberg', 'news breitbart-news', 'news cnbc', 'news espn', 'news the-washington-post'];

export class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    componentDidMount = () => {
        const _this = this;
        const source = this.props.object.params.split(" ")[1];
        var articles;
        const url = 'https://newsapi.org/v2/everything?sources=' + source + '&apiKey=b9a611b582e948d38de004bad5b1d230'
        fetch(url, {
            method: 'GET',
        })
        .then(function(response) {
        if(response.status === 200) {
            response.json().then(obj => {
                _this.setState({articles: obj.articles});
            })
        }
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
        return articles;
    }

    render = () => {
        const articles = this.state.articles;
        const articlesToDisplay = Object.keys(articles).map((i, a) =>
            (
            <div className="newsArticles" key={a}>
            <p>
            <span href={articles[a].url} className="articleHeader">{articles[a].title}</span>
            {articles[a].urlToImage ? <img className="newsImage" src={articles[a].urlToImage}/> : ""}
            <span className="articleDescription">
                {articles[a].description}
            </span>
            </p>
            </div>));
        return (
            <div className="articleContainer">
                {articlesToDisplay}
            </div>
        );
    }

}