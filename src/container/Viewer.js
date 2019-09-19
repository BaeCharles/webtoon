import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Viewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            episodeId: parseInt(props.match.params.episodeId, 10),
            episode: {}
        };
    }

    componentDidMount() {
        this._getEpisode();
    }

    _getEpisode = () => {
        const apiUrl = '/data/episode_list.json';

        axios.get(apiUrl)
            .then(data => {
                // 웹툰중 ID가 일치하는것을 state.episodeList 저장
                this.setState({
                    episode: data.data.webtoonEpisodes.find(episode => (
                        episode.id === this.state.episodeId
                    ))
                });

                console.log('data : ' + data);
                console.log('episodeId : ' + this.state.episodeId);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const episode = this.state.episode;

        return (
            <div className="wrap_viewer"> 
                {episode.id ? ( 
                    <div>
                        <div className="top_viewer"> 
                            {episode.title}
                            <Link to={`/webtoon/${episode.webtoonId}`} className="btn_close">X</Link> 
                        </div> 
                        <div className="wrap_images"> 
                            {episode.images.map((img, index) => (
                                // eslint-disable-next-line jsx-a11y/alt-text
                                <img key={index} src={img} /> 
                            ))}
                        </div> 
                    </div> 
                ) : (
                    <span>LOADING...</span>
                )}
            </div>
        );
    }
}

export default Viewer;